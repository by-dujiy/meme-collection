import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Media from '@/models/Media';

export async function GET(req: NextRequest) {
  await dbConnect();

  const q = req.nextUrl.searchParams.get('q');
  const filter = q ? { $or: [{ title: { $regex: q, $options: 'i' } }, { tags: { $regex: q, $options: 'i' } }] } : {};

  const items = await Media.find(filter).sort({ createdAt: -1 }).limit(50);
  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  await dbConnect();

  const body = await req.json();
  const { title, tags, type, url, cloudinaryId } = body;

  if (!type || !url) {
    return NextResponse.json({ error: 'type and url are required' }, { status: 400 });
  }

  const item = await Media.create({ title, tags, type, url, cloudinaryId });
  return NextResponse.json(item, { status: 201 });
}
