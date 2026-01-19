"use client";
import React from "react";

export default function Header() {
  return (
    <header className="w-full bg-white border-b-4 border-slate-900 px-8 py-4 flex justify-between items-center z-[2000] shadow-sm">
      {/* LEFT SIDE: LOGO & TAGLINE */}
      <div className="flex items-center">
        <h1 className="text-2xl font-black tracking-tighter text-rose-600 leading-none">
          BORING_VIEWER
        </h1>
        <span className="ml-4 border-l-2 border-slate-200 pl-4 text-[10px] font-black text-slate-900 uppercase tracking-widest pt-1">
          A community hub for the tunnel vision challenge
        </span>
      </div>

      {/* RIGHT SIDE: NAV & ACTION */}
      <div className="flex items-center gap-10">
        <nav className="flex gap-8 text-[10px] font-black text-slate-400 tracking-widest pt-1">
          <a
            href="https://www.boringcompany.com/tunnelvision"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-rose-600 transition-colors flex items-center gap-1"
          >
            OFFICIAL CHALLENGE WEBSITE <span className="text-[8px]">↗</span>
          </a>

          <a
            href="/disclaimer.txt"
            target="_blank"
            className="hover:text-rose-600 transition-colors flex items-center gap-1"
          >
            DISCLAIMER <span className="text-[8px]">↗</span>
          </a>

          <a
            href="https://github.com/jawadkazi/boring-viewer"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-rose-600 transition-colors flex items-center gap-1"
          >
            GITHUB <span className="text-[8px]">↗</span>
          </a>
          <a
            href="https://discord.gg/65KR6WZa"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-rose-600 transition-colors flex items-center gap-1"
          >
            DISCORD <span className="text-[8px]">↗</span>
          </a>
        </nav>

        {/* UPLOAD BUTTON */}
        <button className="bg-slate-900 text-white px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-600 transition-all active:scale-95 shadow-lg border border-white/10">
          Upload Proposal
        </button>
      </div>
    </header>
  );
}
