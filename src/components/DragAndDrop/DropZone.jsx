"use client";
import React from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import DraggableContainer from "./DraggableContainer";

const DropZone = ({ items = [], setItems, childrenRenderer }) => {
  const sensors = useSensors(useSensor(PointerSensor));

  // Safe wrapper to ensure items is always an array
  const safeItems = Array.isArray(items) ? items : [];

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = safeItems.findIndex((item) => item.id === active.id);
      const newIndex = safeItems.findIndex((item) => item.id === over.id);
      const newItems = arrayMove(safeItems, oldIndex, newIndex);
      setItems(newItems);
    }
  };

  const handleRemove = (id) => {
    setItems(safeItems.filter((item) => item.id !== id));
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={safeItems.map((i) => i.id)}
        strategy={verticalListSortingStrategy}
      >
        <div
          style={{
            minHeight: "200px",
            padding: "16px",
            border: "2px dashed #aaa",
            borderRadius: "8px",
            backgroundColor: "#fafafa",
          }}
        >
          {safeItems.map((item, index) => (
            <DraggableContainer
              key={item.id}
              id={item.id}
              onRemove={() => handleRemove(item.id)}
            >
              {childrenRenderer(item, index)}
            </DraggableContainer>
          ))}

          {safeItems.length === 0 && (
            <div
              style={{
                textAlign: "center",
                color: "#888",
                padding: "40px 0",
              }}
            >
              No items. Drag here or use buttons to add.
            </div>
          )}
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default DropZone;
