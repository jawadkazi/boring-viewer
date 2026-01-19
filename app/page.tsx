"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";

// Components
import AuditSidebar from "@/components/sidebar/AuditSidebar";
import { ROUTES } from "@/data/routes";
import { Route } from "@/types/route";

// Dynamic Map Import (Prevents Leaflet SSR errors)
const MapViewer = dynamic(() => import("@/components/map/MapViewer"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-slate-100 flex items-center justify-center">
      <div className="animate-pulse font-mono text-slate-400 text-[10px] uppercase tracking-[0.3em]">
        Loading Geospatial Data...
      </div>
    </div>
  ),
});

export default function BoringAuditLog() {
  const [activeRoute, setActiveRoute] = useState<Route | null>(null);
  const [resetTrigger, setResetTrigger] = useState(0);

  return (
    <main className="flex h-screen w-full bg-slate-50 overflow-hidden font-sans">
      {/* Sidebar Section */}
      <AuditSidebar
        routes={ROUTES}
        activeRoute={activeRoute}
        setActiveRoute={setActiveRoute}
        setResetTrigger={setResetTrigger}
      />

      {/* Map Section */}
      <section className="flex-1 relative bg-slate-100">
        <MapViewer
          routes={ROUTES}
          activeRoute={activeRoute}
          resetTrigger={resetTrigger}
          onRouteClick={setActiveRoute}
        />
      </section>
    </main>
  );
}
