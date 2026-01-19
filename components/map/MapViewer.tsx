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
import { useEffect, useMemo } from "react";
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
}: {
  routes: Route[];
  activeRoute: Route | null;
  resetTrigger: number;
  onRouteClick: (route: Route) => void;
}) {
  return (
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
      <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />

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
  );
}
