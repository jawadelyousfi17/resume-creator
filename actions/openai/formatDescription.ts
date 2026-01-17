"use server";

import { getAIResponseGPT4 } from "./enhaceJobDescription";

/**
 * Formats a plain text job description into basic HTML using AI.
 * Uses a more capable model for high-quality formatting.
 *
 * @param description - The plain text description to format
 * @returns A string containing basic HTML (br, strong, ul, li, div)
 */
export async function formatDescription(description: string): Promise<string> {
  if (!description || description.trim() === "") {
    return "";
  }

  const instruction = `
    Task: Convert the following job description or text into a clean, professional HTML format suitable for a resume.
    
    Rules:
    - Use ONLY these HTML tags: <strong>, <br>, <ul>, <li>, <div>.
    - Use <ul> and <li> for lists/bullet points.
    - Use <strong> for highlighting important terms or section headers.
    - Use <br> for simple line breaks between paragraphs.
    - Use <div> for grouping content where appropriate.
    - Return ONLY the HTML content. Do NOT include any markdown formatting sections (no \`\`\`html).
    - Do NOT include <html>, <head>, or <body> tags.
    
    Original Text:
    ${description}
  `;

  try {
    // Using gpt-4o for high-quality formatting results
    return description.replace(/\n/g, "<br>");

    return await getAIResponseGPT4(instruction);
  } catch (error) {
    console.error("OpenAI formatDescription Error:", error);
    // Fallback: simple newline to <br> conversion if AI fails
    return description.replace(/\n/g, "<br>");
  }
}
