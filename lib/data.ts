import { neon } from "@neondatabase/serverless";
import { Route } from "@/types/route";

const sql = neon(process.env.DATABASE_URL!);

export async function getRoutes(): Promise<Route[]> {
  const data = await sql`
    SELECT
      id,
      manage_key,
      name,
      proposer,
      tags,
      start_address,
      end_address,
      path_start_lat,
      path_start_lng,
      path_end_lat,
      path_end_lng,
      description,
      distance_display,
      color
    FROM proposals
  `;

  return data.map((row) => ({
    id: row.id,
    manageKey: row.manage_key,
    name: row.name,
    proposer: row.proposer,
    distance: row.distance_display,
    start: row.start_address,
    end: row.end_address,
    path: [
      [row.path_start_lat, row.path_start_lng],
      [row.path_end_lat, row.path_end_lng],
    ],
    color: row.color,
    tags: row.tags,
    description: row.description,
  }));
}
