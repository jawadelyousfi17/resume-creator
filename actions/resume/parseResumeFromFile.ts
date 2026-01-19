"use server";

import { extractResumeText } from "@/actions/uploads/extractResumeText";
import { parseResumeTextToResume } from "@/actions/openai/parseResumeText";
import { T_Resume } from "@/types/resumeInfos";

export type ParseResumeFromFileResult = {
  data?: T_Resume;
  error?: string;
};

export async function parseResumeFromFile(
  file: File
): Promise<ParseResumeFromFileResult> {
  const extracted = await extractResumeText(file);
  if (extracted.error) return { error: extracted.error };
  if (!extracted.text?.trim()) return { error: "No text found in resume" };

  const parsed = await parseResumeTextToResume(extracted.text || "");
  if (parsed.error || !parsed.data) {
    return {
      error: parsed.error || "Could not parse resume text",
    };
  }

  return { data: parsed.data };
}
