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
}

export default function LeadershipRoster({ members = [] }: { members?: Member[] }) {
  const leadership = members.filter(m => 
    m.name.toLowerCase() === "vector" || 
    m.name.toLowerCase() === "albo"
  );

  return (
    <Card>
      <h2 className="text-lg font-semibold mb-4">Leadership (R5 / R4)</h2>
      <p className="text-sm text-accent-muted mb-4">Core alliance command.</p>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-700 text-accent-muted text-sm">
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">TC</th>
              <th className="py-3 px-4">Rally Cap</th>
              <th className="py-3 px-4">Deploy Cap</th>
              <th className="py-3 px-4">Tier</th>
            </tr>
          </thead>
          <tbody>
            {leadership.map((leader) => (
              <tr key={leader.id} className="border-b border-slate-800 hover:bg-background/50">
                <td className="py-3 px-4 font-semibold text-accent-gold">{leader.name}</td>
                <td className="py-3 px-4">{leader.townCenter}</td>
                <td className="py-3 px-4 text-accent-green">{leader.rallyCap}</td>
                <td className="py-3 px-4">{leader.deploymentCap}</td>
                <td className="py-3 px-4">{leader.highestTier}</td>
              </tr>
            ))}
            {leadership.length === 0 && (
              <tr>
                <td colSpan={5} className="py-4 text-center text-accent-muted">No leadership data found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
}