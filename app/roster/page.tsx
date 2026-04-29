import React from "react";
import Card from "@/components/ui/Card";
// 1. Add these missing imports! Adjust the path if you named the files differently.
import LeadershipRoster from "@/components/LeadershipRoster";
import MembersRoster from "@/components/MembersRoster";

export default async function RosterOverview() {
  let membersList = [];

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/roster`, { 
      cache: 'no-store' 
    });
    
    if (res.ok) {
      const data = await res.json();
      membersList = data.members || [];
    }
  } catch (error) {
    console.error("Error loading roster:", error);
  }

  return (
    <div className="space-y-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Alliance Roster</h1>
        <p className="text-sm text-accent-muted">Current combat stats and deployments for Kingshot members.</p>
      </div>

      {/* 2. Now these components will render correctly */}
      <LeadershipRoster members={membersList} />
      <MembersRoster members={membersList} />
    </div>
  );
}