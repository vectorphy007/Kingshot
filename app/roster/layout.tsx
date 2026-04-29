"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function RosterLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { label: "Master Roster", path: "/roster" },
    { label: "Search Personnel", path: "/roster/search" },
    { label: "Submit Stats", path: "/roster/submit" },
  ];

  const tacticalItems = [
    { label: "1: Rally Hosts", path: "/roster/tactical/host" },
    { label: "3: High Power", path: "/roster/tactical/high" },
    { label: "3: Mid Power", path: "/roster/tactical/mid" },
    { label: "3: Low Power", path: "/roster/tactical/low" },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <div className="flex min-h-screen bg-[#0B0F14]">
      {/* Sidebar - Command Tab with UI Highlighting */}
      <aside className="w-72 border-r border-[#1F2937] bg-[#111827]/80 backdrop-blur-xl p-8 sticky top-0 h-screen">
        <div className="mb-12 px-2">
          <h2 className="text-2xl font-black text-[#F59E0B] tracking-[0.2em] uppercase italic">
            Command
          </h2>
          <div className="h-1 w-12 bg-[#F59E0B] mt-2 shadow-[0_0_10px_#F59E0B]"></div>
        </div>
        
        <nav className="space-y-12">
          {/* Main Navigation */}
          <div>
            <p className="text-[10px] uppercase text-[#9CA3AF] mb-6 px-4 tracking-[0.3em] font-bold">Main Operations</p>
            <ul className="space-y-3">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link 
                    href={item.path} 
                    className={`block py-3 px-4 rounded-md text-sm transition-all border-l-2 ${
                      isActive(item.path) 
                        ? "bg-[#F59E0B]/10 border-[#F59E0B] text-[#F59E0B] font-bold" 
                        : "border-transparent text-[#9CA3AF] hover:text-[#f8fafc] hover:bg-[#1F2937]"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tactical Navigation */}
          <div>
            <p className="text-[10px] uppercase text-[#9CA3AF] mb-6 px-4 tracking-[0.3em] font-bold">Tactical (1:3:3:3)</p>
            <ul className="space-y-3">
              {tacticalItems.map((item) => (
                <li key={item.path}>
                  <Link 
                    href={item.path} 
                    className={`block py-3 px-4 rounded-md text-sm transition-all border-l-2 ${
                      isActive(item.path) 
                        ? "bg-[#3B82F6]/10 border-[#3B82F6] text-[#3B82F6] font-bold" 
                        : "border-transparent text-[#9CA3AF] hover:text-[#f8fafc] hover:bg-[#1F2937]"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </aside>

      <main className="flex-1 p-12 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}