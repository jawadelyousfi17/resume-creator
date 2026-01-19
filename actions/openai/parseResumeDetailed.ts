"use server";

import { getAIResponse } from "./enhaceJobDescription";
import { T_Resume } from "@/types/resumeInfos";

export type ParseResumeDetailedResult = {
  data?: T_Resume;
  error?: string;
  raw?: string;
};

function safeJsonParse<T>(value: string): T | null {
  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

function extractJsonBlock(text: string): string | null {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start === -1 || end === -1 || end <= start) return null;
  return text.slice(start, end + 1);
}

export async function parseResumeDetailed(
  resumeText: string,
): Promise<ParseResumeDetailedResult> {
  if (!resumeText?.trim()) {
    return { error: "No text found in resume" };
  }

  const instruction = `You are an expert resume parser. Convert the following resume text into a strict JSON object that matches this schema exactly.

Schema (JSON):
{
  "personalDetails": {
    "jobTarget": "",
    "firstName": "",
    "lastName": "",
    "email": "",
    "phone": "",
    "linkedInProfile": "",
    "cityState": "",
    "postalCode": "",
    "country": "",
    "profileImageUrl": ""
  },
  "employmentHistory": [
    {
      "id": "",
      "jobTitle": "",
      "employer": "",
      "cityState": "",
      "startDate": "",
      "endDate": "",
      "description": ""
    }
  ],
  "internships": [
    {
      "id": "",
      "jobTitle": "",
      "employer": "",
      "cityState": "",
      "startDate": "",
      "endDate": "",
      "description": ""
    }
  ],
  "education": [
    {
      "id": "",
      "school": "",
      "degree": "",
      "city": "",
      "startDate": "",
      "endDate": "",
      "description": ""
    }
  ],
  "skills": [
    {
      "id": "",
      "title": "",
      "level": "Novice"
    }
  ],
  "languages": [
    {
      "id": "",
      "language": "",
      "level": "Good working knowledge"
    }
  ],
  "courses": [
    {
      "id": "",
      "course": "",
      "institution": "",
      "startDate": "",
      "endDate": ""
    }
  ],
  "additional": [
    {
      "id": "",
      "title": "",
      "sections": [
        {
          "id": "",
          "activity": "",
          "city": "",
          "startDate": "",
          "endDate": "",
          "description": ""
        }
      ]
    }
  ],
  "professionalSummary": {
    "description": ""
  },
  "hobbies": ""
}

Rules:
- Return ONLY valid JSON. No markdown, no code fences, no commentary.
- Preserve all information found in the resume; do not invent details.
- If data is missing, use empty strings or empty arrays.
- Use ISO date strings (YYYY-MM-DD) when possible; otherwise empty string.
- Ensure every list item has an "id" field (can be a short unique string like "1", "2", "3", etc.).
- For skill levels, use one of: "Novice", "Beginner", "Skillful", "Experienced", "Expert"
- For language levels, use one of: "Native speaker", "Highly proficient", "Very good command", "Good working knowledge", "Working knowledge", "C2", "C1", "B2", "B1", "A2", "A1"
- Extract professional summary from any summary/objective section
- Map work experience to employmentHistory array
- Extract skills with appropriate proficiency levels
- Extract education details with dates
- If there are internships mentioned, add them to the internships array
- Add any certifications, courses, or training to the courses array
- Extract hobbies/interests into the hobbies field as a comma-separated string

Resume text:
${resumeText}
`;

  let response = "";
  try {
    response = await getAIResponse(instruction, {
      //   model: "gpt-4o",
      reasoningEffort: "low",
    });
  } catch (error) {
    console.error("AI detailed resume parsing failed:", error);
    return { error: "AI parsing failed. Try again." };
  }

  const cleaned = response.replace(/```json|```/g, "").trim();
  const direct = safeJsonParse<T_Resume>(cleaned);
  if (direct) return { data: direct };

  const extracted = extractJsonBlock(cleaned);
  if (extracted) {
    const parsed = safeJsonParse<T_Resume>(extracted);
    if (parsed) return { data: parsed };
  }

  return {
    error: "AI response was not valid JSON",
    raw: cleaned.slice(0, 2000),
  };
}
