"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  ChevronRight,
  File,
  Linkedin,
  PanelLeftDashed,
  Plus,
} from "lucide-react";
import { useState } from "react";
import CreateFromLinkedIn from "./createFromLinkedIn";

const NewResumeCard = () => {
  const [open, setOpen] = useState(true);

  const [linkedInDialog, setLinkedInDialog] = useState(false);

  return (
    <div>
      <CreateFromLinkedIn isOpen={linkedInDialog} setOpen={setLinkedInDialog} />

      <Dialog open={open} onOpenChange={() => setOpen((prev) => !prev)}>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              <div className="text-xl font-semibold font-serif text-center flex flex-col">
                Create new resume
                <span className="text-sm text-foreground/70 font-light font-sans ">
                  How do you want to create your resume?
                </span>
              </div>
            </DialogTitle>
            <DialogDescription>
              <></>
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-2">
            <Button
              size="lg"
              className="bg-muted py-6 text-md text-foreground flex justify-between hover:bg-primary/5 hover:text-primary border border-border/10"
            >
              <div className="flex items-center gap-4">
                <Plus />
                Create from scratch
              </div>

              <ChevronRight />
            </Button>
            <Button
              onClick={() => setLinkedInDialog(true)}
              size="lg"
              className="bg-muted py-6 text-md text-foreground flex justify-between hover:bg-primary/5 hover:text-primary border border-border/10"
            >
              <div className="flex items-center gap-4">
                <Linkedin />
                Import from LinkedIn
              </div>

              <ChevronRight />
            </Button>
            <Button
              size="lg"
              className="bg-muted py-6 text-md text-foreground flex justify-between hover:bg-primary/5 hover:text-primary border border-border/10"
            >
              <div className="flex items-center gap-4">
                <File />
                Import resume
              </div>

              <ChevronRight />
            </Button>{" "}
            <Button
              size="lg"
              className="bg-muted py-6 text-md text-foreground flex justify-between hover:bg-primary/5 hover:text-primary border border-border/10"
            >
              <div className="flex items-center gap-4">
                <PanelLeftDashed />
                Create from example
              </div>

              <ChevronRight />
            </Button>{" "}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NewResumeCard;
