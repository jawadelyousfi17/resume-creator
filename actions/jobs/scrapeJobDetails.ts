"use server";

import { SingleJobResponse } from "@/types/singleJob";

const JOB_SCRAPE_API_HOST = process.env.PDF_API_HOST || "http://localhost:3000";

/**
 * Scrapes job details from any job listing URL using external API
 * @param url - The job listing URL to scrape
 * @returns Job details in SingleJobResponse format or null if failed
 */
export async function scrapeJobDetails(
  url: string,
): Promise<SingleJobResponse | null> {
  try {
    const response = await fetch(`${JOB_SCRAPE_API_HOST}/api/job/scrape`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    });

    if (!response.ok) {
      console.error(
        `Job scraping API error: ${response.status} ${response.statusText}`,
      );
      return null;
    }

    const result = await response.json();

    if (!result.success || !result.data) {
      console.error("Job scraping API returned unsuccessful response:", result);
      return null;
    }

    return result.data as SingleJobResponse;
  } catch (error) {
    console.error("Error scraping job details:", error);
    return null;
  }
}
