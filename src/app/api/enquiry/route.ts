import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, phone, email, brand, message, productId, productName } = body;

        // Validate required fields
        if (!name || !phone) {
            return NextResponse.json(
                { error: "Name and phone number are required" },
                { status: 400 }
            );
        }

        // Connect to MongoDB
        const { db } = await connectToDatabase();
        const collection = db.collection("product_enquiries");

        // Create enquiry document
        const enquiry = {
            name,
            phone,
            email: email || null,
            brand: brand || null,
            message: message || null,
            productId: productId || null,
            productName: productName || null,
            status: "new",
            createdAt: new Date(),
            updatedAt: new Date()
        };

        // Insert into database
        const result = await collection.insertOne(enquiry);

        return NextResponse.json({
            success: true,
            message: "Enquiry submitted successfully",
            enquiryId: result.insertedId
        });

    } catch (error) {
        console.error("Error saving enquiry:", error);
        return NextResponse.json(
            { error: "Failed to submit enquiry. Please try again." },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        const { db } = await connectToDatabase();
        const collection = db.collection("product_enquiries");

        const enquiries = await collection
            .find({})
            .sort({ createdAt: -1 })
            .limit(100)
            .toArray();

        return NextResponse.json({ enquiries });

    } catch (error) {
        console.error("Error fetching enquiries:", error);
        return NextResponse.json(
            { error: "Failed to fetch enquiries" },
            { status: 500 }
        );
    }
}
