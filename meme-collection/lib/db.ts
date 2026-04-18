import mongoose from 'mongoose';

type MongooseCache = {
  conn: mongoose.Mongoose | null;
  promise: Promise<mongoose.Mongoose> | null;
};

declare global {
  var mongoose: MongooseCache | undefined;
}

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error('MONGODB_URI не задан в .env.local');
}

const cached: MongooseCache = global.mongoose ?? (global.mongoose = { conn: null, promise: null });

async function dbConnect() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
