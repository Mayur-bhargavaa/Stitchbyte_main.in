import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { restaurantId, name, price, categoryId, veg } = body;

    if (!restaurantId || !name || price === undefined) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const item = await prisma.menuItem.create({
      data: {
        restaurantId,
        name,
        price: parseFloat(price),
        categoryId: categoryId || null,
        veg: veg ?? true,
        available: true,
      },
    });

    return NextResponse.json(item);
  } catch (error) {
    console.error("Failed to create menu item:", error);
    return NextResponse.json(
      { error: "Failed to create item" },
      { status: 500 }
    );
  }
}
