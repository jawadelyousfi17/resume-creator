"use server";

import OpenAI from "openai";
import { consumeAiCredit } from "../subscription/consumeAiCredit";

const openai = new OpenAI();

/**
 * Send an instruction to OpenAI and get a response
 * @param instruction - The instruction/prompt to send to OpenAI
 * @param options - Optional configuration (model, reasoning effort)
 * @returns The AI response as a string
 */
export async function getAIResponse(
  instruction: string,
  options?: {
    model?: string;
    reasoningEffort?: "none" | "low" | "medium" | "high";
  }
): Promise<string> {
  const creditResult = await consumeAiCredit();
  if (!creditResult.success) {
    throw new Error(creditResult.error || "No AI credits available");
  }

  try {
    const response = await openai.responses.create({
      model: options?.model || "gpt-5.2",
      input: instruction,
      reasoning: {
        effort: options?.reasoningEffort || "none",
      },
    });

    return (response.output_text || "").trim();
  } catch (error) {
    console.error("OpenAI API Error:", error);
    throw new Error("Failed to get AI response");
  }
}

/**
 * Send an instruction to OpenAI using GPT-4o model
 * @param instruction - The instruction/prompt to send to OpenAI
 * @returns The AI response as a string
 */
export async function getAIResponseGPT4(instruction: string): Promise<string> {
  const creditResult = await consumeAiCredit();
  if (!creditResult.success) {
    throw new Error(creditResult.error || "No AI credits available");
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant.",
        },
        {
          role: "user",
          content: instruction,
        },
      ],
    });

    return (response.choices[0].message.content || "").trim();
  } catch (error) {
    console.error("OpenAI API GPT-4o Error:", error);
    throw new Error("Failed to get AI response from GPT-4o");
  }
}

/**
 * Enhance a job description using AI
 * @param jobDescription - The job description to enhance
 * @returns Enhanced job description
 */
export async function enhanceJobDescription(
  jobDescription: string,
  context?: string
): Promise<string> {
  const instruction = `
    Context: You are an expert resume writer.
    ${context ? `Additional Role/Industry Context: ${context}` : ""}
    
    Task: Enhance the following job description for a resume. Make it professional, clear, and impact-focused.
    Original Description:
    "${jobDescription}"
    
    Output Format (STRICT):
    - Return ONLY valid HTML (no Markdown, no code fences, no surrounding commentary).
    - Wrap everything in a single root <div>.
    - Use <ul>/<ol> with <li> for responsibilities/achievements.
    - Use <strong> for key outcomes/metrics and <em> for tools/technologies.
    - If a link is relevant (e.g., portfolio), use <a href="..." target="_blank" rel="noopener noreferrer">.
    - Keep the visible text concise (roughly 300-450 characters of visible text; tags excluded), and do not add facts not present.
    - Strict: Do NOT use em-dash or en-dash characters (no “—” and no “–”). Use a normal hyphen "-" if needed.
  `;

  return await getAIResponse(instruction, {
    model: "gpt-5.2",
    reasoningEffort: "none",
  });
}

export async function enhaceEducationDescription(
  description: string,
  context?: string
): Promise<string> {
  const instruction = `
    Context: You are an expert resume writer.
    ${context ? `Additional Role/Industry Context: ${context}` : ""}
    
    Task: Enhance the following education description for a resume. Focus on academic achievements, relevant coursework, key projects, and honors. Make it professional and concise.
    Original Description:
    "${description}"
    
    Output Format (STRICT):
    - Return ONLY valid HTML (no Markdown, no code fences, no surrounding commentary).
    - Wrap everything in a single root <div>.
    - Use <ul>/<ol> with <li> for highlights (coursework, projects, honors).
    - Use <strong> for achievements and <em> for tools/subjects.
    - Keep the visible text concise (roughly 250-400 characters of visible text; tags excluded).
    - Strict: Do NOT use em-dash or en-dash characters (no “—” and no “–”). Use a normal hyphen "-" if needed.
  `;

  return await getAIResponse(instruction, {
    model: "gpt-5.2",
    reasoningEffort: "none",
  });
}

