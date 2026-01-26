import mongoose from 'mongoose';

const MONGODB_URI = "mongodb+srv://DBmayur:Mayur%402608@cluster0.ytcpzbb.mongodb.net/stitchbyte_chatbot";

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

        cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
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
