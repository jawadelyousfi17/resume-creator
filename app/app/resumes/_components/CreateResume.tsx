"use client";

import { Button } from "@/components/ui/button";
import {
  ArrowDownToLine,
  Check,
  File,
  FileText,
  Pen,
  Plus,
  Target,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const CreateResume = () => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [resumeTitle, setResumeTitle] = useState("Untiled");

  useEffect(() => {
    if (!inputRef.current) return;
    if (editing) inputRef.current.focus();
  }, [editing]);

  return (
    <Link
      href="/app/resumes/create"
      className="flex gap-4 group cursor-pointer "
    >
      <div className="relative w-50 min-w-50 h-fit ">
        <div>
          <div className="absolute top-0 left-0 w-full h-full rounded-md border flex justify-center items-center">
            <div className="cursor-pointer flex flex-col justify-center items-center p-2 rounded-full bg-muted text-muted-foreground/60 group-hover:bg-primary">
              <Plus
                className="w-12 h-12 group-hover:text-background transition-all duration-200"
                strokeWidth={1}
              />
            </div>
          </div>
        </div>
        <img
          src="/images/t2.avif"
          className="rounded-md border opacity-0"
          alt=""
        />
      </div>

      <div className="flex flex-col gap-1 text-muted-foreground grow-0">
        <h1 className="text-lg">New Resume</h1>
        <p className="text-sm font-light">
          Create a tailored resume for each job application. Double your chances
          of getting hired!
        </p>
      </div>
    </Link>
  );
};

export default CreateResume;
