import { NextResponse } from "next/server";
import { getSubmissions } from "@/lib/storage";

export async function GET() {
  try {
    // 1. Fetch all data from your storage layer (KV or fallback)
    const allData = await getSubmissions();

    // 2. Filter to ONLY show approved members on the roster
    const approvedMembers = allData.filter(member => member.status === "approved");

    // 3. Return wrapping the array in { members: [] } to match your API.md schema
    return NextResponse.json({ members: approvedMembers });
    
  } catch (error) {
    console.error("Failed to fetch roster:", error);
    return NextResponse.json({ error: "Failed to load roster" }, { status: 500 });
  }
}