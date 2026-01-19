"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FileUp, Sparkles, PenLine } from "lucide-react";
import ResumeStartOptionCard from "./ResumeStartOptionCard";
import UploadResumeForm from "./UploadResumeForm";

export type ResumeStartMode = "scratch" | "upload" | "analyze";

export default function ResumeStartDialog({
  open,
  mode,
  onSelectMode,
  onContinueUpload,
  uploading,
  uploadError,
}: {
  open: boolean;
  mode: ResumeStartMode | null;
  onSelectMode: (mode: ResumeStartMode) => void;
  onContinueUpload: (file: File) => void;
  uploading: boolean;
  uploadError?: string | null;
}) {
  const isUpload = mode === "upload";

  return (
    <Dialog open={open}>
      <DialogContent showCloseButton={false} className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Start your resume</DialogTitle>
          <DialogDescription>
            Choose how you want to create your resume.
          </DialogDescription>
        </DialogHeader>

        {!isUpload ? (
          <div className="grid gap-3">
            <ResumeStartOptionCard
              title="Create from scratch"
              description="Build a resume step by step with templates."
              icon={<PenLine className="h-5 w-5" />}
              onClick={() => onSelectMode("scratch")}
            />
            <ResumeStartOptionCard
              title="Upload resume"
              description="Upload an existing resume to continue."
              icon={<FileUp className="h-5 w-5" />}
              onClick={() => onSelectMode("upload")}
            />
            <ResumeStartOptionCard
              title="Analyze resume"
              description="Get AI feedback and suggestions."
              icon={<Sparkles className="h-5 w-5" />}
              onClick={() => onSelectMode("analyze")}
            />
          </div>
        ) : (
          <UploadResumeForm
            onContinue={onContinueUpload}
            uploading={uploading}
            error={uploadError}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
