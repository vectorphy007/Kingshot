// Location: /app/api/submit/route.ts

import { NextResponse } from "next/server";
import { addSubmission, rebalanceDatabase } from "@/lib/storage";
import { suggestPlayerRole } from "@/lib/ai/classification/role";
import { detectAnomalies } from "@/lib/ai/anomaly-detection";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // 1. Validation
    if (!body.name || !body.townCenter || !body.rallyCap || !body.role) {
      return NextResponse.json({ error: "Required fields missing." }, { status: 400 });
    }

    // 2. AI Logic
    const suggestedGroup = suggestPlayerRole(body);
    const anomalies = detectAnomalies(body);
    const isApproved = anomalies.length === 0;

    // 3. Save to DB
    await addSubmission({
      ...body,
      group: suggestedGroup,
      status: isApproved ? "approved" : "pending",
      notes: isApproved ? "Auto-approved." : `Flagged: ${anomalies.join(", ")}`
    });

    // 4. If clean, re-calculate the entire alliance 1:3:3:3 curve
    if (isApproved) {
      await rebalanceDatabase();
      return NextResponse.json({ 
        success: true, 
        message: `Approved. Tactical designation: ${suggestedGroup}.` 
      });
    }

    return NextResponse.json({ 
      success: true, 
      message: "Data transmitted. Awaiting manual officer review due to anomalies." 
    });

  } catch (error) {
    return NextResponse.json({ error: "System failure during transmission." }, { status: 500 });
  }
}