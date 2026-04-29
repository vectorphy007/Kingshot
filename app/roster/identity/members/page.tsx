import { getSubmissions } from "@/lib/storage";

export default async function MembersPage() {
  const allMembers = await getSubmissions();
  
  // Filter for personnel holding tactical R-ranks (R3, R2, or R1)
  const members = allMembers.filter(m => 
    (m.rank === "R3" || m.rank === "R2" || m.rank === "R1") && 
    m.status === "approved"
  );

  return (
    <section>
      <div className="mb-10 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black text-white uppercase tracking-tighter italic">Active <span className="text-yellow-500">Personnel</span></h1>
          <p className="text-zinc-500 mt-1 uppercase text-[10px] tracking-widest font-mono">Global Tactical R-Rank Index</p>
        </div>
        <span className="text-yellow-500 text-xs font-mono tracking-widest">{members.length} Units Online</span>
      </div>

      <div className="bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden">
        <div className="grid grid-cols-1 divide-y divide-zinc-900">
          {members.length > 0 ? (
            members.map((member) => (
              <div key={member.id} className="flex items-center justify-between p-5 hover:bg-yellow-500/[0.02] transition-colors group">
                <div>
                  <h3 className="text-md font-bold text-zinc-300 group-hover:text-yellow-500 transition-colors">{member.name}</h3>
                  <p className="text-[10px] text-zinc-600 uppercase font-mono tracking-tighter">Rank Assignment: {member.rank}</p>
                </div>
                <div className="flex gap-10 text-[10px] text-zinc-500 font-mono uppercase">
                  <div className="flex flex-col items-end">
                    <span className="text-zinc-700">TC Level</span>
                    <span className="text-zinc-300">{member.townCenter}</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-zinc-700">Capacity</span>
                    <span className="text-zinc-300">{member.rallyCap}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-10 text-center text-zinc-800 italic font-mono text-sm">No R-rank personnel records found.</div>
          )}
        </div>
      </div>
    </section>
  );
}