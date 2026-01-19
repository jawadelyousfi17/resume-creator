"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { extractResumeText } from "@/actions/uploads/extractResumeText";
import { parseResumeDetailed } from "@/actions/openai/parseResumeDetailed";
import { createResume } from "@/actions/resume/createResume";
import { updateResumeById } from "@/actions/resume/updateResumeById";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import toast from "react-hot-toast";
import { FileUp, Wand2, FileText, CheckCircle2 } from "lucide-react";

export default function ReviewMyResumePage() {
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a file first");
      return;
    }

    setUploading(true);

    try {
      // Step 1: Extract text from the uploaded resume
      const extractResult = await extractResumeText(file);

      if (extractResult.error || !extractResult.text) {
        toast.error(
          extractResult.error || "Failed to extract text from the file",
        );
        setUploading(false);
        return;
      }

      // Step 2: Parse the resume using AI
      const parseResult = await parseResumeDetailed(extractResult.text);

      if (parseResult.error || !parseResult.data) {
        toast.error(parseResult.error || "Failed to parse resume data");
        setUploading(false);
        return;
      }

      // Step 3: Create a new resume
      const createResult = await createResume(false);

      if (createResult.error || !createResult.data) {
        toast.error(createResult.error || "Failed to create resume");
        setUploading(false);
        return;
      }

      // Step 4: Update the resume with parsed data
      await updateResumeById(createResult.data.id, parseResult.data);

      // Step 5: Redirect to the review tab
      toast.success("Resume uploaded and parsed successfully!");
      router.push(`/app/resumes/create?id=${createResult.data.id}&tab=review`);
    } catch (error) {
      console.error("Error uploading resume:", error);
      toast.error("An error occurred while processing your resume");
      setUploading(false);
    }
  };

  return (
    <div className="container max-w-5xl mx-auto px-6 py-4">
      <div className="text-center mb-4 space-y-2">
        <h1 className="text-2xl  font-bold ">Review My Resume</h1>
        <p className="text-md text-muted-foreground max-w-2xl mx-auto">
          Upload your resume and get AI-powered insights and suggestions to land
          your dream job
        </p>
      </div>

      <div className="flex gap-12 items-start justify-center">
        {/* Upload Section */}
        <div className="space-y-6 w-full">
          <div className="bg-card  ">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <FileUp className="w-6 h-6 text-primary" />
              Upload Resume
            </h2>

            <div
              className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ease-in-out
                ${
                  dragActive
                    ? "border-primary bg-primary/5 scale-[1.02]"
                    : "border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/50"
                }
                ${file ? "bg-primary/5 border-primary" : ""}
              `}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                id="resume-upload"
                type="file"
                accept=".pdf,.docx"
                onChange={handleFileChange}
                disabled={uploading}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
              />

              <div className="flex flex-col items-center justify-center space-y-4 pointer-events-none">
                <div
                  className={`p-4 rounded-full bg-background shadow-sm transition-transform duration-300 ${
                    dragActive || file ? "scale-110" : ""
                  }`}
                >
                  {file ? (
                    <FileText className="w-8 h-8 text-primary" />
                  ) : (
                    <FileUp className="w-8 h-8 text-muted-foreground" />
                  )}
                </div>

                <div className="space-y-1">
                  {file ? (
                    <>
                      <p className="font-medium text-foreground">{file.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {(file.size / 1024).toFixed(2)} KB
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="font-medium text-foreground">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-sm text-muted-foreground">
                        PDF or DOCX (max 5MB)
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>

            <Button
              onClick={handleUpload}
              disabled={!file || uploading}
              className="w-full mt-6 h-12 text-lg font-medium shadow-lg hover:shadow-xl transition-all"
              size="lg"
            >
              {uploading ? (
                <>
                  <Spinner className="mr-2" />
                  Processing Resume...
                </>
              ) : (
                "Analyze My Resume"
              )}
            </Button>
          </div>
        </div>

        <div>
          {uploading && (
            <div className=" rounded-xl p-6 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                </span>
                Extracting text from your resume...
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 delay-150"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-primary delay-150"></span>
                </span>
                Analyzing content with AI...
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 delay-300"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-primary delay-300"></span>
                </span>
                Creating your resume...
              </div>
            </div>
          )}
        </div>
        {/* Features Section */}
      </div>
    </div>
  );
}
