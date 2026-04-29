"use client";

import React, { useState, useEffect } from "react";
import { Submission } from "@/lib/storage";

export default function SearchPersonnelPage() {
  const [allMembers, setAllMembers] = useState<Submission[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMembers, setFilteredMembers] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/members");
        if (!res.ok) throw new Error("404 Not Found");
        const data = await res.json();
        const approved = data.filter((m: Submission) => m.status === "approved");
        setAllMembers(approved);
        setFilteredMembers(approved);
      } catch (err) {
        console.error("Search API Error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    const results = allMembers.filter(member => 
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.rank.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMembers(results);
  }, [searchTerm, allMembers]);

  return (
    <section className="space-y-8">
      <div className="border-b border-zinc-800 pb-6">
        <h1 className="text-4xl font-black text-white uppercase tracking-tighter italic">
          Search <span className="text-yellow-500">Personnel</span>
        </h1>
        <p className="text-zinc-500 text-xs mt-1 uppercase font-mono tracking-widest">Querying R-Rank Database</p>
      </div>

      <div className="relative max-w-xl">
        <input 
          type="text" 
          placeholder="Enter Name or Rank (R3, R2, R1)..." 
          className="w-full bg-zinc-950 border border-zinc-800 p-4 rounded-lg text-white outline-none focus:border-yellow-500 transition-all font-mono text-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/20">
        <table className="w-full text-left text-sm">
          <thead className="bg-zinc-950 text-yellow-500 uppercase text-[10px] font-bold tracking-widest border-b border-zinc-800">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Entry Status</th>
              <th className="p-4">R-Rank</th>
              <th className="p-4">TC</th>
              <th className="p-4 text-right">Rally Cap</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-900">
            {loading ? (
              <tr><td colSpan={5} className="p-10 text-center text-zinc-600 animate-pulse">Accessing Encrypted Data...</td></tr>
            ) : filteredMembers.length > 0 ? (
              filteredMembers.map((member) => (
                <tr key={member.id} className="hover:bg-yellow-500/[0.03] transition-colors">
                  <td className="p-4 font-bold text-white">{member.name}</td>
                  <td className="p-4 text-zinc-500 text-xs uppercase">{member.role}</td>
                  <td className="p-4">
                    <span className={`text-[10px] font-black px-2 py-1 rounded border ${
                      member.rank === 'Rally Host' || member.rank === 'Leadership' ? 'border-yellow-500 text-yellow-500 bg-yellow-500/10' : 'border-zinc-700 text-zinc-400'
                    }`}>
                      {member.rank}
                    </span>
                  </td>
                  <td className="p-4 text-zinc-500 font-mono">{member.townCenter}</td>
                  <td className="p-4 text-right text-zinc-500 font-mono">{member.rallyCap}</td>
                </tr>
              ))
            ) : (
              <tr><td colSpan={5} className="p-10 text-center text-zinc-800 italic">No personnel matches found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}