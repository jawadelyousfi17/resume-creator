import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import React from "react";
import ResumeCard from "./_components/resumeCard";
import CreateResume from "./_components/CreateResume";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { getAllResume } from "@/actions/resume/getAllResume";

const page = async () => {
  const resumes = await getAllResume();

  return (
    <div className="p-4 space-y-4">
      <div className="space-y-2">
        <div className="flex justify-between items-center "></div>
        {resumes && resumes.length > 0 && (
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-between  p-3 border border-muted rounded-full w-full">
              <div className="flex items-center gap-2">
                <div>
                  <svg
                    fill="#000000"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-9 w-9"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M17.1923 6H6.80765C5.12027 6 4.27658 6 3.63268 6.32971C3.07242 6.61659 2.61659 7.07242 2.32971 7.63268C2 8.27658 2 9.12027 2 10.8077C2 11.2366 2 11.4511 2.07336 11.6319C2.13743 11.7898 2.24079 11.9288 2.37363 12.0355C2.52574 12.1577 2.73118 12.2194 3.14206 12.3426L8.5 13.95V15.1627C8.5 15.9283 8.95939 16.6341 9.68682 16.9296L10.2469 17.1572C11.3719 17.6143 12.6281 17.6143 13.7531 17.1572L14.3132 16.9296C15.0406 16.6341 15.5 15.9283 15.5 15.1627V13.95L20.8579 12.3426C21.2688 12.2194 21.4743 12.1577 21.6264 12.0355C21.7592 11.9288 21.8626 11.7898 21.9266 11.6319C22 11.4511 22 11.2366 22 10.8077C22 9.12027 22 8.27658 21.6703 7.63268C21.3834 7.07242 20.9276 6.61659 20.3673 6.32971C19.7234 6 18.8797 6 17.1923 6ZM13.6 13H10.4C10.1791 13 10 13.1819 10 13.4063V15.1627C10 15.3288 10.0996 15.4782 10.2514 15.54L10.8116 15.7675C11.5745 16.0775 12.4255 16.0775 13.1885 15.7675L13.7486 15.54C13.9004 15.4782 14 15.3288 14 15.1627V13.4063C14 13.1819 13.8209 13 13.6 13Z"
                        className={cn("fill-primary")}
                      ></path>{" "}
                      <path
                        opacity="1"
                        d="M20.9579 12.3126C20.9469 12.3159 20.9356 12.3193 20.9242 12.3227L15.5 13.9501V15.1627C15.5 15.9283 15.0406 16.6341 14.3132 16.9296L13.7531 17.1572C12.6281 17.6143 11.3719 17.6143 10.2469 17.1572L9.68682 16.9296C8.95939 16.6341 8.5 15.9283 8.5 15.1627V13.9501L3 12.2999C3.0009 15.9752 3.03489 19.6879 4.318 20.8285C5.63601 22.0001 7.75733 22.0001 12 22.0001C16.2426 22.0001 18.3639 22.0001 19.682 20.8285C20.9651 19.6879 20.9991 15.9752 21 12.2999L20.9579 12.3126Z"
                        className={cn("fill-primary")}
                      ></path>{" "}
                      <path
                        opacity="1"
                        d="M9.1709 4C9.58273 2.83481 10.694 2 12.0002 2C13.3064 2 14.4177 2.83481 14.8295 4"
                        className={cn(
                          "fill-none",

                          "stroke-primary/20"
                        )}
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      ></path>{" "}
                    </g>
                  </svg>
                </div>
                <div className="flex flex-col gap-0">
                  <span className="text-md ">Create more resumes.</span>
                  <span className="text-xs font-light text-foreground/60">
                    By applying to multiple jobs, you multiply your chance to
                    get hired faster.
                  </span>
                </div>
              </div>
              <Link href="/app/resumes/create">
                <Button className="shadow-none rounded-full h-full">
                  <Plus /> Create resume
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
        {/* <CreateResume /> */}
        {resumes?.map((resume) => (
          <ResumeCard key={resume.id} resume={resume} />
        ))}
      </div>
      {(!resumes || resumes.length === 0) && (
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
          <div className="relative mb-8">
            <div className="absolute -inset-4 bg-linear-to-r from-primary/10 to-blue-500/10 rounded-full blur-3xl opacity-50" />
            <img
              src="/images/create-one.png"
              className="relative max-w-md w-full h-auto drop-shadow-2xl"
              alt="No resumes found"
            />
          </div>

          <div className="max-w-lg space-y-3 mb-8">
            <h2 className="text-3xl font-bold tracking-tight">
              Start creating your first resume
            </h2>
            <p className="text-muted-foreground text-md px-4 text-balance font-light">
              Transform your career with a professionally designed resume.
              Choose a template and get started in minutes.
            </p>
          </div>

          <Link href="/app/resumes/create">
            <Button
              size="lg"
              className="rounded-full px-8 gap-2 h-12 text-md shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all hover:scale-105 active:scale-95"
            >
              <Plus className="w-5 h-5" />
              Create resume
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default page;
