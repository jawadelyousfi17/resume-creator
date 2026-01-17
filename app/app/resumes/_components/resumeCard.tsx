"use client";

import { Button } from "@/components/ui/button";
import {
  ArrowDownToLine,
  Check,
  File,
  Files,
  FileText,
  MoreHorizontal,
  Pen,
  Sparkles,
  Target,
  Trash,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Document, Page, Text, PDFDownloadLink } from "@react-pdf/renderer";
import * as htmlToImage from "html-to-image";

import { useEffect, useRef, useState } from "react";
import ResumeTemplate1 from "@/components/resume/templates/t1";
import { Input } from "@/components/ui/input";
import { cn, formatDateTime } from "@/lib/utils";
import { T_Resume } from "@/types/resumeInfos";
import { Resume } from "@/lib/generated/prisma";
import { updateResumeTitle } from "@/actions/resume/updateResumeTitle";
import { Spinner } from "@/components/ui/spinner";
import { duplicateResume } from "@/actions/resume/duplicateResume";
import { deleteResume } from "@/actions/resume/deleteResume";
import toast from "react-hot-toast";
import { useConfirm } from "@/components/general/confirmContext";
import { getColor } from "../create/_components/review";
import ResumeTemplate1PDF from "@/components/resume/templates/t1-pdf";
import {
  RiFileCopy2Fill,
  RiPencilFill,
  RiPencilLine,
  RiSparklingFill,
  RiSparklingLine,
} from "react-icons/ri";
import { generatePDF } from "@/actions/pdf/generatePdf";
import { downloadPDF } from "../_utils/downloadPdf";

import { templates } from "../../../../_templates";
import { useRouter } from "next/navigation";

