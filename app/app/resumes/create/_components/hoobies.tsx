"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { T_Resume } from "@/types/resumeInfos";
import { Crown, Plus, Sparkles } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useAiCreditsGate } from "@/components/general/aiCreditsDialog";
import toast from "react-hot-toast";

const Hobbies = ({
  data,
  setData,
}: {
  data: T_Resume;
  setData: Dispatch<SetStateAction<T_Resume>>;
}) => {
  const [filterVal, setFilterVal] = useState("");
  const { ensureCanUseAi, dialog } = useAiCreditsGate();

  async function handleEnhanceClick() {
    const allowed = await ensureCanUseAi();
    if (!allowed) return;
    toast("AI hobbies enhancement not wired yet");
  }

  const hoobies = [
    "Reading",
    "Writing",
    "Photography",
    "Painting",
    "Drawing",
    "Gardening",
    "Cooking",
    "Baking",
    "Hiking",
    "Camping",
    "Traveling",
    "Swimming",
    "Running",
    "Cycling",
    "Yoga",
    "Dancing",
    "Singing",
    "Playing Guitar",
    "Playing Piano",
    "Playing Drums",
    "Playing Violin",
    "Composing Music",
    "Sculpting",
    "Pottery",
    "Knitting",
    "Crocheting",
    "Sewing",
    "Quilting",
    "Embroidery",
    "Woodworking",
    "Chess",
    "Video Gaming",
    "Board Games",
    "Puzzles",
    "Collecting Coins",
    "Collecting Stamps",
    "Bird Watching",
    "Astronomy",
    "Fishing",
    "Hunting",
    "Rock Climbing",
    "Skateboarding",
    "Surfing",
    "Skiing",
    "Snowboarding",
    "Martial Arts",
    "Boxing",
    "Meditation",
    "Volunteering",
    "Blogging",
    "Podcasting",
    "Stand-up Comedy",
    "Magic Tricks",
    "Juggling",
    "Origami",
    "Calligraphy",
    "Scrapbooking",
    "Model Building",
    "Drone Flying",
    "3D Printing",
    "Electronics",
    "Robotics",
    "Coding",
    "App Development",
    "Web Design",
    "Graphic Design",
    "Video Editing",
    "Animation",
    "Film Making",
    "Acting",
    "Theater",
    "Improv",
    "Poetry",
    "Journaling",
    "Language Learning",
    "Wine Tasting",
    "Coffee Roasting",
    "Homebrewing",
    "Mixology",
    "Food Blogging",
    "Interior Design",
    "Architecture",
    "Furniture Restoration",
    "Car Restoration",
    "Motorcycling",
    "Kayaking",
    "Canoeing",
    "Sailing",
    "Scuba Diving",
    "Snorkeling",
    "Archery",
    "Fencing",
    "Golf",
    "Tennis",
    "Basketball",
    "Soccer",
    "Baseball",
    "Volleyball",
    "Badminton",
    "Table Tennis",
  ];

  return (
    <div className="bg-background p-4 space-y-5">
      {dialog}
      <div className="flex flex-col gap-0.5">
        <span className="font-semibold font-serif">Hobbies</span>
        <span className="text-xs font-light text-foreground/50"></span>
      </div>
      <div className="flex items-center gap-1 ">
        <div className="flex flex-col gap-1 flex-1 ">
          <label className="text-sm font-light text-foreground/60">
            What do you like
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
            <Textarea
              value={data?.hobbies}
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  hobbies: e.target.value,
                }))
              }
              className="bg-muted w-full border-0  shadow-none rounded-none"
            />
          </div>
          <div className="flex gap-2 flex-wrap mt-2">
            {hoobies.map((hooby) => (
              <Button
                className="bg-muted border-0 shadow-none rounded-full text-foreground text-sm "
                size="sm"
                onClick={() =>
                  setData((prev) => ({
                    ...prev,
                    hobbies: prev.hobbies.length
                      ? prev.hobbies + `\n${hooby}`
                      : prev.hobbies + `${hooby}`,
                  }))
                }
              >
                {hooby} <Plus />
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hobbies;
