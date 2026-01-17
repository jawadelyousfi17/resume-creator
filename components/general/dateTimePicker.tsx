"use client";

import * as React from "react";
import { Calendar as CalendarIcon, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type MonthYearPickerProps = {
  value?: Date | string | null;
  onChange: (value: Date | null) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  fromYear?: number;
  toYear?: number;
  closeOnSelect?: boolean;
  clearable?: boolean;
};

function formatMonthYear(date: Date) {
  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    year: "numeric",
  }).format(date);
}

function getMonthLabels() {
  return Array.from({ length: 12 }, (_, monthIndex) => ({
    monthIndex,
    label: new Intl.DateTimeFormat(undefined, { month: "long" }).format(
      new Date(2020, monthIndex, 1)
    ),
  }));
}

function getYearRange(fromYear: number, toYear: number) {
  const start = Math.min(fromYear, toYear);
  const end = Math.max(fromYear, toYear);
  const years: number[] = [];
  for (let y = end; y >= start; y--) years.push(y);
  return years;
}

export function MonthYearPicker({
  value,
  onChange,
  placeholder = "Pick month & year",
  disabled,
  className,
  fromYear,
  toYear,
  closeOnSelect = true,
  clearable = true,
}: MonthYearPickerProps) {
  const [open, setOpen] = React.useState(false);

  const now = React.useMemo(() => new Date(), []);
  const effectiveFromYear = fromYear ?? now.getFullYear() - 60;
  const effectiveToYear = toYear ?? now.getFullYear() + 10;

  const months = React.useMemo(() => getMonthLabels(), []);
  const years = React.useMemo(
    () => getYearRange(effectiveFromYear, effectiveToYear),
    [effectiveFromYear, effectiveToYear]
  );

  // Convert string to Date if needed
  const dateValue = React.useMemo(() => {
    if (!value) return null;
    return typeof value === "string" ? new Date(value) : value;
  }, [value]);

  const selectedMonth = dateValue ? dateValue.getMonth() : null;
  const selectedYear = dateValue ? dateValue.getFullYear() : null;

  function setMonth(monthIndex: number) {
    const year = selectedYear ?? now.getFullYear();
    const next = new Date(year, monthIndex, 1);
    onChange(next);
    if (closeOnSelect) setOpen(false);
  }

  function setYear(year: number) {
    const month = selectedMonth ?? now.getMonth();
    const next = new Date(year, month, 1);
    onChange(next);
    if (closeOnSelect) setOpen(false);
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <div className={cn("flex items-center gap-2 ", className)}>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            disabled={disabled}
            className={cn(
              "w-full justify-start text-left font-normal  border-0 shadow-none rounded-md bg-muted",
              !value && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {dateValue ? formatMonthYear(dateValue) : placeholder}
          </Button>
        </PopoverTrigger>

        {/* {clearable && value ? (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            disabled={disabled}
            className="h-9 w-9"
            onClick={() => onChange(null)}
            aria-label="Clear date"
          >
            <X className="h-4 w-4" />
          </Button>
        ) : null} */}
      </div>

      <PopoverContent className="w-80 p-3  shadow-none" align="start">
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <div className="text-xs text-muted-foreground">Month</div>
            <Select
              value={selectedMonth === null ? undefined : String(selectedMonth)}
              onValueChange={(v) => setMonth(Number(v))}
              disabled={disabled}
            >
              <SelectTrigger className="w-full bg-muted border-0 shadow-none">
                <SelectValue placeholder="Select month" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Month</SelectLabel>
                  {months.map((m) => (
                    <SelectItem key={m.monthIndex} value={String(m.monthIndex)}>
                      {m.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <div className="text-xs text-muted-foreground">Year</div>
            <Select
              value={selectedYear === null ? undefined : String(selectedYear)}
              onValueChange={(v) => setYear(Number(v))}
              disabled={disabled}
            >
              <SelectTrigger className="w-full bg-muted border-0 shadow-none">
                <SelectValue placeholder="Select year" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Year</SelectLabel>
                  {years.map((y) => (
                    <SelectItem key={y} value={String(y)}>
                      {y}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default MonthYearPicker;
