import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create unique filename
    const uniqueName = `${Date.now()}-${file.name.replace(/\s+/g, '_')}`;
    const publicDir = path.join(process.cwd(), 'public');
    const filePath = path.join(publicDir, uniqueName);

    // Ensure public dir exists (it always should in nextjs, but just in case)
    try {
      await fs.access(publicDir);
    } catch {
      await fs.mkdir(publicDir, { recursive: true });
    }

    // Write file to public directory
    await fs.writeFile(filePath, buffer);

    return NextResponse.json({ 
      success: true, 
      filePath: `/${uniqueName}` 
    });

  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
  }
}
