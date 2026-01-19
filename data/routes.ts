import { Route } from "@/types/route";

export const ROUTES: Route[] = [
  {
    id: "v1",
    name: "LVCC West Loop",
    proposer: "T. Tunneler",
    distance: "0.85 mi",
    start: "3150 Paradise Rd",
    end: "3000 S Las Vegas Blvd",
    path: [
      [36.131, -115.151],
      [36.135, -115.161],
    ],
    color: "#ef4444",
  },
  {
    id: "v2",
    name: "SpaceX Hawthorne",
    proposer: "E. Musk",
    distance: "0.92 mi",
    start: "1 Rocket Rd",
    end: "12800 Crenshaw Blvd",
    path: [
      [33.92, -118.327],
      [33.921, -118.342],
    ],
    color: "#3b82f6",
  },
  {
    id: "v3",
    name: "Giga Texas Utility",
    proposer: "A. Sterling",
    distance: "0.78 mi",
    start: "1 Tesla Rd",
    end: "13101 Harold Green Rd",
    path: [
      [30.222, -97.618],
      [30.231, -97.625],
    ],
    color: "#10b981",
  },
];
