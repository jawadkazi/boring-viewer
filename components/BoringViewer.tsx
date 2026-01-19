"use client";
import React, { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

// Components
import Header from "@/components/layout/Header";
import AuditSidebar from "@/components/sidebar/AuditSidebar";
import { ROUTES } from "@/data/routes";
import { Route } from "@/types/route";

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

interface BoringViewerProps {
  slug?: string;
}

export default function BoringViewer({ slug }: BoringViewerProps) {
  const router = useRouter();
  const [resetTrigger, setResetTrigger] = useState(0);

  // Derive activeRoute and isEditable from the URL slug
  const { activeRoute, isEditable } = useMemo(() => {
    if (!slug) return { activeRoute: null, isEditable: false };

    // 1. Check for Manage Key (Private / Editable)
    const privateRoute = ROUTES.find((r) => r.manageKey === slug);
    if (privateRoute) {
      return { activeRoute: privateRoute, isEditable: true };
    }

    // 2. Check for Public ID (View Only)
    const publicRoute = ROUTES.find((r) => r.id === slug);
    if (publicRoute) {
      return { activeRoute: publicRoute, isEditable: false };
    }

    // 3. Not found - treat as no selection
    return { activeRoute: null, isEditable: false };
  }, [slug]);

  const handleRouteSelect = (route: Route | null) => {
    if (route) {
      // If we are currently in edit mode for this specific route, don't navigate away
      // (This prevents switching from the secret manage URL to the public ID URL when clicking the active route)
      if (isEditable && activeRoute?.id === route.id) {
        return;
      }

      // Otherwise, navigate to the public ID URL for the selected route
      router.push(`/${route.id}`);
    } else {
      // Clear selection -> navigate to root
      router.push("/");
    }
  };

  const handleMapReset = () => {
    router.push("/");
    setResetTrigger((prev) => prev + 1);
  };

  return (
    <main className="flex flex-col h-screen w-full bg-slate-50 overflow-hidden font-sans">
      {/* GLOBAL HEADER */}
      <Header />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Section */}
        <AuditSidebar
          routes={ROUTES}
          activeRoute={activeRoute}
          setActiveRoute={handleRouteSelect}
          setResetTrigger={setResetTrigger}
          isEditable={isEditable}
        />

        {/* Map Section */}
        <section className="flex-1 relative bg-slate-100">
          <MapViewer
            routes={ROUTES}
            activeRoute={activeRoute}
            resetTrigger={resetTrigger}
            onRouteClick={handleRouteSelect}
            onReset={handleMapReset}
          />
        </section>
      </div>
    </main>
  );
}
