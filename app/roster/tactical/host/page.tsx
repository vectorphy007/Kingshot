import { getSubmissions } from "@/lib/storage";

export default async function TacticalHostPage() {
  const allMembers = await getSubmissions();
  
  // Filters for the "1" in your 1:3:3:3 composition
  const groupName = "Rally Host";
  const members = allMembers.filter(m => m.group === groupName && m.status === "approved");

  return (
    <section>
      <div className="mb-10">
        <h1 className="text-4xl font-black text-white uppercase tracking-tighter italic">
          <span className="text-yellow-500">01:</span> {groupName}s
        </h1>
        <p className="text-zinc-400 mt-2">Primary Strike Units: Responsible for initiating all 10-man rallies.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {members.length > 0 ? (
          members.map((member) => (
            <div key={member.id} className="p-6 border border-yellow-500/30 rounded-xl bg-yellow-500/5 hover:border-yellow-500 transition-all group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-2 bg-yellow-500 text-black text-[10px] font-black uppercase">Host Class</div>
              <h3 className="text-2xl font-bold text-white">{member.name}</h3>
              <div className="mt-4 grid grid-cols-2 gap-2 text-[10px] text-zinc-500 uppercase tracking-widest">
                <div className="bg-zinc-900 p-2 rounded">TC: <span className="text-white">{member.townCenter}</span></div>
                <div className="bg-zinc-900 p-2 rounded">Cap: <span className="text-white">{member.rallyCap}</span></div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full p-10 border border-dashed border-zinc-800 rounded-xl text-center text-zinc-600">
            No designated hosts found. Run ML Rebalance to assign.
          </div>
        )}
      </div>
    </section>
  );
}