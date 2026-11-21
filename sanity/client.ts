import { createClient } from "next-sanity";
import { apiVersion, dataset, hasSanity, projectId } from "./env";

/** null until NEXT_PUBLIC_SANITY_PROJECT_ID is set. */
export const client = hasSanity
  ? createClient({ projectId, dataset, apiVersion, useCdn: true })
  : null;

/**
 * Fetch from Sanity. Returns null (so the site falls back to its built-in content)
 * when no project is configured or the request fails.
 * Pages refresh their content from Sanity at most once a minute.
 */
export async function sanityFetch<T>(query: string): Promise<T | null> {
  if (!client) return null;
  try {
    return await client.fetch<T>(query, {}, { next: { revalidate: 60 } });
  } catch (error) {
    console.warn(
      "[sanity] Could not load content, using built-in content instead:",
      error instanceof Error ? error.message : error,
    );
    return null;
  }
}
