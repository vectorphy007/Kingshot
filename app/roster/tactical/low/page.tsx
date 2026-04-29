import { getSubmissions } from "@/lib/storage";

export default async function TacticalLowPage() {
  const allMembers = await getSubmissions();
  
  // Filters for the final "3" in your 1:3:3:3 composition
  const groupName = "Low Power";
 const members = allMembers.filter(m => m.group === "R2" && m.status === "approved");

  return (
    <section>
      <div className="mb-10">
        <h1 className="text-4xl font-black text-white uppercase tracking-tighter italic">
          <span className="text-zinc-500">04:</span> {groupName} Joiners
        </h1>
        <p className="text-zinc-400 mt-2">Reinforcement Tier 3: Fill the final 3 slots for 10-man squad saturation.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {members.length > 0 ? (
          members.map((member) => (
            <div key={member.id} className="p-4 border border-zinc-900 rounded-lg bg-zinc-950 hover:bg-zinc-900/50 transition-colors">
              <h3 className="text-sm font-bold text-zinc-300">{member.name}</h3>
              <p className="text-[10px] text-zinc-600 mt-1 uppercase tracking-tight">
                TC {member.townCenter} / {member.rallyCap} Cap
              </p>
            </div>
          ))
        ) : (
          <p className="text-zinc-800 italic">No entry-level tactical units classified.</p>
        )}
      </div>
    </section>
  );
}