"use client";

import React, { useState } from "react";
import Cropper from "react-easy-crop";
import { FiImage } from "react-icons/fi";
import { useRecipeStore } from "./recipeStore";
import getCroppedImg from "@/utils/getCroppedImg"; // helper to get cropped image from canvas

const cropConfigs = [
  { id: "16x9", aspect: 16 / 9, label: "16:9 (SEO / Hero)" },
  { id: "4x3", aspect: 4 / 3, label: "4:3 (Inline)" },
  { id: "2x3", aspect: 2 / 3, label: "2:3 (Portrait / Pinterest)" },
];

export default function ImageUploadAndCrop() {
  const mainImage = useRecipeStore((state) => state.mainImage);
  const setMainImage = useRecipeStore((state) => state.setMainImage);
  const mainAlt = useRecipeStore((state) => state.mainAlt);
  const setMainAlt = useRecipeStore((state) => state.setMainAlt);
  const setCroppedImage = useRecipeStore((state) => state.setCroppedImage);

  const [crops, setCrops] = useState({});
  const [zoom, setZoom] = useState({ "16x9": 1, "4x3": 1, "2x3": 1 });
  const [customImages, setCustomImages] = useState({});
  const [altTexts, setAltTexts] = useState({});

  const handleFiles = (files, cropId = null) => {
    const file = files[0];
    if (!file) return;

    const preview = URL.createObjectURL(file);

    if (cropId) setCustomImages((prev) => ({ ...prev, [cropId]: preview }));
    else setMainImage(preview);
  };

  const handleDrop = (e, cropId = null) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files, cropId);
  };

  const handleFileSelect = (e, cropId = null) => {
    if (e.target.files) handleFiles(e.target.files, cropId);
  };

  const renderDropzone = (cropId) => (
    <div
      onDrop={(e) => handleDrop(e, cropId)}
      onDragOver={(e) => e.preventDefault()}
      onClick={() =>
        document
          .getElementById(cropId ? `fileInput-${cropId}` : "fileInput")
          ?.click()
      }
      style={{
        width: "100%",
        minHeight: "160px",
        border: "2px dashed #aaa",
        borderRadius: "8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        background: "#fafafa",
      }}
    >
      <input
        type="file"
        id={cropId ? `fileInput-${cropId}` : "fileInput"}
        accept="image/*"
        style={{ display: "none" }}
        onChange={(e) => handleFileSelect(e, cropId)}
      />
      <div style={{ textAlign: "center", color: "#888" }}>
        <FiImage size={32} />
        <p>Drop or click to upload {cropId ? "this crop" : "an image"}</p>
      </div>
    </div>
  );

  const handleCropComplete = async (cropId, croppedAreaPixels, image) => {
    const croppedUrl = await getCroppedImg(image, croppedAreaPixels);
    setCroppedImage(cropId, croppedUrl);
  };

  return (
    <div style={{ display: "grid", gap: "2rem" }}>
      {!mainImage && renderDropzone(null)}

      {mainImage && (
        <div style={{ marginBottom: "1rem" }}>
          <label
            htmlFor="mainAlt"
            style={{ display: "block", marginBottom: "0.25rem" }}
          >
            Main image alt text:
          </label>
          <input
            id="mainAlt"
            type="text"
            value={mainAlt}
            onChange={(e) => setMainAlt(e.target.value)}
            placeholder="Describe this image for SEO and accessibility"
            style={{
              width: "100%",
              padding: "0.5rem",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
        </div>
      )}

      {mainImage &&
        cropConfigs.map((cfg) => {
          const imageToUse = customImages[cfg.id] || mainImage;
          const containerWidth = 800;
          const containerHeight = containerWidth / cfg.aspect;
          const altValue = altTexts[cfg.id] ?? mainAlt;

          return (
            <div key={cfg.id} style={{ width: "100%", marginBottom: "2rem" }}>
              <div
                style={{
                  marginBottom: "0.5rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                <strong>{cfg.label}</strong>
                <button onClick={() => renderDropzone(cfg.id)}>
                  Change image
                </button>
              </div>

              {!customImages[cfg.id] && renderDropzone(cfg.id)}

              <div
                style={{
                  width: "100%",
                  maxWidth: `${containerWidth}px`,
                  height: containerHeight,
                  position: "relative",
                  background: "#f0f0f0",
                }}
              >
                <Cropper
                  image={imageToUse}
                  aspect={cfg.aspect}
                  crop={crops[cfg.id]?.crop || { x: 0, y: 0 }}
                  zoom={zoom[cfg.id]}
                  onCropChange={(crop) =>
                    setCrops((prev) => ({
                      ...prev,
                      [cfg.id]: { ...prev[cfg.id], crop },
                    }))
                  }
                  onZoomChange={(z) =>
                    setZoom((prev) => ({ ...prev, [cfg.id]: z }))
                  }
                  onCropComplete={(croppedArea, croppedAreaPixels) =>
                    handleCropComplete(cfg.id, croppedAreaPixels, imageToUse)
                  }
                />
              </div>

              <div style={{ marginTop: "0.5rem" }}>
                <label
                  htmlFor={`alt-${cfg.id}`}
                  style={{ display: "block", marginBottom: "0.25rem" }}
                >
                  Alt text (override main image):
                </label>
                <input
                  id={`alt-${cfg.id}`}
                  type="text"
                  value={altValue}
                  onChange={(e) =>
                    setAltTexts((prev) => ({
                      ...prev,
                      [cfg.id]: e.target.value,
                    }))
                  }
                  placeholder="Describe this image for SEO and accessibility"
                  style={{
                    width: "100%",
                    padding: "0.5rem",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                  }}
                />
              </div>
            </div>
          );
        })}
    </div>
  );
}
