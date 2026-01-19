"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useMemo, useRef, useState } from "react";
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
  const cardRef = useRef<HTMLDivElement>(null);
  const [shouldGeneratePreview, setShouldGeneratePreview] = useState(false);
  const [previewRendered, setPreviewRendered] = useState(false);

  const [template, setTemplate] = useState<(typeof templates)[0]>(
    templates[resume.template],
  );

  const previewKey = useMemo(() => {
    const updated =
      resume.updatedAt instanceof Date
        ? resume.updatedAt.toISOString()
        : String(resume.updatedAt);
    return `resume-preview:${resume.id}:${resume.template}:${updated}`;
  }, [resume.id, resume.template, resume.updatedAt]);

  useEffect(() => {
    if (!inputRef.current) return;
    if (editing) inputRef.current.focus();
  }, [editing]);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShouldGeneratePreview(true);
          observer.disconnect();
        }
      },
      { root: null, rootMargin: "300px", threshold: 0.01 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!shouldGeneratePreview) return;
    if (previewImage) return;

    try {
      const cached = sessionStorage.getItem(previewKey);
      if (cached) {
        setPreviewImage(cached);
        return;
      }
    } catch {
      // ignore
    }

    let cancelled = false;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ric = (globalThis as any).requestIdleCallback as
      | ((cb: () => void, opts?: { timeout: number }) => number)
      | undefined;

    const run = async () => {
      if (!previewRef.current) return;
      try {
        const mod = await import("html-to-image");
        const dataUrl = await mod.toPng(previewRef.current, {
          cacheBust: false,
          pixelRatio: 1,
        });
        if (cancelled) return;
        setPreviewImage(dataUrl);
        setPreviewRendered(true);
        try {
          sessionStorage.setItem(previewKey, dataUrl);
        } catch {
          // ignore
        }
      } catch (error) {
        console.error("Error generating preview:", error);
      }
    };

    const schedule = () => {
      setTimeout(() => void run(), 0);
    };

    if (typeof ric === "function") ric(schedule, { timeout: 1500 });
    else setTimeout(schedule, 250);

    return () => {
      cancelled = true;
    };
  }, [previewImage, previewKey, shouldGeneratePreview]);

  return (
    <div
      ref={cardRef}
      className={cn(
        "flex flex-col gap-2 p-4 rounded-2xl  bg-card hover:border-primary/50 transition-colors cursor-pointer",
        deleting && "opacity-20",
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
            loading="lazy"
            decoding="async"
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

      {/* Hidden preview generator (rendered only when needed) */}
      {shouldGeneratePreview && !previewRendered && (
        <div className="fixed -left-[9999px] -top-[9999px]">
          <div
            ref={previewRef}
            style={{ width: 260, height: 368, overflow: "hidden" }}
          >
            <div
              style={{
                width: "794px",
                height: "1123px",
                transform: "scale(0.327)",
                transformOrigin: "top left",
              }}
            >
              <template.template data={resume.content as unknown as T_Resume} />
            </div>
          </div>
        </div>
      )}

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
