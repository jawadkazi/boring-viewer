"use client";
import React, { useState, useRef, useEffect } from "react";
import { Route } from "@/types/route";

export default function AuditSidebar({
  routes,
  activeRoute,
  setActiveRoute,
  setResetTrigger,
}: any) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [coords, setCoords] = useState(["", ""]);
  const modalRef = useRef<HTMLDivElement>(null);

  // Close modal when clicking outside of the white box
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setIsModalOpen(false);
      }
    }
    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isModalOpen]);

  const addCoordField = () => setCoords([...coords, ""]);

  return (
    <div className="w-[32%] min-w-[450px] flex flex-col border-r bg-white z-20 shadow-2xl relative">
      {/* HEADER SECTION */}
      <div className="p-6 border-b bg-white">
        <h1 className="text-2xl font-black tracking-tighter text-slate-900 leading-none">
          BORING_VIEWER
        </h1>
        <div className="mt-2 text-[10px] font-bold text-slate-900 uppercase tracking-[0.2em]">
          BUILT FOR THE{" "}
          <a
            href="https://www.boringcompany.com/tunnelvision"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-block text-rose-600 transition-all"
          >
            <span className="relative font-black">
              tunnelvision challenge
              <span className="absolute left-0 -bottom-0.5 w-0 h-[1.5px] bg-rose-600 transition-all duration-300 group-hover:w-full" />
            </span>
          </a>
        </div>

        <div className="mt-6">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mb-1">
            January 18, 2026
          </p>
          <h2 className="text-lg font-black text-slate-900 uppercase tracking-tight leading-tight">
            The Tunnel Vision Challenge
          </h2>
          <p className="text-[12px] leading-relaxed text-slate-600 mt-2">
            TBC invites you to submit your proposal for a tunnel project up to 1
            mile in length. Prufrock is designed to construct
            mega-infrastructure projects in weeks instead of years.
          </p>
        </div>
      </div>

      {/* TABLE SECTION */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <table className="w-full text-left table-fixed border-separate border-spacing-0">
          <thead className="sticky top-0 bg-white z-30 shadow-sm">
            <tr className="text-[10px] uppercase tracking-widest text-slate-400 font-black">
              <th className="px-5 py-3 border-b w-1/2">Proposal / Person</th>
              <th className="px-5 py-3 border-b">Endpoints</th>
              <th className="px-5 py-3 border-b text-right pr-6">Dist</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr
              onClick={() => setIsModalOpen(true)}
              className="cursor-pointer bg-slate-50 hover:bg-rose-50/50 transition-colors group"
            >
              <td colSpan={3} className="px-5 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-200 group-hover:bg-rose-600 group-hover:text-white transition-colors text-slate-500 font-bold text-lg">
                    +
                  </div>
                  <div>
                    <div className="text-[11px] font-black uppercase text-slate-900 tracking-tight">
                      Upload Your Submission
                    </div>
                    <div className="text-[9px] font-bold text-slate-400 uppercase">
                      Add to community log
                    </div>
                  </div>
                </div>
              </td>
            </tr>

            {routes.map((route: Route) => (
              <tr
                key={route.id}
                onClick={() => setActiveRoute(route)}
                className={`cursor-pointer transition-all duration-200 hover:bg-slate-50 ${
                  activeRoute?.id === route.id ? "bg-rose-50/50" : ""
                }`}
              >
                <td className="px-5 py-5 align-top font-bold text-sm">
                  <span
                    className={
                      activeRoute?.id === route.id
                        ? "text-rose-600"
                        : "text-slate-800"
                    }
                  >
                    {route.name}
                  </span>
                  <div className="text-[10px] text-slate-400 font-bold uppercase mt-1">
                    ENG: {route.proposer}
                  </div>
                </td>
                <td className="px-5 py-5 align-top text-[9px] font-mono text-slate-500">
                  <div>
                    <span className="text-rose-400 font-bold">A:</span>{" "}
                    {route.start}
                  </div>
                  <div>
                    <span className="text-slate-300 font-bold">B:</span>{" "}
                    {route.end}
                  </div>
                </td>
                <td className="px-5 py-5 text-right pr-6 align-top font-mono text-xs font-black text-slate-700">
                  {route.distance}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* FOOTER */}
      <div className="p-6 border-t bg-white">
        <button
          onClick={() => {
            setActiveRoute(null);
            setResetTrigger((t: number) => t + 1);
          }}
          className="w-full text-[11px] font-black uppercase bg-slate-900 text-white py-4 rounded-xl hover:bg-slate-800 transition-all tracking-widest shadow-xl active:scale-95"
        >
          Reset Map View
        </button>
        <p className="mt-4 text-[9px] leading-relaxed text-slate-400 px-2 font-medium">
          <span className="text-rose-600 font-bold uppercase">Disclaimer:</span>{" "}
          This is a community tool
          <span className="font-bold">
            {" "}
            NOT affiliated with The Boring Company.
          </span>{" "}
          To be official, email:
          <a
            href="mailto:tunnelvision@boringcompany.com"
            className="text-rose-500 underline ml-1"
          >
            tunnelvision@boringcompany.com
          </a>
        </p>
      </div>

      {/* OVERLAY MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 z-[9999] flex items-center justify-center p-4">
          <div
            ref={modalRef}
            className="bg-white rounded-3xl w-full max-w-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            <div className="p-8 border-b flex justify-between items-center">
              <div>
                <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter leading-none">
                  New Submission
                </h3>
                <p className="text-[10px] font-bold text-rose-600 uppercase tracking-widest mt-2">
                  Audit Entry System
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-900 text-xl"
              >
                ✕
              </button>
            </div>

            <div className="p-8 overflow-y-auto space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <input
                  placeholder="EMAIL ADDRESS"
                  className="border-b border-slate-200 py-2 text-[11px] font-bold outline-none focus:border-rose-500"
                />
                <input
                  placeholder="TUNNEL NAME"
                  className="border-b border-slate-200 py-2 text-[11px] font-bold outline-none focus:border-rose-500"
                />
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center text-[10px] font-black text-slate-400 uppercase">
                  <span>Coordinates (Lat, Lng)</span>
                  <button onClick={addCoordField} className="text-rose-600">
                    + Add Point
                  </button>
                </div>
                {coords.map((_, i) => (
                  <input
                    key={i}
                    placeholder={
                      i === 0
                        ? "START POINT"
                        : i === coords.length - 1
                          ? "END POINT"
                          : "MID POINT"
                    }
                    className="w-full bg-slate-50 rounded-lg px-4 py-2 text-[10px] font-mono outline-none border border-transparent focus:border-rose-500"
                  />
                ))}
              </div>

              <textarea
                rows={4}
                placeholder="PROPOSAL DESCRIPTION (MARKDOWN)"
                className="w-full bg-slate-50 rounded-lg p-4 text-[11px] font-mono outline-none border border-transparent focus:border-rose-500 resize-none"
              />
            </div>

            <div className="p-8 border-t bg-slate-50 flex gap-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex-1 py-4 text-[10px] font-black uppercase text-slate-400"
              >
                Cancel
              </button>
              <button className="flex-[2] py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase hover:bg-black transition-all">
                Generate Proposal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
