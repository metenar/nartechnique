import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export const dynamic = 'force-dynamic';

// Primary local path and /tmp writable fallback path
const localAnalyticsPath = path.join(process.cwd(), 'src', 'data', 'analytics.json');
const tmpAnalyticsPath = '/tmp/analytics.json';

export interface DailyAnalytics {
  newVisitors: number;
  totalVisits: number;
  callClicks?: number;
  textClicks?: number;
}

// In-memory cache in case both Blobs and File Systems fail or are read-only
let memoryCache: Record<string, DailyAnalytics> = {};

// Helper to initialize and seed /tmp/analytics.json with repository data on Netlify
async function ensureTmpFileSeeded() {
  try {
    await fs.access(tmpAnalyticsPath);
  } catch {
    try {
      let staticData = '{}';
      try {
        staticData = await fs.readFile(localAnalyticsPath, 'utf8');
      } catch {
        // No static data in build, start fresh
      }
      await fs.mkdir(path.dirname(tmpAnalyticsPath), { recursive: true });
      await fs.writeFile(tmpAnalyticsPath, staticData, 'utf8');
    } catch (e) {
      console.error('Failed to seed /tmp/analytics.json:', e);
    }
  }
}

// Global cached resolved path to avoid repeating disk write tests
let resolvedLocalPath: string | null = null;

// Helper to find the best writable local path by doing an active write-test
async function getBestLocalPath(): Promise<string | null> {
  if (resolvedLocalPath) return resolvedLocalPath;

  // 1. Try writing a test file to check if the repository folder is writable
  try {
    const testDir = path.dirname(localAnalyticsPath);
    await fs.mkdir(testDir, { recursive: true });
    
    const testFilePath = path.join(testDir, '.write-test');
    await fs.writeFile(testFilePath, 'test', 'utf8');
    await fs.unlink(testFilePath);

    resolvedLocalPath = localAnalyticsPath;
    return localAnalyticsPath;
  } catch (err) {
    // 2. If it is a read-only filesystem (like Netlify production), use /tmp fallback
    try {
      await ensureTmpFileSeeded();
      resolvedLocalPath = tmpAnalyticsPath;
      return tmpAnalyticsPath;
    } catch {
      return null;
    }
  }
}

// Helper to retrieve Netlify Blob store if running on Netlify (records diagnostic logs)
async function getBlobStore(logs: any) {
  logs.env = {
    NETLIFY: process.env.NETLIFY || 'not-set',
    NETLIFY_LOCAL: process.env.NETLIFY_LOCAL || 'not-set',
    NETLIFY_SITE_ID: process.env.NETLIFY_SITE_ID || 'not-set',
  };

  try {
    const { getStore } = await import('@netlify/blobs');
    const store = getStore('site-analytics', { consistency: 'strong' });
    logs.storageUsed = 'Netlify Blobs';
    return store;
  } catch (err: any) {
    logs.blobsError = 'Initialization failed: ' + (err?.message || String(err));
    console.warn('Could not initialize Netlify Blobs store. Falling back to local FS.', err);
  }
  return null;
}

// Unified helper to read analytics data (handles Netlify Blobs & resilient local fallbacks)
async function readAnalyticsData(logs: any): Promise<Record<string, DailyAnalytics>> {
  const store = await getBlobStore(logs);
  if (store) {
    try {
      const data = await store.get('analytics-data', { type: 'json' });
      if (data) {
        return data as Record<string, DailyAnalytics>;
      }
    } catch (err: any) {
      logs.blobsError = (logs.blobsError || '') + ' | Read error: ' + (err?.message || String(err));
      console.error('Error reading from Netlify Blobs:', err);
    }
  }

  logs.storageUsed = 'Local FS Fallback';
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
      } catch (err: any) {
        logs.fsError = 'Read error: ' + (err?.message || String(err));
      }
    }
  } catch (err: any) {
    logs.fsError = (logs.fsError || '') + ' | Path error: ' + (err?.message || String(err));
    console.error('Error reading filesystem:', err);
  }

  return memoryCache;
}

// Unified helper to write analytics data (handles Netlify Blobs & resilient local fallbacks)
async function writeAnalyticsData(data: Record<string, DailyAnalytics>, logs: any) {
  memoryCache = { ...memoryCache, ...data }; // Sync cache

  const store = await getBlobStore(logs);
  if (store) {
    try {
      await store.setJSON('analytics-data', data);
      return;
    } catch (err: any) {
      logs.blobsError = (logs.blobsError || '') + ' | Write error: ' + (err?.message || String(err));
      console.error('Error writing to Netlify Blobs:', err);
    }
  }

  // Fallback to local files
  try {
    const filePath = await getBestLocalPath();
    if (filePath) {
      await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
    }
  } catch (err: any) {
    logs.fsError = (logs.fsError || '') + ' | Write error: ' + (err?.message || String(err));
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
  const logs: any = { storageUsed: 'unknown' };
  try {
    const data = await readAnalyticsData(logs);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error reading analytics:', error);
    return NextResponse.json({ error: 'Failed to read analytics', debug: logs }, { status: 500 });
  }
}

// POST handler (Tracks visits and button click events)
export async function POST(req: NextRequest) {
  const logs: any = { storageUsed: 'unknown' };
  try {
    const body = await req.json();
    const { isNewVisitor, eventType } = body;
    
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    
    const analytics = await readAnalyticsData(logs);
    
    if (!analytics[today]) {
      analytics[today] = { newVisitors: 0, totalVisits: 0, callClicks: 0, textClicks: 0 };
    }

    if (eventType === 'call') {
      analytics[today].callClicks = (analytics[today].callClicks || 0) + 1;
    } else if (eventType === 'text') {
      analytics[today].textClicks = (analytics[today].textClicks || 0) + 1;
    } else {
      analytics[today].totalVisits = (analytics[today].totalVisits || 0) + 1;
      if (isNewVisitor) {
        analytics[today].newVisitors = (analytics[today].newVisitors || 0) + 1;
      }
    }

    // Save counts back to active storage
    await writeAnalyticsData(analytics, logs);

    // Sum all-time unique visitor counts
    const allTimeUniqueCount = Object.values(analytics).reduce(
      (sum, day) => sum + (day.newVisitors || 0),
      0
    );

    // Send Discord alert only for actual new unique visitors
    if (isNewVisitor && !eventType) {
      // Don't await the webhook call to respond faster to the browser
      sendDiscordNotification(analytics[today], allTimeUniqueCount, req).catch((err) =>
        console.error('Discord notification promise rejected:', err)
      );
    }

    return NextResponse.json({ success: true, data: analytics[today], debug: logs });
  } catch (error: any) {
    console.error('Error updating analytics:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Storage failed, tracking bypassed', 
      debug: { ...logs, error: error?.message || String(error) } 
    });
  }
}
