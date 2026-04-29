import { getSubmissions } from "@/lib/storage";

export default async function TacticalMidPage() {
  // 1. Fetch data
  const allMembers = await getSubmissions();
  
  // 2. Filter specifically for "Mid Power" (Your 3:3:3 Joiner Group)
  const groupName = "Mid Power";
const members = allMembers.filter(m => m.group === "R1" && m.status === "approved");

  return (
    <section>
      <div className="mb-10">
        <h1 className="text-4xl font-black text-white uppercase tracking-tighter italic">{groupName}</h1>
        <p className="text-zinc-400">Strategic Joiner Tier: Contribute 3 units per 10-man rally.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {members.length > 0 ? (
          members.map((member) => (
            <div key={member.id} className="p-6 border border-zinc-800 rounded-xl bg-zinc-900/20 hover:border-yellow-500/50 transition-all group">
              <h3 className="text-xl font-bold group-hover:text-yellow-500">{member.name}</h3>
              <div className="mt-4 flex gap-4 text-xs text-zinc-500 uppercase">
                <span>TC: {member.townCenter}</span>
                <span>Rally: {member.rallyCap}</span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-zinc-600 italic">No combatants assigned to this tier yet.</p>
        )}
      </div>
    </section>
  );
}