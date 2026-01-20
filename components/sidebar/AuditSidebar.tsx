"use client";
import React from "react";
import { Route } from "@/types/route";
import { deleteRoute } from "@/app/actions";

interface AuditSidebarProps {
  routes: Route[];
  activeRoute: Route | null;
  setActiveRoute: (route: Route | null) => void;
  setResetTrigger: React.Dispatch<React.SetStateAction<number>>;
  isEditable: boolean;
}

export default function AuditSidebar({
  routes,
  activeRoute,
  setActiveRoute,
  isEditable,
}: AuditSidebarProps) {
  // ... (Modal logic remains the same)

  return (
    <div className="w-[40%] min-w-[450px] flex flex-col border-r-4 border-slate-900 bg-white z-20 shadow-2xl relative overflow-hidden">
      {/* CONDITIONAL RENDERING: LIST vs DETAIL */}
      {!activeRoute ? (
        /* --- LIST VIEW (The Table you just built) --- */
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <table className="w-full text-left table-fixed border-separate border-spacing-0 border-l border-slate-200">
            <thead className="sticky top-0 bg-slate-50 z-30 shadow-sm">
              <tr className="text-[10px] uppercase tracking-widest text-slate-500 font-black">
                <th className="px-5 py-4 border-b border-r border-slate-200 w-[35%] bg-slate-50">
                  Proposal / Person
                </th>
                <th className="px-5 py-4 border-b border-r border-slate-200 w-[20%] bg-slate-50">
                  Type
                </th>
                <th className="px-5 py-4 border-b border-r border-slate-200 bg-slate-50">
                  Endpoints
                </th>
                <th className="px-5 py-4 border-b border-r border-slate-200 text-right pr-6 bg-slate-50">
                  Dist
                </th>
              </tr>
            </thead>
            <tbody className="text-slate-900">
              {routes.map((route: Route) => (
                <tr
                  key={route.id}
                  onClick={() => setActiveRoute(route)}
                  className="group cursor-pointer transition-all duration-150 hover:bg-slate-50/80"
                >
                  <td className="px-5 py-5 align-top font-bold text-sm border-b border-r border-slate-100">
                    <span className="text-slate-800">{route.name}</span>
                    <div className="text-[10px] text-slate-400 font-bold uppercase mt-1">
                      ENG: {route.proposer}
                    </div>
                  </td>
                  <td className="px-5 py-5 align-top border-b border-r border-slate-100">
                    <div className="flex flex-wrap gap-1">
                      {route.tags?.map((tag: string, i: number) => (
                        <span
                          key={i}
                          className="text-[8px] font-black uppercase px-1.5 py-0.5 rounded bg-slate-900 text-white"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-5 py-5 align-top text-[9px] font-mono text-slate-500 border-b border-r border-slate-100 truncate">
                    {route.start}
                  </td>
                  <td className="px-5 py-5 text-right pr-6 align-top font-mono text-xs font-black text-slate-700 border-b border-r border-slate-100">
                    {route.distance}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        /* --- DETAIL VIEW (The Virtual URL View) --- */
        <div className="flex-1 flex flex-col bg-white animate-in fade-in slide-in-from-right-4 duration-300">
          {/* Header Action Bar */}
          <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <button
              onClick={() => setActiveRoute(null)}
              className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2 text-slate-400 hover:text-rose-600 transition-colors"
            >
              ← Back to All Proposals
            </button>
            <div className="text-[9px] font-mono text-slate-300 select-all">
              ID: {activeRoute.id}
            </div>
          </div>

          {/* Content Area */}
          <div className="p-10 space-y-8 overflow-y-auto flex-1 custom-scrollbar">
            <div>
              <div className="flex items-center gap-3 mb-2">
                {activeRoute.tags?.map((tag: string, i: number) => (
                  <span
                    key={i}
                    className="text-[9px] font-black uppercase px-2 py-1 bg-rose-600 text-white rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h2 className="text-4xl font-black text-slate-900 tracking-tighter leading-tight uppercase">
                {activeRoute.name}
              </h2>
              <p className="text-slate-400 font-bold uppercase tracking-widest mt-2 text-xs">
                Proposed by:{" "}
                <span className="text-slate-900">{activeRoute.proposer}</span>
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 border-2 border-slate-100 rounded-xl">
                <p className="text-[10px] font-black text-slate-400 uppercase mb-1">
                  Total Distance
                </p>
                <p className="text-xl font-mono font-black text-slate-900">
                  {activeRoute.distance}
                </p>
              </div>
              {/*<div className="p-4 bg-slate-50 border-2 border-slate-100 rounded-xl">
                <p className="text-[10px] font-black text-slate-400 uppercase mb-1">
                  Last Updated
                </p>
                <p className="text-xl font-mono font-black text-slate-900 decoration-2">
                  Jan. 19, 2026
                </p>
              </div>*/}
            </div>

            <div className="space-y-4">
              <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-widest border-b-2 border-slate-900 pb-1 inline-block">
                Geospatial Endpoints
              </h4>
              <div className="space-y-2 font-mono text-xs">
                <div className="flex gap-4 items-center">
                  <span className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-[10px]">
                    A
                  </span>
                  <span className="text-slate-600">{activeRoute.start}</span>
                </div>
                <div className="flex gap-4 items-center">
                  <span className="w-6 h-6 rounded-full border-2 border-slate-900 flex items-center justify-center font-bold text-[10px]">
                    B
                  </span>
                  <span className="text-slate-600">{activeRoute.end}</span>
                </div>
              </div>
            </div>

            <div className="prose prose-slate prose-sm max-w-none">
              <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-widest mb-4">
                Rationale
              </h4>
              <p className="text-slate-600 leading-relaxed italic">
                {activeRoute.description ||
                  "The proposer has provided no written rationale for this infrastructure layout. Contact the lead engineer for data logs."}
              </p>
            </div>
          </div>

          {/* Footer Management Section */}
          <div className="p-8 border-t-4 border-slate-900 bg-slate-50 space-y-4">
            {isEditable ? (
              <div className="flex gap-3">
                {/*<button className="flex-1 py-3 bg-white border-2 border-slate-900 text-slate-900 font-black text-[10px] uppercase rounded-xl hover:bg-slate-900 hover:text-white transition-all">
                  Edit Proposal
                </button>*/}
                <button
                  onClick={async () => {
                    if (
                      activeRoute?.manageKey &&
                      confirm("Are you sure you want to delete this proposal?")
                    ) {
                      await deleteRoute(activeRoute.id, activeRoute.manageKey);
                    }
                  }}
                  className="flex-1 py-3 bg-rose-50 border-2 border-rose-200 text-rose-600 font-black text-[10px] uppercase rounded-xl hover:bg-rose-600 hover:text-white transition-all"
                >
                  Delete Proposal (WARNING: CANNOT BE REVERSED)
                </button>
              </div>
            ) : (
              <p className="text-[10px] font-bold text-slate-400 text-center uppercase tracking-tighter">
                Looking to modify this entry? Please use your private management
                link.
              </p>
            )}
          </div>
        </div>
      )}

      {/* MODAL SYSTEM */}
      {/* ... keep your existing isModalOpen logic here ... */}
    </div>
  );
}
