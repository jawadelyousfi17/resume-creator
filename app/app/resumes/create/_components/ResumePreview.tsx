"use client";

import { Button } from "@/components/ui/button";
import { T_Resume } from "@/types/resumeInfos";
import {
  ChevronLeft,
  ChevronRight,
  Loader2,
  ZoomIn,
  ZoomOut,
  Download,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { templates } from "../../../../../_templates";
import TemplateDialog from "./templateDialog";
import { useSearchParams } from "next/navigation";

const A4_WIDTH_PX = 794; // 210mm at 96 DPI
const A4_HEIGHT_PX = 1123; // 297mm at 96 DPI

export default function ResumePreview({
  Template,
  data,
}: {
  Template: React.ComponentType<{ data: T_Resume }>;
  data: T_Resume;
}) {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [scale, setScale] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  const handlePrint = useReactToPrint({
    contentRef: contentRef,
    documentTitle: `${data.personalDetails.firstName || "Resume"}_${
      data.personalDetails.lastName || "Resume"
    }`,
  });

  // Calculate pages based on content height
  useEffect(() => {
    if (contentRef.current) {
      // We need to wait for render?
      // A simple timeout helps ensure the layout is settled
      const timer = setTimeout(() => {
        if (!contentRef.current) return;
        const height = contentRef.current.offsetHeight;
        const pages = Math.ceil(height / A4_HEIGHT_PX);
        setTotalPages(Math.max(pages, 1));

        if (currentPage > pages && pages > 0) {
          setCurrentPage(pages);
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [data, currentPage]);

  // Adjust scale to fit container width
  // useEffect(() => {
  //   const updateScale = () => {
  //     if (containerRef.current) {
  //       const containerWidth = containerRef.current.clientWidth;
  //       // Leave some padding
  //       const newScale = Math.min((containerWidth - 48) / A4_WIDTH_PX, 1);
  //       // Ensure it's not too small or too big
  //       setScale(Math.max(newScale, 0.4));
  //     }
  //   };

  //   updateScale();
  //   window.addEventListener("resize", updateScale);
  //   return () => window.removeEventListener("resize", updateScale);
  // }, []);

  return (
    <div className="flex flex-col h-full  border border-t-0 bg-background">
      <TemplateDialog open={open} setOpen={setOpen} id={id || ""} />
      {/* Defines the top control bar */}
      <div className="flex items-center justify-between px-4 p-4 bg-background   backdrop-blur-sm sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            onClick={() => setScale((s) => Math.max(s - 0.1, 0.3))}
            className="bg-transparent text-foreground   rounded-full w-8 h-8"
          >
            <ZoomOut className="w-4 h-4" />
          </Button>
          <span className="text-xs text-muted-foreground w-12 text-center">
            {Math.round(scale * 100)}%
          </span>
          <Button
            className="bg-transparent text-foreground  rounded-full w-8 h-8"
            size="sm"
            onClick={() => setScale((s) => Math.min(s + 0.1, 1.5))}
          >
            <ZoomIn className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex items-center gap-2 bg-transparent   rounded-full">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <span className="text-sm font-medium w-20 text-center select-none">
            Page {currentPage} / {totalPages}
          </span>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex items-center justify-end">
          <Button className="rounded-full" onClick={() => setOpen(true)}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  opacity="0.4"
                  d="M22 16.5V19.5C22 21 21 22 19.5 22H6C6.41 22 6.83 21.94 7.22 21.81C7.33 21.77 7.43999 21.73 7.54999 21.68C7.89999 21.54 8.24001 21.34 8.54001 21.08C8.63001 21.01 8.73001 20.92 8.82001 20.83L8.85999 20.79L15.66 14H19.5C21 14 22 15 22 16.5Z"
                  className="fill-background"
                ></path>{" "}
                <path
                  opacity="0.6"
                  d="M18.3694 11.29L15.6594 14L8.85938 20.79C9.55937 20.07 9.99939 19.08 9.99939 18V8.33996L12.7094 5.62996C13.7694 4.56996 15.1894 4.56996 16.2494 5.62996L18.3694 7.74996C19.4294 8.80996 19.4294 10.23 18.3694 11.29Z"
                  className="fill-background"
                ></path>{" "}
                <path
                  d="M7.5 2H4.5C3 2 2 3 2 4.5V18C2 18.27 2.02999 18.54 2.07999 18.8C2.10999 18.93 2.13999 19.06 2.17999 19.19C2.22999 19.34 2.28 19.49 2.34 19.63C2.35 19.64 2.35001 19.65 2.35001 19.65C2.36001 19.65 2.36001 19.65 2.35001 19.66C2.49001 19.94 2.65 20.21 2.84 20.46C2.95 20.59 3.06001 20.71 3.17001 20.83C3.28001 20.95 3.4 21.05 3.53 21.15L3.54001 21.16C3.79001 21.35 4.06 21.51 4.34 21.65C4.35 21.64 4.35001 21.64 4.35001 21.65C4.50001 21.72 4.65 21.77 4.81 21.82C4.94 21.86 5.07001 21.89 5.20001 21.92C5.46001 21.97 5.73 22 6 22C6.41 22 6.83 21.94 7.22 21.81C7.33 21.77 7.43999 21.73 7.54999 21.68C7.89999 21.54 8.24001 21.34 8.54001 21.08C8.63001 21.01 8.73001 20.92 8.82001 20.83L8.85999 20.79C9.55999 20.07 10 19.08 10 18V4.5C10 3 9 2 7.5 2ZM6 19.5C5.17 19.5 4.5 18.83 4.5 18C4.5 17.17 5.17 16.5 6 16.5C6.83 16.5 7.5 17.17 7.5 18C7.5 18.83 6.83 19.5 6 19.5Z"
                  className="fill-background"
                ></path>{" "}
              </g>
            </svg>{" "}
            Theme
          </Button>
        </div>
      </div>

      {/* Main Preview Area */}
      <div
        ref={containerRef}
        className="flex-1 overflow-auto relative flex justify-center bg-muted/30 p-8"
      >
        <div
          className="bg-white border rounded-4xl transition-all duration-200 ease-out will-change-transform origin-top overflow-hidden"
          style={{
            width: A4_WIDTH_PX,
            minHeight: A4_HEIGHT_PX,
            height: A4_HEIGHT_PX,
            transform: `scale(${scale})`,
          }}
        >
          {/* Viewport Mask */}
          <div className="w-full h-full overflow-hidden relative">
            {/* Rolling Content */}
            <div
              style={{
                transform: `translateY(-${(currentPage - 1) * A4_HEIGHT_PX}px)`,
              }}
              className="w-full rounded-2xl"
            >
              <div ref={contentRef} className=" rounded-2xl">
                {<Template data={data} />}
              </div>
            </div>
          </div>

          {/* Page break indicators (optional, visual aid) */}
          {totalPages > 1 &&
            Array.from({ length: totalPages - 1 }).map((_, i) => (
              <div
                key={i}
                className=" absolute w-full border-b-2 border-dashed border-red-300 pointer-events-none z-50 text-xs font-bold text-red-400 flex justify-end pr-2 items-end pb-1 opacity-50"
                style={{
                  top: (i + 1) * A4_HEIGHT_PX,
                  transform: `translateY(-${
                    (currentPage - 1) * A4_HEIGHT_PX
                  }px)`, // Moves with content
                }}
              >
                Page {i + 2} Break
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
