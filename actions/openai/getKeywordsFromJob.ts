"use server";

import { getAIResponseGPT4 } from "./enhaceJobDescription";

/**
 * Extracts ATS-friendly keywords from a job description using GPT-4.
 *
 * @param jobDescription - The job description text.
 * @returns A promise that resolves to an array of keywords.
 */
export async function getKeywordsFromJob(
  jobDescription: string
): Promise<string[]> {
  if (!jobDescription || jobDescription.trim() === "") {
    return [];
  }

  const instruction = `
    Task: Analyze the following job description and extract 10-15 key skills, technologies, and keywords that are crucial for an Applicant Tracking System (ATS).
    
    Job Description:
    ${jobDescription}
    
    Output Format:
    - Return ONLY a valid JSON array of strings.
    - Example: ["React", "TypeScript", "Project Management", "Agile", "SEO"]
    - Do NOT include markdown code blocks (e.g., \`\`\`json).
    - Do NOT include any introductory or concluding text.
  `;

  try {
    const response = await getAIResponseGPT4(instruction);

    // Attempt to parse the response as JSON
    // Clean up potential markdown formatting just in case
    const cleanedResponse = response
      .replace(/^```json\s*/, "")
      .replace(/\s*```$/, "");
    const keywords = JSON.parse(cleanedResponse);

    if (Array.isArray(keywords)) {
      return keywords;
    } else {
      console.warn("AI response was not an array:", response);
      return [];
    }
  } catch (error) {
    console.error("Error extracting keywords:", error);
    return [];
  }
}
