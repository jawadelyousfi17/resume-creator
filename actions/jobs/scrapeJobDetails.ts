"use server";

import puppeteer from "puppeteer";
import { SingleJobResponse } from "@/types/singleJob";

/**
 * Scrapes job details from any job listing URL using Puppeteer
 * @param url - The job listing URL to scrape
 * @returns Job details in SingleJobResponse format or null if failed
 */
export async function scrapeJobDetails(
  url: string
): Promise<SingleJobResponse | null> {
  let browser;

  try {
    // Launch browser
    browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();

    // Set user agent to avoid detection
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    );

    // Navigate to the URL
    await page.goto(url, {
      waitUntil: "networkidle2",
      timeout: 30000,
    });

    // Wait a bit for dynamic content
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Extract job details using multiple selectors to support different sites
    const jobData = await page.evaluate(() => {
      // Helper function to try multiple selectors
      const getTextContent = (selectors: string[]): string => {
        for (const selector of selectors) {
          const element = document.querySelector(selector);
          if (element?.textContent?.trim()) {
            return element.textContent.trim();
          }
        }
        return "";
      };

      const getAttribute = (
        selectors: string[],
        attr: string
      ): string | null => {
        for (const selector of selectors) {
          const element = document.querySelector(selector);
          if (element) {
            return element.getAttribute(attr);
          }
        }
        return null;
      };

      // Job title selectors (common patterns)
      const titleSelectors = [
        "h1",
        '[class*="job-title"]',
        '[class*="jobTitle"]',
        '[data-testid*="job-title"]',
        '[class*="title"]',
        ".job-details-jobs-unified-top-card__job-title",
        ".jobs-unified-top-card__job-title",
      ];

      // Company name selectors
      const companySelectors = [
        '[class*="company-name"]',
        '[class*="companyName"]',
        '[class*="employer"]',
        '[data-testid*="company"]',
        ".job-details-jobs-unified-top-card__company-name",
        ".jobs-unified-top-card__company-name",
        'a[data-tracking-control-name="public_jobs_topcard-org-name"]',
      ];

      // Job description selectors
      const descriptionSelectors = [
        '[class*="description"]',
        '[class*="job-description"]',
        '[class*="jobDescription"]',
        '[data-testid*="description"]',
        ".show-more-less-html__markup",
        "#job-details",
        ".description__text",
      ];

      // Location selectors
      const locationSelectors = [
        '[class*="location"]',
        '[class*="job-location"]',
        '[data-testid*="location"]',
        ".job-details-jobs-unified-top-card__bullet",
        ".jobs-unified-top-card__bullet",
      ];

      // Logo selectors
      const logoSelectors = [
        '[class*="company-logo"] img',
        '[class*="companyLogo"] img',
        '[class*="employer-logo"] img',
        ".job-details-jobs-unified-top-card__company-logo img",
      ];

      const title = document.title || getTextContent(titleSelectors);
      const company = getTextContent(companySelectors);
      const description =
        getTextContent(descriptionSelectors) || document.body.innerText;
      const location = getTextContent(locationSelectors);
      const logo = getAttribute(logoSelectors, "src");

      return {
        title,
        company,
        description,
        location,
        logo,
      };
    });

    await browser.close();

    // Return null if we couldn't extract essential data
    if (!jobData.title && !jobData.description) {
      console.error("Failed to extract job details from URL:", url);
      return null;
    }

    // Create a SingleJobResponse compatible object
    const response: SingleJobResponse = {
      status: "scraped",
      request_id: `scraped-${Date.now()}`,
      parameters: {
        job_id: `scraped-${Date.now()}`,
        country: "",
        language: "en",
      },
      data: [
        {
          job_id: `scraped-${Date.now()}`,
          job_title: jobData.title || "Job Position",
          employer_name: jobData.company || "Company",
          employer_logo: jobData.logo,
          employer_website: null,
          job_publisher: "Scraped",
          job_employment_type: "FULLTIME",
          job_employment_types: ["FULLTIME"],
          job_apply_link: url,
          job_apply_is_direct: false,
          apply_options: [],
          job_description: jobData.description,
          job_is_remote: null,
          job_posted_at: new Date().toISOString(),
          job_posted_at_timestamp: Date.now(),
          job_posted_at_datetime_utc: new Date().toISOString(),
          job_location: jobData.location || "Remote",
          job_city: "",
          job_state: "",
          job_country: "",
          job_latitude: 0,
          job_longitude: 0,
          job_benefits: null,
          job_google_link: url,
          job_salary: null,
          job_min_salary: null,
          job_max_salary: null,
          job_salary_period: null,
          job_highlights: {
            Qualifications: [],
            Benefits: [],
            Responsibilities: [],
          },
          job_onet_soc: "",
          job_onet_job_zone: "",
        },
      ],
    };

    return response;
  } catch (error) {
    console.error("Error scraping job details:", error);
    if (browser) {
      await browser.close();
    }
    return null;
  }
}
