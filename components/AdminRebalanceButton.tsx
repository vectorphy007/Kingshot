"use client";

import React, { useState } from "react";

export default function AdminRebalanceButton() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; msg: string } | null>(null);

  const handleRebalance = async () => {
    setIsProcessing(true);
    setStatus(null);

    try {
      // Calls the tactical re-optimization API
      const res = await fetch("/api/rebalance", { method: "POST" });
      const data = await res.json();

      if (res.ok) {
        setStatus({ type: "success", msg: data.message });
        // Refresh page to show updated R-Ranks
        setTimeout(() => window.location.reload(), 1500);
      } else {
        setStatus({ type: "error", msg: data.error || "Rebalance failed." });
      }
    } catch (err) {
      setStatus({ type: "error", msg: "System communication failure." });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col items-end gap-2">
      <button
        onClick={handleRebalance}
        disabled={isProcessing}
        className={`
          px-6 py-2 bg-black border rounded-md uppercase text-xs font-black tracking-widest transition-all
          ${isProcessing 
            ? "border-zinc-800 text-zinc-600 cursor-not-allowed" 
            : "border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black hover:shadow-[0_0_15px_rgba(234,179,8,0.4)]"
          }
        `}
      >
        {isProcessing ? "Recalculating Tiers..." : "Run ML Balance"}
      </button>
      
      {status && (
        <span className={`text-[10px] font-bold uppercase ${status.type === "success" ? "text-green-500" : "text-red-500"}`}>
          {status.msg}
        </span>
      )}
    </div>
  );
}