"use client";
import React from "react";
import DropZone from "../../DragAndDrop/DropZone";
import ImageUploadDropzone from "../../ImageUpload/ImageUploadDropZone";
import { useRecipeStore } from "../recipeStore";

const InstructionsContainer = () => {
  const steps = useRecipeStore((state) => state.steps);
  const setSteps = useRecipeStore((state) => state.setSteps);
  const updateStepText = useRecipeStore((state) => state.updateStepText);

  // Generic add function, supports type
  const addItem = (type = "step") =>
    setSteps([
      ...steps,
      { id: Date.now().toString(), type, name: "", text: "", images: [] },
    ]);

  return (
    <div style={{ maxWidth: "500px", margin: "40px auto" }}>
      <h2>Recipe Instructions</h2>

      <DropZone
        items={steps}
        setItems={setSteps}
        childrenRenderer={(item, index) => {
          // Helper function: per-step image setter
          const setStepImages = (newImages) => {
            setSteps((prev) =>
              prev.map((s) =>
                s.id === item.id ? { ...s, images: newImages } : s
              )
            );
          };

          return (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "6px",
                marginBottom: "12px",
              }}
            >
              {/* Step or Subtitle label */}
              {item.type === "step" && <strong>Step {index + 1}</strong>}
              {item.type === "subtitle" && <strong>Subtitle</strong>}

              {/* Name field */}
              <input
                type="text"
                value={item.name || ""}
                onChange={(e) =>
                  updateStepText(item.id, { ...item, name: e.target.value })
                }
                placeholder={
                  item.type === "subtitle" ? "Subtitle Name..." : "Step Name..."
                }
                style={{
                  padding: "4px 8px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                  fontWeight: item.type === "subtitle" ? "bold" : "normal",
                }}
              />

              {/* Instruction text */}
              {item.type === "step" && (
                <textarea
                  value={item.text || ""}
                  onChange={(e) =>
                    updateStepText(item.id, { ...item, text: e.target.value })
                  }
                  placeholder="Instruction details..."
                  rows={2}
                  style={{
                    padding: "4px 8px",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                    resize: "vertical",
                  }}
                />
              )}

              {/* Image upload per step */}
              {item.type === "step" && (
                <ImageUploadDropzone
                  images={item.images || []}
                  setImages={setStepImages}
                  maxImages={5}
                />
              )}
            </div>
          );
        }}
      />

      {/* Add step/subtitle buttons */}
      <div style={{ marginTop: "12px", display: "flex", gap: "8px" }}>
        <button
          onClick={() => addItem("step")}
          style={{
            padding: "8px 16px",
            borderRadius: "4px",
            border: "1px solid #888",
            backgroundColor: "#f0f0f0",
            cursor: "pointer",
          }}
        >
          + Step
        </button>
        <button
          onClick={() => addItem("subtitle")}
          style={{
            padding: "8px 16px",
            borderRadius: "4px",
            border: "1px solid #888",
            backgroundColor: "#f0f0f0",
            cursor: "pointer",
          }}
        >
          + Subtitle
        </button>
      </div>
    </div>
  );
};

export default InstructionsContainer;
