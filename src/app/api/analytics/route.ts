import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const analyticsFilePath = path.join(process.cwd(), 'src', 'data', 'analytics.json');

// Ensure the file exists
async function ensureFile() {
  try {
    await fs.access(analyticsFilePath);
  } catch {
    await fs.writeFile(analyticsFilePath, JSON.stringify({}), 'utf8');
  }
}

export async function GET() {
  try {
    await ensureFile();
    const data = await fs.readFile(analyticsFilePath, 'utf8');
    return NextResponse.json(JSON.parse(data));
  } catch (error) {
    console.error('Error reading analytics:', error);
    return NextResponse.json({ error: 'Failed to read analytics' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await ensureFile();
    const body = await req.json();
    const { isNewVisitor } = body;
    
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    
    const fileData = await fs.readFile(analyticsFilePath, 'utf8');
    let analytics: Record<string, { newVisitors: number, totalVisits: number }> = {};
    
    if (fileData.trim()) {
      analytics = JSON.parse(fileData);
    }

    if (!analytics[today]) {
      analytics[today] = { newVisitors: 0, totalVisits: 0 };
    }

    analytics[today].totalVisits += 1;
    if (isNewVisitor) {
      analytics[today].newVisitors += 1;
    }

    await fs.writeFile(analyticsFilePath, JSON.stringify(analytics, null, 2), 'utf8');

    return NextResponse.json({ success: true, data: analytics[today] });
  } catch (error) {
    console.error('Error updating analytics:', error);
    return NextResponse.json({ error: 'Failed to update analytics' }, { status: 500 });
  }
}
