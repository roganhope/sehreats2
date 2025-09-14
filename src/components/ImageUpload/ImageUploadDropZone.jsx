"use client";
import React, { useCallback } from "react";
import { FiImage } from "react-icons/fi"; // optional, for a nice image icon

const ImageUploadDropzone = ({ maxImages = 1, images = [], setImages }) => {
  const handleFiles = useCallback(
    (files) => {
      const newFiles = Array.from(files).slice(0, maxImages - images.length);
      const newImages = newFiles.map((file) => ({
        id: Date.now().toString() + Math.random(),
        file,
        preview: URL.createObjectURL(file),
      }));
      setImages([...images, ...newImages]);
    },
    [images, maxImages, setImages]
  );

  const handleDrop = (e) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const handleFileSelect = (e) => {
    handleFiles(e.target.files);
  };

  const handleRemove = (id) => {
    setImages(images.filter((img) => img.id !== id));
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      onClick={() => document.getElementById("fileInput").click()}
      style={{
        width: "100%",
        minHeight: "120px",
        border: "2px dashed #aaa",
        borderRadius: "8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: "8px",
        cursor: "pointer",
        position: "relative",
        padding: "8px",
        backgroundColor: "#fafafa",
      }}
    >
      <input
        type="file"
        id="fileInput"
        multiple={maxImages > 1}
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFileSelect}
      />

      {images.length === 0 && (
        <div
          style={{
            textAlign: "center",
            color: "#888",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <FiImage size={32} />
          <span>Upload</span>
        </div>
      )}

      {images.map((img) => (
        <div
          key={img.id}
          style={{
            position: "relative",
            width: "100px",
            height: "100px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            overflow: "hidden",
            flexShrink: 0,
          }}
        >
          <img
            src={img.preview}
            alt="preview"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <button
            onClick={(e) => {
              e.stopPropagation(); // prevent triggering file input
              handleRemove(img.id);
            }}
            style={{
              position: "absolute",
              top: "4px",
              right: "4px",
              background: "rgba(0,0,0,0.5)",
              color: "white",
              border: "none",
              borderRadius: "50%",
              width: "20px",
              height: "20px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
};

export default ImageUploadDropzone;
