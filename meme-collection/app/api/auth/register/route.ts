import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';

export async function POST(req: NextRequest) {
  await dbConnect();

  const { name, email, password } = await req.json();

  if (!name || !email || !password) {
    return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
  }

  const exists = await User.findOne({ email });
  if (exists) {
    return NextResponse.json({ error: 'Email is already taken' }, { status: 409 });
  }

  // TODO: hash the password with bcrypt before saving
  const user = await User.create({ name, email, password });

  return NextResponse.json({ id: user._id, name: user.name, email: user.email }, { status: 201 });
}
