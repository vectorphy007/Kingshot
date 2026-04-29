import { NextResponse } from "next/server";
import { rebalanceDatabase } from "@/lib/storage";

export async function POST() {
  try {
    // Triggers the ML K-Means clustering for the 1:3:3:3 strategy
    const result = await rebalanceDatabase();
    
    if (!result.success) {
      return NextResponse.json({ error: result.message }, { status: 400 });
    }

    return NextResponse.json({ message: result.message });
  } catch (error) {
    console.error("Critical Rebalance Error:", error);
    return NextResponse.json(
      { error: "Internal server error during tactical reclassification." }, 
      { status: 500 }
    );
  }
}