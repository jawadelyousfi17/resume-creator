"use client";

import { Button } from "@/components/ui/button";
import { BadgeCheck, ChevronRight, CircleCheck, Sparkles } from "lucide-react";
import { Star } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useState, useEffect } from "react";
import type { CarouselApi } from "@/components/ui/carousel";
import Navbar from "@/components/general/navbar";

const page = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const templates = [
    {
      image: "/images/template.avif",
      users: "42.000+",
      name: "Cean",
    },
    {
      image: "/images/t2.avif",
      users: "42.000+",
      name: "Simple ATS",
    },
    {
      image: "/images/t3.avif",
      users: "42.000+",
      name: "Corporate",
    },
    {
      image: "/images/t4.avif",
      users: "42.000+",
      name: "Clear",
    },
    {
      image: "/images/t5.avif",
      users: "42.000+",
      name: "Precision ATS",
    },
    {
      image: "/images/t6.avif",
      users: "42.000+",
      name: "Specialist",
    },
    {
      image: "/images/t7.avif",
      users: "42.000+",
      name: "Pure",
    },
    {
      image: "/images/t8.avif",
      users: "42.000+",
      name: "Prime ATS",
    },
    {
      image: "/images/t9.avif",
      users: "42.000+",
      name: "Cool",
    },
  ];

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className=" md:p-8 space-y-12">
      <Navbar />
      <div className="w-full bg-muted/70 rounded-2xl  ">
        <div className=" mx-auto flex flex-col md:flex-row justify-center items-center gap-22">
          <div className="flex flex-col gap-4 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl leading-snug md:leading-11">
              <p>This resume</p>
              <p>builder gets you</p>
              <p className="text-primary">a remote job</p>
            </h2>
            <p className="text-sm">
              Only 2% of resumes win. Yours will be one of them.
            </p>
            <div className="flex gap-2 justify-center md:justify-start">
              <Button className="">Create my resume</Button>
              <Button variant="outline" className="shadow-none ">
                Upload my resume
              </Button>
            </div>
            <div className="flex flex-col gap-2 mt-4 items-center md:items-start">
              <div className="flex gap-1 items-center">
                <CircleCheck className="h-5 text-white fill-primary " />
                <span> 42%</span>{" "}
                <span className="text-muted-foreground">
                  more likely to land the job
                </span>
              </div>
              <div className="flex gap-1 items-center">
                <CircleCheck className="h-5 text-white fill-primary " />
                <span> Trusted by</span>{" "}
                <span className="text-muted-foreground">90,000 users</span>
              </div>
            </div>
          </div>
          <div className="w-full max-w-xl">
            <img
              src="https://resume.io/assets/landing/home/hero/typing-hero-19c17dfac3e22fdc206c80e7f4d80e2c2feaa5cc2ac34f29257ec4da6ec6c722.png"
              alt=""
              className="w-full mx-auto"
            />
          </div>
        </div>
      </div>

      <div className="text-center space-x-2 text-2xl md:text-4xl flex flex-col md:flex-row justify-center items-center gap-2">
        <span>
          <svg
            className="h-9"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              opacity="0.05"
              className="fill-primary"
              d="M22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12Z"
            />
            <path
              d="M7 16.75C6.58579 16.75 6.25 17.0858 6.25 17.5C6.25 17.9142 6.58579 18.25 7 18.25H13C13.4142 18.25 13.75 17.9142 13.75 17.5C13.75 17.0858 13.4142 16.75 13 16.75H7Z"
              className="fill-primary"
            />
            <path
              d="M7 13.25C6.58579 13.25 6.25 13.5858 6.25 14C6.25 14.4142 6.58579 14.75 7 14.75H16C16.4142 14.75 16.75 14.4142 16.75 14C16.75 13.5858 16.4142 13.25 16 13.25H7Z"
              className="fill-primary"
            />
            <path
              d="M22 5C22 6.65685 20.6569 8 19 8C17.3431 8 16 6.65685 16 5C16 3.34315 17.3431 2 19 2C20.6569 2 22 3.34315 22 5Z"
              className="fill-primary"
            />
          </svg>
        </span>
        <span className="text-primary">34,400</span>
        <span>resumes created today</span>
      </div>

      <div className="flex gap-2 max-w-6xl mx-auto">
        <div className="flex flex-col gap-1 py-8 px-4 bg-muted/70 rounded-2xl">
          <div>
            <svg
              className="h-12 mb-2"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M10.5766 8.70419C11.2099 7.56806 11.5266 7 12 7C12.4734 7 12.7901 7.56806 13.4234 8.70419L13.5873 8.99812C13.7672 9.32097 13.8572 9.48239 13.9975 9.5889C14.1378 9.69541 14.3126 9.73495 14.6621 9.81402L14.9802 9.88601C16.2101 10.1643 16.825 10.3034 16.9713 10.7739C17.1176 11.2443 16.6984 11.7345 15.86 12.715L15.643 12.9686C15.4048 13.2472 15.2857 13.3865 15.2321 13.5589C15.1785 13.7312 15.1965 13.9171 15.2325 14.2888L15.2653 14.6272C15.3921 15.9353 15.4554 16.5894 15.0724 16.8801C14.6894 17.1709 14.1137 16.9058 12.9622 16.3756L12.6643 16.2384C12.337 16.0878 12.1734 16.0124 12 16.0124C11.8266 16.0124 11.663 16.0878 11.3357 16.2384L11.0378 16.3756C9.88634 16.9058 9.31059 17.1709 8.92757 16.8801C8.54456 16.5894 8.60794 15.9353 8.7347 14.6272L8.76749 14.2888C8.80351 13.9171 8.82152 13.7312 8.76793 13.5589C8.71434 13.3865 8.59521 13.2472 8.35696 12.9686L8.14005 12.715C7.30162 11.7345 6.88241 11.2443 7.02871 10.7739C7.17501 10.3034 7.78993 10.1643 9.01977 9.88601L9.33794 9.81402C9.68743 9.73495 9.86217 9.69541 10.0025 9.5889C10.1428 9.48239 10.2328 9.32097 10.4127 8.99812L10.5766 8.70419Z"
                  fill="#1C274C"
                ></path>{" "}
                <path
                  opacity="0.8"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 1.25C12.4142 1.25 12.75 1.58579 12.75 2V4C12.75 4.41421 12.4142 4.75 12 4.75C11.5858 4.75 11.25 4.41421 11.25 4V2C11.25 1.58579 11.5858 1.25 12 1.25ZM1.25 12C1.25 11.5858 1.58579 11.25 2 11.25H4C4.41421 11.25 4.75 11.5858 4.75 12C4.75 12.4142 4.41421 12.75 4 12.75H2C1.58579 12.75 1.25 12.4142 1.25 12ZM19.25 12C19.25 11.5858 19.5858 11.25 20 11.25H22C22.4142 11.25 22.75 11.5858 22.75 12C22.75 12.4142 22.4142 12.75 22 12.75H20C19.5858 12.75 19.25 12.4142 19.25 12ZM12 19.25C12.4142 19.25 12.75 19.5858 12.75 20V22C12.75 22.4142 12.4142 22.75 12 22.75C11.5858 22.75 11.25 22.4142 11.25 22V20C11.25 19.5858 11.5858 19.25 12 19.25Z"
                  fill="#1C274C"
                ></path>{" "}
                <g opacity="0.05">
                  <path
                    d="M18.5304 5.46967C18.8233 5.76256 18.8233 6.23744 18.5304 6.53033L18.1872 6.87359C17.8943 7.16648 17.4194 7.16648 17.1265 6.87359C16.8336 6.5807 16.8336 6.10583 17.1265 5.81293L17.4698 5.46967C17.7627 5.17678 18.2376 5.17678 18.5304 5.46967Z"
                    fill="#1C274C"
                  ></path>{" "}
                  <path
                    d="M5.46967 5.46979C5.76256 5.17689 6.23744 5.17689 6.53033 5.46979L6.87359 5.81305C7.16648 6.10594 7.16648 6.58081 6.87359 6.87371C6.5807 7.1666 6.10583 7.1666 5.81293 6.87371L5.46967 6.53045C5.17678 6.23755 5.17678 5.76268 5.46967 5.46979Z"
                    fill="#1C274C"
                  ></path>{" "}
                  <path
                    d="M6.87348 17.1266C7.16637 17.4195 7.16637 17.8944 6.87348 18.1873L6.53043 18.5303C6.23754 18.8232 5.76266 18.8232 5.46977 18.5303C5.17688 18.2375 5.17688 17.7626 5.46977 17.4697L5.81282 17.1266C6.10571 16.8337 6.58058 16.8337 6.87348 17.1266Z"
                    fill="#1C274C"
                  ></path>{" "}
                  <path
                    d="M17.1265 17.1269C17.4194 16.834 17.8943 16.834 18.1872 17.1269L18.5302 17.4699C18.8231 17.7628 18.8231 18.2377 18.5302 18.5306C18.2373 18.8235 17.7624 18.8235 17.4695 18.5306L17.1265 18.1875C16.8336 17.8946 16.8336 17.4198 17.1265 17.1269Z"
                    fill="#1C274C"
                  ></path>{" "}
                </g>{" "}
              </g>
            </svg>
          </div>
          <div className="text-lg">A draft in 10 mins</div>
          <div className="text-forground/50 text-sm">
            The AI builder is 10 x faster than doing on your own.
          </div>
        </div>

        <div className="flex flex-col gap-1 py-8 px-4 bg-muted/70 rounded-2xl">
          <div>
            <svg
              className="h-12 mb-2"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
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
                  opacity="0.05"
                  d="M3.17157 18.8284C4.34315 20 6.22876 20 10 20L15.75 19.9944C18.3859 19.9668 19.8541 19.8028 20.8284 18.8285C22 17.6569 22 15.7713 22 12C22 8.22879 22 6.34317 20.8284 5.1716C19.8541 4.19727 18.3738 4.02762 15.7379 4H10C6.22876 4 4.34315 4 3.17157 5.17157C2 6.34315 2 8.22876 2 12C2 15.7712 2 17.6569 3.17157 18.8284Z"
                  fill="#1C274C"
                ></path>{" "}
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M15 1.25C15.4142 1.25 15.75 1.58579 15.75 2V4.00559V19.9944V22C15.75 22.4142 15.4142 22.75 15 22.75C14.5858 22.75 14.25 22.4142 14.25 22V2C14.25 1.58579 14.5858 1.25 15 1.25Z"
                  fill="#1C274C"
                ></path>{" "}
                <path
                  d="M6.81782 7.78733C7.11779 7.74992 7.48429 7.74996 7.88383 7.75H10.1162C10.5157 7.74996 10.8822 7.74992 11.1822 7.78733C11.5109 7.82833 11.8612 7.9242 12.1624 8.19187C12.2138 8.23753 12.2625 8.28618 12.3081 8.33756C12.5758 8.63878 12.6717 8.98915 12.7127 9.31782C12.7501 9.61779 12.7501 9.98428 12.75 10.3838L12.75 10.425C12.75 10.8392 12.4142 11.175 12 11.175C11.5858 11.175 11.25 10.8392 11.25 10.425C11.25 9.97047 11.2486 9.69931 11.2242 9.50348C11.1998 9.30765 10.9965 9.2758 10.9965 9.2758C10.8007 9.25137 10.5295 9.25001 10.075 9.25001H9.75001V14.75H11C11.4142 14.75 11.75 15.0858 11.75 15.5C11.75 15.9142 11.4142 16.25 11 16.25H7.00001C6.58579 16.25 6.25001 15.9142 6.25001 15.5C6.25001 15.0858 6.58579 14.75 7.00001 14.75H8.25001V9.25001H7.925C7.47047 9.25001 7.19931 9.25137 7.00348 9.2758C7.00348 9.2758 6.80023 9.30765 6.7758 9.50348C6.75137 9.69931 6.75001 9.97047 6.75001 10.425C6.75001 10.8392 6.41422 11.175 6.00001 11.175C5.58579 11.175 5.25001 10.8392 5.25001 10.425L5.25 10.3838C5.24996 9.98428 5.24992 9.61779 5.28733 9.31782C5.32833 8.98915 5.4242 8.63878 5.69187 8.33756C5.73753 8.28618 5.78618 8.23753 5.83756 8.19187C6.13878 7.9242 6.48915 7.82833 6.81782 7.78733Z"
                  fill="#1C274C"
                ></path>{" "}
              </g>
            </svg>
          </div>
          <div className="text-lg">Zero mistakes</div>
          <div className="text-forground/50 text-sm">
            Don't stress over typos — you'll sound great!
          </div>
        </div>

        <div className="flex flex-col gap-1 py-8 px-4 bg-muted/70 rounded-2xl">
          <div>
            <svg
              className="h-12 mb-2"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
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
                  opacity="0.05"
                  d="M2 9C2 5.22876 2 3.34315 3.17157 2.17157C4.34315 1 6.22876 1 10 1H14C17.7712 1 19.6569 1 20.8284 2.17157C22 3.34315 22 5.22876 22 9V13C22 16.7712 22 18.6569 20.8284 19.8284C19.6569 21 17.7712 21 14 21H10C6.22876 21 4.34315 21 3.17157 19.8284C2 18.6569 2 16.7712 2 13V9Z"
                  fill="#1C274D"
                ></path>{" "}
                <path
                  d="M6 12.9108V7.49649C6 6.67251 6.66539 6.00074 7.48717 6.06091C7.99967 6.09844 8.55592 6.16228 9 6.27079C9.8239 6.4721 10.851 6.9711 11.4646 7.29318C11.4763 7.29933 11.4881 7.30525 11.5 7.31094V15.7262C11.4975 15.7249 11.495 15.7236 11.4926 15.7223C10.8826 15.4009 9.83655 14.8896 9 14.6852C8.56248 14.5783 8.01608 14.5147 7.50991 14.477C6.67934 14.4151 6 13.7437 6 12.9108Z"
                  fill="#1C274D"
                ></path>{" "}
                <path
                  d="M12.5 15.7262C12.5025 15.7249 12.505 15.7236 12.5074 15.7223C13.1174 15.4009 14.1634 14.8896 15 14.6852C15.4375 14.5783 15.9839 14.5147 16.4901 14.477C17.3207 14.4151 18 13.7437 18 12.9108V7.45154C18 6.64543 17.3619 5.98216 16.5568 6.0217C15.9405 6.05197 15.2404 6.12099 14.7 6.27079C13.9685 6.47356 13.0752 6.95027 12.5219 7.27042C12.5147 7.27462 12.5073 7.27874 12.5 7.28277V15.7262Z"
                  fill="#1C274D"
                ></path>{" "}
              </g>
            </svg>
          </div>
          <div className="text-lg">ATS templates</div>
          <div className="text-forground/50 text-sm">
            Your resume will be 100% compliant. Recruiters willsee you.
          </div>
        </div>

        <div className="flex flex-col gap-1 py-8 px-4 bg-muted/70 rounded-2xl">
          <div>
            <svg
              className="h-12 mb-2"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
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
                  opacity="0.05"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                  fill="#1C274C"
                ></path>{" "}
                <path
                  d="M12.75 6C12.75 5.58579 12.4142 5.25 12 5.25C11.5858 5.25 11.25 5.58579 11.25 6V6.31673C9.61957 6.60867 8.25 7.83361 8.25 9.5C8.25 11.4172 10.0628 12.75 12 12.75C13.3765 12.75 14.25 13.6557 14.25 14.5C14.25 15.3443 13.3765 16.25 12 16.25C10.6235 16.25 9.75 15.3443 9.75 14.5C9.75 14.0858 9.41421 13.75 9 13.75C8.58579 13.75 8.25 14.0858 8.25 14.5C8.25 16.1664 9.61957 17.3913 11.25 17.6833V18C11.25 18.4142 11.5858 18.75 12 18.75C12.4142 18.75 12.75 18.4142 12.75 18V17.6833C14.3804 17.3913 15.75 16.1664 15.75 14.5C15.75 12.5828 13.9372 11.25 12 11.25C10.6235 11.25 9.75 10.3443 9.75 9.5C9.75 8.65573 10.6235 7.75 12 7.75C13.3765 7.75 14.25 8.65573 14.25 9.5C14.25 9.91421 14.5858 10.25 15 10.25C15.4142 10.25 15.75 9.91421 15.75 9.5C15.75 7.83361 14.3804 6.60867 12.75 6.31673V6Z"
                  fill="#1C274C"
                ></path>{" "}
              </g>
            </svg>
          </div>
          <div className="text-lg">Get paid 7% more</div>
          <div className="text-forground/50 text-sm">
            We can help you negociate a higher starting salary...
          </div>
        </div>
      </div>

      <div className="text-center space-x-2 text-2xl md:text-4xl flex flex-col md:flex-row justify-center items-center gap-2">
        <span className="">Every tool you need is here...</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="flex flex-col p-8 gap-4 bg-[var(--blue-40)] rounded-2xl w-full">
          <div className="flex gap-2 items-center">
            <div className="h-10 w-10 rounded-2xl bg-white p-2">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <g opacity="0.3">
                    {" "}
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M14 22H10C6.22876 22 4.34315 22 3.17157 20.8284C2 19.6569 2 17.7712 2 14V10C2 6.22876 2 4.34315 3.17157 3.17157C4.34315 2 6.23869 2 10.0298 2C10.6358 2 11.1214 2 11.53 2.01666C11.5166 2.09659 11.5095 2.17813 11.5092 2.26057L11.5 5.09497C11.4999 6.19207 11.4998 7.16164 11.6049 7.94316C11.7188 8.79028 11.9803 9.63726 12.6716 10.3285C13.3628 11.0198 14.2098 11.2813 15.0569 11.3952C15.8385 11.5003 16.808 11.5002 17.9051 11.5001L18 11.5001H21.9574C22 12.0344 22 12.6901 22 13.5629V14C22 17.7712 22 19.6569 20.8284 20.8284C19.6569 22 17.7712 22 14 22Z"
                      className="fill-[var(--blue-40)]"
                    ></path>{" "}
                  </g>{" "}
                  <path
                    d="M6 13.75C5.58579 13.75 5.25 14.0858 5.25 14.5C5.25 14.9142 5.58579 15.25 6 15.25H14C14.4142 15.25 14.75 14.9142 14.75 14.5C14.75 14.0858 14.4142 13.75 14 13.75H6Z"
                    className="fill-[var(--blue-40)]"
                  ></path>{" "}
                  <path
                    d="M6 17.25C5.58579 17.25 5.25 17.5858 5.25 18C5.25 18.4142 5.58579 18.75 6 18.75H11.5C11.9142 18.75 12.25 18.4142 12.25 18C12.25 17.5858 11.9142 17.25 11.5 17.25H6Z"
                    className="fill-[var(--blue-40)]"
                  ></path>{" "}
                  <path
                    d="M11.5092 2.2601L11.5 5.0945C11.4999 6.1916 11.4998 7.16117 11.6049 7.94269C11.7188 8.78981 11.9803 9.6368 12.6716 10.3281C13.3629 11.0193 14.2098 11.2808 15.057 11.3947C15.8385 11.4998 16.808 11.4997 17.9051 11.4996L21.9574 11.4996C21.9698 11.6552 21.9786 11.821 21.9848 11.9995H22C22 11.732 22 11.5983 21.9901 11.4408C21.9335 10.5463 21.5617 9.52125 21.0315 8.79853C20.9382 8.6713 20.8743 8.59493 20.7467 8.44218C19.9542 7.49359 18.911 6.31193 18 5.49953C17.1892 4.77645 16.0787 3.98536 15.1101 3.3385C14.2781 2.78275 13.862 2.50487 13.2915 2.29834C13.1403 2.24359 12.9408 2.18311 12.7846 2.14466C12.4006 2.05013 12.0268 2.01725 11.5 2.00586L11.5092 2.2601Z"
                    className="fill-[var(--blue-40)]"
                  ></path>{" "}
                </g>
              </svg>
            </div>
            <div className="text-2xl">Resume Builder</div>
          </div>
          <div className="text-forground/60 font-light">
            Build the resume that gets you hired. We designed the builder with
            top employers <p>Finish a draft 20 mins with "Recruiters-AI".</p>
          </div>

          <img
            className="w-full max-w-[20rem] mx-auto"
            src="https://resume.io/assets/landing/home/tools/images/resume_builder-770f4dffb3badbaf18bb4b65c975cbe6813f9dde5eccba4f2586ed2b30547ebb.png"
            alt=""
          />
        </div>

        <div className="flex flex-col p-8 gap-4 bg-[var(--green-40)] rounded-2xl w-full">
          <div className="flex gap-2 items-center">
            <div className="h-10 w-10 rounded-2xl bg-white p-2">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <circle
                    opacity="1"
                    cx="5"
                    cy="5"
                    r="3"
                    className="fill-[var(--green-40)]"
                  ></circle>{" "}
                  <circle
                    opacity="1"
                    cx="19"
                    cy="19"
                    r="3"
                    className="fill-[var(--green-40)]"
                  ></circle>{" "}
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10.2501 5C10.2501 4.58579 10.5859 4.25 11.0001 4.25H16.132C18.8832 4.25 19.9295 7.843 17.6084 9.32007L7.19713 15.9454C6.14207 16.6168 6.61766 18.25 7.86821 18.25H11.1894L10.9698 18.0303C10.6769 17.7374 10.6769 17.2626 10.9698 16.9697C11.2627 16.6768 11.7375 16.6768 12.0304 16.9697L13.5304 18.4697C13.8233 18.7626 13.8233 19.2374 13.5304 19.5303L12.0304 21.0303C11.7375 21.3232 11.2627 21.3232 10.9698 21.0303C10.6769 20.7374 10.6769 20.2626 10.9698 19.9697L11.1894 19.75H7.86821C5.11697 19.75 4.07071 16.157 6.39181 14.6799L16.8031 8.05458C17.8581 7.38318 17.3825 5.75 16.132 5.75H11.0001C10.5859 5.75 10.2501 5.41421 10.2501 5Z"
                    className="fill-[var(--green-40)]"
                  ></path>{" "}
                </g>
              </svg>
            </div>
            <div className="text-2xl">Recruiter Match</div>
          </div>
          <div className="text-forground/60 font-light">
            Recruiters come to us with roles they can't fill. We close-match
            your resume and then send it to 50 recruiters a week.
          </div>

          <img
            className="w-full max-w-[20rem] mx-auto"
            src="https://resume.io/assets/landing/home/tools/images/recruiter_match-9ccded94c5a4c283a7a8d9ee233edd6c62448c2efc428ffe78a9371de0b90723.png"
            alt=""
          />
        </div>

        <div className="flex flex-col p-8 gap-4 bg-[var(--indigo-40)] rounded-2xl w-full">
          <div className="flex gap-2 items-center">
            <div className="h-10 w-10 rounded-2xl bg-white p-2">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    opacity="1"
                    d="M20.3133 11.1566C20.3133 16.2137 16.2137 20.3133 11.1566 20.3133C6.09956 20.3133 2 16.2137 2 11.1566C2 6.09956 6.09956 2 11.1566 2C16.2137 2 20.3133 6.09956 20.3133 11.1566Z"
                    className="fill-[var(--indigo-40)]"
                  ></path>{" "}
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M18.8387 18.8387C19.121 18.5564 19.5787 18.5564 19.861 18.8387L21.7887 20.7664C22.071 21.0487 22.071 21.5064 21.7887 21.7887C21.5064 22.071 21.0487 22.071 20.7664 21.7887L18.8387 19.861C18.5564 19.5787 18.5564 19.121 18.8387 18.8387Z"
                    className="fill-[var(--indigo-40)]"
                  ></path>{" "}
                </g>
              </svg>
            </div>
            <div className="text-2xl">Job Board</div>
          </div>
          <div className="text-forground/60 font-light">
            See every online job in one place. We search the entire internet
            every day.If a role goes live, you won't miss it.
          </div>

          <img
            className="w-full max-w-[20rem] mx-auto"
            src="https://resume.io/assets/landing/home/tools/images/job_board-ec41b52b8ce635b5028783a502145c429f2d772b837cfe1da2973a9cda096fae.png"
            alt=""
          />
        </div>
      </div>

      <div className="flex flex-col justify-center items-center gap-4 text-center">
        <div className="text-foreground/70 font-light">
          Our candidates have been hired at{" "}
        </div>
        <div className="flex flex-wrap justify-center items-center gap-8 px-4">
          <img
            src="/icons/booking.png"
            className="h-8 grayscale opacity-30"
            alt=""
          />
          <img
            src="/icons/apple.png"
            className="h-10 grayscale opacity-30"
            alt=""
          />
          <img
            src="/icons/dhl.png"
            className="h-8 grayscale opacity-30"
            alt=""
          />
          <img
            src="/icons/meta.png"
            className="h-12 grayscale opacity-30"
            alt=""
          />
          <img
            src="/icons/google.png"
            className="h-8 grayscale opacity-30"
            alt=""
          />
        </div>
      </div>

      <div className="py-8 bg-muted flex flex-col items-center gap-2 rounded-2xl">
        <h1 className="text-4xl">Tested resume templates</h1>
        <p className="text-foreground/50 text-sm font-light">
          Use the template recruiters like. Download to Word or PDF.
        </p>

        <div className="w-full px-4 md:px-20">
          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
            }}
            className="w-full"
          >
            <CarouselContent className="z-10 py-8 ">
              {[
                templates[templates.length - 1],
                ...templates,
                templates[0],
              ].map((template, index) => (
                <CarouselItem key={index} className="md:basis-1/3 lg:basis-1/3">
                  <div className={`${""} transition-all h-full`}>
                    <div className="h-full">
                      <div className="flex flex-col h-full items-center justify-start gap-2 rounded-2xl">
                        <span className="text-lg">{template.name}</span>
                        <div className="relative flex-1 w-full">
                          <img
                            src={template.image}
                            className="w-full h-full object-cover rounded-2xl border"
                            alt=""
                          />
                          {index === current && (
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-secondary/50 rounded-2xl">
                              <Button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                Use this template
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
      <div className="text-4xl text-center">Way beyond a resume Builder</div>

      <div className=" space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-2 bg-[var(--neutral-40)]/5 p-8 flex rounded-2xl relative">
            <div className="flex flex-1 flex-col justify-between gap-2">
              <div className="flex flex-col gap-2">
                <span className=" w-fit text-xs font-semibold flex px-2 rounded-lg text-[var(--blue-40)] bg-[var(--blue-40)]/20 justify-center items-center gap-2">
                  <Sparkles width={15} />
                  <span>AI-powered</span>
                </span>

                <h1 className="text-2xl">Step-by-step guidance</h1>
                <p className="font-light text-foreground/80">
                  No need to think much. We guide you through every step of the
                  process. We show you what to add, and where to add it it. It's
                  clear and simple.{" "}
                </p>
              </div>

              <div>
                <Button
                  variant={"ghost"}
                  className="px-0 font-light text-md text-primary space-x-1"
                >
                  <span> Create my resume</span> <ChevronRight width={20} />{" "}
                </Button>
              </div>
            </div>

            <div className="h-80 flex-1">
              <img
                src="/images/step-by-step.png"
                alt=""
                className="absolute right-0 bottom-0 w-80"
              />
            </div>
          </div>

          <div className="flex-1 bg-[var(--indigo-40)]/5 p-8 flex rounded-2xl relative">
            <div className="flex flex-1 flex-col justify-between gap-2">
              <div className="flex flex-col gap-2">
                <span className=" w-fit text-xs font-semibold flex px-2 rounded-lg text-[var(--blue-40)] bg-[var(--blue-40)]/20 justify-center items-center gap-2">
                  <Sparkles width={15} />
                  <span>AI-powered</span>
                </span>

                <h1 className="text-2xl">AI writes for you</h1>
                <p className="font-light text-foreground/80">
                  Speak into the mic and th eAI dixes mistakes. Stucks? Click to
                  add phrases that sound professional.
                </p>
              </div>
            </div>

            <img
              src="/images/ai-writes-for-you.png"
              alt=""
              className="absolute right-0 bottom-0 w-80"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 bg-[var(--indigo-40)]/5 p-8 flex rounded-2xl relative">
            <div className="flex flex-1 flex-col justify-between gap-2">
              <div className="flex flex-col gap-2">
                <span className=" w-fit text-xs font-semibold flex px-2 rounded-lg text-[var(--blue-40)] bg-[var(--blue-40)]/20 justify-center items-center gap-2">
                  <Sparkles width={15} />
                  <span>AI-powered</span>
                </span>

                <h1 className="text-2xl">Recruiter Match</h1>
                <p className="font-light text-foreground/80 z-10">
                  We search the internet every day to find all jobs in the
                  market. So, yo won't miss any job offer.
                </p>
              </div>
            </div>

            <img
              src="/images/recruiters-match.png"
              alt=""
              className="absolute right-0 bottom-0 w-80 z-3"
            />
          </div>

          <div className="flex-2 bg-[var(--blue-40)]/5 p-8 flex rounded-2xl relative">
            <div className="flex flex-1 flex-col justify-between gap-2">
              <div className="flex flex-col gap-2">
                <span className=" w-fit text-xs font-semibold flex px-2 rounded-lg text-[var(--blue-40)] bg-[var(--blue-40)]/20 justify-center items-center gap-2">
                  <Sparkles width={15} />
                  <span>AI-powered</span>
                </span>

                <h1 className="text-2xl">Resume tailor</h1>
                <p className="font-light text-foreground/80">
                  Now you can adapt you resume to match every single job offer.
                  We use latest AI to make sure your resume can match the job
                  posted.
                </p>
              </div>

              <div>
                <Button
                  variant={"ghost"}
                  className="px-0 font-light text-md text-primary space-x-1"
                >
                  <span> Tailor my resume</span> <ChevronRight width={20} />{" "}
                </Button>
              </div>
            </div>

            <div className="h-80 flex-1">
              <img
                src="/images/resume-tailor.png"
                alt=""
                className="absolute right-0 bottom-0 w-80"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="text-4xl text-center">92% of customers recommend us</div>

      <div className="  rounded-2xl">
        <div className="max-w-5xl mx-auto ">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-background rounded-2xl p-6 flex flex-col gap-4">
              <div className="flex gap-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-foreground/80 font-light">
                "Resume.io helped me land my dream job! The AI suggestions were
                spot-on and made my resume stand out. Highly recommend!"
              </p>
              <div className="flex items-center gap-3 mt-auto">
                <div>
                  <div className="font-semibold">John Doe</div>
                  <div className="text-sm text-foreground/50">
                    Software Engineer
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-background rounded-2xl p-6 flex flex-col gap-4">
              <div className="flex gap-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-foreground/80 font-light">
                "The templates are professional and ATS-friendly. I got 3
                interviews within a week of updating my resume. Amazing
                platform!"
              </p>
              <div className="flex items-center gap-3 mt-auto">
                <div>
                  <div className="font-semibold">Sarah Kim</div>
                  <div className="text-sm text-foreground/50">
                    Product Manager
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-background rounded-2xl p-6 flex flex-col gap-4">
              <div className="flex gap-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-foreground/80 font-light">
                "Super easy to use and the step-by-step guidance made the whole
                process stress-free. Worth every penny!"
              </p>
              <div className="flex items-center gap-3 mt-auto">
                <div>
                  <div className="font-semibold">Michael Anderson</div>
                  <div className="text-sm text-foreground/50">
                    Marketing Director
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative from-primary/15 to-primary/5 rounded-2xl overflow-hidden">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center p-6 md:p-12 gap-8">
          <div className="flex flex-col gap-6 flex-1">
            <div className="flex flex-col gap-3">
              <h2 className="text-3xl md:text-5xl font-semibold leading-tight">
                Join over <span className="text-primary font-bold">8,900+</span>
                <br />
                resume makers
              </h2>
              <p className="text-lg text-foreground/70 font-light">
                Start now and get hired faster. Create your professional resume
                in minutes.
              </p>
            </div>
            <div className="flex gap-3">
              <Button size="lg" className="text-base">
                Create my resume
              </Button>
              <Button size="lg" variant="outline" className="text-base">
                View templates
              </Button>
            </div>
            <div className="flex items-center gap-6 mt-2">
              <div className="flex items-center gap-2">
                {/* <BadgeCheck className="h-5 w-5 text-primary" /> */}
                <span className="text-sm text-foreground/60">
                  No credit card required
                </span>
              </div>
              <div className="flex items-center gap-2">
                {/* <Star className="h-5 w-5 text-primary fill-primary" /> */}
                <span className="text-sm text-foreground/60">4.9/5 rating</span>
              </div>
            </div>
          </div>
          <div className="flex-shrink-0">
            <img
              src="/images/start-now.png"
              className="h-64 md:h-96 object-contain drop-shadow-xl"
              alt="Create your resume now"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
