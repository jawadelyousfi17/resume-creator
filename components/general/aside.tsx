"use client";

import { cn } from "@/lib/utils";
import { Bell, BriefcaseBusiness, CaseLower, ChevronLeft, ChevronRight, LogOut, Plus } from "lucide-react";
import { useCollapse } from "./useCollapse";
import Link from "next/link";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useUser } from "./userContext";
import { Button } from "../ui/button";

type AsideProps = {
  active?: string;
};

const Aside = ({ active = "jobs" }: AsideProps) => {
  const { collapsed, toggleCollapsed } = useCollapse();
  const user = useUser();

  const navItemBase = cn(
    "flex p-2 rounded-full items-center cursor-pointer hover:bg-muted",
    collapsed ? "justify-center px-0" : "gap-4 px-4"
  );

  return (
    <aside className="group bg-background px-2 pr-4 fixed left-0 inset-y-0 z-10 pt-4 pb-6 flex flex-col gap-8 hover:border-r pt-22 ">
      <div
        onClick={toggleCollapsed}
        className="text-sm border transition-all hidden group-hover:flex absolute top-[50%] right-0 h-8 w-8  justify-center items-center rounded-full translate-x-4 bg-secondary hover:bg-primary hover:text-secondary cursor-pointer"
      >
        {collapsed ? <ChevronRight /> : <ChevronLeft />}
      </div>

      <Popover>
        <PopoverTrigger>
          {" "}
          <div
            className={cn(
              "flex px-0 items-center bg-muted rounded-full py-2 px-2 cursor-pointer",
              collapsed ? "justify-center bg-background" : "gap-4"
            )}
          >
            <div className="bg-primary/10 h-12 w-12 rounded-full relative">
              <div className="h-3 w-3 bg-red-500/80 rounded-full absolute top-0 right-0  "></div>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className=""
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <circle
                    cx="12"
                    cy="8"
                    r="4"
                    fill="#222222"
                    className="fill-primary"
                  ></circle>{" "}
                  <path
                    d="M5.33788 17.3206C5.99897 14.5269 8.77173 13 11.6426 13H12.3574C15.2283 13 18.001 14.5269 18.6621 17.3206C18.79 17.8611 18.8917 18.4268 18.9489 19.0016C19.0036 19.5512 18.5523 20 18 20H6C5.44772 20 4.99642 19.5512 5.0511 19.0016C5.1083 18.4268 5.20997 17.8611 5.33788 17.3206Z"
                    fill="#2A4157"
                    className="fill-primary"
                    fillOpacity="1"
                  ></path>{" "}
                </g>
              </svg>{" "}
            </div>
            {!collapsed && (
              <div className="flex flex-col justify-start items-start">
                <span className="font-semibold">{user.user?.name}</span>
                <span className="font-light text-muted-foreground text-sm">
                  Set your target goal
                </span>
              </div>
            )}
          </div>
        </PopoverTrigger>
        <PopoverContent className="shadow-none ml-2">
          <div className="flex  flex-col gap-2">
            <div className="flex flex-col gap-2">
              <span className="text-lg font-serif font-semibold">
                Notifications
              </span>
              <div className="flex rounded-2xl  p-4 items-start gap-2 bg-muted">
                {/* <Bell className="shrink-0" /> */}
                <div className="flex flex-col gap-0">
                  <span className="font-semibold text-primary">
                    New job offers
                  </span>
                  <span className="text-sm text-foreground/60 font-light">
                    New ofer has been released by nedia INC.
                  </span>
                </div>
              </div>
              <div className="flex rounded-2xl  p-4 items-start gap-2 bg-muted">
                {/* <Bell className="shrink-0" /> */}
                <div className="flex flex-col gap-0">
                  <span className="font-semibold text-primary">
                    Add one more resume
                  </span>
                  <span className="text-sm text-foreground/60 font-light">
                    By adding more than one resume you can double chance.
                  </span>
                </div>
              </div>
            </div>
            <Button
              className="flex justify-start shadow-none border-0"
              variant="outline"
            >
              <Plus /> Create resume
            </Button>
            <Button
              className="flex justify-start shadow-none border-0"
              variant="outline"
            >
              <BriefcaseBusiness /> Post for jobs
            </Button>
            <Button variant="destructive">
              <LogOut />
              Log out
            </Button>
          </div>
        </PopoverContent>
      </Popover>

      <div className="flex flex-col gap-1 flex-1">
        <Link href="/app/dashboard">
          <div
            id="dashboard"
            className={cn(
              navItemBase,
              active === "dashboard" ? "bg-muted" : ""
            )}
          >
            <svg
              fill="#000000"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className={cn(
                "h-6 w-6",
                active === "dashboard"
                  ? "fill-primary"
                  : "fill-muted-foreground"
              )}
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <rect
                  className=""
                  x="2"
                  y="2"
                  width="9"
                  height="11"
                  rx="2"
                ></rect>
                <rect x="13" y="2" width="9" height="7" rx="2"></rect>
                <rect x="2" y="15" width="9" height="7" rx="2"></rect>
                <rect x="13" y="11" width="9" height="11" rx="2"></rect>
              </g>
            </svg>
            {!collapsed && (
              <span
                className={cn(
                  "text-sm",
                  active === "dashboard"
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                Dashboard
              </span>
            )}
          </div>
        </Link>
        <Link href="/app/resumes">
          <div
            id="resume"
            className={cn(navItemBase, active === "resumes" ? "bg-muted" : "")}
          >
            <svg
              fill="#000000"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className={cn(
                "h-7 w-7 -translate-x-0.5",
                active === "resumes" ? "fill-primary" : "fill-muted-foreground"
              )}
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
                  opacity="1"
                  d="M3 10C3 6.22876 3 4.34315 4.17157 3.17157C5.34315 2 7.22876 2 11 2H13C16.7712 2 18.6569 2 19.8284 3.17157C21 4.34315 21 6.22876 21 10V14C21 17.7712 21 19.6569 19.8284 20.8284C18.6569 22 16.7712 22 13 22H11C7.22876 22 5.34315 22 4.17157 20.8284C3 19.6569 3 17.7712 3 14V10Z"
                  className={cn(
                    active === "resumes"
                      ? "fill-primary"
                      : "fill-muted-foreground"
                  )}
                ></path>{" "}
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M7.25 10C7.25 9.58579 7.58579 9.25 8 9.25H16C16.4142 9.25 16.75 9.58579 16.75 10C16.75 10.4142 16.4142 10.75 16 10.75H8C7.58579 10.75 7.25 10.4142 7.25 10Z"
                  className={cn(
                    active === "resumes" ? "fill-background" : "fill-background"
                  )}
                ></path>{" "}
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M7.25 14C7.25 13.5858 7.58579 13.25 8 13.25H13C13.4142 13.25 13.75 13.5858 13.75 14C13.75 14.4142 13.4142 14.75 13 14.75H8C7.58579 14.75 7.25 14.4142 7.25 14Z"
                  className={cn(
                    active === "resumes" ? "fill-background" : "fill-background"
                  )}
                ></path>{" "}
              </g>
            </svg>
            {!collapsed && (
              <span
                className={cn(
                  "text-sm",
                  active === "resumes"
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                My resumes
              </span>
            )}
          </div>
        </Link>
        <Link href="/app/jobs">
          <div
            id="jobs"
            className={cn(navItemBase, active === "jobs" ? "bg-muted" : "")}
          >
            <svg
              fill="#000000"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
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
                  className={cn(
                    active === "jobs" ? "fill-primary" : "fill-muted-foreground"
                  )}
                ></path>{" "}
                <path
                  opacity="1"
                  d="M20.9579 12.3126C20.9469 12.3159 20.9356 12.3193 20.9242 12.3227L15.5 13.9501V15.1627C15.5 15.9283 15.0406 16.6341 14.3132 16.9296L13.7531 17.1572C12.6281 17.6143 11.3719 17.6143 10.2469 17.1572L9.68682 16.9296C8.95939 16.6341 8.5 15.9283 8.5 15.1627V13.9501L3 12.2999C3.0009 15.9752 3.03489 19.6879 4.318 20.8285C5.63601 22.0001 7.75733 22.0001 12 22.0001C16.2426 22.0001 18.3639 22.0001 19.682 20.8285C20.9651 19.6879 20.9991 15.9752 21 12.2999L20.9579 12.3126Z"
                  className={cn(
                    active === "jobs" ? "fill-primary" : "fill-muted-foreground"
                  )}
                ></path>{" "}
                <path
                  opacity="1"
                  d="M9.1709 4C9.58273 2.83481 10.694 2 12.0002 2C13.3064 2 14.4177 2.83481 14.8295 4"
                  className={cn(
                    "fill-none",
                    active === "jobs"
                      ? "stroke-primary/40"
                      : "stroke-foreground/20"
                  )}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                ></path>{" "}
              </g>
            </svg>
            {!collapsed && (
              <span
                className={cn(
                  "text-sm",
                  active === "jobs" ? "text-primary" : "text-muted-foreground"
                )}
              >
                Jobs
              </span>
            )}
          </div>
        </Link>
      
        <div className="mt-auto">
          <div className="flex gap-4 p-2 px-4 rounded-2xl items-center cursor-pointer hover:bg-muted">
            <img src="/icons/chrome.png" className="h-6 w-6" alt="" />
            {!collapsed && (
              <span className="text-sm text-muted-foreground">
                Get our chrome extension
              </span>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Aside;
