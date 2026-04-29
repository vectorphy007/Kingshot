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

export default function MembersRoster({ members = [] }: { members?: Member[] }) {
  const r3Members = members.filter(m => 
    m.name.toLowerCase() !== "vector" && 
    m.name.toLowerCase() !== "albo"
  );

  return (
    <Card>
      <h2 className="text-lg font-semibold mb-4">Members (R3 / R2)</h2>
      <p className="text-sm text-accent-muted mb-4">Displaying verified members.</p>
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
            {r3Members.map((member) => (
              <tr key={member.id} className="border-b border-slate-800 hover:bg-background/50">
                <td className="py-3 px-4 font-semibold">{member.name}</td>
                <td className="py-3 px-4">{member.townCenter}</td>
                <td className="py-3 px-4 text-accent-green">{member.rallyCap}</td>
                <td className="py-3 px-4">{member.deploymentCap}</td>
                <td className="py-3 px-4">{member.highestTier}</td>
                <td className="py-3 px-4">{member.totalTroops}</td>
              </tr>
            ))}
            {r3Members.length === 0 && (
              <tr>
                <td colSpan={6} className="py-4 text-center text-accent-muted">No members found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
}