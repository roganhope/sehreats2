"use client";

import React, { useState } from "react";
import Cropper from "react-easy-crop";
import { FiImage } from "react-icons/fi";

const cropConfigs = [
  { id: "16x9", aspect: 16 / 9, label: "16:9 (SEO / Hero)" },
  { id: "4x3", aspect: 4 / 3, label: "4:3 (Inline)" },
  { id: "2x3", aspect: 2 / 3, label: "2:3 (Portrait / Pinterest)" },
];

export default function ImageUploadAndCrop() {
  const [original, setOriginal] = useState(null);
  const [crops, setCrops] = useState({});
  const [zoom, setZoom] = useState({
    "16x9": 1,
    "4x3": 1,
    "2x3": 1,
  });
  const [customImages, setCustomImages] = useState({}); // stores per-crop override

  const handleFiles = (files, cropId = null) => {
    const file = files[0];
    if (!file) return;

    const preview = URL.createObjectURL(file);

    if (cropId) {
      // Replace specific crop
      setCustomImages((prev) => ({ ...prev, [cropId]: preview }));
    } else {
      // Main image
      setOriginal(preview);
    }
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

  return (
    <div style={{ display: "grid", gap: "2rem" }}>
      {/* Main image upload */}
      {!original && renderDropzone(null)}

      {/* Croppers */}
      {original &&
        cropConfigs.map((cfg) => {
          const imageToUse = customImages[cfg.id] || original;
          const containerWidth = 800;
          const containerHeight = containerWidth / cfg.aspect;

          return (
            <div key={cfg.id} style={{ width: "100%", marginBottom: "2rem" }}>
              <div style={{ marginBottom: "0.5rem" }}>
                <strong>{cfg.label}</strong>{" "}
                <button
                  style={{ marginLeft: "1rem" }}
                  onClick={() => renderDropzone(cfg.id)}
                >
                  Change image
                </button>
              </div>

              {/* Dropzone for replacing crop */}
              {!customImages[cfg.id] && renderDropzone(cfg.id)}

              {/* Cropper */}
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
                    setCrops((prev) => ({
                      ...prev,
                      [cfg.id]: { ...prev[cfg.id], croppedAreaPixels },
                    }))
                  }
                />
              </div>
            </div>
          );
        })}
    </div>
  );
}
