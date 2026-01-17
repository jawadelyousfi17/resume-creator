import { generatePDF } from "@/actions/pdf/generatePdf";
import { Resume } from "@/lib/generated/prisma";
import { T_Resume } from "@/types/resumeInfos";
import { Dispatch, RefObject, SetStateAction } from "react";

export async function downloadPDF(
  pdfRef: RefObject<HTMLDivElement | null>,
  setDownloadingPdf: Dispatch<SetStateAction<boolean>>,
  resume: Resume
) {
  if (!pdfRef.current) return;

  setDownloadingPdf(true);
  try {
    // Get all styles from the document
    const styles = Array.from(document.styleSheets)
      .map((styleSheet) => {
        try {
          return Array.from(styleSheet.cssRules)
            .map((rule) => rule.cssText)
            .join("\n");
        } catch (e) {
          return "";
        }
      })
      .join("\n");

    // Get the HTML content
    const htmlContent = pdfRef.current.innerHTML;

    // Print/PDF overrides:
    // - Some CSS (notably overflow clipping and certain layout contexts) can make blocks
    //   behave as "unbreakable", causing them to jump to the next page.
    // - These rules encourage Chrome/Puppeteer to split content across pages instead.
    const pdfPrintOverrides = `
      @page { size: A4; margin: 0; }
      html, body { margin: 0; padding: 0; }
      @media print {
        /* Allow breaking inside elements (avoid whole-block jumps) */
        * { break-inside: auto !important; page-break-inside: auto !important; }

        /* Tailwind overflow utilities can prevent page fragmentation */
        .overflow-hidden, .overflow-auto, .overflow-scroll { overflow: visible !important; }

        /* If any template uses these, force them to be breakable */
        .break-inside-avoid, .break-inside-avoid-page, .break-inside-avoid-column {
          break-inside: auto !important;
          page-break-inside: auto !important;
        }

        /* Keep colors consistent in print/PDF */
        * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      }
    `;

    // Construct complete HTML document
    const fullHtml = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>${styles}\n${pdfPrintOverrides}</style>
          </head>
          <body>
            <div style="width: 794px;">
              ${htmlContent}
            </div>
          </body>
        </html>
      `;

    const firstName =
      (resume.content as unknown as T_Resume).personalDetails.firstName ||
      "Resume";
    const lastName =
      (resume.content as unknown as T_Resume).personalDetails.lastName || "";

    // Call server action
    const result = await generatePDF(fullHtml, `${firstName}-${lastName}`);

    if (result.success && result.data) {
      // Convert base64 to blob and download
      const byteCharacters = atob(result.data);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: "application/pdf" });

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = result.fileName;
      a.click();
      window.URL.revokeObjectURL(url);

      //   toast.success("PDF downloaded successfully");
    } else {
      throw new Error(result.error || "Failed to generate PDF");
    }
  } catch (error) {
    console.error("Error generating PDF:", error);
    // toast.error("Failed to generate PDF");
  } finally {
    setDownloadingPdf(false);
  }
}
