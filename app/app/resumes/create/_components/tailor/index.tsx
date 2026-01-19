"use client";

import { getSingleJobDetails } from "@/actions/jobs/getSingleJobDetails";
import { getKeywordsFromJob } from "@/actions/openai/getKeywordsFromJob";
import { scrapeJobDetails } from "@/actions/jobs/scrapeJobDetails";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import { SingleJobResponse } from "@/types/singleJob";
import { useSearchParams, useRouter } from "next/navigation";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { RiSparklingFill } from "react-icons/ri";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  CheckCheckIcon,
  Plus,
  X,
  Link as LinkIcon,
  Search,
} from "lucide-react";
import { Resume } from "@/lib/generated/prisma";
import { tailorResumeAi } from "@/actions/openai/tailorResume";
import { updateResumeById } from "@/actions/resume/updateResumeById";
import { T_Resume } from "@/types/resumeInfos";
import toast from "react-hot-toast";
import { getResumeDiff } from "./_utils/getDiff";
import { reviewResumeForJob } from "@/actions/openai/reviewResumeForJob";
import { getColor } from "../review";
import { activateResume } from "@/actions/resume/activateResume";
import { useConfirm } from "@/components/general/confirmContext";
import { deleteResume as deleteResumeAction } from "@/actions/resume/deleteResume";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import {
  isAiCreditsExhaustedError,
  useAiCreditsGate,
} from "@/components/general/aiCreditsDialog";

