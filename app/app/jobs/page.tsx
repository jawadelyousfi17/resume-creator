"use client";

import { getJobs } from "@/actions/jobs/getJobs";
import React, {
  useEffect,
  useState,
  useRef,
  useMemo,
  useCallback,
} from "react";
import JobCard from "./_components/jobCard";
import { JobSearchResponse } from "@/types/job";
import JobDetails from "./_components/jobDetails";
import { LocationEdit, MapPin, Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { CountrySelect } from "./_components/countrySelect";

const JobsContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [jobs, setJobs] = useState<JobSearchResponse | null>(null);
  const [activeJob, setActiveJob] = useState<
    JobSearchResponse["data"][0] | null
  >(null);

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [location, setLocation] = useState(searchParams.get("location") || "");
  const [loading, setLoading] = useState(true);
  const [country, setCountry] = useState(searchParams.get("country") || "us");
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const fetchIdRef = useRef(0);

  const paramsKey = useMemo(() => searchParams.toString(), [searchParams]);

  useEffect(() => {
    const currentFetchId = ++fetchIdRef.current;
    let isCancelled = false;

    (async () => {
      const q_search = searchParams.get("search") || "Engineer";
      const q_page = parseInt(searchParams.get("page") || "1");
      const q_country = searchParams.get("country") || "us";

      setSearch(q_search);
      setLocation(searchParams.get("location") || "");
      setCountry(q_country);

      setLoading(true);
      setPage(1);
      setHasMore(true);

      const res = await getJobs(q_search, q_page, 10, q_country);

      if (isCancelled || currentFetchId !== fetchIdRef.current) return;

      setJobs(res);
      setActiveJob(res ? res.data[0] : null);
      setHasMore(Boolean(res?.data?.length));
      setLoading(false);
    })();

    return () => {
      isCancelled = true;
    };
  }, [paramsKey, searchParams]);

  const loadMoreJobs = useCallback(async () => {
    if (loading || loadingMore || !hasMore) return;

    const q_search = searchParams.get("search") || "Engineer";
    const q_country = searchParams.get("country") || "us";
    const nextPage = page + 1;

    setLoadingMore(true);
    const res = await getJobs(q_search, nextPage, 10, q_country);

    if (res && res.data.length > 0) {
      setJobs((prev) => ({
        ...res,
        data: [...(prev?.data || []), ...res.data],
      }));
      setPage(nextPage);
    } else {
      setHasMore(false);
    }

    setLoadingMore(false);
  }, [loading, loadingMore, hasMore, page, searchParams]);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const handleScroll = () => {
      if (loading || loadingMore || !hasMore) return;

      const { scrollTop, scrollHeight, clientHeight } = scrollContainer;

      if (scrollHeight - scrollTop <= clientHeight + 100) {
        loadMoreJobs();
      }
    };

    scrollContainer.addEventListener("scroll", handleScroll);
    return () => scrollContainer.removeEventListener("scroll", handleScroll);
  }, [loadMoreJobs, loading, loadingMore, hasMore]);

  async function findJobs() {
    const params = new URLSearchParams(searchParams.toString());
    if (search) params.set("search", search);
    else params.delete("search");

    if (location) params.set("location", location);
    else params.delete("location");

    if (country) params.set("country", country);
    else params.delete("country");

    params.set("page", "1");

    router.push(`/app/jobs?${params.toString()}`);
  }

  return (
    <div className="flex flex-col gap-2 p-2 relative">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          findJobs();
        }}
        className="sticky top-[80px] left-0 z-10 w-full mb-4 px-1"
      >
        <div className="bg-background/95 backdrop-blur-md border border-border/40 rounded-md p-1.5  transition-all duration-300 ring-1 ring-black/5 dark:ring-white/5">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-0">
            {/* Search Input */}
            <div className="flex-1 flex items-center gap-3 px-4 h-11 w-full relative group">
              <Search className="h-5 w-5 shrink-0 text-muted-foreground/60 group-focus-within:text-primary transition-colors" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-bakground border-0 shadow-none focus-visible:ring-0 px-0 h-full text-base placeholder:text-muted-foreground/50"
                placeholder="Job title, keywords, or company..."
                aria-label="Search jobs"
              />
              {search.length > 0 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 rounded-full hover:bg-muted text-muted-foreground"
                  onClick={() => setSearch("")}
                >
                  <X className="h-3 w-3" />
                </Button>
              )}
            </div>

            {/* Divider for desktop */}
            <div className="hidden md:block w-px h-6 bg-border/60 mx-1"></div>

            {/* Country Select */}
            <div className="w-full md:w-auto min-w-[180px]">
              <CountrySelect
                className="w-full border-0 bg-transparent shadow-none focus:ring-0 h-10 hover:bg-muted/30 rounded-lg justify-start gap-2 px-3 text-muted-foreground hover:text-foreground transition-colors"
                value={country}
                onChange={setCountry}
                placeholder="Select Country"
              />
            </div>

            {/* Search Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full md:w-auto rounded-full px-6 h-10 md:ml-1 shadow-sm hover:shadow-md transition-all font-medium"
            >
              {loading ? "Searching..." : "Search"}
            </Button>
          </div>
        </div>
      </form>
      <div className="flex gap-2 ">
        <div
          ref={scrollRef}
          className="flex flex-col gap-2 flex-1 max-h-[85vh] overflow-y-scroll no-scrollbar"
        >
          {loading ? (
            Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="flex gap-4 p-4 border rounded-2xl animate-in fade-in"
              >
                <Skeleton className="w-12 h-12 rounded-lg shrink-0" />
                <div className="flex flex-col gap-2 flex-1">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-3 w-24 mt-1" />
                </div>
              </div>
            ))
          ) : !jobs?.data || jobs.data.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center text-muted-foreground">
              <div className="text-sm font-medium">No jobs found</div>
              <div className="text-xs font-light mt-1">
                Try changing keywords or selecting another country.
              </div>
            </div>
          ) : (
            jobs.data.map((job, index) => (
              <JobCard
                active={activeJob?.job_id === job.job_id}
                onClick={() => setActiveJob(job)}
                key={job.job_id || index}
                jobLogo={job.employer_logo}
                jobLocation={job.job_location}
                jobTitle={job.job_title}
                postedAt={job.job_posted_at}
                employerName={job.employer_name}
              />
            ))
          )}

          {loadingMore && (
            <div className="flex gap-4 p-4 border rounded-2xl animate-in fade-in">
              <Skeleton className="w-12 h-12 rounded-lg shrink-0" />
              <div className="flex flex-col gap-2 flex-1">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-3 w-24 mt-1" />
              </div>
            </div>
          )}

          {!loading && !hasMore && jobs?.data && jobs.data.length > 0 && (
            <div className="text-center py-4 text-sm text-muted-foreground">
              No more jobs to load
            </div>
          )}
        </div>
        <div className="flex-2 flex flex-col border rounded-2xl">
          {loading ? (
            <div className="p-6 space-y-4 animate-in fade-in">
              <div className="flex gap-4">
                <Skeleton className="w-16 h-16 rounded-lg shrink-0" />
                <div className="flex flex-col gap-2 flex-1">
                  <Skeleton className="h-5 w-40" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-32" />
                </div>
              </div>
              <Skeleton className="h-px w-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
          ) : activeJob ? (
            <JobDetails
              jobId={activeJob.job_id}
              jobLogo={activeJob.employer_logo}
              jobLocation={activeJob.job_location}
              jobTitle={activeJob.job_title}
              postedAt={activeJob.job_posted_at}
              employerName={activeJob.employer_name}
              jobDescription={activeJob.job_description}
              jobLink={activeJob.job_apply_link}
            />
          ) : (
            <div className="p-6 text-sm text-muted-foreground">
              No job selected.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default function page() {
  return (
    <Suspense>
      <JobsContent />
    </Suspense>
  );
}
