import { MongoClient, Db } from 'mongodb';

const MONGODB_URI = process.env.BLOG_DATABASE_URL || process.env.MONGODB_URI || process.env.DATABASE_URL;
const DB_NAME = process.env.MONGODB_DB_NAME || "stitchbyte_chatbot";

if (!MONGODB_URI) {
    throw new Error('Please define the DATABASE_URL or MONGODB_URI environment variable inside .env');
}

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function connectToDatabase() {
    if (cachedClient && cachedDb) {
        return { client: cachedClient, db: cachedDb };
    }

    const client = new MongoClient(MONGODB_URI!);
    await client.connect();
    const db = client.db(DB_NAME);

    cachedClient = client;
    cachedDb = db;

    return { client, db };
}

export interface UnansweredQuestion {
    question: string;
    timestamp: Date;
    userInfo?: {
        name?: string;
        email?: string;
        phone?: string;
    };
}

export async function saveUnansweredQuestion(data: UnansweredQuestion) {
    const { db } = await connectToDatabase();
    const collection = db.collection('unanswered_questions');
    return await collection.insertOne(data);
}

export interface ChatLog {
    question: string;
    answer: string;
    confidence: number;
    timestamp: Date;
    userInfo?: {
        name?: string;
        email?: string;
        phone?: string;
    };
}

export async function saveChatLog(data: ChatLog) {
    const { db } = await connectToDatabase();
    const collection = db.collection('chat_logs');
    return await collection.insertOne(data);
}
