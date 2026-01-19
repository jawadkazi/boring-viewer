"use client";
import React, { useState } from "react";

interface SubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SubmissionModal({
  isOpen,
  onClose,
}: SubmissionModalProps) {
  const [coords, setCoords] = useState(["", ""]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4"
      onClick={onClose} // Clicking the background closes it
    >
      <div
        className="bg-white w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()} // Prevents clicking inside the box from closing it
      >
        {/* Modal Header */}
        <div className="px-8 py-6 border-b flex justify-between items-center bg-white">
          <div>
            <h2 className="text-xl font-black tracking-tighter text-slate-900">
              SUBMIT_PROPOSAL
            </h2>
            <p className="text-[10px] font-bold text-rose-600 uppercase tracking-widest mt-1">
              Community Infrastructure Project
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400"
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-8 overflow-y-auto space-y-6 custom-scrollbar">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider">
                Email Address
              </label>
              <input
                type="email"
                placeholder="engineer@boring.com"
                className="w-full border-b border-slate-200 py-2 text-sm focus:border-rose-500 outline-none transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider">
                Project Name
              </label>
              <input
                type="text"
                placeholder="The Vegas Spur"
                className="w-full border-b border-slate-200 py-2 text-sm focus:border-rose-500 outline-none transition-colors"
              />
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider">
                Path Coordinates (Lat, Lng)
              </label>
              <button
                onClick={() => setCoords([...coords, ""])}
                className="text-[10px] font-bold text-rose-600 hover:text-rose-700 uppercase"
              >
                + Add Waypoint
              </button>
            </div>
            {coords.map((_, i) => (
              <input
                key={i}
                placeholder={
                  i === 0
                    ? "Start Point"
                    : i === coords.length - 1
                      ? "End Point"
                      : `Waypoint ${i}`
                }
                className="w-full border border-slate-100 bg-slate-50 rounded-lg px-4 py-2 text-xs font-mono focus:ring-1 ring-rose-500 outline-none"
              />
            ))}
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider">
              Proposal (Markdown)
            </label>
            <textarea
              rows={5}
              placeholder="# Purpose of the Tunnel..."
              className="w-full border border-slate-100 bg-slate-50 rounded-lg p-4 text-sm font-mono focus:ring-1 ring-rose-500 outline-none resize-none"
            />
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-8 border-t bg-slate-50 flex gap-4">
          <button
            onClick={onClose}
            className="flex-1 py-4 text-[11px] font-black uppercase text-slate-400 hover:text-slate-600 transition-colors"
          >
            Discard
          </button>
          <button className="flex-[2] py-4 bg-slate-900 text-white rounded-2xl text-[11px] font-black uppercase hover:shadow-lg active:scale-[0.98] transition-all">
            Upload to Audit Log
          </button>
        </div>
      </div>
    </div>
  );
}
