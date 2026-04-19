import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Media from '@/models/Media';

export async function GET() {
  await dbConnect();

  // создаём тестовый документ
  const doc = await Media.create({
    title: 'Test Media',
    tags: ['test', 'galychane'],
    type: 'image',
    url: 'https://example.com/test.jpg',
  });

  // читаем обратно
  const found = await Media.findById(doc._id);

  return NextResponse.json({ created: doc, found });
}