export async function enhaceProfessionalSummary(
  summary: string,
  context?: string
): Promise<string> {
  const instruction = `
    Context: You are an expert resume writer.
    ${context ? `Additional Role/Industry Context: ${context}` : ""}
    
    Task: Enhance the following professional summary. Create a strong elevator pitch that highlights experience, core competencies, and major achievements. Make it engaging and professional.
    Original Summary:
    "${summary}"
    
    Output Format (STRICT):
    - Return ONLY valid HTML (no Markdown, no code fences, no surrounding commentary).
    - Wrap everything in a single root <div>.
    - Prefer 1-2 short sentences inside <p>. Optionally include a short <ul> of 2-3 achievement bullets if it improves clarity.
    - Use <strong> for outcomes/metrics and <em> for tools/technologies.
    - Keep the visible text concise (roughly 300-450 characters of visible text; tags excluded).
    - Strict: Do NOT use em-dash or en-dash characters (no “—” and no “–”). Use a normal hyphen "-" if needed.
  `;

  return await getAIResponse(instruction, {
    model: "gpt-5.2",
    reasoningEffort: "none",
  });
}

function safeJsonParse<T = unknown>(value: string): T {
  try {
    return JSON.parse(value) as T;
  } catch {
    throw new Error("Invalid JSON input");
  }
}

export type ResumeReviewResult = {
  overallScore: number;
  verdict: string;
  missing: string[];
  didntGoWell: string[];
  strengths: string[];
  quickFixes: string[];
  sectionScores: {
    summary: number;
    experience: number;
    education: number;
    skills: number;
    ats: number;
    formatting: number;
  };
  missingKeywords: string[];
};

/**
 * Review a resume (JSON input) and return a strict JSON result with an overall score,
 * what's missing, what didn't go well, and actionable fixes.
 *
 * @param resumeJsonString - JSON string representing the resume data.
 * @param context - Optional role/industry context for more tailored feedback.
 * @returns A VALID JSON string (no markdown) matching the enforced schema.
 */
