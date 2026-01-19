export interface Route {
  id: string; // Public UUID for the virtual URL
  manageKey?: string; // Private key for editing (optional for public routes)
  name: string;
  proposer: string;
  distance: string;
  start: string;
  end: string;
  path: [number, number][];
  color: string;
  tags: string[];
  description?: string; // For the "Rationale" section in Detail View
  timestamp?: string; // Helpful for ordering the Audit Log
}
