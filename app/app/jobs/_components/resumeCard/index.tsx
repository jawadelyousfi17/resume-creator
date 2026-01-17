"use client";

import { Button } from "@/components/ui/button";
import * as htmlToImage from "html-to-image";
import { useEffect, useRef, useState } from "react";
import { cn, formatDateTime } from "@/lib/utils";
import { T_Resume } from "@/types/resumeInfos";
import { Resume } from "@/lib/generated/prisma";
import { Spinner } from "@/components/ui/spinner";
import { templates } from "@/_templates";

const ResumeCardForDialog = ({
  resume,
  loading,
}: {
  resume: Resume;
  loading: boolean;
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [resumeTitle, setResumeTitle] = useState(resume.name);
  const [deleting, setDeleting] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const pdfRef = useRef<HTMLDivElement>(null);

  const [template, setTemplate] = useState<(typeof templates)[0]>(
    templates[resume.template]
  );

  useEffect(() => {
    if (!inputRef.current) return;
    if (editing) inputRef.current.focus();
  }, [editing]);

  useEffect(() => {
    const generatePreview = async () => {
      if (previewRef.current) {
        try {
          const dataUrl = await htmlToImage.toPng(previewRef.current, {
            cacheBust: true,
            pixelRatio: 1,
          });
          setPreviewImage(dataUrl);
        } catch (error) {
          console.error("Error generating preview:", error);
        }
      }
    };

    // Delay to ensure fonts and styles are loaded
    const timer = setTimeout(generatePreview, 0);
    return () => clearTimeout(timer);
  }, [resume.content]);

  return (
    <div
      className={cn(
        "flex flex-col gap-2 p-4 rounded-2xl  bg-card hover:border-primary/50 transition-colors cursor-pointer",
        deleting && "opacity-20"
      )}
    >
      <div className={cn("relative w-full aspect-[1/1.4] group ")}>
        <div className="absolute inset-0 rounded-md bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 z-10">
          <Button variant="default" className="w-full">
            {loading && <Spinner />} Use This Resume
          </Button>
        </div>
        {previewImage ? (
          <img
            src={previewImage}
            className="w-full h-full object-cover rounded-md border"
            alt="Resume preview"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-muted rounded-md">
            <Spinner />
          </div>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <h3 className="font-semibold text-base truncate" title={resumeTitle}>
          {resumeTitle}
        </h3>
        <p className="text-xs text-muted-foreground">
          Edited {formatDateTime(new Date(resume.updatedAt))}
        </p>
      </div>

      {/* Hidden preview generator */}
      <div className="fixed -left-[9999px] -top-[9999px]">
        <div ref={previewRef} style={{ width: "794px", height: "1123px" }}>
          <template.template data={resume.content as unknown as T_Resume} />
        </div>
      </div>

      {/* Hidden PDF generator */}
      <div className="fixed -left-[9999px] -top-[9999px]">
        <div ref={pdfRef} style={{ width: "794px" }}>
          <template.template data={resume.content as unknown as T_Resume} />
        </div>
      </div>
    </div>
  );
};

export default ResumeCardForDialog;
