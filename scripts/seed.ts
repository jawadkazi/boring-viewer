import { neon } from "@neondatabase/serverless";
import { ROUTES } from "../data/routes";

const sql = neon(process.env.DATABASE_URL!);

async function seed() {
  console.log("Starting seed...");

  for (const route of ROUTES) {
    await sql`
      INSERT INTO proposals (
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
      ) VALUES (
        ${route.id},
        ${route.manageKey},
        ${route.name},
        ${route.proposer},
        ${route.tags},
        ${route.start},
        ${route.end},
        ${route.path[0][0]}, -- Start Lat
        ${route.path[0][1]}, -- Start Lng
        ${route.path[1][0]}, -- End Lat
        ${route.path[1][1]}, -- End Lng
        ${route.description},
        ${route.distance},
        ${route.color}
      )
    `;
  }

  console.log("Seed complete! 15 records uploaded to Neon.");
}

seed().catch((err) => {
  console.error("Seed failed:", err);
});
