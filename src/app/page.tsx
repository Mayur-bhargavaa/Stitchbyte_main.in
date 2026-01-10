import Link from "next/link";
import { 
  UtensilsCrossed, 
  ShoppingCart, 
  Briefcase, 
  FileText,
  Zap,
  Shield,
  Smartphone,
  ArrowRight,
  ExternalLink,
  Github,
  Mail,
  QrCode,
  BarChart3,
  Users,
  Clock,
  Sparkles,
  Layers,
  Globe
} from "lucide-react";

// Define all your apps here
const apps = [
  {
    id: "restaurant",
    name: "QR Restaurant",
    description: "Complete QR-based restaurant ordering system with real-time updates and analytics.",
    href: "/restaurant",
    icon: UtensilsCrossed,
    gradient: "from-orange-500 via-rose-500 to-pink-600",
    shadowColor: "shadow-orange-500/30",
    features: [
      { icon: QrCode, label: "QR Ordering" },
      { icon: Clock, label: "Real-time" },
      { icon: BarChart3, label: "Analytics" },
      { icon: Users, label: "Multi-user" },
    ],
    status: "Live",
  },
  {
    id: "ecommerce",
    name: "E-Commerce Store",
    description: "Modern e-commerce platform with seamless checkout and inventory management.",
    href: "#",
    icon: ShoppingCart,
    gradient: "from-blue-500 via-cyan-500 to-teal-500",
    shadowColor: "shadow-blue-500/30",
    features: [
      { icon: ShoppingCart, label: "Cart" },
      { icon: Shield, label: "Payments" },
      { icon: BarChart3, label: "Analytics" },
      { icon: Globe, label: "Global" },
    ],
    status: "Coming Soon",
  },
  {
    id: "portfolio",
    name: "Portfolio Builder",
    description: "Create stunning portfolios with drag-and-drop builder and custom domains.",
    href: "#",
    icon: Briefcase,
    gradient: "from-emerald-500 via-green-500 to-lime-500",
    shadowColor: "shadow-emerald-500/30",
    features: [
      { icon: Layers, label: "Templates" },
      { icon: Sparkles, label: "Themes" },
      { icon: Globe, label: "Domains" },
      { icon: BarChart3, label: "Stats" },
    ],
    status: "Coming Soon",
  },
  {
    id: "blog",
    name: "Blog Platform",
    description: "Full-featured blogging with AI assistance, SEO tools, and monetization.",
    href: "#",
    icon: FileText,
    gradient: "from-violet-500 via-purple-500 to-fuchsia-500",
    shadowColor: "shadow-violet-500/30",
    features: [
      { icon: Sparkles, label: "AI Writer" },
      { icon: Shield, label: "SEO" },
      { icon: Users, label: "Comments" },
      { icon: BarChart3, label: "Revenue" },
    ],
    status: "Coming Soon",
  },
];

