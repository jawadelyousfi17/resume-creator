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
import { useState } from "react";

const CreateFromLinkedIn = ({
  isOpen,
  setOpen,
}: {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
}) => {
  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              <div className="text-xl font-semibold font-serif text-center flex flex-col">
                Import from linkedIn
                <span className="text-sm text-foreground/70 font-light font-sans ">
                  Write down your linkedIn and we will import your data
                </span>
              </div>
            </DialogTitle>{" "}
            <DialogDescription>
              <></>
            </DialogDescription>
          </DialogHeader>
          <div className=" rounded-md border border-border/5 py-4">
            <div className="flex flex-col gap-1">
              <label
                htmlFor=""
                className="text-xs font-light  text-foreground/50"
              >
                LinkedIn profile Url
              </label>
              <div className="flex items-center gap-2">
                <Input
                  className="bg-muted"
                  placeholder="e.g. linkedin.com/in/jhonedo"
                />
                <Button className="w-fit">Import</Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateFromLinkedIn;
