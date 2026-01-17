"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { T_Resume } from "@/types/resumeInfos";
import { Plus, Trash } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import CustomCard from "./cards/customCard";
import { useConfirm } from "@/components/general/confirmContext";

const CustomSectionGroup = ({
  group,
  setData,
}: {
  group: T_Resume["additional"][0];
  setData: Dispatch<SetStateAction<T_Resume>>;
}) => {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );
  const confirm = useConfirm();

  function handleDragComplete(event: DragEndEvent) {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    setData((p) => {
      return {
        ...p,
        additional: p.additional.map((g) => {
          if (g.id === group.id) {
            const prev = g.sections;
            const originalPos = prev.findIndex(
              (item) => item.id.toString() === active.id
            );
            const targetPos = prev.findIndex(
              (item) => item.id.toString() === over.id
            );
            const reordredItems = [...prev];
            const [movedItem] = reordredItems.splice(originalPos, 1);
            reordredItems.splice(targetPos, 0, movedItem);
            return { ...g, sections: reordredItems };
          }
          return g;
        }),
      };
    });
  }

  function addItem() {
    setData((prev) => ({
      ...prev,
      additional: prev.additional.map((g) => {
        if (g.id === group.id) {
          return {
            ...g,
            sections: [
              ...g.sections,
              {
                id: uuidv4(),
                activity: "",
                city: "",
                description: "",
              },
            ],
          };
        }
        return g;
      }),
    }));
  }

  async function handleDeleteGroup() {
    const confirmed = await confirm({
      title: "Delete Section?",
      description: "This will remove the entire section and all its items.",
      confirmText: "Delete Section",
      variant: "destructive",
    });

    if (confirmed) {
      setData((prev) => ({
        ...prev,
        additional: prev.additional.filter((g) => g.id !== group.id),
      }));
    }
  }

  return (
    <div className="mb-8 border border-border/50 rounded-xl p-4 bg-background">
      <div className="flex justify-between items-center mb-4 gap-4">
        <div className="flex-1">
          <label className="text-xs text-muted-foreground uppercase font-semibold ml-1">
            Section Title
          </label>
          <Input
            value={group.title}
            onChange={(e) =>
              setData((prev) => ({
                ...prev,
                additional: prev.additional.map((g) => {
                  if (g.id === group.id) {
                    return { ...g, title: e.target.value };
                  }
                  return g;
                }),
              }))
            }
            placeholder="e.g. Volunteering, Projects, Awards"
            className="font-semibold text-lg mt-1"
          />
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleDeleteGroup}
          className="self-center mt-6 text-muted-foreground hover:text-destructive"
        >
          <Trash className="w-4 h-4" />
        </Button>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragComplete}
      >
        <div className="space-y-4">
          <SortableContext
            items={group.sections}
            strategy={verticalListSortingStrategy}
          >
            {group.sections.map((item) => (
              <CustomCard
                key={item.id}
                data={item}
                setData={setData}
                collectionId={group.id}
                sectionTitle={group.title}
              />
            ))}
          </SortableContext>
        </div>
      </DndContext>

      <Button
        variant="link"
        className="text-primary mt-2 pl-0"
        onClick={addItem}
      >
        <Plus className="w-4 h-4 mr-2" /> Add Item to {group.title || "Section"}
      </Button>
    </div>
  );
};

const CustomSection = ({
  data,
  setData,
}: {
  data: T_Resume;
  setData: Dispatch<SetStateAction<T_Resume>>;
}) => {
  function addGroup() {
    setData((prev) => ({
      ...prev,
      additional: [
        ...prev.additional,
        {
          id: uuidv4(),
          title: "",
          sections: [],
        },
      ],
    }));
  }

  return (
    <div className="bg-background p-4 space-y-5">
      <div className="mb-6">
        <h2 className="text-2xl font-bold font-serif">Additional Sections</h2>
        <p className="text-muted-foreground text-sm font-light ">
          Add custom sections for Volunteering, Awards, Projects, etc.
        </p>
      </div>

      {data.additional.map((group) => (
        <CustomSectionGroup key={group.id} group={group} setData={setData} />
      ))}

      <Button
        onClick={addGroup}
        className="w-full py-6 border-dashed"
        variant="outline"
      >
        <Plus className="w-4 h-4 mr-2" /> Add New Additional Section
      </Button>
    </div>
  );
};

export default CustomSection;
