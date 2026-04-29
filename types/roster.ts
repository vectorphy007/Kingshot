// Location: /types/roster.ts

export type TacticalGroup = 
  | "Rally Host" 
  | "R3"            // This is High Power
  | "R2"            // This is Mid Power
  | "R1"            // This is Low Power
  | "Needs Review";

// Export the alias to fix the "no exported member RosterGroup" error
export type RosterGroup = TacticalGroup;

export type SubmissionRole = "Veteran" | "Newbie";
export type AllianceRank = TacticalGroup | "Leadership";

export interface RosterMember {
  id: string;
  name: string;
  role: SubmissionRole;
  rank: AllianceRank;
  townCenter: number;
  rallyCap: string | number;
  deploymentCap: string;
  highestTier: string;
  totalTroops: string;
  submittedAt: string;
  status: "pending" | "approved" | "rejected";
  group: TacticalGroup; 
  notes?: string;
}