const ResumeCard = ({ resume }: { resume: Resume }) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [resumeTitle, setResumeTitle] = useState(resume.name);
  const [saving, setSaving] = useState(false);
  const [duplicating, setDuplicating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [downloadingPdf, setDownloadingPdf] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const pdfRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

  const [template, setTemplate] = useState<(typeof templates)[0]>(
    templates[resume.template]
  );

  const confirm = useConfirm();

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
    const timer = setTimeout(generatePreview, 500);
    return () => clearTimeout(timer);
  }, [resume.content]);

  async function handleEdit() {
    setSaving(true);
    const newResume = await updateResumeTitle(resume.id, resumeTitle);
    setSaving(false);
  }

  async function handleDuplicate() {
    setDuplicating(true);
    const newResume = await duplicateResume(resume);
    setDuplicating(false);
  }

  async function handleDelete() {
    const confirmed = await confirm({
      title: "Delete resume?",
      description:
        "Are you sure you want to delete this resume? This action cannot be undone.",
      confirmText: "Delete",
      cancelText: "Cancel",
      variant: "destructive",
    });

    if (!confirmed) return;

    setDeleting(true);
    try {
      const result = await deleteResume(resume.id);
      if (result) {
        toast.success("Resume deleted successfully");
      } else {
        toast.error("Failed to delete resume");
      }
    } catch (error) {
      toast.error("Failed to delete resume");
      console.error(error);
    } finally {
      setDeleting(false);
    }
  }

  async function handleDownloadPDF() {
    await downloadPDF(pdfRef, setDownloadingPdf, resume);
  }

  const bgColor = getColor(resume.score);

  async function handleTailor() {
    setDuplicating(true);
    const duplicatedResume = await duplicateResume(resume, false);
    setDuplicating(false);

    if (duplicatedResume) {
      toast.success("Your resume is duplicated, working on new copy");
      router.push(`/app/resumes/create?id=${duplicatedResume.id}&tab=tailor`);
    }
  }

  return (
    <div
      className={cn(
        "flex flex-col md:flex-row gap-4   p-4 rounded-2xl",
        deleting && "opacity-20"
      )}
    >
      <motion.div
        className={cn("relative w-full md:w-50 h-fit group")}
        whileHover="hover"
      >
        <motion.div
          className="absolute top-0 left-0 w-full h-full rounded-md bg-primary/50 flex justify-center items-center"
          initial={{ opacity: 0 }}
          variants={{
            hover: { opacity: 1 },
          }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            initial={{ scale: 0.8 }}
            variants={{
              hover: { scale: 1 },
            }}
            transition={{ duration: 0.2, delay: 0.05 }}
            className="flex flex-col gap-2 justify-center items-center "
          >
            <Link href={`/app/resumes/create?id=${resume.id}`}>
              <Button className="cursor-pointer">
                <RiPencilLine />
                Edit Resume
              </Button>
            </Link>
            <Button
              className=""
              onClick={handleDuplicate}
              disabled={duplicating}
            >
              {duplicating ? <Spinner /> : <RiFileCopy2Fill />}
              Duplicate Resume
            </Button>
          </motion.div>
        </motion.div>
        {previewImage ? (
          <img
            src={previewImage}
            className="rounded-md border shrink-0"
            alt="Resume preview"
          />
        ) : (
          <div className="">
            <Spinner />
          </div>
        )}
      </motion.div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-2">
            {editing && (
              <Input
                size={resumeTitle.length || 7}
                value={resumeTitle}
                onChange={(e) => setResumeTitle(e.target.value)}
                ref={inputRef}
                className={cn(
                  "bg-transparent border-0 shadow-none w-fit max-w-30 px-0 text-lg",
                  editing && "bg-muted"
                )}
                placeholder="Untiled"
              />
            )}
            {!editing && <div>{resumeTitle}</div>}
            <Tooltip>
              <TooltipTrigger
                asChild
                onClick={() => setEditing((prev) => !prev)}
                className="group cursor-pointer"
              >
                <div className="flex justify-center items-center p-2 bg-muted rounded-full">
                  {saving ? (
                    <Spinner />
                  ) : (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 cursor-pointer"
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        <path
                          opacity="0.4"
                          d="M20.8487 8.71306C22.3844 7.17735 22.3844 4.68748 20.8487 3.15178C19.313 1.61607 16.8231 1.61607 15.2874 3.15178L14.4004 4.03882C14.4125 4.0755 14.4251 4.11268 14.4382 4.15035C14.7633 5.0875 15.3768 6.31601 16.5308 7.47002C17.6848 8.62403 18.9133 9.23749 19.8505 9.56262C19.888 9.57563 19.925 9.58817 19.9615 9.60026L20.8487 8.71306Z"
                          fill="#1C274C"
                          className="fill-foreground/40 group-hover:fill-primary"
                        ></path>{" "}
                        <path
                          d="M14.4386 4L14.4004 4.03819C14.4125 4.07487 14.4251 4.11206 14.4382 4.14973C14.7633 5.08687 15.3768 6.31538 16.5308 7.4694C17.6848 8.62341 18.9133 9.23686 19.8505 9.56199C19.8876 9.57489 19.9243 9.58733 19.9606 9.59933L11.4001 18.1598C10.823 18.7369 10.5343 19.0255 10.2162 19.2737C9.84082 19.5665 9.43469 19.8175 9.00498 20.0223C8.6407 20.1959 8.25351 20.3249 7.47918 20.583L3.39584 21.9442C3.01478 22.0712 2.59466 21.972 2.31063 21.688C2.0266 21.4039 1.92743 20.9838 2.05445 20.6028L3.41556 16.5194C3.67368 15.7451 3.80273 15.3579 3.97634 14.9936C4.18114 14.5639 4.43213 14.1578 4.7249 13.7824C4.97307 13.4643 5.26165 13.1757 5.83874 12.5986L14.4386 4Z"
                          className="fill-foreground/40 group-hover:fill-primary"
                        ></path>
                      </g>
                    </svg>
                  )}
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Rename</p>
              </TooltipContent>
            </Tooltip>
            {editing && (
              <motion.div
                initial={{ opacity: 0.5 }}
                animate={{ opacity: 1 }}
                variants={{
                  focus: { scale: 1.1 },
                }}
                transition={{ duration: 0.3 }}
              >
                <Tooltip>
                  <TooltipTrigger
                    asChild
                    onClick={() => setEditing((prev) => !prev)}
                    className="group cursor-pointer"
                  >
                    <div
                      className="flex justify-center items-center p-2 bg-muted rounded-full"
                      onClick={handleEdit}
                    >
                      {!saving ? (
                        <Check
                          className="h-5 w-5 text-foreground/50 group-hover:text-primary"
                          strokeWidth={3}
                        />
                      ) : (
                        <Spinner />
                      )}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Save</p>
                  </TooltipContent>
                </Tooltip>
              </motion.div>
            )}
          </div>
          <div className="text-xs text-foreground/70 font-light">
            Updated {formatDateTime(resume.updatedAt)}
          </div>
        </div>

        {resume.score > 0 && (
          <div
            style={{ backgroundColor: bgColor }}
            className={"flex p-2  items-center rounded-2xl gap-2 text-sm"}
          >
            <span
              className={`bg-background p-0.5 w-10 h-10 flex justify-center items-center rounded-full font-bold`}
            >
              {resume.score}%
            </span>
            <div className="flex flex-col">
              <span className="text-black">Your resume score</span>
              <span className="font-light text-xs text-black/80">
                Need improvement
              </span>
            </div>
          </div>
        )}
        {resume.score === 0 && (
          <Link href={`/app/resumes/create?id=${resume.id}&tab=review`}>
            <div className="flex p-2 px-3 items-center rounded-full gap-2 text-sm  bg-muted hover:bg-primary hover:text-background">
              <RiSparklingFill className="h-4 " /> Review my resume
            </div>
          </Link>
        )}
        <div className="flex gap-2 md:flex-col  md:gap-2">
          <Button
            disabled={duplicating}
            onClick={handleTailor}
            className="flex  p-2 px-3 items-center rounded-full gap-2 text-sm   hover:bg-primary hover:text-background"
          >
            {duplicating ? <Spinner /> : <Target className="text" />}
            Tailor resume
          </Button>
          <Button
            variant={"ghost"}
            onClick={handleDownloadPDF}
            disabled={downloadingPdf}
            className="flex justify-start"
          >
            {downloadingPdf ? (
              <Spinner className="text-primary" />
            ) : (
              <ArrowDownToLine className="text-primary" />
            )}
            {downloadingPdf ? "Generating..." : "Download PDF"}
          </Button>

          <Popover>
            <PopoverTrigger className="w-full">
              <Button
                className="w-full flex justify-start"
                variant={"ghost"}
                disabled={duplicating}
              >
                <MoreHorizontal className="text-primary" />
                <div className="hidden md:block">More</div>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0 w-fit">
              <div className="flex flex-col p-2">
                <Link href="#">
                  <Button variant={"ghost"}>
                    <File className="text-primary" /> Download DOCX
                  </Button>
                </Link>
                <Link href="#">
                  <Button variant={"ghost"}>
                    <FileText className="text-primary" /> Export to TXT
                  </Button>
                </Link>
                <Link href="#">
                  <Button
                    variant={"ghost"}
                    onClick={handleDuplicate}
                    disabled={duplicating}
                  >
                    {duplicating ? (
                      <Spinner />
                    ) : (
                      <Files className="text-primary" />
                    )}{" "}
                    Duplicate
                  </Button>
                </Link>
                <Button
                  variant={"ghost"}
                  onClick={handleDelete}
                  disabled={deleting}
                  className="flex justify-start text-destructive"
                >
                  {deleting ? <Spinner /> : <Trash className="" />} Delete
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
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

export default ResumeCard;
