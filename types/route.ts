import L from "leaflet";

export interface Route {
  id: string;
  name: string;
  proposer: string;
  distance: string;
  start: string;
  end: string;
  path: [number, number][];
  color: string;
}
