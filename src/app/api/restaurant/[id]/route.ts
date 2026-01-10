import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const { name, address, phone } = await req.json();

    // Verify the user owns this restaurant or is admin
    const restaurant = await prisma.restaurant.findUnique({
      where: { id },
    });

    if (!restaurant) {
      return NextResponse.json({ error: "Restaurant not found" }, { status: 404 });
    }

    // Check if user is owner or admin
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    if (restaurant.ownerId !== session.user.id && user?.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // Generate new slug if name changed
    let slug = restaurant.slug;
    if (name && name !== restaurant.name) {
      slug = name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      
      // Check if slug already exists
      const existingSlug = await prisma.restaurant.findFirst({
        where: { 
          slug,
          id: { not: id }
        },
      });
      
      if (existingSlug) {
        slug = `${slug}-${Date.now()}`;
      }
    }

    const updated = await prisma.restaurant.update({
      where: { id },
      data: {
        name: name || restaurant.name,
        slug,
        address: address || null,
        phone: phone || null,
      },
    });

    return NextResponse.json({ success: true, restaurant: updated });
  } catch (error) {
    console.error("Restaurant update error:", error);
    return NextResponse.json(
      { error: "Failed to update restaurant" },
      { status: 500 }
    );
  }
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const restaurant = await prisma.restaurant.findUnique({
      where: { id },
      include: {
        owner: {
          select: { id: true, name: true, email: true },
        },
        _count: {
          select: { tables: true, items: true, orders: true },
        },
      },
    });

    if (!restaurant) {
      return NextResponse.json({ error: "Restaurant not found" }, { status: 404 });
    }

    return NextResponse.json(restaurant);
  } catch (error) {
    console.error("Restaurant fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch restaurant" },
      { status: 500 }
    );
  }
}
