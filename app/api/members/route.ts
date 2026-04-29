import { NextResponse } from "next/server";
import { getSubmissions } from "@/lib/storage";

/**
 * DATABASE FETCH ROUTE
 * Provides the JSON data required for the Search Personnel page.
 */
export async function GET() {
  try {
    const members = await getSubmissions();
    // Returns the full roster to the search component
    return NextResponse.json(members);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to access personnel database." }, 
      { status: 500 }
    );
  }
}