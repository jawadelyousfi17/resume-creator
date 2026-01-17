"use server";

import { T_Resume } from "@/types/resumeInfos";
import { getAIResponse } from "./enhaceJobDescription";

/**
 * Tailors a resume to match a specific job description and keywords using GPT-5.2.
 *
 * @param keywords - Array of keywords to include/emphasize.
 * @param jobDescription - The target job description.
 * @param resumeContent - The current resume content (JSON string or object).
 * @returns A promise that resolves to the tailored T_Resume object.
 */
export async function tailorResumeAi(
  keywords: string[],
  jobDescription: string,
  resumeContent: string | T_Resume
): Promise<T_Resume | null> {
  if (!resumeContent || !jobDescription) {
    console.error("Missing resume content or job description");
    return null;
  }

  // Ensure resumeContent is a string for the prompt
  const resumeString =
    typeof resumeContent === "string"
      ? resumeContent
      : JSON.stringify(resumeContent);

  const keywordsString = keywords.join(", ");

  const instruction = `
    Task: Tailor the following resume to better match the provided job description and ensure the specified keywords are naturally integrated for ATS optimization.
    
    Target Keywords: [${keywordsString}]
    
    Job Description:
    ${jobDescription}
    
    Current Resume (JSON):
    ${resumeString}
    
    Instructions:
    1. Analyze the Job Description and the Current Resume.
    2. Rewrite the "professionalSummary" to specifically target this job title and highlight relevant experience/skills found in the job description and keywords list.
    3. Revise "employmentHistory" descriptions. specific achievements, and responsibilities that align with the job description. naturally incorporate the Target Keywords where relevant. Do NOT change Company names, Titles, or Dates. Only the descriptions.
    4. Update the "skills" section. Ensure the "Target Keywords" are included if they are skills, but prioritise QUALITY over QUANTITY. Do not simply list all keywords. Only add skills that fit naturally. Avoid spammy keyword stuffing. Keep the list balanced and professional. You can rename existing similar skills instead of adding duplicates.
    5. Maintain the EXACT JSON structure of the input resume. Do not add or remove fields outside of the specific content updates requested.
    6. Return ONLY valid JSON. No markdown formatting. No conversational text.
    
    Output:
    A single valid JSON object representing the tailored resume.
  `;

  try {
    const response = await getAIResponse(instruction, { model: "gpt-5.2" });

    // clean up potential markdown formatting
    const cleanedResponse = response
      .replace(/^```json\s*/, "")
      .replace(/\s*```$/, "");

    const tailoredResume: T_Resume = JSON.parse(cleanedResponse);

    return tailoredResume;
  } catch (error) {
    console.error("Error tailoring resume:", error);
    return null;
  }
}
