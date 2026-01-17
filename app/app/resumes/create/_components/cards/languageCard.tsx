"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { T_LanguageLevel, T_Level, T_Resume } from "@/types/resumeInfos";
import {
  ChevronDown,
  ChevronUp,
  Delete,
  GripVertical,
  Sparkles,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { motion } from "framer-motion";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useConfirm } from "@/components/general/confirmContext";

const LanguageCard = ({
  data,
  setData,
}: {
  data: T_Resume["languages"][0];
  setData: Dispatch<SetStateAction<T_Resume>>;
}) => {
  const [collapsed, setCollapsed] = useState(true);

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
        languages: p.languages.filter((item) => item.id !== toDeletId),
      }));
    }
  }

  return (
    <div ref={setNodeRef} style={cardStyle} key={data.id}>
      <motion.div
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={0.1}
        dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
        whileDrag={{ scale: 1.02, boxShadow: "0 10px 30px rgba(0,0,0,0.05)" }}
        className="border  border-border/50 p-3 bg-muted/5 flex flex-col gap-4 rounded-2xl  active:cursor-grabbing transition-all"
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
                {data.language ? data.language : "Untiled"}
              </div>
              <div className="text-sm font-normal text-foreground/50">
                {data.level}
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
                  Language
                </label>
                <Input
                  value={data?.language}
                  onChange={(e) =>
                    setData((prev) => ({
                      ...prev,
                      languages: prev.languages.map((item) => {
                        if (item.id === data.id)
                          return { ...item, language: e.target.value };
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
                  Level
                </label>
                <Select
                  onValueChange={(val) => {
                    setData((prev) => ({
                      ...prev,
                      languages: prev.languages.map((item) => {
                        if (item.id === data.id)
                          return { ...item, level: val as T_LanguageLevel };
                        return item;
                      }),
                    }));
                  }}
                >
                  <SelectTrigger className="w-full border-0 bg-muted ">
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Language Proficiency</SelectLabel>
                      <SelectItem value="Native speaker">
                        Native speaker
                      </SelectItem>
                      <SelectItem value="Highly proficient">
                        Highly proficient
                      </SelectItem>
                      <SelectItem value="Very good command">
                        Very good command
                      </SelectItem>
                      <SelectItem value="Good working knowledge">
                        Good working knowledge
                      </SelectItem>
                      <SelectItem value="Working knowledge">
                        Working knowledge
                      </SelectItem>
                      <SelectItem value="C2">C2</SelectItem>
                      <SelectItem value="C1">C1</SelectItem>
                      <SelectItem value="B2">B2</SelectItem>
                      <SelectItem value="B1">B1</SelectItem>
                      <SelectItem value="A2">A2</SelectItem>
                      <SelectItem value="A1">A1</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default LanguageCard;
