# StitchByte Platform

Welcome to the StitchByte monorepo! This repository contains the complete frontend, backend, and admin panel architecture for the StitchByte platform.

## 🏗️ Architecture Overview

The StitchByte platform is built using a modern, robust, and highly scalable JavaScript/TypeScript stack. It utilizes a **monolithic architecture with a separated Admin application setup**, running entirely on the **Next.js App Router paradigm**.

### Tech Stack
- **Framework:** Next.js 15+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + PostCSS + Framer Motion (for animations)
- **UI Components:** Lucide React (Icons), Radix UI (Primitives)
- **Database ORM:** Prisma Client
- **Databases:** MongoDB (Dual-Database Configuration)
  - `qr_restaurant`: Main application database (Users, Products, Orders, etc.)
  - `stitchbyte_chatbot`: Peripheral/Admin database used for specialized components like the **Blog**, **Careers**, and Admin configurations.
- **Authentication:** NextAuth.js
- **Media Storage:** Cloudinary (for image uploads and storage)
- **Forms & Validation:** React Hook Form + Zod
- **Email:** Nodemailer / SMTP for OTPs and communications

## 📁 Repository Structure

\`\`\`text
stitchbyte/
├── Admin_pannel/        # Dedicated Admin Panel application (Sub-project)
├── prisma/              # Prisma configurations, schemas, and seeders
│   ├── schema.prisma    # Primary Database Schema (Main App)
│   └── seed*.ts         # Database seed scripts
├── public/              # Static assets (images, fonts, vector icons)
├── src/
│   ├── app/             # Next.js App Router (Frontend Pages & API Routes)
│   │   ├── api/         # Backend REST API Endpoints
│   │   ├── blog/        # Blog feature pages (Connected to stitchbyte_chatbot DB)
│   │   ├── careers/     # Careers/Jobs feature pages
│   │   ├── ...          # Other frontend routes (e.g., customized, prebuilt)
│   ├── components/      # Reusable React UI Components (Navbar, Footer, etc.)
│   ├── lib/             # Utility functions and central configurations
│   │   └── prisma.ts    # Dual Prisma Client Initialization (prisma, blogPrisma)
│   └── models/          # Data Models (if any legacy Mongoose models exist)
├── .env                 # Environment variables (MUST BE KEPT SECRET)
├── package.json         # Project dependencies and bash scripts
└── tailwind.config.ts   # Tailwind CSS configuration
\`\`\`

## 💾 Database Strategy (Dual Prisma Clients)

This application uniquely combines data from two distinct MongoDB clusters/databases to safely separate concerns:

1. **Main Prisma Client (`prisma`)**:
   - Queries `DATABASE_URL` (usually pointing to `qr_restaurant`)
   - Handles standard App logic.
2. **Blog/Peripheral Prisma Client (`blogPrisma`)**:
   - Queries `BLOG_DATABASE_URL` (points to `stitchbyte_chatbot`)
   - The Admin panel actively writes to this database (using Mongoose).
   - The Frontend safely reads it using a mapped Prisma schema mapping specific fields (`coverImage`, `pdfUrl`, `status: "published"`).

## 🚀 Getting Started Locally

### 1. Prerequisites
Ensure you have the following installed:
- Node.js (v18 or higher)
- npm (Node Package Manager)
- A running MongoDB cluster (or local instance)

### 2. Environment Variables
Create a \`.env\` file in the root directory and ensure the following keys are set:

\`\`\`env
# Databases
DATABASE_URL="mongodb+srv://<USER>:<PASS>@<CLUSTER>/qr_restaurant"
BLOG_DATABASE_URL="mongodb+srv://<USER>:<PASS>@<CLUSTER>/stitchbyte_chatbot"

# Authentication
NEXTAUTH_SECRET="your_secret_key"
NEXTAUTH_URL="http://localhost:3000"

# Cloudinary
CLOUDINARY_CLOUD_NAME="your_name"
CLOUDINARY_API_KEY="your_key"
CLOUDINARY_API_SECRET="your_secret"

# SMTP Configuration
SMTP_HOST="smtp.example.com"
SMTP_PORT=587
SMTP_USER="info@stitchbyte.in"
SMTP_PASS="your_password"
\`\`\`

### 3. Installation & Setup

1. **Install dependencies:**
   \`\`\`bash
   npm install
   \`\`\`

2. **Generate the Prisma Client:**
   \`\`\`bash
   npx prisma generate
   \`\`\`
   *(Note: Whenever you change `schema.prisma`, you must run this command).*

3. **Start the Development Server:**
   \`\`\`bash
   npm run dev
   \`\`\`
   The frontend will be available at [http://localhost:3000](http://localhost:3000).

---

## 🛡️ Security & Best Practices

- **Never commit `.env` files.** They are ignored in the `.gitignore` by default.
- Always use the abstracted `@/components/Navbar` and `@/components/Footer` for consistent structural UI.
- Use the `blogPrisma` client **only** for routes querying data from the Admin database.

## 📜 Scripts Available
- \`npm run dev\`: Starts the Next.js dev server.
- \`npm run build\`: Builds the production-ready application.
- \`npm run start\`: Starts the built production server.
- \`npm run lint\`: Run ESLint to catch errors and enforce clean code.
- \`npx prisma studio\`: Opens a local GUI to easily view and edit database rows.
