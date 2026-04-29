// Location: /lib/ai/anomaly-detection.ts

import { RosterMember } from "@/types/roster";

export function detectAnomalies(member: Partial<RosterMember>): string[] {
  const anomalies: string[] = [];
  const tc = Number(member.townCenter) || 0;

  let rallyCapNum = 0;
  if (typeof member.rallyCap === "string") {
    const cleanStr = member.rallyCap.replace(/,/g, '').toUpperCase();
    const val = parseFloat(cleanStr);
    if (!isNaN(val)) {
      rallyCapNum = cleanStr.includes('K') ? val * 1000 : cleanStr.includes('M') ? val * 1000000 : val;
    }
  }

  // Combat formula logic checks
  if (tc < 15 && rallyCapNum > 100000) {
    anomalies.push("Rally capacity is impossible for this TC level.");
  }

  if (tc > 30) {
    anomalies.push("Town Center level exceeds server cap.");
  }

  return anomalies;
}