const stats = [
  { value: "4+", label: "Demo Apps" },
  { value: "100%", label: "Open Source" },
  { value: "24/7", label: "Available" },
  { value: "∞", label: "Possibilities" },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white selection:bg-purple-500/30">
      {/* Animated Mesh Gradient Background */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent" />
        <div className="absolute top-[-50%] left-[-20%] w-[70%] h-[100%] bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-30%] right-[-10%] w-[50%] h-[80%] bg-gradient-to-l from-cyan-600/15 via-blue-600/15 to-indigo-600/15 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[40%] bg-gradient-to-b from-pink-600/10 to-orange-600/10 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: '2s' }} />
        {/* Grid overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjAyIiBkPSJNMCAwaDYwdjYwSDB6Ii8+PHBhdGggZD0iTTYwIDBIMHY2MCIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utb3BhY2l0eT0iLjAyIi8+PC9nPjwvc3ZnPg==')] opacity-50" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-white/5 backdrop-blur-2xl bg-black/20 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur-lg opacity-50 group-hover:opacity-100 transition-opacity" />
                <div className="relative w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
              </div>
              <div>
                <h1 className="font-bold text-lg tracking-tight">StitchByte</h1>
                <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em]">Demo Platform</p>
              </div>
            </div>
            <nav className="flex items-center gap-3">
              <a 
                href="https://stitchbyte.in" 
                target="_blank" 
                rel="noopener" 
                className="hidden sm:flex text-sm text-gray-400 hover:text-white transition-colors px-4 py-2 rounded-full hover:bg-white/5 items-center gap-1.5"
              >
                <Globe className="w-4 h-4" />
                Website
              </a>
              <a 
                href="https://github.com/stitchbyte" 
                target="_blank"
                className="hidden sm:flex text-sm text-gray-400 hover:text-white transition-colors px-4 py-2 rounded-full hover:bg-white/5 items-center gap-1.5"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
              <Link 
                href="/contact" 
                className="text-sm px-5 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all hover:-translate-y-0.5 flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                <span className="hidden sm:inline">Contact</span>
              </Link>
            </nav>
          </div>
        </header>

        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 pt-20 pb-32">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-full text-sm mb-8 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-green-400 font-medium">Live Demo Environment</span>
            </div>
            
            {/* Main Heading */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-8 leading-[0.9] tracking-tight">
              <span className="block text-white">Build.</span>
              <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Explore.
              </span>
              <span className="block text-white">Deploy.</span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed">
              Discover production-ready applications built with cutting-edge 
              technology. Real functionality. Beautiful design. Open source.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-20">
              <a 
                href="#apps" 
                className="group relative px-8 py-4 bg-white text-black font-semibold rounded-full hover:shadow-2xl hover:shadow-white/20 transition-all hover:-translate-y-1 flex items-center justify-center gap-2 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Explore Apps 
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </a>
              <a 
                href="https://github.com/stitchbyte" 
                target="_blank" 
                rel="noopener" 
                className="px-8 py-4 border border-white/10 bg-white/5 backdrop-blur-sm rounded-full hover:bg-white/10 hover:border-white/20 transition-all hover:-translate-y-1 flex items-center justify-center gap-2 font-medium"
              >
                <Github className="w-5 h-5" />
                Star on GitHub
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              {stats.map((stat, i) => (
                <div key={i} className="text-center p-4">
                  <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Apps Grid */}
        <section id="apps" className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full text-xs text-purple-400 mb-4">
              <Sparkles className="w-3 h-3" />
              APPLICATIONS
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">Choose Your Demo</h2>
            <p className="text-gray-400 max-w-xl mx-auto text-lg">
              Each app is fully functional and ready to explore
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {apps.map((app) => {
              const IconComponent = app.icon;
              const isLive = app.status === "Live";
              return (
                <div
                  key={app.id}
                  className={`group relative rounded-3xl transition-all duration-500 ${
                    isLive ? "hover:-translate-y-2" : "opacity-50"
                  }`}
                >
                  {/* Card glow */}
                  {isLive && (
                    <div className={`absolute -inset-0.5 bg-gradient-to-r ${app.gradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-all duration-500`} />
                  )}
                  
                  {/* Card */}
                  <div className="relative h-full bg-gradient-to-b from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl p-8 overflow-hidden">
                    {/* Subtle inner glow */}
                    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${app.gradient} opacity-10 blur-3xl`} />
                    
                    {/* Content */}
                    <div className="relative">
                      {/* Header */}
                      <div className="flex items-start gap-5 mb-6">
                        <div className={`relative flex-shrink-0`}>
                          <div className={`absolute inset-0 bg-gradient-to-br ${app.gradient} rounded-2xl blur-lg opacity-50`} />
                          <div className={`relative w-16 h-16 bg-gradient-to-br ${app.gradient} rounded-2xl flex items-center justify-center ${app.shadowColor} shadow-xl`}>
                            <IconComponent className="w-8 h-8 text-white" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-1">
                            <h3 className="text-2xl font-bold text-white truncate">{app.name}</h3>
                          </div>
                          <span className={`inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded-full font-medium ${
                            isLive 
                              ? "bg-green-500/20 text-green-400 border border-green-500/30" 
                              : "bg-gray-500/20 text-gray-400 border border-gray-500/30"
                          }`}>
                            {isLive && (
                              <span className="relative flex h-1.5 w-1.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-400"></span>
                              </span>
                            )}
                            {app.status}
                          </span>
                        </div>
                      </div>
                      
                      {/* Description */}
                      <p className="text-gray-400 mb-6 leading-relaxed">{app.description}</p>
                      
                      {/* Features */}
                      <div className="flex flex-wrap gap-2 mb-8">
                        {app.features.map((feature) => {
                          const FeatureIcon = feature.icon;
                          return (
                            <div 
                              key={feature.label} 
                              className="flex items-center gap-2 text-xs px-3 py-2 bg-white/5 rounded-xl border border-white/5 hover:border-white/10 transition-colors"
                            >
                              <FeatureIcon className="w-3.5 h-3.5 text-gray-400" />
                              <span className="text-gray-300">{feature.label}</span>
                            </div>
                          );
                        })}
                      </div>
                      
                      {/* Action Button */}
                      {isLive ? (
                        <Link
                          href={app.href}
                          className={`group/btn relative inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r ${app.gradient} rounded-2xl font-semibold text-white overflow-hidden transition-all hover:shadow-xl ${app.shadowColor}`}
                        >
                          <span className="relative z-10 flex items-center gap-2">
                            Launch App
                            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                          </span>
                          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform" />
                        </Link>
                      ) : (
                        <button
                          disabled
                          className="inline-flex items-center gap-2 px-8 py-4 bg-white/5 rounded-2xl font-semibold text-gray-500 cursor-not-allowed border border-white/5"
                        >
                          <Clock className="w-4 h-4" />
                          Coming Soon
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Features Section */}
        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="relative">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-[3rem] blur-3xl" />
            
            <div className="relative bg-gradient-to-b from-white/[0.05] to-transparent border border-white/10 rounded-[2rem] p-12 md:p-16 overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-xs text-blue-400 mb-4">
                  <Shield className="w-3 h-3" />
                  WHY CHOOSE US
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold">Built for the Future</h2>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8 md:gap-12">
                {[
                  {
                    icon: Zap,
                    title: "Lightning Fast",
                    description: "Optimized for performance with edge deployment and smart caching.",
                    gradient: "from-yellow-500 to-orange-500",
                  },
                  {
                    icon: Shield,
                    title: "Enterprise Security",
                    description: "Bank-grade encryption, OAuth 2.0, and role-based access control.",
                    gradient: "from-green-500 to-emerald-500",
                  },
                  {
                    icon: Smartphone,
                    title: "Mobile First",
                    description: "Responsive design that works flawlessly on any device or screen size.",
                    gradient: "from-purple-500 to-pink-500",
                  },
                ].map((feature, i) => (
                  <div key={i} className="text-center group">
                    <div className="relative inline-flex mb-6">
                      <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-2xl blur-xl opacity-30 group-hover:opacity-60 transition-opacity`} />
                      <div className={`relative w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center shadow-lg`}>
                        <feature.icon className="w-7 h-7 text-white" />
                      </div>
                    </div>
                    <h3 className="font-bold text-xl mb-3">{feature.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="relative text-center py-20">
            {/* Glow */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[500px] h-[500px] bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-[100px]" />
            </div>
            
            <div className="relative">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
                Ready to Explore?
              </h2>
              <p className="text-xl text-gray-400 mb-10 max-w-xl mx-auto">
                Dive into our demo apps and see what&apos;s possible with modern web development.
              </p>
              <a 
                href="#apps" 
                className="inline-flex items-center gap-2 px-10 py-5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded-full font-semibold text-lg hover:shadow-2xl hover:shadow-purple-500/30 transition-all hover:-translate-y-1"
              >
                <Sparkles className="w-5 h-5" />
                Get Started Now
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <div>
                  <span className="font-semibold">StitchByte</span>
                  <span className="text-gray-500 text-sm ml-2">© 2026</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {[
                  { icon: Globe, href: "https://stitchbyte.in", label: "Website" },
                  { icon: Github, href: "https://github.com/stitchbyte", label: "GitHub" },
                  { icon: Mail, href: "mailto:contact@stitchbyte.in", label: "Email" },
                ].map((link) => (
                  <a 
                    key={link.label}
                    href={link.href}
                    className="p-3 text-gray-500 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                    title={link.label}
                  >
                    <link.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
