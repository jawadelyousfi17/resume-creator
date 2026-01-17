"use client";

import {
  reviewResume,
  type ResumeReviewResult,
} from "@/actions/openai/enhaceJobDescription";
import { updateResumeScore } from "@/actions/resume/updateResumeScore";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { T_Resume } from "@/types/resumeInfos";
import { CheckCircle, Sparkles, X } from "lucide-react";
import { useSearchParams } from "next/navigation";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

const colors = {
  10: "#ef4444", // Danger / Low (red-500)
  20: "#f87171", // red-400
  30: "#f97316", // Warning / Getting warmer (orange-500)
  40: "#fb923c", // orange-400
  50: "#eab308", // Intermediate (yellow-500)
  60: "#facc15", // yellow-400
  70: "#84cc16", // Good (lime-500)
  80: "#4ade80", // green-400
  90: "#22c55e", // Excellent / High (green-500)
  100: "#10b981", // emerald-500
};

export function getColor(val: number): string {
  if (val >= 0 && val <= 10) return colors["10"];
  if (val >= 10 && val < 20) return colors["20"];
  if (val >= 20 && val < 30) return colors["30"];
  if (val >= 30 && val < 40) return colors["40"];
  if (val >= 40 && val < 50) return colors["50"];
  if (val >= 50 && val < 60) return colors["60"];
  if (val >= 60 && val < 70) return colors["70"];
  if (val >= 70 && val < 80) return colors["80"];
  if (val >= 80 && val < 90) return colors["90"];

  return colors["100"];
}

function getWidth(val: number) {
  return `w-[${val}%]`;
}

const Review = ({
  data,
  setData: _setData,
}: {
  data: T_Resume;
  setData: Dispatch<SetStateAction<T_Resume>>;
}) => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [isReviewing, setIsReviewing] = useState(false);
  const [review, setReview] = useState<ResumeReviewResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const resumeJsonString = useMemo(() => JSON.stringify(data), [data]);

  const handleRunReview = useCallback(async () => {
    setIsReviewing(true);
    setError(null);
    try {
      const result = await reviewResume(resumeJsonString);
      setReview(result);
      if (id) {
        const r = await updateResumeScore(id, result.overallScore);
        console.log("R - ", r);
      }
    } catch (err) {
      console.error(err);
      setReview(null);
      setError("Failed to generate resume review. Please try again.");
    } finally {
      setIsReviewing(false);
    }
  }, [resumeJsonString, id]);

  return (
    <div className="bg-background p-4 space-y-5">
      <div className="flex flex-col gap-0.5">
        <span className="font-semibold text-lg font-serif">
          Review Your Resume
        </span>
        <span className="text-xs font-light text-foreground/50">
          Review all the information you've provided and make sure everything is
          correct
        </span>
      </div>

      {!review && (
        <div className="flex flex-col items-center justify-between gap-3">
          <img src="/images/ai.png" className="w-[60%] max-w-50" alt="" />

          <Button
            onClick={handleRunReview}
            disabled={isReviewing}
            className="rounded-full "
            size="lg"
          >
            {isReviewing ? <Spinner className="mr-2" /> : <></>}
            {isReviewing ? "Reviewing..." : "Run AI Review"}
          </Button>
          <div className="text-xs text-foreground/50 max-w-72 text-center">
            AI review checks impact, clarity, ATS keywords, and completeness.
          </div>
        </div>
      )}

      {error && (
        <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {review && (
        <div className="space-y-4">
          <div className="overflow-hidden relative rounded-2xl p-4 bg-muted">
            <div
              className="absolute top-0 left-0 h-full z-5"
              style={{
                width: `${review.overallScore}%`,
                backgroundColor: getColor(review.overallScore),
              }}
            ></div>
            <div className="flex items-start justify-between gap-4">
              <div className="space-x-4  items-center z-10">
                <div className="text-sm font-semibold">Overall score</div>
                <div className={`text-3xl font-bold `}>
                  {review.overallScore}/100
                </div>
              </div>
              <div className="text-xs text-foreground/60 max-w-lg"></div>
            </div>
          </div>

          <div className="rounded-2xl ">
            <div className="text-sm font-semibold mb-3">Section scores</div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {Object.entries(review.sectionScores).map(([key, value]) => (
                <div
                  key={key}
                  className="rounded-md p-3"
                  style={{ backgroundColor: getColor(value) }}
                >
                  <div className="text-xs uppercase tracking-wide text-foreground/80">
                    {key}
                  </div>
                  <div className="text-lg font-semibold text-foreground">
                    {value}/100
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1  gap-4">
            <div className="rounded-2xl p-3">
              <div className="text-sm font-semibold mb-2">What’s missing</div>
              <ul className="space-y-2">
                {(review.missing?.length
                  ? review.missing
                  : ["Nothing major detected."]
                ).map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-sm text-foreground/70"
                  >
                    <X className="w-4 h-4 mt-0.5 text-destructive/80 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl p-3">
              <div className="text-sm font-semibold mb-2">
                What didn’t go well
              </div>
              <ul className="space-y-2">
                {(review.didntGoWell?.length
                  ? review.didntGoWell
                  : ["No major issues detected."]
                ).map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-sm text-foreground/70"
                  >
                    <X className="w-4 h-4 mt-0.5 text-destructive shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1  gap-4">
            {/* <div className="rounded-2xl border border-border/50 p-4 bg-muted/5">
              <div className="text-sm font-semibold mb-2">Strengths</div>
              <ul className="space-y-2">
                {(review.strengths?.length
                  ? review.strengths
                  : ["No strengths listed."]
                ).map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-sm text-foreground/70"
                  >
                    <CheckCircle className="w-4 h-4 mt-0.5 text-primary/70" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div> */}

            <div className="rounded-2xl border border-border/50 p-4 bg-muted/5">
              <div className="text-sm font-semibold mb-2">Quick fixes</div>
              <ul className="space-y-2">
                {(review.quickFixes?.length
                  ? review.quickFixes
                  : ["No quick fixes suggested."]
                ).map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-sm text-foreground/70"
                  >
                    <CheckCircle className="w-4 h-4 mt-0.5 text-primary/70 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="rounded-2xl p-3 ">
            <div className="text-sm font-semibold mb-2 flex items-center gap-2">
              <X className="w-4 h-4 mt-0.5 text-destructive shrink-0" />
              Missing keywords
            </div>
            <div className="flex flex-wrap gap-2">
              {(review.missingKeywords?.length
                ? review.missingKeywords
                : ["No missing keywords suggested."]
              ).map((kw, idx) => (
                <span
                  key={idx}
                  className="text-xs px-2 py-1 rounded-full bg-destructive    text-accent"
                >
                  {kw}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Review;
