import { getSubmissions } from "@/lib/storage";

export default async function VeteransPage() {
  const allMembers = await getSubmissions();
  
  // Filter by role to identify Veteran entry status
  const veterans = allMembers.filter(m => m.role === "Veteran" && m.status === "approved");

  return (
    <section>
      <div className="mb-10">
        <h1 className="text-4xl font-black text-white uppercase tracking-tighter italic">Elite <span className="text-yellow-500">Veterans</span></h1>
        <p className="text-zinc-500 mt-2 font-mono text-xs uppercase tracking-widest">Verified Loyalists // Seasoned Combatants</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {veterans.length > 0 ? (
          veterans.map((vet) => (
            <div key={vet.id} className="p-6 border border-zinc-800 bg-zinc-900/20 rounded-md hover:border-yellow-500/50 transition-all border-l-2 border-l-yellow-500 group">
              <h3 className="text-xl font-bold text-zinc-100 group-hover:text-yellow-500 transition-colors">{vet.name}</h3>
              <div className="mt-4 flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <span className="text-[9px] text-zinc-600 uppercase font-black tracking-widest">Tactical Rank</span>
                  <span className="text-[10px] text-yellow-500 font-mono">{vet.rank}</span>
                </div>
                <div className="w-full h-px bg-zinc-800"></div>
                <div className="flex justify-between items-center">
                  <span className="text-[9px] text-zinc-600 uppercase font-black tracking-widest">Entry Status</span>
                  <span className="text-[10px] text-zinc-400 font-mono">VETERAN</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-zinc-700 italic font-mono text-sm">Veteran personnel index is currently empty.</p>
        )}
      </div>
    </section>
  );
}