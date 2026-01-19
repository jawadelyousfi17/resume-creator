"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn, formatMonthYear } from "@/lib/utils";
import { T_Resume } from "@/types/resumeInfos";
import {
  ChevronDown,
  ChevronUp,
  Delete,
  GripVertical,
  Sparkles,
} from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { MonthYearPicker } from "@/components/general/dateTimePicker";

import { motion } from "framer-motion";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useConfirm } from "@/components/general/confirmContext";
import HtmlEditor from "@/components/general/htmlEditor";
import { useAiCreditsGate } from "@/components/general/aiCreditsDialog";
import toast from "react-hot-toast";

const reactions = [
  {
    value: 30,
    reaction: "😞",
  },
  {
    value: 80,
    reaction: "😕",
  },
  {
    value: 120,
    reaction: "😐",
  },
  {
    value: 160,
    reaction: "🙂",
  },
  {
    value: 200,
    reaction: "😊",
  },
];

const InternshipCard = ({
  data,
  setData,
}: {
  data: T_Resume["internships"][0];
  setData: Dispatch<SetStateAction<T_Resume>>;
}) => {
  const [collapsed, setCollapsed] = useState(true);

  const { ensureCanUseAi, dialog } = useAiCreditsGate();

  const confirm = useConfirm();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: data.id });

  const cardStyle = {
    transform: CSS.Transform.toString(transform),
    transition: transition,
  };

  useEffect(() => {
    if (isDragging) setCollapsed(false);
  }, [isDragging]);

  async function handleDelete(toDeletId: string) {
    const confirmed = await confirm({
      title: "Delete Employment History?",
      description:
        "This will permanently remove this employment entry from your resume.",
      confirmText: "Delete",
      cancelText: "Cancel",
      variant: "destructive",
    });

    if (confirmed) {
      setData((p) => ({
        ...p,
        internships: p.internships.filter((item) => item.id !== toDeletId),
      }));
    }
  }

  async function handleEnhanceClick() {
    const allowed = await ensureCanUseAi();
    if (!allowed) return;
    toast("AI internship enhancement not wired yet");
  }

  return (
    <div ref={setNodeRef} style={cardStyle} key={data.id}>
      {dialog}
      <motion.div
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={0.1}
        dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
        whileDrag={{ scale: 1.02, boxShadow: "0 10px 30px rgba(0,0,0,0.05)" }}
        className="border  border-border/50 p-3 bg-muted/5 flex flex-col gap-4 rounded-2xl  active:cursor-grabbing"
      >
        <div
          className="flex justify-between items-center group cursor-pointer"
          onClick={() => setCollapsed((prev) => !prev)}
        >
          <div className="flex items-center gap-4">
            <div
              {...attributes}
              {...listeners}
              className="cursor-grab hover:text-primary transition-all active:cursor-grabbing touch-none"
            >
              <GripVertical className="text-foreground/70 cursor-grab hover:text-primary hover:scale-105 transition-all" />
            </div>
            <div className="flex flex-col">
              <div className="text-sm font-semibold group-hover:text-primary">
                {data.jobTitle ? data.jobTitle : "Untiled job"}
              </div>
              <div className="text-xs text-foreground/50 group-hover:text-primary">
                {data.startDate && <>{formatMonthYear(data.startDate)}</>} -{" "}
                {formatMonthYear(data.endDate)}{" "}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-0">
            <Button
              className="hover:bg-transparent hover:text-primary group-2"
              variant="ghost"
              onClick={() => handleDelete(data.id)}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    d="M2.75 6.16667C2.75 5.70644 3.09538 5.33335 3.52143 5.33335L6.18567 5.3329C6.71502 5.31841 7.18202 4.95482 7.36214 4.41691C7.36688 4.40277 7.37232 4.38532 7.39185 4.32203L7.50665 3.94993C7.5769 3.72179 7.6381 3.52303 7.72375 3.34536C8.06209 2.64349 8.68808 2.1561 9.41147 2.03132C9.59457 1.99973 9.78848 1.99987 10.0111 2.00002H13.4891C13.7117 1.99987 13.9056 1.99973 14.0887 2.03132C14.8121 2.1561 15.4381 2.64349 15.7764 3.34536C15.8621 3.52303 15.9233 3.72179 15.9935 3.94993L16.1083 4.32203C16.1279 4.38532 16.1333 4.40277 16.138 4.41691C16.3182 4.95482 16.8778 5.31886 17.4071 5.33335H19.9786C20.4046 5.33335 20.75 5.70644 20.75 6.16667C20.75 6.62691 20.4046 7 19.9786 7H3.52143C3.09538 7 2.75 6.62691 2.75 6.16667Z"
                    className="fill-foreground group-2-hover:fill-primary"
                  ></path>{" "}
                  <path
                    opacity="0.5"
                    d="M11.6068 21.9998H12.3937C15.1012 21.9998 16.4549 21.9998 17.3351 21.1366C18.2153 20.2734 18.3054 18.8575 18.4855 16.0256L18.745 11.945C18.8427 10.4085 18.8916 9.6402 18.45 9.15335C18.0084 8.6665 17.2628 8.6665 15.7714 8.6665H8.22905C6.73771 8.6665 5.99204 8.6665 5.55047 9.15335C5.10891 9.6402 5.15777 10.4085 5.25549 11.945L5.515 16.0256C5.6951 18.8575 5.78515 20.2734 6.66534 21.1366C7.54553 21.9998 8.89927 21.9998 11.6068 21.9998Z"
                    className="fill-foreground group-2-hover:fill-primary"
                  ></path>{" "}
                </g>
              </svg>
            </Button>
            <Button
              className="hover:bg-transparent hover:text-primary group-hover:text-primary"
              variant="ghost"
            >
              <ChevronDown
                className={cn(" transition-all", collapsed && " rotate-180")}
              />
            </Button>
          </div>
        </div>
        {collapsed && (
          <>
            <div className="flex items-center gap-4">
              <div className="flex flex-col gap-1 flex-1">
                <label className="text-sm font-light text-foreground/60">
                  Job Title
                </label>
                <Input
                  value={data?.jobTitle}
                  onChange={(e) =>
                    setData((prev) => ({
                      ...prev,
                      internships: prev.internships.map((item) => {
                        if (item.id === data.id)
                          return { ...item, jobTitle: e.target.value };
                        return item;
                      }),
                    }))
                  }
                  placeholder=""
                  className="bg-muted"
                />
              </div>
              <div className="flex flex-col gap-1 flex-1">
                <label className="text-sm font-light text-foreground/60">
                  Employer
                </label>
                <Input
                  value={data?.employer}
                  onChange={(e) =>
                    setData((prev) => ({
                      ...prev,
                      internships: prev.internships.map((item) => {
                        if (item.id === data.id)
                          return { ...item, employer: e.target.value };
                        return item;
                      }),
                    }))
                  }
                  placeholder=""
                  className="bg-muted"
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex flex-col gap-1 flex-1">
                <label className="text-sm font-light text-foreground/60">
                  Start Date
                </label>
                <MonthYearPicker
                  closeOnSelect={false}
                  onChange={(val) =>
                    setData((prev) => ({
                      ...prev,
                      internships: prev.internships.map((item) => {
                        if (item.id === data.id)
                          return { ...item, startDate: val as Date };
                        return item;
                      }),
                    }))
                  }
                  value={data.startDate}
                />
              </div>
              <div className="flex flex-col gap-1 flex-1">
                <label className="text-sm font-light text-foreground/60">
                  End Date
                </label>
                <MonthYearPicker
                  closeOnSelect={false}
                  onChange={(val) =>
                    setData((prev) => ({
                      ...prev,
                      internships: prev.internships.map((item) => {
                        if (item.id === data.id)
                          return { ...item, endDate: val as Date };
                        return item;
                      }),
                    }))
                  }
                  value={data.endDate}
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex flex-col gap-1 flex-1">
                <label className="text-sm font-light text-foreground/60">
                  City, State
                </label>
                <Input
                  value={data?.cityState}
                  onChange={(e) =>
                    setData((prev) => ({
                      ...prev,
                      internships: prev.internships.map((item) => {
                        if (item.id === data.id)
                          return { ...item, cityState: e.target.value };
                        return item;
                      }),
                    }))
                  }
                  placeholder=""
                  className="bg-muted"
                />
              </div>
            </div>

            <div className="flex items-center gap-1 ">
              <div className="flex flex-col gap-1 flex-1 ">
                <div className="flex items-center gap-1 ">
                  <div className="flex flex-col gap-1 flex-1 ">
                    <label className="text-sm font-light text-foreground/60">
                      Description
                    </label>
                    <div className="h-auto  w-full bg-muted rounded-lg flex flex-col  overflow-hidden">
                      <div className="flex items-center justify-end p-2 gap-2 relative border-b border-background">
                        <Button
                          className="bg-background  rounded-full text-indigo-500 hover:text-indigo-700 hover:bg-background/80"
                          size="sm"
                          onClick={handleEnhanceClick}
                        >
                          <Sparkles />
                          Enhace with AI
                        </Button>
                      </div>
                      <HtmlEditor
                        value={data.description}
                        onChange={(e) =>
                          setData((prev) => ({
                            ...prev,
                            internships: prev.internships.map((item) => {
                              if (item.id === data.id)
                                return { ...item, description: e };
                              return item;
                            }),
                          }))
                        }
                        className="bg-muted w-full border-0  shadow-none rounded-none"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-light text-foreground/50">
                        Tip: write 200+ characters to increase interview chances
                      </span>
                      <div className="flex items-center  text-xs">
                        <span>{data.description.length}</span>
                        <span className="text-foreground/50">/200</span>
                        <span className="text-lg ml-2">
                          {[...reactions]
                            .reverse()
                            .find(
                              (reaction) =>
                                data.description.length >= reaction.value
                            )?.reaction || "🧐"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default InternshipCard;
