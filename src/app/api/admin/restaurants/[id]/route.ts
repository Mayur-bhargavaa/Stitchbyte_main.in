import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { nanoid } from "nanoid";

// GET - Get single restaurant with details
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const restaurant = await prisma.restaurant.findUnique({
      where: { id },
      include: {
        owner: {
          select: { id: true, name: true, email: true, phone: true },
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
    console.error("Error fetching restaurant:", error);
    return NextResponse.json({ error: "Failed to fetch restaurant" }, { status: 500 });
  }
}

// PUT - Update restaurant
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { name, phone, address, plan, active, tableCount, owner } = body;

    // Check if restaurant exists
    const existing = await prisma.restaurant.findUnique({
      where: { id },
      include: { tables: true },
    });

    if (!existing) {
      return NextResponse.json({ error: "Restaurant not found" }, { status: 404 });
    }

    // Generate new slug if name changed
    let slug = existing.slug;
    if (name && name !== existing.name) {
      slug = name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

      // Check if slug already exists
      const slugExists = await prisma.restaurant.findFirst({
        where: { slug, id: { not: id } },
      });

      if (slugExists) {
        slug = `${slug}-${Date.now()}`;
      }
    }

    // Start transaction for atomic updates
    const result = await prisma.$transaction(async (tx) => {
      // Update restaurant
      const updatedRestaurant = await tx.restaurant.update({
        where: { id },
        data: {
          name: name || existing.name,
          slug,
          phone: phone || null,
          address: address || null,
          plan: plan || "BASIC",
          active: active !== undefined ? active : true,
        },
      });

      // Update owner info
      if (owner) {
        await tx.user.update({
          where: { id: existing.ownerId },
          data: {
            name: owner.name || null,
            phone: owner.phone || null,
            // Note: Email update requires additional validation
          },
        });
      }

      // Handle table count changes
      const currentTableCount = existing.tables.length;
      if (tableCount !== undefined && tableCount > currentTableCount) {
        // Add new tables
        const newTables = [];
        for (let i = currentTableCount + 1; i <= tableCount; i++) {
          newTables.push({
            number: i,
            token: nanoid(10),
            restaurantId: id,
            active: true,
          });
        }
        if (newTables.length > 0) {
          await tx.table.createMany({ data: newTables });
        }
      }

      return updatedRestaurant;
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error updating restaurant:", error);
    return NextResponse.json({ error: "Failed to update restaurant" }, { status: 500 });
  }
}

// DELETE - Delete restaurant
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Check if restaurant exists
    const restaurant = await prisma.restaurant.findUnique({
      where: { id },
      include: {
        _count: { select: { orders: true } },
      },
    });

    if (!restaurant) {
      return NextResponse.json({ error: "Restaurant not found" }, { status: 404 });
    }

    // Delete in proper order due to foreign key constraints
    await prisma.$transaction(async (tx) => {
      // Delete order items first
      await tx.orderItem.deleteMany({
        where: { order: { restaurantId: id } },
      });

      // Delete orders
      await tx.order.deleteMany({ where: { restaurantId: id } });

      // Delete menu items
      await tx.item.deleteMany({ where: { restaurantId: id } });

      // Delete categories
      await tx.category.deleteMany({ where: { restaurantId: id } });

      // Delete tables
      await tx.table.deleteMany({ where: { restaurantId: id } });

      // Delete the restaurant
      await tx.restaurant.delete({ where: { id } });

      // Note: We don't delete the owner user - they may own other restaurants
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting restaurant:", error);
    return NextResponse.json({ error: "Failed to delete restaurant" }, { status: 500 });
  }
}
