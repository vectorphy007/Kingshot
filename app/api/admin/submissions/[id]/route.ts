export const dynamic = "force-static";

import { NextRequest, NextResponse } from "next/server";
import { updateSubmissionStatus } from "@/lib/storage";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { action, reviewNote } = await request.json();

    if (action !== "approve" && action !== "reject") {
      return NextResponse.json({ error: "Action must be 'approve' or 'reject'" }, { status: 400 });
    }

    const updated = await updateSubmissionStatus(id, action === "approve" ? "approved" : "rejected", reviewNote);

    if (!updated) {
      return NextResponse.json({ error: "Submission not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, submission: updated });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
