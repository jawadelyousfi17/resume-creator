"use client";

import { templates } from "@/_templates";
import { updateResumeTemplate } from "@/actions/resume/updateResumeTemplate";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Search, Sparkles } from "lucide-react";

interface TemplateDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  id: string;
}

export default function TemplateDialog({
  open,
  setOpen,
  id,
}: TemplateDialogProps) {
  const [updating, setUpdating] = useState<Record<string, boolean>>({});
  const [query, setQuery] = useState("");
  const router = useRouter();

  const isAnyUpdating = Object.values(updating).some(Boolean);
  const filteredTemplates = templates.filter((t) => {
    const name = (t.name || "").toLowerCase();
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return name.includes(q);
  });

  async function handleUpdateTemplate(templateId: string | number) {
    const key = String(templateId);
    if (updating[key]) return;

    setUpdating((prev) => ({ ...prev, [key]: true }));
    try {
      const updatedResume = await updateResumeTemplate(id, Number(templateId));
      if (!updatedResume) {
        toast.error("Failed to update template");
        return;
      }

      toast.success("Template updated");
      setOpen(false);
      router.refresh();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to update template");
    } finally {
      setUpdating((prev) => ({ ...prev, [key]: false }));
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden flex flex-col p-0 bg-linear-to-b from-background to-background">
        <DialogHeader className="p-0">
          <div className="relative overflow-hidden rounded-t-lg border-b ">
            {/* <div className="absolute -top-16 -right-20 h-56 w-56 rounded-full bg-white/15 blur-2xl" />
            <div className="absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-white/10 blur-2xl" /> */}

            <div className="relative px-6 pt-7 pb-6">
              <DialogTitle className="text-center sm:text-left font-serif text-2xl tracking-tight">
                Choose a Template
              </DialogTitle>
              <div className="mt-1 text-xs font-sans font-light text-white/80">
                Apply instantly. You can switch templates anytime.
              </div>

              <div className="mt-5 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                <div className="relative w-full sm:max-w-sm">
                  <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 size-4 text-white/75" />
                  <Input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search templates…"
                    className="pl-9 bg-white/10 text-white placeholder:text-white/70 border-white/20 focus-visible:ring-white/30 focus-visible:border-white/40 w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-6 pb-6 pt-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5">
            {filteredTemplates.map((template) => (
              <button
                type="button"
                disabled={isAnyUpdating}
                onClick={() => handleUpdateTemplate(template.id)}
                key={template.id}
                className="group relative text-left rounded-2xl  bg-linear-to-b from-background/80 to-background transition-all disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40"
              >
                {updating[String(template.id)] && (
                  <div className="absolute inset-0 z-10 bg-foreground/60 rounded-2xl flex flex-col gap-2 justify-center items-center">
                    <Spinner color="white" />
                    <div className="text-xs font-light text-white">
                      Updating…
                    </div>
                  </div>
                )}

                <div className="p-3">
                  <div className="relative rounded-xl overflow-hidden border border-border/60 bg-muted">
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-linear-to-t from-black/10 via-transparent to-transparent" />
                    <div
                      className="w-full"
                      style={{ aspectRatio: "794 / 1123" }}
                    >
                      <img
                        src={template.preview}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                        alt={template.name || "Template preview"}
                        loading="lazy"
                      />
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <div className="text-sm font-semibold leading-none truncate">
                        {template.name}
                      </div>
                      <div className="mt-1 text-[11px] text-foreground/60">
                        Click to apply
                      </div>
                    </div>

                    <div className="shrink-0">
                      <span className="inline-flex items-center rounded-full border border-border/70 bg-background px-2.5 py-1 text-[11px] font-medium text-foreground/80 group-hover:border-blue-500/40 group-hover:text-blue-600 transition-colors">
                        Select
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <DialogFooter className="border-t px-6 py-4 bg-background/60">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={isAnyUpdating}
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
