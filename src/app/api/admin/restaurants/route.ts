import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user is admin
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    if (user?.role !== "ADMIN") {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 });
    }

    const { 
      name, 
      slug, 
      phone, 
      address, 
      plan,
      ownerName,
      ownerEmail,
      ownerPhone,
      ownerPassword,
    } = await req.json();

    // Validate required fields
    if (!name || !slug || !ownerName || !ownerEmail || !ownerPassword) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if slug already exists
    const existingSlug = await prisma.restaurant.findUnique({
      where: { slug },
    });

    if (existingSlug) {
      return NextResponse.json(
        { error: "Restaurant URL already exists" },
        { status: 400 }
      );
    }

    // Check if owner email already exists
    const existingEmail = await prisma.user.findUnique({
      where: { email: ownerEmail },
    });

    if (existingEmail) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 400 }
      );
    }

    // Hash password
    const passwordHash = await bcrypt.hash(ownerPassword, 10);

    // Create owner and restaurant in transaction
    const result = await prisma.$transaction(async (tx) => {
      // Create owner
      const owner = await tx.user.create({
        data: {
          email: ownerEmail,
          name: ownerName,
          phone: ownerPhone || null,
          passwordHash,
          role: "MERCHANT",
        },
      });

      // Create restaurant
      const restaurant = await tx.restaurant.create({
        data: {
          name,
          slug,
          phone: phone || null,
          address: address || null,
          plan: plan || "FREE",
          ownerId: owner.id,
        },
      });

      return { owner, restaurant };
    });

    return NextResponse.json({
      success: true,
      restaurant: result.restaurant,
      owner: {
        id: result.owner.id,
        email: result.owner.email,
        name: result.owner.name,
      },
    });
  } catch (error) {
    console.error("Create restaurant error:", error);
    return NextResponse.json(
      { error: "Failed to create restaurant" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    if (user?.role !== "ADMIN") {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 });
    }

    const restaurants = await prisma.restaurant.findMany({
      include: {
        owner: {
          select: { id: true, name: true, email: true },
        },
        _count: {
          select: { tables: true, items: true, orders: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(restaurants);
  } catch (error) {
    console.error("Fetch restaurants error:", error);
    return NextResponse.json(
      { error: "Failed to fetch restaurants" },
      { status: 500 }
    );
  }
}
