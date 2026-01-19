"use client";

import { getAllResume } from "@/actions/resume/getAllResume";
import { tailorResumeAi } from "@/actions/openai/tailorResume";
import { getSingleJobDetails } from "@/actions/jobs/getSingleJobDetails";
import { Resume } from "@/lib/generated/prisma";
import { T_Resume } from "@/types/resumeInfos";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getKeywordsFromJob } from "@/actions/openai/getKeywordsFromJob";
import ResumeCard from "@/app/app/resumes/_components/resumeCard";
import ResumeCardForDialog from "../resumeCard";
import Link from "next/link";
import { duplicateResume } from "@/actions/resume/duplicateResume";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import { useResumeQuotaGate } from "@/components/general/resumeQuotaDialog";

interface TailorResumeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  jobId: string;
  resumes: Resume[];
}

const TailorResumeDialog = ({
  open,
  onOpenChange,
  jobId,
  resumes,
}: TailorResumeDialogProps) => {
  const { ensureCanCreateResume, openDialog, dialog } = useResumeQuotaGate();
  const [loadingResumes, setLoadingResumes] = useState(false);
  const [duplicating, setDuplicating] = useState<Record<string, boolean>>({});
  const router = useRouter();

  async function handleTailorResume(resume: Resume) {
    const allowed = await ensureCanCreateResume();
    if (!allowed) {
      return;
    }

    setDuplicating((prev) => ({ ...prev, [resume.id]: true }));
    const tempResume = await duplicateResume(resume, false);
    setDuplicating((prev) => ({ ...prev, [resume.id]: false }));

    if (tempResume) {
      toast.success("Duplicated");
      router.push(
        `/app/resumes/create?id=${tempResume.id}&tab=tailor&job_id=${jobId}`,
      );
    } else {
      toast.error(
        "Failed to duplicate resume. You may have reached your resume limit.",
      );
      openDialog();
    }
  }

  return (
    <>
      {dialog}
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-4xl max-h-[85vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>Tailor Your Resume</DialogTitle>
            <DialogDescription>
              Choose a resume to tailor for this position.
            </DialogDescription>
          </DialogHeader>

          <div className="px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-6 overflow-y-scroll">
            {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-6 overflow-scroll h-full"> */}
            {loadingResumes ? (
              <div className="col-span-full py-12 text-center text-muted-foreground">
                Loading resumes...
              </div>
            ) : resumes.length === 0 ? (
              <div className="col-span-full py-12 text-center text-muted-foreground">
                No resumes found. Create a resume first!
              </div>
            ) : (
              resumes.map((resume) => (
                <div key={resume.id} className="cursor-pointer relative group ">
                  <div
                    className={cn(duplicating[resume.id] && "opacity-70")}
                    onClick={() => handleTailorResume(resume)}
                    // href={`/app/resumes/create?id=${resume.id}&tab=tailor&job_id=${jobId}`}
                  >
                    <ResumeCardForDialog
                      loading={duplicating[resume.id]}
                      resume={resume}
                    />
                  </div>
                </div>
              ))
            )}
            {/* </div> */}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TailorResumeDialog;
