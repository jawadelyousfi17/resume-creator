"use server";

import { createRequire } from "module";
import { Buffer } from "node:buffer";

export type ExtractResumeTextResult = {
  text?: string;
  error?: string;
};

const MAX_RESUME_SIZE = 5 * 1024 * 1024;

export async function extractResumeText(
  file: File
): Promise<ExtractResumeTextResult> {
  if (!file) return { error: "No file provided" };

  if (file.size > MAX_RESUME_SIZE) {
    return { error: "Resume file must be 5MB or less" };
  }

  const extension = file.name.split(".").pop()?.toLowerCase();
  const mimeType = file.type;
  
  // Create require for CommonJS modules
  const require = createRequire(import.meta.url);

  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // --- NEW PDF PARSING LOGIC ---
    if (extension === "pdf" || mimeType === "application/pdf") {
      const PDFParser = require("pdf2json");
      
      return new Promise((resolve, reject) => {
        // Option "1" tells it to parse raw text
        const parser = new PDFParser(null, 1);

        parser.on("pdfParser_dataError", (errData: any) => {
          console.error("PDF Parser Error:", errData.parserError);
          resolve({ error: "Failed to read PDF content" });
        });

        parser.on("pdfParser_dataReady", () => {
          // getRawTextContent() extracts the text from the parsed data
          const textContent = parser.getRawTextContent();
          resolve({ text: textContent });
        });

        parser.parseBuffer(buffer);
      });
    }
    // -----------------------------

    if (
      extension === "docx" ||
      mimeType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      const mammoth = require("mammoth");
      const result = await mammoth.extractRawText({ buffer });
      return { text: result.value || "" };
    }

    return { error: "Unsupported file type. Use PDF or DOCX." };
  } catch (error) {
    console.error("Resume text extraction failed:", error);
    return { error: "Failed to extract resume text" };
  }
}