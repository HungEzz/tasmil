import { NextResponse } from "next/server";
import { API_BASE_URL } from "@/constants/routes";

export async function GET(request: Request) {
  try {
    // Optional: Validate Vercel Cron authorization header if CRON_SECRET is set
    const authHeader = request.headers.get("authorization");
    const cronSecret = process.env.CRON_SECRET;
    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!API_BASE_URL) {
      return NextResponse.json(
        { error: "NEXT_PUBLIC_API_URL is not configured" },
        { status: 400 }
      );
    }

    const start = Date.now();
    // Fetch the backend health check URL
    const res = await fetch(API_BASE_URL, {
      cache: "no-store",
      headers: {
        "User-Agent": "Tasmil-KeepAlive-Ping",
      },
    });
    const duration = Date.now() - start;

    if (res.ok) {
      return NextResponse.json({
        success: true,
        status: res.status,
        duration: `${duration}ms`,
        timestamp: new Date().toISOString(),
      });
    }

    return NextResponse.json(
      {
        success: false,
        status: res.status,
        message: `Backend health check failed with status ${res.status}`,
      },
      { status: 502 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Unknown error occurred while pinging backend",
      },
      { status: 500 }
    );
  }
}
