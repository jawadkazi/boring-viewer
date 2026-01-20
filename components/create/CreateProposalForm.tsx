"use client";

import React, { useState } from "react";
import { createRoute } from "@/app/actions";
import { useRouter } from "next/navigation";

export default function CreateProposalForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<{
    id: string;
    manage_key: string;
  } | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(event.currentTarget);

    // Basic validation for tags limit
    const tagsString = formData.get("tags") as string;
    const tags = tagsString
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);
    if (tags.length > 4) {
      setError("Maximum 4 tags allowed.");
      setIsSubmitting(false);
      return;
    }

    try {
      const result = await createRoute(formData);
      if (result.success && result.data) {
        setSuccessData(result.data);
      } else {
        setError(result.error || "Something went wrong.");
      }
    } catch {
      setError("An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (successData) {
    return (
      <div className="fixed inset-0 z-[3000] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border-4 border-slate-900 animate-in fade-in zoom-in duration-300">
          <div className="bg-slate-900 p-6 text-center">
            <h2 className="text-2xl font-black text-white uppercase tracking-tighter">
              Proposal Created!
            </h2>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-2">
              Save these links immediately
            </p>
          </div>

          <div className="p-8 space-y-6">
            <div className="bg-rose-50 border-2 border-rose-100 p-4 rounded-xl text-center">
              <p className="text-rose-600 font-bold text-xs leading-relaxed">
                WARNING: We do not store your manage key in your browser. If you
                lose these links, you will lose access to edit or delete your
                proposal forever.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest block mb-1">
                  Public View Link
                </label>
                <div className="flex gap-2">
                  <input
                    readOnly
                    value={`${window.location.origin}/${successData.id}`}
                    className="flex-1 bg-slate-100 border-2 border-slate-200 rounded-lg px-3 py-2 text-xs font-mono text-slate-600 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      navigator.clipboard.writeText(
                        `${window.location.origin}/${successData.id}`,
                      )
                    }
                    className="bg-slate-200 hover:bg-slate-300 text-slate-600 px-3 rounded-lg font-bold text-xs uppercase"
                  >
                    Copy
                  </button>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black uppercase text-rose-500 tracking-widest block mb-1">
                  Private Manage Link (Secret)
                </label>
                <div className="flex gap-2">
                  <input
                    readOnly
                    value={`${window.location.origin}/${successData.manage_key}`}
                    className="flex-1 bg-rose-50 border-2 border-rose-100 rounded-lg px-3 py-2 text-xs font-mono text-rose-600 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      navigator.clipboard.writeText(
                        `${window.location.origin}/${successData.manage_key}`,
                      )
                    }
                    className="bg-rose-100 hover:bg-rose-200 text-rose-600 px-3 rounded-lg font-bold text-xs uppercase"
                  >
                    Copy
                  </button>
                </div>
              </div>
            </div>

            <button
              onClick={() => router.push(`/${successData.id}`)}
              className="w-full bg-slate-900 text-white py-4 rounded-xl font-black uppercase tracking-widest hover:bg-slate-800 transition-all"
            >
              Go to Proposal
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto bg-white border-4 border-slate-900 shadow-2xl rounded-xl overflow-hidden my-10">
      <div className="bg-slate-50 border-b border-slate-200 p-8 text-center">
        <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">
          Submit New Proposal
        </h2>
        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-2">
          Enter technical specifications for the boring machine
        </p>
      </div>

      <form onSubmit={onSubmit} className="p-8 space-y-8">
        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-600 px-4 py-3 rounded-lg text-xs font-bold uppercase">
            {error}
          </div>
        )}

        {/* Section 1: Identity */}
        <div className="space-y-4">
          <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-widest border-b-2 border-slate-100 pb-2">
            Identification
          </h3>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                Project Name <span className="text-rose-500">*</span>
              </label>
              <input
                name="name"
                required
                maxLength={30}
                placeholder="e.g. Vegas Loop Extension"
                className="w-full bg-slate-50 border-2 border-slate-200 focus:border-slate-900 rounded-lg px-4 py-3 text-sm font-bold text-slate-900 outline-none transition-colors placeholder:text-slate-300"
              />
              <p className="text-[9px] text-slate-400 text-right">
                Max 30 chars
              </p>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                Proposer Name <span className="text-rose-500">*</span>
              </label>
              <input
                name="proposer"
                required
                maxLength={20}
                placeholder="e.g. J. Smith"
                className="w-full bg-slate-50 border-2 border-slate-200 focus:border-slate-900 rounded-lg px-4 py-3 text-sm font-bold text-slate-900 outline-none transition-colors placeholder:text-slate-300"
              />
              <p className="text-[9px] text-slate-400 text-right">
                Max 20 chars
              </p>
            </div>
          </div>
        </div>

        {/* Section 2: Metadata */}
        <div className="space-y-4">
          <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-widest border-b-2 border-slate-100 pb-2">
            Classification
          </h3>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                Tags (Comma Separated)
              </label>
              <input
                name="tags"
                placeholder="TRANSIT, URBAN, TEST"
                className="w-full bg-slate-50 border-2 border-slate-200 focus:border-slate-900 rounded-lg px-4 py-3 text-sm font-bold text-slate-900 outline-none transition-colors placeholder:text-slate-300"
              />
              <p className="text-[9px] text-slate-400 text-right">Max 4 tags</p>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                Route Color
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  name="color"
                  defaultValue="#e11d48"
                  className="h-12 w-12 rounded-lg border-2 border-slate-200 p-1 cursor-pointer"
                />
                <span className="text-xs text-slate-400 font-mono">
                  Pick a hex color
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Geospatial */}
        <div className="space-y-4">
          <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-widest border-b-2 border-slate-100 pb-2">
            Geospatial Data
          </h3>

          {/* Start Point */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-[10px]">
                A
              </span>
              <h4 className="text-xs font-black uppercase text-slate-700">
                Start Point
              </h4>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                Address Name <span className="text-rose-500">*</span>
              </label>
              <input
                name="start_address"
                required
                maxLength={255}
                className="w-full bg-white border-2 border-slate-200 focus:border-slate-900 rounded-lg px-3 py-2 text-sm text-slate-900 outline-none"
                placeholder="e.g. Convention Center"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  Latitude <span className="text-rose-500">*</span>
                </label>
                <input
                  type="number"
                  step="any"
                  name="path_start_lat"
                  required
                  className="w-full bg-white border-2 border-slate-200 focus:border-slate-900 rounded-lg px-3 py-2 text-sm font-mono text-slate-900 outline-none"
                  placeholder="36.1234"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  Longitude <span className="text-rose-500">*</span>
                </label>
                <input
                  type="number"
                  step="any"
                  name="path_start_lng"
                  required
                  className="w-full bg-white border-2 border-slate-200 focus:border-slate-900 rounded-lg px-3 py-2 text-sm font-mono text-slate-900 outline-none"
                  placeholder="-115.1234"
                />
              </div>
            </div>
          </div>

          {/* End Point */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-5 h-5 rounded-full border-2 border-slate-900 flex items-center justify-center font-bold text-[10px]">
                B
              </span>
              <h4 className="text-xs font-black uppercase text-slate-700">
                End Point
              </h4>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                Address Name <span className="text-rose-500">*</span>
              </label>
              <input
                name="end_address"
                required
                maxLength={255}
                className="w-full bg-white border-2 border-slate-200 focus:border-slate-900 rounded-lg px-3 py-2 text-sm text-slate-900 outline-none"
                placeholder="e.g. Strip Terminal"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  Latitude <span className="text-rose-500">*</span>
                </label>
                <input
                  type="number"
                  step="any"
                  name="path_end_lat"
                  required
                  className="w-full bg-white border-2 border-slate-200 focus:border-slate-900 rounded-lg px-3 py-2 text-sm font-mono text-slate-900 outline-none"
                  placeholder="36.5678"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  Longitude <span className="text-rose-500">*</span>
                </label>
                <input
                  type="number"
                  step="any"
                  name="path_end_lng"
                  required
                  className="w-full bg-white border-2 border-slate-200 focus:border-slate-900 rounded-lg px-3 py-2 text-sm font-mono text-slate-900 outline-none"
                  placeholder="-115.5678"
                />
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              Display Distance <span className="text-rose-500">*</span>
            </label>
            <input
              name="distance_display"
              required
              maxLength={20}
              placeholder="e.g. 1.25 mi"
              className="w-full bg-slate-50 border-2 border-slate-200 focus:border-slate-900 rounded-lg px-4 py-3 text-sm font-bold text-slate-900 outline-none transition-colors placeholder:text-slate-300"
            />
          </div>
        </div>

        {/* Section 4: Details */}
        <div className="space-y-4">
          <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-widest border-b-2 border-slate-100 pb-2">
            Rationale
          </h3>
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              Description
            </label>
            <textarea
              name="description"
              maxLength={5000}
              rows={5}
              placeholder="Explain the purpose and engineering challenges..."
              className="w-full bg-slate-50 border-2 border-slate-200 focus:border-slate-900 rounded-lg px-4 py-3 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-300 resize-none"
            />
            <p className="text-[9px] text-slate-400 text-right">
              Max 5000 chars
            </p>
          </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-rose-600 text-white py-4 rounded-xl font-black uppercase tracking-widest hover:bg-rose-700 transition-all shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Uploading..." : "Upload Proposal"}
          </button>
        </div>
      </form>
    </div>
  );
}
