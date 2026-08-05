export const dynamic = "force-dynamic";

import { auth, signOut } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import ProfileClient from "./profile-client";

export default async function ProfilePage() {
  const session = await auth();
  
  if (!session?.user?.id) {
    redirect("/restaurant/signin");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      role: true,
      createdAt: true,
    },
  });

  if (!user) {
    redirect("/restaurant/signin");
  }

  // Get restaurant if merchant
  let restaurant = null;
  if (user.role === "MERCHANT") {
    restaurant = await prisma.restaurant.findFirst({
      where: { ownerId: user.id },
      select: {
        id: true,
        name: true,
        slug: true,
        logo: true,
        address: true,
        phone: true,
        plan: true,
        _count: {
          select: {
            tables: true,
            items: true,
            orders: true,
          },
        },
      },
    });
  }

  return (
    <ProfileClient 
      user={JSON.parse(JSON.stringify(user))} 
      restaurant={restaurant ? JSON.parse(JSON.stringify(restaurant)) : null}
    />
  );
}
