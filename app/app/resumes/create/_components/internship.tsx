"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { T_Resume } from "@/types/resumeInfos";
import { ChevronDown, Plus, Sparkles } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import EmployerCard from "./cards/employerCard";
import { v4 as uuidv4 } from "uuid";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  DragOverlay,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import InternshipCard from "./cards/InternshipCard";

const Internships = ({
  data,
  setData,
}: {
  data: T_Resume;
  setData: Dispatch<SetStateAction<T_Resume>>;
}) => {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  function handleDragComplete(event: DragEndEvent) {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    setData((p) => {
      const prev = p.internships;
      const originalPos = prev.findIndex(
        (item) => item.id.toString() === active.id
      );
      const targetPos = prev.findIndex(
        (item) => item.id.toString() === over.id
      );
      const reordredItems = [...prev];
      const [movedItem] = reordredItems.splice(originalPos, 1);
      reordredItems.splice(targetPos, 0, movedItem);
      return { ...p, internships: reordredItems };
    });
  }

  function addInternship() {
    setData((prev) => ({
      ...prev,
      internships: [
        ...prev.internships,
        {
          id: uuidv4(),
          jobTitle: "",
          employer: "",
          cityState: "",
          startDate: undefined,
          endDate: undefined,
          description: "",
        },
      ],
    }));
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragComplete}
    >
      <div className="bg-background p-4 space-y-5">
        <div className="flex flex-col gap-0.5">
          <span className="font-semibold font-serif">Internships</span>
          <span className="text-xs font-light text-foreground/50"></span>
        </div>
        <SortableContext
          items={data.internships.map((item) => item.id)}
          strategy={verticalListSortingStrategy}
        >
          {data.internships.map((item) => (
            <InternshipCard key={item.id} data={item} setData={setData} />
          ))}
        </SortableContext>
        <Button
          variant="ghost"
          className="text-primary"
          onClick={addInternship}
        >
          <Plus />
          Add Internship
        </Button>
      </div>
    </DndContext>
  );
};

export default Internships;
