"use server";

export async function generatePDF(html: string, fileName: string = "resume") {
  try {
    const apiHost = process.env.PDF_API_HOST || "http://localhost:3000";
    const apiUrl = `${apiHost}/api/pdf/generate`;

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        html,
        fileName,
      }),
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.error || "Failed to generate PDF");
    }

    return {
      success: true,
      data: result.data,
      fileName: result.fileName,
    };
  } catch (error) {
    console.error("PDF generation error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to generate PDF",
    };
  }
}
