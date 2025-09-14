"use client";
import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const DraggableContainer = ({ id, onRemove, children }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: "8px",
    margin: "6px 0",
    border: "1px solid #ccc",
    borderRadius: "4px",
    backgroundColor: "#fefefe",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      {/* Remove button on the left */}
      {onRemove && (
        <button
          onClick={onRemove}
          style={{
            cursor: "pointer",
            border: "none",
            background: "transparent",
            fontSize: "16px",
          }}
        >
          ❌
        </button>
      )}

      {/* Children render content */}
      <div style={{ flex: 1 }}>{children}</div>

      {/* Drag handle on the right */}
      <div
        {...listeners}
        style={{
          cursor: "grab",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "3px",
          padding: "4px",
        }}
      >
        <div
          style={{ width: "20px", height: "2px", backgroundColor: "#333" }}
        />
        <div
          style={{ width: "20px", height: "2px", backgroundColor: "#333" }}
        />
        <div
          style={{ width: "20px", height: "2px", backgroundColor: "#333" }}
        />
      </div>
    </div>
  );
};

export default DraggableContainer;
