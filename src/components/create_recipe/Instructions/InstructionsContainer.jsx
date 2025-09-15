"use client";
import React from "react";
import DropZone from "../../DragAndDrop/DropZone";
import ImageUploadDropzone from "../../ImageUpload/ImageUploadDropZone";
import { useRecipeStore } from "../recipeStore";

const InstructionsContainer = () => {
  const steps = useRecipeStore((state) => state.steps || []);
  const setSteps = useRecipeStore((state) => state.setSteps);
  const updateStep = useRecipeStore((state) => state.updateStepText);
  const addStep = useRecipeStore((state) => state.addStep);

  const setImages = (stepId, newImages) => {
    setSteps((prev = []) =>
      prev.map((s) => (s.id === stepId ? { ...s, images: newImages } : s))
    );
  };

  return (
    <div style={{ maxWidth: "500px", margin: "40px auto" }}>
      <h2>Recipe Instructions</h2>

      <DropZone
        items={steps}
        setItems={setSteps}
        childrenRenderer={(item, index) => {
          const stepImagesSetter = (newImgs) => setImages(item.id, newImgs);

          return (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "6px",
                marginBottom: "12px",
              }}
            >
              <strong>Step {index + 1}</strong>

              <input
                type="text"
                value={item.name || ""}
                onChange={(e) => updateStep(item.id, { name: e.target.value })}
                placeholder="Step Name..."
              />

              <textarea
                value={item.text || ""}
                onChange={(e) => updateStep(item.id, { text: e.target.value })}
                placeholder="Instruction details..."
                rows={2}
              />

              <ImageUploadDropzone
                images={item.images || []}
                setImages={stepImagesSetter}
                maxImages={5}
              />
            </div>
          );
        }}
      />

      <div style={{ marginTop: "12px" }}>
        <button onClick={() => addStep()}>+ Step</button>
      </div>
    </div>
  );
};

export default InstructionsContainer;
