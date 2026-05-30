import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

// Primary local path and /tmp writable fallback path
const localAnalyticsPath = path.join(process.cwd(), 'src', 'data', 'analytics.json');
const tmpAnalyticsPath = '/tmp/analytics.json';

// In-memory cache in case both Blobs and File Systems fail or are read-only
let memoryCache: Record<string, { newVisitors: number; totalVisits: number }> = {};

// Helper to find the best writable local path (returns /tmp on serverless environments if src is read-only)
async function getBestLocalPath(): Promise<string | null> {
  try {
    // Try primary src path first
    await fs.mkdir(path.dirname(localAnalyticsPath), { recursive: true });
    await fs.access(path.dirname(localAnalyticsPath));
    return localAnalyticsPath;
  } catch {
    try {
      // Fallback to /tmp which is always writable on serverless (Netlify)
      await fs.mkdir(path.dirname(tmpAnalyticsPath), { recursive: true });
      return tmpAnalyticsPath;
    } catch {
      return null;
    }
  }
}

// Helper to retrieve Netlify Blob store if running on Netlify
async function getBlobStore() {
  const isNetlify = process.env.NETLIFY || process.env.NETLIFY_LOCAL || process.env.NETLIFY_SITE_ID;
  if (isNetlify) {
    try {
      const { getStore } = await import('@netlify/blobs');
      return getStore('site-analytics', { consistency: 'strong' });
    } catch (err) {
      console.warn('Could not initialize Netlify Blobs store. Falling back to local FS.', err);
    }
  }
  return null;
}

// Unified helper to read analytics data (handles Netlify Blobs & resilient local fallbacks)
async function readAnalyticsData(): Promise<Record<string, { newVisitors: number; totalVisits: number }>> {
  const store = await getBlobStore();
  if (store) {
    try {
      const data = await store.get('analytics-data', { type: 'json' });
      if (data) {
        return data as Record<string, { newVisitors: number; totalVisits: number }>;
      }
    } catch (err) {
      console.error('Error reading from Netlify Blobs:', err);
    }
  }

  // Fallback to local files
  try {
    const filePath = await getBestLocalPath();
    if (filePath) {
      try {
        const fileData = await fs.readFile(filePath, 'utf8');
        if (fileData.trim()) {
          const parsed = JSON.parse(fileData);
          memoryCache = { ...memoryCache, ...parsed }; // Sync cache
          return parsed;
        }
      } catch {
        // File doesn't exist yet, return cache
      }
    }
  } catch (err) {
    console.error('Error reading filesystem:', err);
  }

  return memoryCache;
}

// Unified helper to write analytics data (handles Netlify Blobs & resilient local fallbacks)
async function writeAnalyticsData(data: Record<string, { newVisitors: number; totalVisits: number }>) {
  memoryCache = { ...memoryCache, ...data }; // Sync cache

  const store = await getBlobStore();
  if (store) {
    try {
      await store.setJSON('analytics-data', data);
      return;
    } catch (err) {
      console.error('Error writing to Netlify Blobs:', err);
    }
  }

  // Fallback to local files
  try {
    const filePath = await getBestLocalPath();
    if (filePath) {
      await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
    }
  } catch (err) {
    console.error('Error writing to filesystem:', err);
  }
}

// User-agent formatter for clean device notifications
function formatUserAgent(userAgentString: string | null): string {
  if (!userAgentString) return 'Unknown Device';
  if (userAgentString.includes('iPhone')) return 'iPhone (Safari)';
  if (userAgentString.includes('Android')) return 'Android Device';
  if (userAgentString.includes('iPad')) return 'iPad';
  if (userAgentString.includes('Macintosh')) return 'Mac (Desktop)';
  if (userAgentString.includes('Windows')) return 'Windows PC';
  if (userAgentString.includes('Linux') && !userAgentString.includes('Android')) return 'Linux Desktop';
  return 'Desktop / Other';
}

// Send notification embed alert to Discord Webhook
async function sendDiscordNotification(
  todayCount: { newVisitors: number; totalVisits: number },
  allTimeUniqueCount: number,
  req: NextRequest
) {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  if (!webhookUrl) {
    console.warn('DISCORD_WEBHOOK_URL is not set. Skipping Discord notification.');
    return;
  }

  // Capture geographic info from Netlify headers
  const city = req.headers.get('x-city') || req.headers.get('x-nf-city') || '';
  const region = req.headers.get('x-region') || req.headers.get('x-nf-region') || '';
  const country = req.headers.get('x-country') || req.headers.get('x-nf-country') || '';
  
  let locationString = 'Unknown Location';
  if (city) {
    locationString = region ? `${city}, ${region}` : city;
    if (country) locationString += ` (${country})`;
  } else {
    locationString = 'Local / Unknown Location';
  }

  const userAgent = req.headers.get('user-agent');
  const device = formatUserAgent(userAgent);

  const discordPayload = {
    embeds: [
      {
        title: '👤 New Visitor Alert!',
        description: 'A new unique user has visited **Nar Technique**.',
        color: 3066993, // A nice vibrant green (#2ECC71)
        fields: [
          {
            name: '📍 Location',
            value: locationString,
            inline: true
          },
          {
            name: '📱 Device / OS',
            value: device,
            inline: true
          },
          {
            name: '📊 Today\'s Visitors (Unique / Total)',
            value: `**${todayCount.newVisitors}** / **${todayCount.totalVisits}**`,
            inline: false
          },
          {
            name: '🏆 All-Time Unique Visitors',
            value: `**${allTimeUniqueCount}**`,
            inline: false
          }
        ],
        timestamp: new Date().toISOString(),
        footer: {
          text: 'Nar Technique Live Analytics'
        }
      }
    ]
  };

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(discordPayload)
    });
    if (!response.ok) {
      console.error('Failed to send Discord webhook:', await response.text());
    }
  } catch (err) {
    console.error('Error sending Discord notification:', err);
  }
}

// GET handler (Reads analytics for the admin dashboard)
export async function GET() {
  try {
    const data = await readAnalyticsData();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error reading analytics:', error);
    // Return empty dataset instead of crashing, keeping the page robust
    return NextResponse.json({});
  }
}

// POST handler (Tracks a visit and triggers Discord notifications on new sessions)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { isNewVisitor } = body;
    
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    
    const analytics = await readAnalyticsData();
    
    if (!analytics[today]) {
      analytics[today] = { newVisitors: 0, totalVisits: 0 };
    }

    analytics[today].totalVisits += 1;
    if (isNewVisitor) {
      analytics[today].newVisitors += 1;
    }

    // Save counts back to active storage (safely catches and redirects disk errors)
    await writeAnalyticsData(analytics);

    // Sum all-time unique visitor counts (sum of all newVisitors across all recorded days)
    const allTimeUniqueCount = Object.values(analytics).reduce(
      (sum, day) => sum + (day.newVisitors || 0),
      0
    );

    // Send Discord alert only for actual new unique visitors
    if (isNewVisitor) {
      // Don't await the webhook call to respond faster to the browser
      sendDiscordNotification(analytics[today], allTimeUniqueCount, req).catch((err) =>
        console.error('Discord notification promise rejected:', err)
      );
    }

    return NextResponse.json({ success: true, data: analytics[today] });
  } catch (error) {
    console.error('Error updating analytics:', error);
    // Always return success to client browser to keep performance flawless even if DB is down
    return NextResponse.json({ success: false, error: 'Storage failed, tracking bypassed' });
  }
}
