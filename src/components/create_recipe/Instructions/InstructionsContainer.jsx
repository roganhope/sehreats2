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
    <div className="max-w-lg mx-auto my-10">
      <h2 className="text-xl font-semibold mb-4">Recipe Instructions</h2>

      <DropZone
        items={steps}
        setItems={setSteps}
        childrenRenderer={(item, index) => {
          const stepImagesSetter = (newImgs) => setImages(item.id, newImgs);

          // Render differently if it's a subtitle
          if (item.type === "subtitle") {
            return (
              <div
                className="flex items-center mb-4 p-2 bg-gray-100 rounded"
                key={item.id}
              >
                <input
                  type="text"
                  value={item.text || ""}
                  onChange={(e) =>
                    updateStep(item.id, { text: e.target.value })
                  }
                  placeholder="Subtitle..."
                  className="flex-1 font-bold px-2 py-1 border rounded"
                />
              </div>
            );
          }

          // Normal step
          return (
            <div
              key={item.id}
              className="flex flex-col gap-2 mb-4 border rounded p-3 bg-gray-50"
            >
              <strong>Step {index + 1}</strong>

              <input
                type="text"
                value={item.name || ""}
                onChange={(e) => updateStep(item.id, { name: e.target.value })}
                placeholder="Step Name..."
                className="border rounded px-2 py-1"
              />

              <textarea
                value={item.text || ""}
                onChange={(e) => updateStep(item.id, { text: e.target.value })}
                placeholder="Instruction details..."
                rows={2}
                className="border rounded px-2 py-1"
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

      <div className="flex gap-2 mt-4">
        <button
          onClick={() => addStep("step")}
          className="px-4 py-2 rounded border bg-gray-200 hover:bg-gray-300"
        >
          + Step
        </button>
        <button
          onClick={() => addStep("subtitle")}
          className="px-4 py-2 rounded border bg-gray-200 hover:bg-gray-300"
        >
          + Subtitle
        </button>
      </div>
    </div>
  );
};

export default InstructionsContainer;
