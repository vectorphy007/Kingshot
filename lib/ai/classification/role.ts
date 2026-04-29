// Location: /lib/ai/classification/role.ts

import { kmeans } from 'ml-kmeans';
import { RosterMember, TacticalGroup } from "@/types/roster"; // Added import

function parseCapacity(cap: string | number | undefined): number {
  if (!cap) return 0;
  if (typeof cap === "number") return cap;
  const cleanStr = cap.toString().replace(/,/g, '').toUpperCase();
  const val = parseFloat(cleanStr);
  if (isNaN(val)) return 0;
  if (cleanStr.includes('M')) return val * 1000000;
  if (cleanStr.includes('K')) return val * 1000;
  return val;
}

export function autoClassifyRoster(roster: RosterMember[]): RosterMember[] {
  if (roster.length < 4) return roster;

  const data = roster.map(member => [
    member.townCenter || 0,
    parseCapacity(member.rallyCap)
  ]);

  const result = kmeans(data, 4, { initialization: 'kmeans++' });

  const clusterScores = result.centroids.map((centroid, index) => {
    const score = (centroid[0] * 10000) + centroid[1];
    return { index, score };
  });

  clusterScores.sort((a, b) => b.score - a.score);

  // UPDATED: Mapping clusters to R-Ranks
  const roleMapping: Record<number, TacticalGroup> = {
    [clusterScores[0].index]: "Rally Host",
    [clusterScores[1].index]: "R3", // High
    [clusterScores[2].index]: "R2", // Mid
    [clusterScores[3].index]: "R1"  // Low
  };

  return roster.map((member, i) => {
    const clusterId = result.clusters[i];
    return {
      ...member,
      group: roleMapping[clusterId]
    };
  });
}

export function suggestPlayerRole(member: Partial<RosterMember>): TacticalGroup {
  const tc = member.townCenter || 0;
  if (tc >= 24) return "Rally Host";
  if (tc >= 22) return "R3";
  if (tc >= 19) return "R2";
  return "R1";
}