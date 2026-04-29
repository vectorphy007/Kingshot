import { getSubmissions } from "@/lib/storage";
import AdminRebalanceButton from "@/components/AdminRebalanceButton";

export default async function RosterMasterPage() {
  const allMembers = await getSubmissions();
  const approved = allMembers.filter(m => m.status === "approved");

  const renderTier = (title: string, rankKeys: string[], accentColor: string, borderColor: string) => {
    const members = approved.filter(m => rankKeys.includes(m.rank));
    if (members.length === 0) return null;

    return (
      <div className="mb-16">
        <div className="flex items-center gap-4 mb-6">
          <h2 className={`text-sm font-black uppercase tracking-[0.3em] ${accentColor}`}>
            {title}
          </h2>
          <div className={`h-px flex-1 ${borderColor} opacity-30`}></div>
          <span className={`text-[10px] font-mono ${accentColor} opacity-60`}>{members.length} Units</span>
        </div>

        <div className={`border-l-4 ${borderColor} rounded-r-lg bg-[#111827]/40 shadow-xl overflow-hidden`}>
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#1F2937]/50 text-[#f8fafc] uppercase font-bold tracking-widest border-b border-[#1F2937]">
                <th className="p-5">Personnel Name</th>
                <th className="p-5">Entry Status</th>
                <th className="p-5">TC Level</th>
                <th className="p-5 text-right">Rally Cap</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1F2937]">
              {members.map((member) => (
                <tr key={member.id} className="hover:bg-white/[0.03] transition-colors">
                  <td className="p-5 font-bold text-[#f8fafc]">{member.name}</td>
                  <td className="p-5 text-[#9CA3AF] uppercase text-[10px]">{member.role}</td>
                  <td className="p-5 text-[#f8fafc] font-mono">Lvl {member.townCenter}</td>
                  <td className="p-5 text-right text-[#f8fafc] font-mono">{member.rallyCap}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-6xl">
      <div className="flex justify-between items-end mb-20">
        <div>
          <h1 className="text-7xl font-black italic uppercase tracking-tighter text-[#f8fafc]">
            Alliance <span className="text-[#F59E0B]">Master Index</span>
          </h1>
          <p className="text-[10px] text-[#9CA3AF] mt-4 uppercase tracking-[0.5em] font-mono">
            Public Tactical Terminal // 1:3:3:3 Optimization
          </p>
        </div>
        <AdminRebalanceButton />
      </div>

      {renderTier("High Command", ["Leadership", "Rally Host"], "text-[#F59E0B]", "border-[#F59E0B]")}
      {renderTier("Tactical Tier: R3", ["R3"], "text-[#3B82F6]", "border-[#3B82F6]")}
      {renderTier("Tactical Tier: R2", ["R2"], "text-[#22C55E]", "border-[#22C55E]")}
      {renderTier("Tactical Tier: R1", ["R1"], "text-[#9CA3AF]", "border-[#1F2937]")}
    </div>
  );
}