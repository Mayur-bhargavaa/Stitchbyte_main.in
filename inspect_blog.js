const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://DBmayur:Mayur%402608@cluster0.ytcpzbb.mongodb.net/stitchbyte_chatbot?retryWrites=true&w=majority";

async function inspectBlog() {
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = client.db();

        const blog = await db.collection("blogs").findOne({});
        console.log("Single blog document:");
        console.dir(blog, { depth: null });

    } finally {
        await client.close();
    }
}

inspectBlog();
