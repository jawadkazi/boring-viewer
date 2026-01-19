import { Route } from "@/types/route";

export const ROUTES: Route[] = [
  {
    id: "7b2a9e1c4f934e2b",
    manageKey: "m-9921-x-secret1",
    name: "LVCC West Loop",
    proposer: "T. Tunneler",
    distance: "0.85 mi",
    start: "3150 Paradise Rd",
    end: "3000 S Las Vegas Blvd",
    path: [
      [36.131, -115.151],
      [36.135, -115.161],
    ],
    color: "#e11d48",
    tags: ["PASSENGER", "ACTIVE"],
    description:
      "Primary transit artery connecting the West Hall to the main LVCC campus. Utilizes high-occupancy AEVs to reduce surface congestion by 40%.",
  },
  {
    id: "f93e22a11c5b4e2b",
    manageKey: "m-1102-k-private",
    name: "SpaceX Hawthorne",
    proposer: "E. Musk",
    distance: "0.92 mi",
    start: "1 Rocket Rd",
    end: "12800 Crenshaw Blvd",
    path: [
      [33.92, -118.327],
      [33.921, -118.342],
    ],
    color: "#e11d48",
    tags: ["R&D", "TEST TUNNEL"],
    description:
      "Experimental proof-of-concept for the Prufrock boring machine. This segment served as the initial testbed for rapid-launch tunnel deployment.",
  },
  {
    id: "a8d16c5b9a2e4e2b",
    manageKey: "m-5541-z-manager",
    name: "Giga Texas Utility",
    proposer: "A. Sterling",
    distance: "0.78 mi",
    start: "1 Tesla Rd",
    end: "13101 Harold Green Rd",
    path: [
      [30.222, -97.618],
      [30.231, -97.625],
    ],
    color: "#e11d48",
    tags: ["UTILITY", "WATER"],
    description:
      "Subterranean infrastructure layer for high-capacity fluid transport and electrical busbars. Optimized for high-speed maintenance access via automated sleds.",
  },
];
