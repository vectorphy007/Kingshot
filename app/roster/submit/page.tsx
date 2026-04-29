"use client";

import React, { useState } from "react";

/**
 * PERSONNEL SUBMISSION FORM
 * Styled with Luxury Tech / Military Intelligence aesthetics.
 * Features Gold-Orange accents and high-contrast dark elements.
 */
export default function SubmitStatsPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; content: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();

      if (res.ok) {
        setMessage({ type: "success", content: result.message });
        (e.target as HTMLFormElement).reset();
      } else {
        setMessage({ type: "error", content: result.error || "Submission failed." });
      }
    } catch (err) {
      setMessage({ type: "error", content: "Connection error. Please check your signal." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-2xl mx-auto py-10">
      {/* Header */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-black text-white uppercase tracking-tighter italic">
          Personnel <span className="text-yellow-500">Data Entry</span>
        </h1>
        <p className="text-zinc-500 mt-2 font-mono text-xs uppercase tracking-widest">
          Update combat readiness for tactical R-Rank assignment.
        </p>
      </div>

      {/* Main Form */}
      <form 
        onSubmit={handleSubmit} 
        className="space-y-6 bg-zinc-950 border border-zinc-800 p-8 rounded-2xl shadow-2xl backdrop-blur-sm relative overflow-hidden"
      >
        {/* Subtle Gold Glow on the container */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name Input */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] text-yellow-500 uppercase font-black tracking-widest">In-Game Name</label>
            <input 
              name="name" 
              required 
              autoComplete="off"
              className="bg-zinc-900 border border-zinc-800 p-3 rounded text-white focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none transition-all placeholder:text-zinc-700" 
              placeholder="e.g. VectorPhy007" 
            />
          </div>
          
          {/* Status Dropdown - Fixed Visibility */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] text-yellow-500 uppercase font-black tracking-widest">Entry Status</label>
            <select 
              name="role" 
              required 
              className="bg-zinc-900 border border-zinc-800 p-3 rounded text-white focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none transition-all cursor-pointer appearance-none"
            >
              <option value="Newbie" className="bg-zinc-900 text-white">Newbie</option>
              <option value="Veteran" className="bg-zinc-900 text-white">Veteran</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* TC Level */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] text-yellow-500 uppercase font-black tracking-widest">Town Center Level</label>
            <input 
              name="townCenter" 
              type="number" 
              required 
              className="bg-zinc-900 border border-zinc-800 p-3 rounded text-white focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none transition-all placeholder:text-zinc-700" 
              placeholder="24" 
            />
          </div>
          {/* Rally Capacity */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] text-yellow-500 uppercase font-black tracking-widest">Rally Capacity</label>
            <input 
              name="rallyCap" 
              required 
              className="bg-zinc-900 border border-zinc-800 p-3 rounded text-white focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none transition-all placeholder:text-zinc-700" 
              placeholder="225K" 
            />
          </div>
        </div>

        {/* Tactical Sub-fields */}
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-zinc-900">
          <div className="flex flex-col gap-1">
            <label className="text-[9px] text-zinc-600 uppercase font-bold">Deployment</label>
            <input name="deploymentCap" required className="bg-zinc-900 border border-zinc-800 p-3 rounded text-white text-xs outline-none focus:border-zinc-500" placeholder="e.g. 110K" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[9px] text-zinc-600 uppercase font-bold">Max Tier</label>
            <input name="highestTier" required className="bg-zinc-900 border border-zinc-800 p-3 rounded text-white text-xs outline-none focus:border-zinc-500" placeholder="e.g. T10" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[9px] text-zinc-600 uppercase font-bold">Total Troops</label>
            <input name="totalTroops" required className="bg-zinc-900 border border-zinc-800 p-3 rounded text-white text-xs outline-none focus:border-zinc-500" placeholder="e.g. 1.2M" />
          </div>
        </div>

        {/* Action Button */}
        <button 
          disabled={loading} 
          className="w-full mt-4 bg-yellow-500 hover:bg-yellow-400 text-black font-black uppercase py-4 rounded-xl transition-all disabled:opacity-50 shadow-[0_0_20px_rgba(234,179,8,0.2)] hover:shadow-[0_0_30px_rgba(234,179,8,0.4)]"
        >
          {loading ? "Transmitting..." : "Send Combat Data"}
        </button>

        {/* Status Message Display */}
        {message && (
          <div className={`text-center p-3 rounded-lg border text-sm font-bold uppercase tracking-tighter ${
            message.type === "success" 
              ? "bg-green-500/10 border-green-500/50 text-green-500" 
              : "bg-red-500/10 border-red-500/50 text-red-500"
          }`}>
            {message.content}
          </div>
        )}
      </form>

      <p className="mt-8 text-center text-zinc-700 text-[10px] uppercase font-mono tracking-[0.4em]">
        Verified Intelligence System // vectorphy007
      </p>
    </section>
  );
}