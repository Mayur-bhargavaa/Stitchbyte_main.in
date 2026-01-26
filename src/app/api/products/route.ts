import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

// GET all products or single product by slug
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const slug = searchParams.get('slug');

        const { db } = await connectToDatabase();
        const collection = db.collection("prebuilt_products");

        if (slug) {
            // Get single product
            const product = await collection.findOne({ id: slug, isActive: true });
            if (!product) {
                return NextResponse.json(
                    { error: "Product not found" },
                    { status: 404 }
                );
            }
            return NextResponse.json({ product });
        } else {
            // Get all active products
            const products = await collection
                .find({ isActive: true })
                .sort({ order: 1 })
                .toArray();
            return NextResponse.json({ products });
        }

    } catch (error) {
        console.error("Error fetching products:", error);
        return NextResponse.json(
            { error: "Failed to fetch products" },
            { status: 500 }
        );
    }
}

// POST - Create new product (admin only)
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { db } = await connectToDatabase();
        const collection = db.collection("prebuilt_products");

        // Check if product with same id exists
        const existing = await collection.findOne({ id: body.id });
        if (existing) {
            return NextResponse.json(
                { error: "Product with this ID already exists" },
                { status: 400 }
            );
        }

        const product = {
            ...body,
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        const result = await collection.insertOne(product);

        return NextResponse.json({
            success: true,
            message: "Product created successfully",
            productId: result.insertedId
        });

    } catch (error) {
        console.error("Error creating product:", error);
        return NextResponse.json(
            { error: "Failed to create product" },
            { status: 500 }
        );
    }
}

// PUT - Update product
export async function PUT(request: NextRequest) {
    try {
        const body = await request.json();
        const { id, ...updateData } = body;

        if (!id) {
            return NextResponse.json(
                { error: "Product ID is required" },
                { status: 400 }
            );
        }

        const { db } = await connectToDatabase();
        const collection = db.collection("prebuilt_products");

        const result = await collection.updateOne(
            { id },
            { $set: { ...updateData, updatedAt: new Date() } }
        );

        if (result.matchedCount === 0) {
            return NextResponse.json(
                { error: "Product not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: "Product updated successfully"
        });

    } catch (error) {
        console.error("Error updating product:", error);
        return NextResponse.json(
            { error: "Failed to update product" },
            { status: 500 }
        );
    }
}