const Tailor = ({
  resume,
  sections,
  data,
  setData,
}: {
  resume: Resume;
  sections: {
    section: React.ComponentType<{
      data: T_Resume;
      setData: React.Dispatch<React.SetStateAction<T_Resume>>;
    }>;
    id: number;
    active: boolean;
    sectionTitle: string;
  }[];
  data: T_Resume;
  setData: React.Dispatch<React.SetStateAction<T_Resume>>;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const job_id = searchParams.get("job_id");

  const { ensureCanUseAi, openDialog, dialog } = useAiCreditsGate();

  const [jobDetails, setJobDetails] = useState<SingleJobResponse | null>(null);
  const [loading, setLoading] = useState(Boolean(job_id));
  const [tailoring, setTailoring] = useState(false);
  const [keywords, setKeywords] = useState<Record<string, boolean>[]>([]);
  const [open, setOpen] = useState(false);
  const [changedSections, setChangedSections] = useState<number[]>([]);
  const [score, setScore] = useState<number | null>(null);
  const [calculatingScore, setCalculatingScore] = useState(false);
  const [approving, setApproving] = useState(false);
  const [jobLink, setJobLink] = useState("");
  const [jobDescriptionInput, setJobDescriptionInput] = useState("");
  const [loadingJobInput, setLoadingJobInput] = useState(false);

  const [tailoredResume, setTailoredResume] = useState<Resume>(resume);

  const confirm = useConfirm();

  const matchCount = keywords.filter((kw) => Object.values(kw)[0]).length;
  const totalKeywords = keywords.length;
  const percentage = totalKeywords > 0 ? (matchCount / totalKeywords) * 100 : 0;

  async function calculateScore(resumeContent: T_Resume, jobDesc: string) {
    setCalculatingScore(true);
    try {
      const s = await reviewResumeForJob(resumeContent, jobDesc);
      setScore(s);
    } catch (e) {
      console.error(e);
      if (isAiCreditsExhaustedError(e)) {
        openDialog();
      }
    } finally {
      setCalculatingScore(false);
    }
  }

  useEffect(() => {
    (async () => {
      if (job_id) {
        const allowed = await ensureCanUseAi();
        if (!allowed) {
          setLoading(false);
          return;
        }

        if (false) {
          const jobData = JSON.parse(localStorage.getItem("jobData") as string);
          setJobDetails(jobData);
          const _keywords = await getKeywordsFromJob(
            jobData.data[0].job_description
          );
          setKeywords(_keywords.map((kw) => ({ [kw]: true })));

          calculateScore(
            resume.content as unknown as T_Resume,
            jobData.data[0].job_description
          );

          setLoading(false);
          return;
        }
        setLoading(true);
        const jobData = await getSingleJobDetails(job_id);
        if (jobData) {
          localStorage.setItem("jobData", JSON.stringify(jobData));
          setJobDetails(jobData);

          try {
            const _keywords = await getKeywordsFromJob(
              jobData.data[0].job_description
            );
            setKeywords(_keywords.map((kw) => ({ [kw]: true })));

            calculateScore(
              resume.content as unknown as T_Resume,
              jobData.data[0].job_description
            );
          } catch (e) {
            console.error(e);
            if (isAiCreditsExhaustedError(e)) {
              openDialog();
            }
          }
        }
        setLoading(false);
      }
    })();
  }, [ensureCanUseAi, job_id, openDialog]);

  function extractJobIdFromUrl(raw: string): string | null {
    try {
      const url = new URL(raw);
      const direct =
        url.searchParams.get("job_id") ||
        url.searchParams.get("jobId") ||
        url.searchParams.get("jobid") ||
        url.searchParams.get("id") ||
        url.searchParams.get("jk");
      if (direct) return direct;
    } catch {
      // ignore
    }

    const match = raw.match(/(?:job_id|jobId|jobid|jk|id)=([^&\s]+)/i);
    return match?.[1] || null;
  }

  async function loadJobContext() {
    const link = jobLink.trim();
    const description = jobDescriptionInput.trim();

    if (!link && !description) {
      toast.error("Paste a job link or description first");
      return;
    }

    setLoadingJobInput(true);
    setLoading(true);
    const allowed = await ensureCanUseAi();
    if (!allowed) {
      setLoadingJobInput(false);
      setLoading(false);
      return;
    }

    try {
      if (link) {
        // Try to extract job_id from URL first
        const extracted = extractJobIdFromUrl(link);

        if (extracted) {
          const jobData = await getSingleJobDetails(extracted);
          if (jobData && jobData.data?.[0]?.job_description) {
            setJobDetails(jobData);
            try {
              const _keywords = await getKeywordsFromJob(
                jobData.data[0].job_description
              );
              setKeywords(_keywords.map((kw) => ({ [kw]: true })));
              await calculateScore(
                resume.content as unknown as T_Resume,
                jobData.data[0].job_description
              );
            } catch (e) {
              console.error(e);
              if (isAiCreditsExhaustedError(e)) {
                openDialog();
                return;
              }
              throw e;
            }
            toast.success("Job loaded");
            return;
          }
        }

        // If no job_id or API fetch failed, scrape the page
        toast.loading("Scraping job details...", { id: "scraping" });
        const scrapedData = await scrapeJobDetails(link);
        toast.dismiss("scraping");

        console.log(scrapedData);

        if (!scrapedData || !scrapedData.data?.[0]?.job_description) {
          toast.error("Failed to extract job details from this link");
          return;
        }

        setJobDetails(scrapedData);
        try {
          const _keywords = await getKeywordsFromJob(
            scrapedData.data[0].job_description
          );
          setKeywords(_keywords.map((kw) => ({ [kw]: true })));
          await calculateScore(
            resume.content as unknown as T_Resume,
            scrapedData.data[0].job_description
          );
        } catch (e) {
          console.error(e);
          if (isAiCreditsExhaustedError(e)) {
            openDialog();
            return;
          }
          throw e;
        }
        toast.success("Job loaded");
        return;
      }

      // Description-only flow
      const fakeJob: SingleJobResponse = {
        status: "ok",
        request_id: "local",
        parameters: {
          job_id: "local",
          country: "",
          language: "",
        },
        data: [
          {
            job_id: "local",
            job_title: "Custom job",
            employer_name: "Job description",
            employer_logo: null,
            job_location: "",
            job_posted_at: "",
            job_apply_link: "",
            job_description: description,
          } as any,
        ],
      };

      setJobDetails(fakeJob);
      try {
        const _keywords = await getKeywordsFromJob(description);
        setKeywords(_keywords.map((kw) => ({ [kw]: true })));
        await calculateScore(
          resume.content as unknown as T_Resume,
          description
        );
      } catch (e) {
        console.error(e);
        if (isAiCreditsExhaustedError(e)) {
          openDialog();
          return;
        }
        throw e;
      }
      toast.success("Job loaded");
    } finally {
      setLoading(false);
      setLoadingJobInput(false);
    }
  }

  async function handleAutoTailor() {
    setTailoring(true);

    const allowed = await ensureCanUseAi();
    if (!allowed) {
      setTailoring(false);
      setOpen(false);

      return;
    }

    const selectedKeywords = keywords
      .filter((k) => Object.values(k)[0])
      .map((k) => Object.keys(k)[0]);

    setTailoring(true);
    setOpen(false);
    let newContent: any;
    try {
      newContent = await tailorResumeAi(
        selectedKeywords,
        jobDetails?.data[0].job_description || "",
        resume.content as any
      );
    } catch (e) {
      console.error(e);
      if (isAiCreditsExhaustedError(e)) {
        openDialog();
        setTailoring(false);
        return;
      }
      throw e;
    }

    const newResume = await updateResumeById(resume.id, newContent as T_Resume);

    const oldData = resume.content as unknown as T_Resume;

    const diff = getResumeDiff(oldData, newContent as T_Resume);

    const sectionMapping: Record<string, number> = {
      personalDetails: 1,
      employmentHistory: 2,
      education: 3,
      skills: 4,
      professionalSummary: 5,
      hobbies: 6,
      languages: 7,
      courses: 8,
      additional: 9,
      internships: 10,
    };

    const changedIds = Object.keys(diff)
      .map((key) => sectionMapping[key])
      .filter((id): id is number => id !== undefined);

    setChangedSections(changedIds);

    if (newResume) {
      setData(newContent as T_Resume);
      // Re-calculate score after tailoring
      calculateScore(
        newContent as T_Resume,
        jobDetails?.data[0].job_description || ""
      );
      router.refresh();
    }

    setTailoring(false);
    setOpen(false);
  }

  async function approveResume() {
    setApproving(true);
    const r = await activateResume(resume.id);
    setApproving(false);
    if (!r) toast.error("Resume did not created");
    router.push("/app/resumes");
  }

  async function deleteResume() {
    const confirmed = await confirm({
      title: "Discard changes?",
      description:
        "Are you sure you want to discard this tailored resume? This copy will be deleted.",
      confirmText: "Discard",
      cancelText: "Cancel",
      variant: "destructive",
    });

    if (!confirmed) return;

    const r = await deleteResumeAction(resume.id);
    if (!r) {
      toast.error("Failed to delete resume");
      return;
    }
    toast.success("Discarded tailored resume");
    router.back();
  }

  async function hanldeStartTailoring() {
    setOpen(true);
  }

  return (
    <div className=" space-y-5 items-center justify-center w-full pt-4">
      {dialog}
      {!job_id && !jobDetails && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-background p-6 md:p-8 rounded-md  transition-all hover:border-border/80"
        >
          <div className="w-full max-w-lg mx-auto space-y-6">
            <div className="text-center space-y-2">
              <h3 className="text-lg font-bold tracking-tight text-foreground">
                Tailor resume for a specific job
              </h3>
              <p className="text-sm text-muted-foreground font-light max-w-xs mx-auto leading-relaxed">
                Paste a job link or description below, and our AI will optimize
                your resume to match.
              </p>
            </div>

            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase text-muted-foreground/70 tracking-wider flex items-center gap-1.5">
                  <LinkIcon className="w-3.5 h-3.5" />
                  Option 1: Job Link
                </label>
                <Input
                  value={jobLink}
                  onChange={(e) => setJobLink(e.target.value)}
                  placeholder="Paste LinkedIn, Indeed, or any job URL..."
                  className="bg-muted border-border/60 focus-visible:ring-primary/20 h-10"
                />
              </div>

              <div className="relative flex items-center py-1">
                <div className="flex-grow border-t border-border/60"></div>
                <span className="flex-shrink-0 mx-4 text-[10px] font-bold text-muted-foreground/40 uppercase tracking-widest bg-background px-2">
                  OR
                </span>
                <div className="flex-grow border-t border-border/60"></div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase text-muted-foreground/70 tracking-wider flex items-center gap-1.5">
                  <Search className="w-3.5 h-3.5" />
                  Option 2: Job Description
                </label>
                <Textarea
                  value={jobDescriptionInput}
                  onChange={(e) => setJobDescriptionInput(e.target.value)}
                  placeholder="Paste the full job description here..."
                  className="min-h-[100px] max-h-[200px] resize-y bg-muted border-0  focus-visible:ring-2 focus-visible:ring-primary/20"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button
                onClick={loadJobContext}
                disabled={
                  loadingJobInput ||
                  (!jobLink.trim() && !jobDescriptionInput.trim())
                }
                className="flex-1 h-10 shadow-lg shadow-primary/20 transition-all hover:shadow-primary/30"
              >
                {loadingJobInput ? <Spinner className="mr-2 h-4 w-4" /> : <></>}
                Analyze Job
              </Button>
              <Link href="/app/jobs" className="flex-1">
                <Button
                  variant="outline"
                  className="w-full h-10 border-border/60 hover:bg-muted/50"
                >
                  <Search className="mr-2 w-4 h-4 text-muted-foreground" />
                  Browse Jobs
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      )}
      {(job_id || jobDetails) && (
        <div className="space-y-2 flex flex-col justify-center items-center bg-background p-4 rounded-md border border-border/30">
          <Dialog open={open} onOpenChange={setOpen}>
            {/* <DialogTrigger>Open</DialogTrigger> */}
            <DialogContent>
              <DialogHeader className="flex flex-col justify-center items-center">
                <DialogTitle>Check keywords</DialogTitle>
                <DialogDescription className="text-center font-light">
                  Select the relevant keywords to start tailoring your resume
                  for this job.
                </DialogDescription>
              </DialogHeader>

              <div className="flex flex-col  rounded-md  bg-card text-card-foreground ">
                {/* 1. Header Section: Clear separation of Title and Action */}
                <div className="flex items-center justify-between mb-1">
                  <div className="space-y-1">
                    <h3 className="font-normal  leading-none tracking-tight">
                      {jobDetails?.data[0].job_title || "Job Details"}
                    </h3>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      setKeywords(
                        keywords.map((kw) => ({ [Object.keys(kw)[0]]: false }))
                      )
                    }
                    className="text-primary hover:text-destructive h-8 px-2"
                  >
                    Clear all
                  </Button>
                </div>

                {/* 2. Progress Section: Visualizes the "10/10" metric */}
                <div className="mb-1 ">
                  <div className="flex justify-between text-sm font-medium">
                    <span className="text-primary"></span>
                    <span>
                      {matchCount}/{totalKeywords} Keywords
                    </span>
                  </div>
                  {/* <Progress value={percentage} className="h-2" /> */}
                </div>

                {/* 3. Grid Section: Keywords as "Chips" */}
                <div className="grid grid-cols-2 gap-2">
                  {keywords.map((item, index) => {
                    const [label, isSelected] = Object.entries(item)[0];
                    return (
                      <div
                        key={index}
                        onClick={() => {
                          const newKeywords = [...keywords];
                          newKeywords[index] = { [label]: !isSelected };
                          setKeywords(newKeywords);
                        }}
                        className={cn(
                          "flex items-center justify-between p-2 px-3 rounded-lg border text-sm font-medium transition-all cursor-pointer",
                          isSelected
                            ? "bg-chart-5/10 border-chart-5/20 text-chart-5 hover:bg-chart-5/15"
                            : "bg-muted/30 border-transparent text-muted-foreground hover:bg-muted/50"
                        )}
                      >
                        <span className="truncate mr-2">{label}</span>
                        {isSelected ? (
                          <Check className="w-4 h-4 shrink-0" />
                        ) : (
                          <Plus className="w-4 h-4 shrink-0" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <Button onClick={handleAutoTailor} disabled={tailoring}>
                {tailoring ? <Spinner /> : <RiSparklingFill />}
                Auto Tailor
              </Button>
            </DialogContent>
          </Dialog>

          {/* Job Card Section */}
          {!loading && (job_id || jobDetails) && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className={cn("group flex gap-4  pb-2 cursor-pointer   w-full ")}
            >
              <div className="shrink-0">
                <img
                  src={jobDetails?.data[0].employer_logo || "/icons/job.svg"}
                  className="w-14 h-14 object-contain rounded-lg border bg-background p-1"
                />
              </div>
              <div className="flex flex-col flex-1 min-w-0">
                <div className="flex justify-between items-start gap-2">
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs text-muted-foreground font-medium truncate transition-all group-hover:text-primary/50">
                      {jobDetails?.data[0].employer_name ||
                        "Custom Job Context"}
                    </span>
                    <h3 className="font-semibold text-base leading-tight line-clamp-2 transition-all group-hover:text-primary">
                      {jobDetails?.data[0].job_title || "Processed Job Details"}
                    </h3>
                  </div>
                  <Button
                    variant={"ghost"}
                    className="shrink-0 text-muted-foreground hover:text-primary transition-colors"
                  ></Button>
                </div>

                <div className="flex flex-wrap gap-x-4 gap-y-1 mt-auto pt-3">
                  <div className="flex items-center gap-1.5 text-sm font-light text-muted-foreground">
                    {jobDetails?.data[0].job_location && (
                      <span className="truncate">
                        {jobDetails?.data[0].job_location}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {loading && job_id && (
            <div className="flex gap-4 pb-2 w-full animate-in fade-in">
              <Skeleton className="w-14 h-14 rounded-lg shrink-0" />
              <div className="flex flex-col flex-1 gap-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-6 w-3/4" />
                <div className="mt-auto pt-3">
                  <Skeleton className="h-4 w-32" />
                </div>
              </div>
            </div>
          )}

          {(score !== null || calculatingScore) && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              style={{
                backgroundColor: score !== null ? getColor(score) : "#e5e7eb",
              }}
              className={cn(
                "flex p-3 items-center rounded-md gap-3 text-sm transition-all animate-in fade-in slide-in-from-top-2 w-full",
                calculatingScore && "opacity-70"
              )}
            >
              <span
                className={`bg-background text-foreground p-0.5 w-12 h-12 flex justify-center items-center rounded-full font-bold text-lg shadow-sm`}
              >
                {calculatingScore ? (
                  <Spinner className="w-5 h-5" />
                ) : (
                  `${score}%`
                )}
              </span>
              <div className="flex flex-col">
                <span className="text-black font-semibold">
                  {calculatingScore
                    ? "Calculating ATS Score..."
                    : "ATS Match Score"}
                </span>
                <span className="font-light text-xs text-black/80">
                  {calculatingScore
                    ? "Analyzing your resume against the job requirements..."
                    : score !== null &&
                      (score > 80
                        ? "Excellent match for this position!"
                        : score > 50
                        ? "Good match, but can be improved."
                        : "Needs optimization for better results.")}
                </span>
              </div>
            </motion.div>
          )}

          <div className="flex justify-start w-full">
            <Button
              disabled={tailoring || loading}
              onClick={hanldeStartTailoring}
            >
              {tailoring ? <Spinner /> : <RiSparklingFill />}
              Start tailoring
            </Button>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-2">
        {sections.filter((section) => changedSections.includes(section.id))
          .length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col gap-4 p-4 bg-background border border-primary/10 rounded-md "
          >
            <div className="flex items-start gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-full  text-primary shrink-0">
                <RiSparklingFill className="w-5 h-5" />
              </div>
              <div className="space-y-0.5 flex-1">
                <h3 className="font-semibold text-base text-foreground leading-none">
                  AI Optimization Complete
                </h3>
                <p className="text-sm text-muted-foreground font-light">
                  We've enhanced the following sections to better match this job
                  description:
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 pt-2 ml-13">
              <Button
                size="sm"
                variant="outline"
                className="h-8 px-4 text-xs font-semibold hover:bg-red-50 hover:text-red-600 hover:border-red-200"
                onClick={deleteResume}
              >
                Ignore
              </Button>
              <Button
                size="sm"
                disabled={approving}
                className="h-8 px-4 text-xs font-semibold shadow-none"
                onClick={approveResume}
              >
                {approving && <Spinner />}
                Approve
              </Button>
            </div>
          </motion.div>
        )}
        {sections
          .filter((section) => changedSections.includes(section.id))
          .map((section) => (
            <section.section key={section.id} data={data} setData={setData} />
          ))}
      </div>
    </div>
  );
};

export default Tailor;