export async function reviewResume(
  resumeJsonString: string,
  context?: string
): Promise<ResumeReviewResult> {
  // Validate input early so callers get a clear error.
  safeJsonParse(resumeJsonString);

  const instructions = `You are an expert resume reviewer and ATS specialist. Analyze the resume JSON and produce a strict JSON review according to the provided schema. Be specific, practical, and concise. Do not invent facts; only infer improvements.
  
  IMPORTANT CONTEXT FOR ANALYSIS:
  - The content fields (like job descriptions) may contain raw HTML markup. Ignore the markup tags and formatting artifacts; focus only on the actual text content and its quality/impact.
  - Dates may be in universal/ISO formats. Treat them as valid standard dates; do not critique their raw format, as they will be rendered effectively in the PDF.
  - Images (e.g. profile pictures) may appear as base64 strings. Ignore the string data itself; assume it is a valid image that will be rendered properly.
  - Your job is to judge ONLY the information (content, clarity, impact, relevance) as if it were the final rendered PDF document.`;

  const input = `Role/Industry Context (optional): ${
    context || ""
  }\n\nResume JSON (string):\n${resumeJsonString}`;

  const response = await openai.responses.create({
    model: "gpt-5.2",
    instructions,
    input,
    reasoning: {
      effort: "low",
    },
    text: {
      format: {
        type: "json_schema",
        name: "resume_review",
        strict: true,
        schema: {
          type: "object",
          additionalProperties: false,
          properties: {
            overallScore: {
              type: "integer",
              minimum: 0,
              maximum: 100,
              description: "Overall resume quality score out of 100.",
            },
            verdict: {
              type: "string",
              description:
                "One short paragraph summarizing the resume quality and biggest opportunities.",
            },
            missing: {
              type: "array",
              description:
                "What is missing that would materially improve the resume.",
              items: { type: "string" },
              maxItems: 12,
            },
            didntGoWell: {
              type: "array",
              description:
                "What didn't go well (clarity, impact, structure, metrics, relevance, repetition).",
              items: { type: "string" },
              maxItems: 12,
            },
            strengths: {
              type: "array",
              description: "Strong points worth keeping.",
              items: { type: "string" },
              maxItems: 12,
            },
            quickFixes: {
              type: "array",
              description:
                "High-impact fixes that can be done quickly (rewrite tips, ordering, metrics, keywords).",
              items: { type: "string" },
              maxItems: 12,
            },
            sectionScores: {
              type: "object",
              additionalProperties: false,
              properties: {
                summary: { type: "integer", minimum: 0, maximum: 100 },
                experience: { type: "integer", minimum: 0, maximum: 100 },
                education: { type: "integer", minimum: 0, maximum: 100 },
                skills: { type: "integer", minimum: 0, maximum: 100 },
                ats: { type: "integer", minimum: 0, maximum: 100 },
                formatting: { type: "integer", minimum: 0, maximum: 100 },
              },
              required: [
                "summary",
                "experience",
                "education",
                "skills",
                "ats",
                "formatting",
              ],
            },
            missingKeywords: {
              type: "array",
              description:
                "Likely missing role keywords/skills based on the resume content and provided context.",
              items: { type: "string" },
              maxItems: 20,
            },
          },
          required: [
            "overallScore",
            "verdict",
            "missing",
            "didntGoWell",
            "strengths",
            "quickFixes",
            "sectionScores",
            "missingKeywords",
          ],
        },
      },
    },
  });

  const raw = (response.output_text || "").trim();
  const parsed = safeJsonParse<ResumeReviewResult>(raw);
  return parsed;
}

/**
 * Enhance or create content for a custom resume section based on context
 * @param currentContent - The current content (can be empty for creation)
 * @param context - Context about what to enhance/create (e.g., "volunteer work at animal shelter", "publications in AI research")
 * @param sectionTitle - The title of the custom section (e.g., "Volunteer Experience", "Publications")
 * @returns Enhanced/created content as HTML
 */
export async function enhanceCustomSection(
  currentContent: string,
  context: string,
  sectionTitle?: string
): Promise<string> {
  const isCreating = !currentContent || currentContent.trim().length === 0;

  const instruction = `
    Context: You are an expert resume writer specializing in custom resume sections.
    
    Task: ${
      isCreating ? "Create new" : "Enhance the existing"
    } content for a resume section${
    sectionTitle ? ` titled "${sectionTitle}"` : ""
  }.
    
    ${
      isCreating
        ? `
    Context/Requirements for creation:
    "${context}"
    
    Create professional, impactful content based on this context. Make reasonable assumptions about achievements and responsibilities typical for this type of activity.
    `
        : `
    Current Content:
    "${currentContent}"
    
    Enhancement Context/Requirements:
    "${context}"
    
    Enhance the content to make it more professional, clear, and impact-focused while incorporating the additional context.
    `
    }
    
    Output Format (STRICT):
    - Return ONLY valid HTML (no Markdown, no code fences, no surrounding commentary).
    - Wrap everything in a single root <div>.
    - Use <ul>/<ol> with <li> for key points, achievements, or responsibilities.
    - Use <strong> for outcomes/metrics/achievements and <em> for tools/technologies/skills.
    - Keep the visible text concise (roughly 250-400 characters of visible text; tags excluded).
    - Focus on impact, results, and transferable skills.
    - Strict: Do NOT use em-dash or en-dash characters (no "—" and no "–"). Use a normal hyphen "-" if needed.
  `;

  return await getAIResponse(instruction, {
    model: "gpt-5.2",
    reasoningEffort: "none",
  });
}
