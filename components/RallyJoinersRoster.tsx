import React from "react";
import Card from "@/components/ui/Card";

interface Member {
  id: string;
  name: string;
  townCenter: string | number;
  rallyCap: string;
  deploymentCap: string;
  highestTier: string;
  totalTroops: string;
  group?: string;
}

export default function RallyJoinersRoster({ members = [] }: { members?: Member[] }) {
  // Filter for members tagged as "Rally Joiners"
  const joiners = members.filter(m => m.group === "Rally Joiners");

  return (
    <Card>
      <h2 className="text-lg font-semibold mb-4">Rally Joiners</h2>
      <p className="text-sm text-accent-muted mb-4">Specialized members designated to fill rallies efficiently.</p>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-700 text-accent-muted text-sm">
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">TC</th>
              <th className="py-3 px-4">Rally Cap</th>
              <th className="py-3 px-4">Deploy Cap</th>
              <th className="py-3 px-4">Tier</th>
              <th className="py-3 px-4">Troops</th>
            </tr>
          </thead>
          <tbody>
            {joiners.map((member) => (
              <tr key={member.id} className="border-b border-slate-800 hover:bg-background/50">
                <td className="py-3 px-4 font-semibold">{member.name}</td>
                <td className="py-3 px-4">{member.townCenter}</td>
                <td className="py-3 px-4 text-accent-green">{member.rallyCap}</td>
                <td className="py-3 px-4">{member.deploymentCap}</td>
                <td className="py-3 px-4">{member.highestTier}</td>
                <td className="py-3 px-4">{member.totalTroops}</td>
              </tr>
            ))}
            {joiners.length === 0 && (
              <tr>
                <td colSpan={6} className="py-4 text-center text-accent-muted">No Rally Joiners found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
}