"use client";

import { useState } from "react";
import CreateResumeDialog from "./CreateResumeDialog";

export default function CreateResumeDialogTrigger({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div onClick={() => setOpen(true)}>{children}</div>
      <CreateResumeDialog open={open} onOpenChange={setOpen} />
    </>
  );
}
