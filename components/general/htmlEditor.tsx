"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Bold, Italic, Link2, List, ListOrdered } from "lucide-react";
import { RiSparklingFill } from "react-icons/ri";

type HtmlEditorProps = {
  value?: string;
  onChange?: (html: string) => void;
  placeholder?: string;
  className?: string;
  editorClassName?: string;
  disabled?: boolean;
  sufix?: React.ReactNode;
};

function exec(command: string, value?: string) {
  // Note: document.execCommand is deprecated but still widely supported and
  // is the simplest no-dependency option for a basic rich text editor.
  document.execCommand(command, false, value);
}

export default function HtmlEditor({
  value = "",
  onChange,
  placeholder = "Write...",
  className,
  editorClassName,
  disabled,
  sufix,
}: HtmlEditorProps) {
  const editorRef = React.useRef<HTMLDivElement | null>(null);
  const [linkUrl, setLinkUrl] = React.useState("");
  const [isLinkDialogOpen, setIsLinkDialogOpen] = React.useState(false);
  const savedRangeRef = React.useRef<Range | null>(null);

  // Keep DOM in sync when parent value changes.
  React.useEffect(() => {
    const el = editorRef.current;
    if (!el) return;
    // Avoid resetting cursor when content already matches.
    if ((el.innerHTML ?? "") !== (value ?? "")) {
      el.innerHTML = value || "";
    }
  }, [value]);

  const emitChange = React.useCallback(() => {
    const el = editorRef.current;
    if (!el) return;
    onChange?.(el.innerHTML);
  }, [onChange]);

  const focusEditor = React.useCallback(() => {
    editorRef.current?.focus();
  }, []);

  const handleBold = () => {
    focusEditor();
    exec("bold");
    emitChange();
  };

  const handleItalic = () => {
    focusEditor();
    exec("italic");
    emitChange();
  };

  const handleBullets = () => {
    focusEditor();
    exec("insertUnorderedList");
    emitChange();
  };

  const handleNumbered = () => {
    focusEditor();
    exec("insertOrderedList");
    emitChange();
  };

  const openLinkDialog = () => {
    if (disabled) return;
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      if (
        editorRef.current &&
        editorRef.current.contains(range.commonAncestorContainer)
      ) {
        savedRangeRef.current = range.cloneRange();
      } else {
        savedRangeRef.current = null;
      }
    } else {
      savedRangeRef.current = null;
    }

    setIsLinkDialogOpen(true);
  };

  const applyLinkToSelection = () => {
    const url = linkUrl.trim();
    if (!url) return;

    focusEditor();

    const selection = window.getSelection();
    if (selection && savedRangeRef.current) {
      selection.removeAllRanges();
      selection.addRange(savedRangeRef.current);
    }

    exec("createLink", url);
    emitChange();

    setLinkUrl("");
    savedRangeRef.current = null;
    setIsLinkDialogOpen(false);
  };

  return (
    <div
      className={cn(
        "w-full rounded-2xl border border-border/50 bg-muted/5",
        className
      )}
    >
      <div className="flex flex-wrap items-center gap-2   bg-background/30 p-2 justify-between">
        <div className="flex flex-wrap items-center gap-2   bg-background/30 p-2">
          <Button
            type="button"
            size="sm"
            variant="ghost"
            onClick={handleBold}
            disabled={disabled}
          >
            <Bold className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            size="sm"
            variant="ghost"
            onClick={handleItalic}
            disabled={disabled}
          >
            <Italic className="h-4 w-4" />
          </Button>
          <div className="h-6 w-px bg-border/50" />
          <Button
            type="button"
            size="sm"
            variant="ghost"
            onClick={handleBullets}
            disabled={disabled}
          >
            <List className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            size="sm"
            variant="ghost"
            onClick={handleNumbered}
            disabled={disabled}
          >
            <ListOrdered className="h-4 w-4" />
          </Button>

          <div className="h-6 w-px bg-border/50" />

          <Button
            type="button"
            size="sm"
            variant="secondary"
            onClick={openLinkDialog}
            disabled={disabled}
          >
            <Link2 className="mr-2 h-4 w-4" />
            Link
          </Button>
        </div>

        {sufix}
      </div>
      <div className="">
        <div
          ref={editorRef}
          contentEditable={!disabled}
          suppressContentEditableWarning
          onInput={emitChange}
          onBlur={emitChange}
          data-placeholder={placeholder}
          className={cn(
            "min-h-36 w-full  bg-background/40 px-4 text-sm outline-none",
            "[&:empty:before]:content-[attr(data-placeholder)] [&:empty:before]:text-foreground/40",
            "prose prose-sm max-w-none prose-p:my-2 prose-ul:my-2 prose-ol:my-2",
            "text-sm font-light prose prose-sm max-w-none [&_ul]:list-disc [&_ul]:ml-4 [&_ul]:my-2 [&_ol]:list-decimal [&_ol]:ml-4 [&_ol]:my-2 [&_li]:my-1 [&_a]:text-primary [&_a]:underline [&_a:hover]:text-primary/80 [&_a]:underline-offset-4",
            disabled && "opacity-60",
            editorClassName
          )}
        />
      </div>

      <Dialog open={isLinkDialogOpen} onOpenChange={setIsLinkDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add link</DialogTitle>
            <DialogDescription>
              Select text in the editor, then paste a URL.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            <Input
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              placeholder="https://example.com"
              className="bg-background"
              disabled={disabled}
              autoFocus
            />
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setIsLinkDialogOpen(false);
                setLinkUrl("");
                savedRangeRef.current = null;
              }}
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={applyLinkToSelection}
              disabled={disabled || !linkUrl.trim()}
            >
              Apply
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
