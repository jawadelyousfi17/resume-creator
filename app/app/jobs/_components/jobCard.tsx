"use client";

import { saveJob } from "@/actions/jobs/saveJob";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Bookmark, Clock, Heart, Locate, MapPin } from "lucide-react";

const JobCard = ({
  jobLogo,
  active,
  jobTitle,
  employerName,
  jobLocation,
  postedAt,
  onClick,
  jobId,
}: {
  active: boolean;
  onClick: () => void;
  jobLogo: string | null;
  jobTitle: string;
  employerName: string;
  jobLocation: string;
  postedAt: string;
  jobId: string;
}) => {
  return (
    <div
      className={cn(
        "group flex gap-4 p-4 rounded-xl  max-w-md w-full bg-muted  border-2 border-transparent cursor-pointer",
        active && "border-primary "
      )}
      onClick={onClick}
    >
      <div className="shrink-0">
        <img
          src={jobLogo || "/icons/job.svg"}
          alt={jobTitle}
          className="w-14 h-14 object-contain rounded-lg border bg-background p-1"
        />
      </div>
      <div className="flex flex-col flex-1 min-w-0">
        <div className="flex justify-between items-start gap-2">
          <div className="flex flex-col min-w-0">
            <span className="text-xs text-muted-foreground font-medium truncate transition-all group-hover:text-primary/50">
              {employerName}
            </span>
            <h3 className="font-semibold text-base leading-tight line-clamp-2 transition-all group-hover:text-primary">
              {jobTitle}
            </h3>
          </div>
          <Button
            variant={"ghost"}
            className="shrink-0 text-muted-foreground hover:text-primary transition-colors"
          >
            <Bookmark className="w-5 h-5" />
          </Button>
        </div>

        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-auto pt-3">
          <div className="flex items-center gap-1.5 text-sm font-light text-muted-foreground">
            <MapPin strokeWidth={1} className="w-4 h-4" />
            <span className="truncate">{jobLocation}</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm font-light text-muted-foreground">
            <Clock strokeWidth={1} className="w-4 h-4" />
            <span>{postedAt}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
