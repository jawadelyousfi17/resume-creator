"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function UploadResumeForm({
  onContinue,
  uploading,
  error,
}: {
  onContinue: (file: File) => void;
  uploading: boolean;
  error?: string | null;
}) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [localError, setLocalError] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <div className="text-sm font-medium">Upload resume file</div>
        <div className="text-xs text-muted-foreground">
          Supported formats: PDF, DOCX (max 5MB).
        </div>
      </div>
      <Input
        type="file"
        accept=".pdf,.docx"
        onChange={(event) => {
          setLocalError(null);
          const file = event.target.files?.[0] || null;
          setSelectedFile(file);
        }}
      />
      {(error || localError) && (
        <div className="text-xs text-destructive">{error || localError}</div>
      )}
      <div className="flex items-center justify-end gap-2">
        <Button
          type="button"
          onClick={() => {
            if (!selectedFile) {
              setLocalError("Please select a resume file first");
              return;
            }
            onContinue(selectedFile);
          }}
          disabled={uploading}
        >
          {uploading ? "Parsing..." : "Continue"}
        </Button>
      </div>
    </div>
  );
}
