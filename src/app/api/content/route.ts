import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const contentFilePath = path.join(process.cwd(), 'src', 'data', 'content.json');

export async function GET() {
  try {
    const data = await fs.readFile(contentFilePath, 'utf8');
    return NextResponse.json(JSON.parse(data));
  } catch (error) {
    console.error('Error reading content:', error);
    return NextResponse.json({ error: 'Failed to read content' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Read current data
    const fileData = await fs.readFile(contentFilePath, 'utf8');
    const currentContent = JSON.parse(fileData);

    let updatedContent = { ...currentContent };

    if (body.type === 'review') {
      const newReview = {
        id: Date.now().toString(),
        name: body.data.name,
        service: body.data.service,
        text: body.data.text,
        rating: Number(body.data.rating) || 5
      };
      updatedContent.reviews.push(newReview);
    } else if (body.type === 'gallery') {
      const newGalleryItem = {
        id: Date.now().toString(),
        src: body.data.src,
        alt: body.data.alt
      };
      updatedContent.gallery.push(newGalleryItem);
    } else {
      return NextResponse.json({ error: 'Invalid update type' }, { status: 400 });
    }

    // Write back to file
    await fs.writeFile(contentFilePath, JSON.stringify(updatedContent, null, 2), 'utf8');

    return NextResponse.json({ success: true, data: updatedContent });
  } catch (error) {
    console.error('Error writing content:', error);
    return NextResponse.json({ error: 'Failed to save content' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const type = searchParams.get('type');

    if (!id || !type) {
      return NextResponse.json({ error: 'Missing id or type' }, { status: 400 });
    }

    const fileData = await fs.readFile(contentFilePath, 'utf8');
    const currentContent = JSON.parse(fileData);
    let updatedContent = { ...currentContent };

    if (type === 'review') {
      updatedContent.reviews = currentContent.reviews.filter((r: any) => r.id !== id);
    } else if (type === 'gallery') {
      updatedContent.gallery = currentContent.gallery.filter((g: any) => g.id !== id);
    } else {
      return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
    }

    await fs.writeFile(contentFilePath, JSON.stringify(updatedContent, null, 2), 'utf8');

    return NextResponse.json({ success: true, data: updatedContent });
  } catch (error) {
    console.error('Error deleting content:', error);
    return NextResponse.json({ error: 'Failed to delete content' }, { status: 500 });
  }
}
