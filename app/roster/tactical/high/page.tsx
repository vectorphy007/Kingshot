import { getSubmissions } from "@/lib/storage";

export default async function TacticalHighPage() {
  const allMembers = await getSubmissions();
  
  // Filters for the first "3" in your 1:3:3:3 composition
  const groupName = "High Power";
// Change this line:
const members = allMembers.filter(m => m.group === "R3" && m.status === "approved");
  
return (
    <section>
      <div className="mb-10">
        <h1 className="text-4xl font-black text-white uppercase tracking-tighter italic">
          <span className="text-yellow-500">02:</span> {groupName} Joiners
        </h1>
        <p className="text-zinc-400 mt-2">Reinforcement Tier 1: Provide 3 high-stat joiners per 10-man rally.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {members.length > 0 ? (
          members.map((member) => (
            <div key={member.id} className="p-6 border border-zinc-800 rounded-xl bg-zinc-900/40 hover:border-zinc-600 transition-all group">
              <h3 className="text-xl font-bold text-zinc-200 group-hover:text-white">{member.name}</h3>
              <div className="mt-4 flex items-center gap-6 text-[10px] text-zinc-500 uppercase font-mono">
                <span>TC Level {member.townCenter}</span>
                <span className="w-1 h-1 rounded-full bg-zinc-700"></span>
                <span>Rally Cap: {member.rallyCap}</span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-zinc-700 italic">Tier 1 reinforcements not yet classified.</p>
        )}
      </div>
    </section>
  );
}