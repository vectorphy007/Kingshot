import { getSubmissions } from "@/lib/storage";

export default async function LeadershipPage() {
  const allMembers = await getSubmissions();
  
  // Filter by rank to include only High Command
  const leaders = allMembers.filter(m => m.rank === "Leadership" && m.status === "approved");

  return (
    <section>
      <div className="mb-10 border-l-4 border-yellow-500 pl-6">
        <h1 className="text-4xl font-black text-white uppercase tracking-widest italic">High Command</h1>
        <p className="text-zinc-500 mt-2 font-mono text-xs uppercase tracking-widest">R5 & R4 Administration // Strategic Oversight</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {leaders.length > 0 ? (
          leaders.map((leader) => (
            <div key={leader.id} className="relative p-8 border border-yellow-500/20 bg-zinc-900/40 rounded-sm backdrop-blur-sm group overflow-hidden">
              <div className="absolute -inset-px bg-gradient-to-r from-yellow-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white tracking-tight group-hover:text-yellow-500 transition-colors">
                  {leader.name}
                </h3>
                <p className="text-yellow-600 text-[10px] font-black uppercase tracking-[0.2em] mt-1">Authorized Officer</p>
                <div className="mt-6 pt-6 border-t border-zinc-800 flex justify-between items-center text-[10px] text-zinc-500 uppercase tracking-tighter">
                  <span>Unit: {leader.group || "Unassigned"}</span>
                  <span className="px-2 py-1 bg-yellow-500/10 border border-yellow-500/20 text-yellow-500">Active Command</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-zinc-600 italic font-mono text-sm">No leadership units identified in this sector.</p>
        )}
      </div>
    </section>
  );
}