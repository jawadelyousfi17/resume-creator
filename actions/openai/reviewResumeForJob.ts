"use server";

import { T_Resume } from "@/types/resumeInfos";
import { getAIResponseGPT4 } from "./enhaceJobDescription";

/**
 * Reviews a resume against a job description and returns an ATS score from 0 to 100.
 *
 * @param resumeContent - The resume content (T_Resume).
 * @param jobDescription - The job description to compare against.
 * @returns A promise that resolves to a score between 0 and 100.
 */
export async function reviewResumeForJob(
  resumeContent: T_Resume,
  jobDescription: string
): Promise<number> {
  if (!resumeContent || !jobDescription) {
    return 0;
  }

  const resumeString = JSON.stringify(resumeContent);

  const prompt = `
    You are an expert ATS (Applicant Tracking System) and hiring manager.
    Review the following resume content against the job description provided.
    
    Resume Content (JSON):
    ${resumeString}
    
    Job Description:
    ${jobDescription}
    
    Based on the skills, experience, and keywords found in the resume compared to the job requirements, evaluate how well this resume matches the job.
    
    Provide ONLY a number between 0 and 100 representing the match score. 
    0 means no match at all, 100 means a perfect match.
    Do not include any text, explanations, or signs. Just the number.
  `;

  try {
    const response = await getAIResponseGPT4(prompt);
    const score = parseInt(response.replace(/[^0-9]/g, ""), 10);

    if (isNaN(score)) {
      return 0;
    }

    return Math.min(100, Math.max(0, score));
  } catch (error) {
    console.error("Error reviewing resume:", error);
    return 0;
  }
}
