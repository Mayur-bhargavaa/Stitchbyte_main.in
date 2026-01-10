import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Clean existing data
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.menuItem.deleteMany();
  await prisma.category.deleteMany();
  await prisma.table.deleteMany();
  await prisma.coupon.deleteMany();
  await prisma.restaurant.deleteMany();
  await prisma.user.deleteMany();

  // Create Admin
  const adminHash = await bcrypt.hash("admin123", 10);
  const admin = await prisma.user.create({
    data: {
      email: "admin@example.com",
      name: "Platform Admin",
      passwordHash: adminHash,
      role: "ADMIN",
    },
  });
  console.log("✅ Admin:", admin.email);

  // Create Merchant
  const merchantHash = await bcrypt.hash("merchant123", 10);
  const merchant = await prisma.user.create({
    data: {
      email: "merchant@example.com",
      name: "Demo Restaurant Owner",
      phone: "+919876543210",
      passwordHash: merchantHash,
      role: "MERCHANT",
    },
  });
  console.log("✅ Merchant:", merchant.email);

  // Create Restaurant
  const restaurant = await prisma.restaurant.create({
    data: {
      name: "Spice Garden",
      slug: "spice-garden",
      phone: "+911234567890",
      address: "123 Food Street, Mumbai",
      ownerId: merchant.id,
      plan: "PREMIUM",
    },
  });
  console.log("✅ Restaurant:", restaurant.name);

  // Create Categories
  const starters = await prisma.category.create({
    data: { restaurantId: restaurant.id, name: "Starters", position: 1 },
  });
  const mains = await prisma.category.create({
    data: { restaurantId: restaurant.id, name: "Main Course", position: 2 },
  });
  const breads = await prisma.category.create({
    data: { restaurantId: restaurant.id, name: "Breads", position: 3 },
  });
  const drinks = await prisma.category.create({
    data: { restaurantId: restaurant.id, name: "Beverages", position: 4 },
  });
  const desserts = await prisma.category.create({
    data: { restaurantId: restaurant.id, name: "Desserts", position: 5 },
  });
  console.log("✅ Categories created");

  // Create Menu Items
  const menuItems = [
    // Starters
    { name: "Paneer Tikka", price: 249, veg: true, categoryId: starters.id, popular: true, description: "Marinated cottage cheese grilled in tandoor" },
    { name: "Chicken Tikka", price: 299, veg: false, categoryId: starters.id, popular: true, description: "Tender chicken pieces in aromatic spices" },
    { name: "Veg Spring Rolls", price: 179, veg: true, categoryId: starters.id, description: "Crispy rolls filled with mixed vegetables" },
    { name: "Fish Amritsari", price: 349, veg: false, categoryId: starters.id, recommended: true, description: "Crispy battered fish with special spices" },
    { name: "Hara Bhara Kebab", price: 199, veg: true, categoryId: starters.id, description: "Spinach and green pea patties" },
    
    // Mains
    { name: "Butter Chicken", price: 349, veg: false, categoryId: mains.id, popular: true, recommended: true, description: "Creamy tomato based curry with tender chicken" },
    { name: "Paneer Butter Masala", price: 299, veg: true, categoryId: mains.id, popular: true, description: "Cottage cheese in rich tomato gravy" },
    { name: "Dal Makhani", price: 249, veg: true, categoryId: mains.id, recommended: true, description: "Slow cooked black lentils in creamy gravy" },
    { name: "Chicken Biryani", price: 349, veg: false, categoryId: mains.id, popular: true, description: "Fragrant basmati rice with spiced chicken" },
    { name: "Veg Biryani", price: 279, veg: true, categoryId: mains.id, description: "Aromatic rice with mixed vegetables" },
    { name: "Mutton Rogan Josh", price: 449, veg: false, categoryId: mains.id, description: "Kashmiri style lamb curry" },
    { name: "Palak Paneer", price: 269, veg: true, categoryId: mains.id, description: "Cottage cheese in spinach gravy" },
    
    // Breads
    { name: "Butter Naan", price: 49, veg: true, categoryId: breads.id, description: "Soft bread topped with butter" },
    { name: "Garlic Naan", price: 59, veg: true, categoryId: breads.id, popular: true, description: "Naan with garlic and herbs" },
    { name: "Laccha Paratha", price: 49, veg: true, categoryId: breads.id, description: "Layered whole wheat bread" },
    { name: "Tandoori Roti", price: 35, veg: true, categoryId: breads.id, description: "Whole wheat bread from tandoor" },
    
    // Beverages
    { name: "Masala Chaas", price: 79, veg: true, categoryId: drinks.id, description: "Spiced buttermilk" },
    { name: "Fresh Lime Soda", price: 69, veg: true, categoryId: drinks.id, description: "Sweet or salted lime soda" },
    { name: "Mango Lassi", price: 99, veg: true, categoryId: drinks.id, popular: true, description: "Creamy mango yogurt drink" },
    { name: "Masala Chai", price: 49, veg: true, categoryId: drinks.id, description: "Traditional spiced tea" },
    
    // Desserts
    { name: "Gulab Jamun", price: 99, veg: true, categoryId: desserts.id, popular: true, description: "Deep fried milk dumplings in sugar syrup" },
    { name: "Rasmalai", price: 129, veg: true, categoryId: desserts.id, recommended: true, description: "Soft cottage cheese in saffron milk" },
    { name: "Kulfi", price: 89, veg: true, categoryId: desserts.id, description: "Traditional Indian ice cream" },
  ];

  for (const item of menuItems) {
    await prisma.menuItem.create({
      data: {
        restaurantId: restaurant.id,
        categoryId: item.categoryId,
        name: item.name,
        price: item.price,
        veg: item.veg,
        description: item.description,
        popular: item.popular || false,
        recommended: item.recommended || false,
        available: true,
      },
    });
  }
  console.log("✅ Menu items created:", menuItems.length);

  // Create Tables
  for (let i = 1; i <= 10; i++) {
    await prisma.table.create({
      data: {
        restaurantId: restaurant.id,
        number: i,
        token: `spice-garden-${i}-${Math.random().toString(36).slice(2, 10)}`,
      },
    });
  }
  console.log("✅ Tables created: 10");

  // Create Coupon
  await prisma.coupon.create({
    data: {
      restaurantId: restaurant.id,
      code: "WELCOME20",
      discountType: "PERCENT",
      value: 20,
      maxDiscount: 100,
      minOrder: 300,
      active: true,
    },
  });
  console.log("✅ Coupon created: WELCOME20");

  console.log("\n🎉 Seed complete!\n");
  console.log("Login credentials:");
  console.log("  Admin: admin@example.com / admin123");
  console.log("  Merchant: merchant@example.com / merchant123");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
