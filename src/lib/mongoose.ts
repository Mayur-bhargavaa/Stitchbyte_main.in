import mongoose from 'mongoose';

const MONGODB_URI = process.env.BLOG_DATABASE_URL || process.env.MONGODB_URI || process.env.DATABASE_URL;

if (!MONGODB_URI) {
    throw new Error('Please define the DATABASE_URL or MONGODB_URI environment variable inside .env');
}

let cached = (global as unknown as { mongoose: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null } }).mongoose;

if (!cached) {
    cached = (global as unknown as { mongoose: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null } }).mongoose = { conn: null, promise: null };
}

async function connectDB() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
        };

        cached.promise = mongoose.connect(MONGODB_URI!, opts).then((mongoose) => {
            return mongoose;
        });
    }

    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    }

    return cached.conn;
}

export default connectDB;
