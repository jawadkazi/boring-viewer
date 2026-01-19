"use client";
import {
  MapContainer,
  TileLayer,
  Polyline,
  Marker,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import { Route } from "@/types/route";

const dotIcon = (color: string) =>
  new L.DivIcon({
    html: `<div style="background-color: ${color}; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 8px rgba(0,0,0,0.2);"></div>`,
    className: "",
    iconSize: [12, 12],
  });

function MapController({
  activeRoute,
  resetTrigger,
}: {
  activeRoute: Route | null;
  resetTrigger: number;
}) {
  const map = useMap();

  useEffect(() => {
    if (activeRoute) {
      const bounds = L.latLngBounds(activeRoute.path as L.LatLngExpression[]);
      map.flyToBounds(bounds, { padding: [250, 250], duration: 1.5 });
    } else if (resetTrigger > 0) {
      map.flyTo([38, -97], 4, { duration: 1.5 });
    }
  }, [activeRoute, resetTrigger, map]);

  return null;
}

export default function MapViewer({
  routes,
  activeRoute,
  resetTrigger,
  onRouteClick,
  onReset,
}: {
  routes: Route[];
  activeRoute: Route | null;
  resetTrigger: number;
  onRouteClick: (route: Route) => void;
  onReset: () => void;
}) {
  return (
    <div className="relative h-full w-full">
      {/* MAP COMPONENT */}
      <MapContainer
        center={[38, -97]}
        zoom={4}
        minZoom={4}
        maxBounds={[
          [15, -135],
          [55, -65],
        ]}
        maxBoundsViscosity={1.0}
        zoomControl={false}
        className="h-full w-full"
      >
        {/* CHANGED TO COLORFUL OPENSTREETMAP TILES */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {routes.map((route) => (
          <Marker
            key={`dot-${route.id}`}
            position={route.path[0] as L.LatLngExpression}
            icon={dotIcon(route.color)}
            eventHandlers={{ click: () => onRouteClick(route) }}
          />
        ))}

        {activeRoute && (
          <>
            <Polyline
              positions={activeRoute.path as L.LatLngExpression[]}
              pathOptions={{
                color: activeRoute.color,
                weight: 7,
                lineCap: "round",
                opacity: 0.9,
                dashArray: "1, 12",
              }}
            />
            <Marker
              position={activeRoute.path[1] as L.LatLngExpression}
              icon={dotIcon(activeRoute.color)}
            />
          </>
        )}
        <MapController activeRoute={activeRoute} resetTrigger={resetTrigger} />
      </MapContainer>

      {/* FLOATING RESET BUTTON */}
      <div className="absolute bottom-6 right-6 z-[1000] w-48">
        <button
          onClick={onReset}
          className="w-full text-[11px] font-black uppercase bg-slate-900 text-white py-4 rounded-xl hover:bg-slate-800 transition-all tracking-widest shadow-2xl active:scale-95 border border-white/10"
        >
          Reset Map View
        </button>
      </div>
    </div>
  );
}
