export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import MenuClient from "./menu-client";

type Props = {
  params: Promise<{ slug: string; token: string }>;
};

export default async function TableMenuPage({ params }: Props) {
  const { slug, token } = await params;

  const restaurant = await prisma.restaurant.findUnique({
    where: { slug, active: true },
  });

  if (!restaurant) return notFound();

  const table = await prisma.table.findFirst({
    where: { restaurantId: restaurant.id, token, active: true },
  });

  if (!table) return notFound();

  const categories = await prisma.category.findMany({
    where: { restaurantId: restaurant.id, active: true },
    orderBy: { position: "asc" },
  });

  const items = await prisma.menuItem.findMany({
    where: { restaurantId: restaurant.id, available: true },
    orderBy: { name: "asc" },
  });

  return (
    <MenuClient
      restaurant={JSON.parse(JSON.stringify(restaurant))}
      table={JSON.parse(JSON.stringify(table))}
      categories={JSON.parse(JSON.stringify(categories))}
      items={JSON.parse(JSON.stringify(items))}
    />
  );
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const restaurant = await prisma.restaurant.findUnique({ where: { slug } });
  
  return {
    title: restaurant ? `${restaurant.name} - Menu` : "Menu",
    description: restaurant ? `Order from ${restaurant.name}` : "Restaurant Menu",
  };
}
