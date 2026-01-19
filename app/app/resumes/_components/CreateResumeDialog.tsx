"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { FileUp, Sparkles, PenLine, Layout, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { extractResumeText } from "@/actions/uploads/extractResumeText";
import { parseResumeDetailed } from "@/actions/openai/parseResumeDetailed";
import { createResume } from "@/actions/resume/createResume";
import { updateResumeById } from "@/actions/resume/updateResumeById";
import toast from "react-hot-toast";

type CreateMode = "scratch" | "template" | "upload" | null;

function CreateOptionCard({
  title,
  description,
  icon,
  onClick,
  loading,
  disabled,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
  loading?: boolean;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className="flex items-start gap-3 p-4 rounded-xl border border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all text-left group disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-border/50 disabled:hover:bg-transparent"
    >
      <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-full border border-border/30 bg-muted group-hover:border-primary/30 group-hover:bg-primary/10 transition-colors">
        {loading ? <Spinner className="h-5 w-5" /> : icon}
      </div>
      <div className="flex-1">
        <div className="text-sm font-medium mb-1">
          {loading ? "Loading..." : title}
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>
    </button>
  );
}

function UploadResumeSection({
  onUpload,
  uploading,
  error,
}: {
  onUpload: (file: File) => void;
  uploading: boolean;
  error?: string | null;
}) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      onUpload(selectedFile);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <label
          htmlFor="resume-upload-dialog"
          className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-border/50 rounded-xl cursor-pointer hover:bg-muted/50 transition-colors"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <FileUp className="w-10 h-10 mb-3 text-muted-foreground" />
            <p className="mb-2 text-sm text-muted-foreground">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-muted-foreground">
              PDF or DOCX (max 5MB)
            </p>
            {selectedFile && (
              <p className="mt-2 text-sm font-medium text-primary">
                {selectedFile.name}
              </p>
            )}
          </div>
          <input
            id="resume-upload-dialog"
            type="file"
            className="hidden"
            accept=".pdf,.docx"
            onChange={handleFileChange}
          />
        </label>

        <Button
          onClick={handleUpload}
          disabled={!selectedFile || uploading}
          className="w-full rounded-full"
          size="lg"
        >
          {uploading ? (
            <>
              <Spinner className="mr-2" />
              Processing...
            </>
          ) : (
            <>
              {/* <Sparkles className="mr-2" /> */}
              Create
            </>
          )}
        </Button>
      </div>

      {error && (
        <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">
          {error}
        </div>
      )}
    </div>
  );
}

export default function CreateResumeDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [mode, setMode] = useState<CreateMode>(null);
  const [uploading, setUploading] = useState(false);
  const [loadingScratch, setLoadingScratch] = useState(false);
  const [loadingTemplate, setLoadingTemplate] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSelectMode = (selectedMode: CreateMode) => {
    setMode(selectedMode);
    setError(null);

    if (selectedMode === "scratch") {
      setLoadingScratch(true);
      // Redirect to create page (which will create empty resume)
      router.push("/app/resumes/create");
    } else if (selectedMode === "template") {
      setLoadingTemplate(true);
      // For now, same as scratch - can be enhanced later
      router.push("/app/resumes/create");
    }
  };

  const handleUploadResume = async (file: File) => {
    setUploading(true);
    setError(null);

    try {
      // Step 1: Extract text from PDF/DOCX
      const extractResult = await extractResumeText(file);
      if (extractResult.error || !extractResult.text) {
        setError(extractResult.error || "Failed to extract text from file");
        setUploading(false);
        return;
      }

      console.log("Extracted text:", extractResult.text);

      // Step 2: Parse text with AI
      const parseResult = await parseResumeDetailed(extractResult.text);
      if (parseResult.error || !parseResult.data) {
        setError(parseResult.error || "Failed to parse resume with AI");
        setUploading(false);
        return;
      }

      console.log("Parsed resume data:", parseResult.data);

      // Step 3: Create resume with parsed data
      const createResult = await createResume();
      if (createResult.error || !createResult.data) {
        setError(createResult.error || "Failed to create resume");
        setUploading(false);
        return;
      }

      // Step 4: Update resume with parsed content
      await updateResumeById(createResult.data.id, parseResult.data);

      toast.success("Resume imported successfully!");

      // Redirect to the newly created resume
      router.push(`/app/resumes/create?id=${createResult.data.id}`);
    } catch (err) {
      console.error("Upload error:", err);
      setError("An unexpected error occurred");
      setUploading(false);
    }
  };

  const isUploadMode = mode === "upload";
  const showBackButton = mode !== null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {isUploadMode ? "Upload Resume" : "Create New Resume"}
          </DialogTitle>
          <DialogDescription>
            {isUploadMode
              ? "Upload your existing resume to import it."
              : "Choose how you want to start building your resume."}
          </DialogDescription>
        </DialogHeader>

        {!isUploadMode ? (
          <div className="grid gap-3">
            <CreateOptionCard
              title="Start from scratch"
              description="Build your resume step by step with our guided editor."
              icon={<PenLine className="h-5 w-5" />}
              onClick={() => handleSelectMode("scratch")}
              loading={loadingScratch}
              disabled={loadingTemplate || loadingScratch}
            />
            <CreateOptionCard
              title="Choose a template"
              description="Start with a pre-designed template and customize."
              icon={<Layout className="h-5 w-5" />}
              onClick={() => handleSelectMode("template")}
              loading={loadingTemplate}
              disabled={loadingTemplate || loadingScratch}
            />
            <CreateOptionCard
              title="Upload resume"
              description="Import an existing resume (PDF or DOCX) and edit."
              icon={<FileUp className="h-5 w-5" />}
              onClick={() => handleSelectMode("upload")}
              disabled={loadingTemplate || loadingScratch}
            />
          </div>
        ) : (
          <UploadResumeSection
            onUpload={handleUploadResume}
            uploading={uploading}
            error={error}
          />
        )}

        {showBackButton && isUploadMode && (
          <Button
            onClick={() => setMode(null)}
            disabled={uploading}
            variant={'ghost'}
            className="w-full rounded-full"
          >
            <ArrowLeft/>
            Back
          </Button>
        )}
      </DialogContent>
    </Dialog>
  );
}
