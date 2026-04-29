export const dynamic = "force-static";

import { NextResponse } from "next/server";
import { getSubmissions } from "@/lib/storage";

export async function GET() {
  try {
    const submissions = await getSubmissions();
    return NextResponse.json(submissions);
  } catch {
    return NextResponse.json({ error: "Failed to fetch submissions" }, { status: 500 });
  }
}
