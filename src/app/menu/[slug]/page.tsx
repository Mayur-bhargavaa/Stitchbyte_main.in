import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function MenuRedirect({ params }: Props) {
  const { slug } = await params;

  const restaurant = await prisma.restaurant.findUnique({
    where: { slug },
    include: {
      tables: {
        where: { active: true },
        orderBy: { number: "asc" },
        take: 1,
      },
    },
  });

  if (!restaurant || restaurant.tables.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Restaurant Not Found</h1>
          <p className="text-black">Please scan a valid QR code.</p>
        </div>
      </div>
    );
  }

  // Redirect to first table's menu
  redirect(`/menu/${slug}/${restaurant.tables[0].token}`);
}
