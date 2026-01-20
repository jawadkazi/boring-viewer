"use server";

import { neon } from "@neondatabase/serverless";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const sql = neon(process.env.DATABASE_URL!);

export async function deleteRoute(id: string, manageKey: string) {
  try {
    await sql`
      DELETE FROM proposals
      WHERE id = ${id} AND manage_key = ${manageKey}
    `;

    revalidatePath("/");
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to delete route.");
  }

  redirect("/");
}

export async function createRoute(formData: FormData) {
  const name = formData.get("name") as string;
  const proposer = formData.get("proposer") as string;
  const tags = (formData.get("tags") as string)
    ?.split(",")
    .map((tag) => tag.trim())
    .filter((tag) => tag.length > 0);
  const startAddress = formData.get("start_address") as string;
  const endAddress = formData.get("end_address") as string;
  const pathStartLat = parseFloat(formData.get("path_start_lat") as string);
  const pathStartLng = parseFloat(formData.get("path_start_lng") as string);
  const pathEndLat = parseFloat(formData.get("path_end_lat") as string);
  const pathEndLng = parseFloat(formData.get("path_end_lng") as string);
  const description = formData.get("description") as string;
  const distance = formData.get("distance_display") as string;
  const color = (formData.get("color") as string) || "#e11d48";

  try {
    const result = await sql`
      INSERT INTO proposals (
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
        ${name},
        ${proposer},
        ${tags},
        ${startAddress},
        ${endAddress},
        ${pathStartLat},
        ${pathStartLng},
        ${pathEndLat},
        ${pathEndLng},
        ${description},
        ${distance},
        ${color}
      )
      RETURNING id, manage_key
    `;

    revalidatePath("/");
    return { success: true, data: result[0] };
  } catch (error) {
    console.error("Create Route Error:", error);
    return { success: false, error: "Failed to create proposal." };
  }
}
