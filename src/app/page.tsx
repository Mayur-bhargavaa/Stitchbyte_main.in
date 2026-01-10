import Link from "next/link";
import { QrCode, Utensils, Shield, Smartphone, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <QrCode className="w-8 h-8 text-black" />
            <span className="text-xl font-bold text-black">QR Restaurant</span>
          </div>
          <nav className="flex items-center gap-4">
            <Link
              href="/signin"
              className="text-sm text-black hover:text-gray-600 transition"
            >
              Sign In
            </Link>
            <Link
              href="/merchant"
              className="px-4 py-2 bg-black text-white text-sm rounded-full hover:bg-gray-800 transition"
            >
              Dashboard
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-black">
          QR-Based Restaurant
          <br />
          <span className="text-black">Ordering Platform</span>
        </h1>
        <p className="text-xl text-black max-w-2xl mx-auto mb-8">
          Generate table-specific QR codes, let customers browse your digital menu,
          place orders, and pay — all without an app.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/merchant"
            className="px-8 py-3 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition inline-flex items-center justify-center gap-2"
          >
            Get Started <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/menu/spice-garden"
            className="px-8 py-3 border-2 border-black rounded-full font-medium text-black hover:bg-gray-50 transition"
          >
            View Demo Menu
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-center mb-12 text-black">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
              <QrCode className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-black">1. Generate QR Codes</h3>
            <p className="text-black">
              Create unique QR codes for each table. Customers scan and instantly
              access your menu with table context.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
              <Smartphone className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-black">2. Mobile-First Menu</h3>
            <p className="text-black">
              Beautiful, fast-loading menu with categories, images, dietary info,
              and easy cart management.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
              <Utensils className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-black">3. Manage Orders</h3>
            <p className="text-black">
              Receive orders in real-time, update status, track payments, and
              analyze your revenue.
            </p>
          </div>
        </div>
      </section>

      {/* Roles */}
      <section className="bg-gray-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-12">Three Powerful Roles</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-800 rounded-xl p-6">
              <Shield className="w-8 h-8 text-red-400 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Admin</h3>
              <ul className="text-gray-400 space-y-2 text-sm">
                <li>• Platform-wide analytics</li>
                <li>• Restaurant management</li>
                <li>• Revenue insights</li>
                <li>• QR code oversight</li>
              </ul>
            </div>
            <div className="bg-gray-800 rounded-xl p-6">
              <Utensils className="w-8 h-8 text-yellow-400 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Merchant</h3>
              <ul className="text-gray-400 space-y-2 text-sm">
                <li>• QR code generation</li>
                <li>• Menu management</li>
                <li>• Live order feed</li>
                <li>• Stock control</li>
              </ul>
            </div>
            <div className="bg-gray-800 rounded-xl p-6">
              <Smartphone className="w-8 h-8 text-green-400 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Customer</h3>
              <ul className="text-gray-400 space-y-2 text-sm">
                <li>• Scan QR to view menu</li>
                <li>• Browse categories</li>
                <li>• Add to cart & checkout</li>
                <li>• Pay online or at counter</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl font-bold mb-4 text-black">Ready to modernize your restaurant?</h2>
        <p className="text-black mb-8">
          Start accepting QR-based orders in minutes.
        </p>
        <Link
          href="/signin"
          className="px-8 py-3 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition inline-flex items-center gap-2"
        >
          Sign In to Dashboard <ArrowRight className="w-4 h-4" />
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center text-sm text-gray-500">
          <p>© 2026 QR Restaurant Platform. Built with Next.js, Prisma & MongoDB.</p>
          <p className="mt-2">
            Demo credentials: admin@example.com / admin123 or merchant@example.com / merchant123
          </p>
        </div>
      </footer>
    </div>
  );
}
