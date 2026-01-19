"use client";

import { extractResumeText } from "@/actions/uploads/extractResumeText";
import {
  parseResumeDetailed,
  type ParseResumeDetailedResult,
} from "@/actions/openai/parseResumeDetailed";
import { T_Resume } from "@/types/resumeInfos";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { FileUp, Sparkles, Upload } from "lucide-react";
import { useState } from "react";

export default function CreateFromPdfPage() {
  const [file, setFile] = useState<File | null>(null);
  const [extracting, setExtracting] = useState(false);
  const [parsing, setParsing] = useState(false);
  const [extractedText, setExtractedText] = useState<string>("");
  const [parsedData, setParsedData] = useState<T_Resume | null>(null);
  const [error, setError] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError("");
      setExtractedText("");
      setParsedData(null);
    }
  };

  const handleExtract = async () => {
    if (!file) {
      setError("Please select a file first");
      return;
    }

    setExtracting(true);
    setError("");

    try {
      const result = await extractResumeText(file);

      if (result.error) {
        setError(result.error);
        console.error("Extraction error:", result.error);
      } else if (result.text) {
        setExtractedText(result.text);
        console.log("Extracted text:", result.text);
      }
    } catch (err) {
      setError("Failed to extract text from PDF");
      console.error("Exception during extraction:", err);
    } finally {
      setExtracting(false);
    }
  };

  const handleParse = async () => {
    if (!extractedText) {
      setError("Please extract text first");
      return;
    }

    setParsing(true);
    setError("");

    try {
      const result = await parseResumeDetailed(extractedText);

      if (result.error) {
        setError(result.error);
        console.error("Parsing error:", result.error);
      } else if (result.data) {
        setParsedData(result.data);
        console.log("Parsed resume data:", result.data);
      }
    } catch (err) {
      setError("Failed to parse resume with AI");
      console.error("Exception during parsing:", err);
    } finally {
      setParsing(false);
    }
  };

  return (
    <div className="min-h-screen p-8 bg-background">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Create from PDF</h1>
          <p className="text-muted-foreground">
            Upload a resume PDF to extract its text content
          </p>
        </div>

        <div className="rounded-2xl border border-border/50 bg-card p-6 space-y-4">
          <div className="space-y-3">
            <label
              htmlFor="resume-upload"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-border/50 rounded-xl cursor-pointer hover:bg-muted/50 transition-colors"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <FileUp className="w-12 h-12 mb-3 text-muted-foreground" />
                <p className="mb-2 text-sm text-muted-foreground">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-muted-foreground">
                  PDF or DOCX (max 5MB)
                </p>
                {file && (
                  <p className="mt-2 text-sm font-medium text-primary">
                    Selected: {file.name}
                  </p>
                )}
              </div>
              <input
                id="resume-upload"
                type="file"
                className="hidden"
                accept=".pdf,.docx"
                onChange={handleFileChange}
              />
            </label>

            <Button
              onClick={handleExtract}
              disabled={!file || extracting}
              className="w-full rounded-full"
              size="lg"
            >
              {extracting ? (
                <>
                  <Spinner className="mr-2" />
                  Extracting...
                </>
              ) : (
                <>
                  <Upload className="mr-2" />
                  Extract Text
                </>
              )}
            </Button>

            {extractedText && (
              <Button
                onClick={handleParse}
                disabled={parsing}
                className="w-full rounded-full"
                size="lg"
              >
                {parsing ? (
                  <>
                    <Spinner className="mr-2" />
                    Parsing with AI...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2" />
                    Parse Resume with AI
                  </>
                )}
              </Button>
            )}
          </div>

          {error && (
            <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
              {error}
            </div>
          )}

          {extractedText && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold">Extracted Text</h3>
                <span className="text-xs text-muted-foreground">
                  {extractedText.length} characters
                </span>
              </div>
              <div className="rounded-xl border border-border/50 bg-muted/30 p-4 max-h-96 overflow-y-auto">
                <pre className="text-xs font-mono whitespace-pre-wrap wrap-break-word">
                  {extractedText}
                </pre>
              </div>
            </div>
          )}

          {parsedData && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold">Parsed Resume Data</h3>
                <span className="text-xs text-muted-foreground">
                  AI Structured Output
                </span>
              </div>
              <div className="rounded-xl border border-primary/30 bg-primary/5 p-4 max-h-150 overflow-y-auto">
                <pre className="text-xs font-mono whitespace-pre-wrap wrap-break-word">
                  {JSON.stringify(parsedData, null, 2)}
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
