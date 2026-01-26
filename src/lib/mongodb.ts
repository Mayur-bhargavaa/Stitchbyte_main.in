import { MongoClient, Db } from 'mongodb';

const MONGODB_URI = "mongodb+srv://DBmayur:Mayur%402608@cluster0.ytcpzbb.mongodb.net/";
const DB_NAME = "stitchbyte_chatbot";

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function connectToDatabase() {
    if (cachedClient && cachedDb) {
        return { client: cachedClient, db: cachedDb };
    }

    const client = new MongoClient(MONGODB_URI);
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
