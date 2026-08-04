import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { getClientIp } from "@/lib/rate-limiter";

async function getIpGeo(ip: string) {
  // Fallback for local IPs
  if (
    ip === "127.0.0.1" ||
    ip === "::1" ||
    ip.startsWith("192.168.") ||
    ip.startsWith("10.") ||
    ip.startsWith("172.16.") ||
    ip.startsWith("::ffff:")
  ) {
    return { country: "Local", region: "Local", city: "Local" };
  }
  try {
    // Fetch geo data from free ip-api.com
    const res = await fetch(`http://ip-api.com/json/${ip}?fields=status,message,country,regionName,city`, {
      signal: AbortSignal.timeout(3000), // timeout after 3 seconds to avoid blocking
    });
    if (!res.ok) {
      return { country: "Unknown", region: "Unknown", city: "Unknown" };
    }
    const data = await res.json();
    if (data.status === "fail") {
      return { country: "Unknown", region: "Unknown", city: "Unknown" };
    }
    return {
      country: data.country || "Unknown",
      region: data.regionName || "Unknown", // State
      city: data.city || "Unknown",
    };
  } catch (err) {
    console.error(`Geolocation lookup failed for IP ${ip}:`, err);
    return { country: "Unknown", region: "Unknown", city: "Unknown" };
  }
}

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request);
    let body: any = {};
    try {
      body = await request.json();
    } catch {
      // Empty body fallback
    }

    const {
      utmSource,
      utmMedium,
      utmCampaign,
      utmTerm,
      utmContent,
      referrer,
      landingPage,
      pathname,
    } = body;

    // Fetch geo details
    const geo = await getIpGeo(ip);

    // Connect and save directly using MongoClient
    const { db } = await connectToDatabase();
    const collection = db.collection("traffic_logs");

    const visit = {
      ip,
      country: geo.country,
      region: geo.region,
      city: geo.city,
      utmSource: utmSource || null,
      utmMedium: utmMedium || null,
      utmCampaign: utmCampaign || null,
      utmTerm: utmTerm || null,
      utmContent: utmContent || null,
      referrer: referrer || null,
      landingPage: landingPage || null,
      pathname: pathname || null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await collection.insertOne(visit);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Traffic tracking API error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
