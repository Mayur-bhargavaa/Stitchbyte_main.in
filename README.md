# QR-Based Restaurant Ordering Platform

A modern, full-stack QR-driven restaurant ordering system built with Next.js, Prisma, and MongoDB.

## Features

### Three User Roles

- **Admin**: Platform-wide analytics, restaurant management, revenue insights
- **Merchant**: QR code generation, menu management, live order feed, stock control
- **Customer**: Scan QR → browse menu → add to cart → checkout → pay

### Core Functionality

- ✅ Table-specific QR code generation with PDF download
- ✅ Beautiful mobile-first menu with categories & dietary indicators
- ✅ Real-time order management with status updates
- ✅ Customer data capture (phone, email) with marketing consent
- ✅ Online payment & Pay at Counter options
- ✅ Coupon/discount support
- ✅ Role-based access control

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Database**: MongoDB (via Prisma ORM)
- **Auth**: NextAuth v5
- **UI**: Tailwind CSS + Lucide Icons
- **QR/PDF**: qrcode + pdfkit

## Getting Started

### Installation

```bash
cd qr-restaurant
npm install
```

### Database Setup

```bash
# Push schema to MongoDB
npx prisma db push

# Seed demo data
npm run seed
```

### Run Development Server

```bash
npm run dev
```

Open http://localhost:3000

## Demo Credentials

| Role     | Email                  | Password    |
|----------|------------------------|-------------|
| Admin    | admin@example.com      | admin123    |
| Merchant | merchant@example.com   | merchant123 |

## Key Routes

| Route                           | Description              |
|---------------------------------|--------------------------|
| `/`                             | Landing page             |
| `/signin`                       | Sign in page             |
| `/admin`                        | Admin dashboard          |
| `/merchant`                     | Merchant dashboard       |
| `/menu/[slug]/[token]`          | Customer menu (QR scan)  |

## Scripts

```bash
npm run dev        # Development server
npm run build      # Production build
npm run seed       # Seed database
npm run db:push    # Push schema to MongoDB
npm run db:studio  # Open Prisma Studio
```
# Qr-resturant
