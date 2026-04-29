import fs from "fs";
import path from "path";
import { autoClassifyRoster } from "@/lib/ai/classification/role";
import { SubmissionRole, AllianceRank, TacticalGroup } from "@/types/roster";

/**
 * DATABASE INTERFACE
 * Synced with the R-Rank system (R3, R2, R1).
 */
export interface Submission {
  id: string;
  name: string;
  role: SubmissionRole; // "Veteran" or "Newbie" from the form
  rank: AllianceRank;   // "Rally Host", "R3", "R2", "R1", or "Leadership"
  townCenter: number;
  rallyCap: string;
  deploymentCap: string;
  highestTier: string;
  totalTroops: string;
  submittedAt: string;
  status: "pending" | "approved" | "rejected";
  group: TacticalGroup; // Tactically synced with Rank
  notes?: string; 
  reviewedAt?: string;
  reviewNote?: string;
}

export interface Announcement {
  id: string;
  title: string;
  body: string;
  type: "info" | "warning" | "success";
  createdAt: string;
  updatedAt: string;
}

function useKV(): boolean {
  return !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
}

// ─── DATABASE HELPERS ────────────────────────────────────────────────────────

async function kvGet<T>(key: string): Promise<T | null> {
  const { kv } = await import("@vercel/kv");
  return kv.get<T>(key);
}

async function kvSet(key: string, value: unknown): Promise<void> {
  const { kv } = await import("@vercel/kv");
  await kv.set(key, value);
}

function localRead<T>(file: string, fallback: T): T {
  try {
    const raw = fs.readFileSync(file, "utf8");
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function localWrite(file: string, value: unknown): void {
  const dir = path.dirname(file);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(file, JSON.stringify(value, null, 2), "utf8");
}

const DATA_DIR = path.join(process.cwd(), "data");

// ─── SUBMISSION & RANK MANAGEMENT ────────────────────────────────────────────

export async function getSubmissions(): Promise<Submission[]> {
  if (useKV()) {
    return (await kvGet<Submission[]>("submissions")) ?? [];
  }
  return localRead<Submission[]>(path.join(DATA_DIR, "submissions", "mock.json"), []);
}

export async function addSubmission(
  sub: Omit<Submission, "id" | "submittedAt" | "status" | "rank"> & { status?: "pending" | "approved" | "rejected" }
): Promise<Submission> {
  const submissions = await getSubmissions();
  
  const newSub: Submission = {
    status: "pending",
    rank: "R1", // Default rank for new submissions
    ...sub, 
    id: crypto.randomUUID ? crypto.randomUUID() : `sub_${Date.now()}`,
    submittedAt: new Date().toISOString(),
  };

  submissions.push(newSub);

  if (useKV()) {
    await kvSet("submissions", submissions);
  } else {
    localWrite(path.join(DATA_DIR, "submissions", "mock.json"), submissions);
  }

  return newSub;
}

/**
 * ADMIN OVERRIDE: Manually change a member's Rank or Identity.
 */
export async function updateMemberRank(
  id: string,
  newRank: AllianceRank
): Promise<Submission | null> {
  const submissions = await getSubmissions();
  const idx = submissions.findIndex((s) => s.id === id);
  if (idx === -1) return null;

  submissions[idx] = {
    ...submissions[idx],
    rank: newRank,
    group: newRank as TacticalGroup, // Sync Identity with Tactical Group
    reviewedAt: new Date().toISOString(),
  };

  if (useKV()) {
    await kvSet("submissions", submissions);
  } else {
    localWrite(path.join(DATA_DIR, "submissions", "mock.json"), submissions);
  }

  return submissions[idx];
}

export async function updateSubmissionStatus(
  id: string,
  status: "approved" | "rejected",
  reviewNote?: string
): Promise<Submission | null> {
  const submissions = await getSubmissions();
  const idx = submissions.findIndex((s) => s.id === id);
  if (idx === -1) return null;

  submissions[idx] = {
    ...submissions[idx],
    status,
    reviewedAt: new Date().toISOString(),
    reviewNote,
  };

  if (useKV()) {
    await kvSet("submissions", submissions);
  } else {
    localWrite(path.join(DATA_DIR, "submissions", "mock.json"), submissions);
  }

  return submissions[idx];
}

// ─── AI TACTICAL REBALANCING (R3:R2:R1) ──────────────────────────────────────

export async function rebalanceDatabase(): Promise<{ success: boolean; message: string }> {
  const submissions = await getSubmissions();
  
  if (submissions.length < 4) {
    return { 
      success: false, 
      message: "Insufficient data. Need at least 4 members for R-Rank clustering." 
    };
  }

  // ML K-Means sorts members into R3, R2, and R1 based on power
  const automaticallySortedMembers = autoClassifyRoster(submissions as any);

  // Sync Rank with the new Tactical Group for all non-leadership members
  const syncedMembers = automaticallySortedMembers.map(member => ({
    ...member,
    rank: member.rank === "Leadership" ? "Leadership" : member.group
  }));

  if (useKV()) {
    await kvSet("submissions", syncedMembers);
  } else {
    localWrite(path.join(DATA_DIR, "submissions", "mock.json"), syncedMembers);
  }

  return { success: true, message: "Alliance R-Ranks re-clustered and synced!" };
}

// ─── ANNOUNCEMENTS ────────────────────────────────────────────────────────────

const ANNOUNCEMENTS_FILE = path.join(DATA_DIR, "announcements.json");

export async function getAnnouncements(): Promise<Announcement[]> {
  if (useKV()) {
    return (await kvGet<Announcement[]>("announcements")) ?? getDefaultAnnouncements();
  }
  return localRead<Announcement[]>(ANNOUNCEMENTS_FILE, getDefaultAnnouncements());
}

export async function saveAnnouncements(announcements: Announcement[]): Promise<void> {
  if (useKV()) {
    await kvSet("announcements", announcements);
  } else {
    localWrite(ANNOUNCEMENTS_FILE, announcements);
  }
}

function getDefaultAnnouncements(): Announcement[] {
  return [
    {
      id: "1",
      title: "Welcome to Kingshot Alliance Command",
      body: "Use the roster tools to submit and manage alliance member stats.",
      type: "info",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];
}