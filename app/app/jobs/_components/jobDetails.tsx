"use client";

import { formatDescription } from "@/actions/openai/formatDescription";
import { useConfirm } from "@/components/general/confirmContext";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Bookmark,
  Clock,
  MapPin,
  Sparkles,
  ExternalLink,
  BriefcaseBusiness,
  Building2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { RiSparklingFill } from "react-icons/ri";
import TailorResumeDialog from "./tailorResume";
import { Resume } from "@/lib/generated/prisma";
import { getAllResume } from "@/actions/resume/getAllResume";

const JobDetails = ({
  jobLogo,
  jobTitle,
  employerName,
  jobLocation,
  postedAt,
  jobDescription,
  jobLink,
  jobId,
}: {
  jobLogo: string | null;
  jobTitle: string;
  employerName: string;
  jobLocation: string;
  postedAt: string;
  jobDescription: string;
  jobLink: string;
  jobId: string;
}) => {
  const [loading, setLoading] = useState(true);
  const [formated, setFormated] = useState("");
  const [open, setOpen] = useState(false);
  const confirm = useConfirm();

  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loadingResumes, setLoadingResumes] = useState(true);

  useEffect(() => {
    async function fetchResumes() {
      setLoadingResumes(true);
      try {
        const data = await getAllResume();
        setResumes(data || []);
      } catch (error) {
        console.error("Failed to fetch resumes:", error);
      } finally {
        setLoadingResumes(false);
      }
    }

    if (open) {
      fetchResumes();
    }
  }, [open]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const formatedDescription = await formatDescription(jobDescription);
      setFormated(formatedDescription);
      setLoading(false);
    })();
  }, [jobDescription]);

  async function handleApply() {
    const confirmed = await confirm({
      title: "Confirm Application",
      description:
        "Have you applied for this position? Confirming will add it to your job board so you can track your progress.",
      confirmText: "Yes, I applied",
      cancelText: "Not yet",
    });
  }

  async function handleTailor() {
    setOpen(true);
  }

  return (
    <div className="flex flex-col h-[calc(100vh-2rem)] relative  rounded-2xl overflow-hidden">
      <TailorResumeDialog
        open={open}
        jobId={jobId}
        onOpenChange={setOpen}
        resumes={resumes}
      />
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        {/* Header Section */}
        <div className="p-6 space-y-4 bg-muted/10">
          <div className="flex justify-between items-start gap-4">
            <div className="w-16 h-16 rounded-xl border bg-background p-2 shadow-sm shrink-0 flex items-center justify-center">
              <img
                src={jobLogo || "/icons/job.svg"}
                alt={jobTitle}
                className="w-full h-full object-contain"
              />
            </div>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 rounded-full hover:bg-primary/5 hover:text-primary transition-colors"
            >
              <Bookmark className="w-5 h-5" />
            </Button>
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              {jobTitle}
            </h1>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Building2 className="w-4 h-4" />
                <span className="font-medium text-foreground">
                  {employerName}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4" />
                <span>{jobLocation}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                <span>{postedAt}</span>
              </div>
            </div>
          </div>
        </div>
        <div className=" p-4 bg-background/80 backdrop-blur-md  flex flex-col sm:flex-row gap-3 ">
          <a href={jobLink} target="_blank">
            <Button
              onClick={handleApply}
              className="shadow-none bg-muted text-foreground"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Apply Now
            </Button>
          </a>
          <Button onClick={handleTailor}>
            <RiSparklingFill className="w-4 h-4 mr-2" />
            Tailor Resume
          </Button>
        </div>
        {/* Content Section */}
        <div className="p-6 pb-24">
          <div className="mb-4">
            <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
              <BriefcaseBusiness className="w-5 h-5 text-primary" />
              About the Job
            </h2>
          </div>

          {loading ? (
            <div className="space-y-3 animate-pulse">
              <Skeleton className="w-[40%] h-2 mb-4"></Skeleton>
              <Skeleton className="w-full h-2"></Skeleton>
              <Skeleton className="w-[95%] h-2"></Skeleton>
              <Skeleton className="w-[90%] h-2"></Skeleton>
              <Skeleton className="w-[98%] h-2"></Skeleton>
              <Skeleton className="w-[92%] h-2"></Skeleton>
              <Skeleton className="w-full h-2"></Skeleton>
              <Skeleton className="w-[85%] h-2 mb-6"></Skeleton>

              <Skeleton className="w-[30%] h-3 mb-4"></Skeleton>
              <Skeleton className="w-full h-2"></Skeleton>
              <Skeleton className="w-[96%] h-2"></Skeleton>
              <Skeleton className="w-[88%] h-2"></Skeleton>
              <Skeleton className="w-[94%] h-2"></Skeleton>
              <Skeleton className="w-[91%] h-2"></Skeleton>
              <Skeleton className="w-full h-2"></Skeleton>
              <Skeleton className="w-[70%] h-2"></Skeleton>
            </div>
          ) : (
            <div
              className="font-inter text-base leading-relaxed text-foreground/80 space-y-4 prose-strong:font-bold prose-strong:text-foreground prose-ul:space-y-2 prose-li:marker:text-primary/70"
              dangerouslySetInnerHTML={{ __html: formated }}
            />
          )}
        </div>
      </div>

      {/* Sticky Footer */}
    </div>
  );
};

export default JobDetails;
