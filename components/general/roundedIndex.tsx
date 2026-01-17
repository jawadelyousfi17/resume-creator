import { cn } from "@/lib/utils";

const RoundedIndex = ({
  totalSteps,
  index,
}: {
  totalSteps: number;
  index: number;
}) => {
  return (
    <div className="flex flex-row justify-start items-center gap-1">
      {Array.from({ length: totalSteps }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "w-2 h-2 bg-muted rounded-full cursor-pointer hover:bg-primary",
            i === index && "bg-primary h-3 w-3",
            i < index && "bg-primary"
          )}
        ></div>
      ))}
    </div>
  );
};

export default RoundedIndex;
