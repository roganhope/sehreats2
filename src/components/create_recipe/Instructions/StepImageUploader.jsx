"use client";

import React, { useCallback, useState } from "react";
import { FiImage } from "react-icons/fi";
import Cropper from "react-easy-crop";
import getCroppedImg from "@/utils/getCroppedImg"; // alias import

const StepImageUploader = ({
  images: propImages,
  setImages: propSetImages,
  maxImages = 5,
}) => {
  // internal state fallback
  const [internalImages, setInternalImages] = useState([]);
  const images = propImages || internalImages;
  const setImages = propSetImages || setInternalImages;

  const [cropModal, setCropModal] = useState(null); // { file, preview }
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  // handle files from drop or select
  const handleFiles = useCallback((files) => {
    if (!files.length) return;
    const file = files[0];
    const preview = URL.createObjectURL(file);
    setCropModal({ file, preview });
  }, []);

  const handleDrop = (e) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const handleFileSelect = (e) => {
    handleFiles(e.target.files);
  };

  // save cropped image
  const handleCropSave = async () => {
    if (!cropModal || !croppedAreaPixels) return;

    try {
      const croppedUrl = await getCroppedImg(
        cropModal.preview,
        croppedAreaPixels
      );
      const newImage = {
        id: Date.now().toString() + Math.random(),
        file: cropModal.file,
        preview: croppedUrl,
        caption: "",
        alt: "",
      };
      setImages([...images, newImage]);
      setCropModal(null);
      setCrop({ x: 0, y: 0 });
      setZoom(1);
      setCroppedAreaPixels(null);
    } catch (err) {
      console.error("Failed to crop image:", err);
    }
  };

  const handleRemove = (id) => setImages(images.filter((img) => img.id !== id));

  const updateImageField = (id, field, value) => {
    setImages(
      images.map((img) => (img.id === id ? { ...img, [field]: value } : img))
    );
  };

  return (
    <div style={{ display: "grid", gap: "1rem" }}>
      {/* Dropzone */}
      {images.length < maxImages && (
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
            cursor: "pointer",
            backgroundColor: "#fafafa",
          }}
        >
          <input
            type="file"
            id="fileInput"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleFileSelect}
          />
          <div style={{ textAlign: "center", color: "#888" }}>
            <FiImage size={32} />
            <span>Upload step image</span>
          </div>
        </div>
      )}

      {/* Image list */}
      {images.map((img) => (
        <div
          key={img.id}
          style={{
            display: "grid",
            gridTemplateColumns: "100px 1fr",
            gap: "1rem",
            alignItems: "start",
          }}
        >
          <div
            style={{ position: "relative", width: "100px", height: "100px" }}
          >
            <img
              src={img.preview}
              alt={img.alt || "Step image"}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <button
              onClick={() => handleRemove(img.id)}
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
              }}
            >
              ×
            </button>
          </div>
          <div style={{ display: "grid", gap: "0.25rem" }}>
            <input
              type="text"
              placeholder="Caption"
              value={img.caption}
              onChange={(e) =>
                updateImageField(img.id, "caption", e.target.value)
              }
              style={{
                padding: "0.25rem 0.5rem",
                borderRadius: "4px",
                border: "1px solid #ccc",
                width: "100%",
              }}
            />
            <input
              type="text"
              placeholder="Alt text (SEO / accessibility)"
              value={img.alt}
              onChange={(e) => updateImageField(img.id, "alt", e.target.value)}
              style={{
                padding: "0.25rem 0.5rem",
                borderRadius: "4px",
                border: "1px solid #ccc",
                width: "100%",
              }}
            />
          </div>
        </div>
      ))}

      {/* Crop modal */}
      {cropModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 999,
            padding: "1rem",
          }}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "400px",
              height: "400px",
              background: "#fff",
              borderRadius: "8px",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ flex: 1, position: "relative" }}>
              <Cropper
                image={cropModal.preview}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={(_, croppedAreaPx) =>
                  setCroppedAreaPixels(croppedAreaPx)
                }
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                padding: "0.5rem",
                background: "#f0f0f0",
              }}
            >
              <button onClick={() => setCropModal(null)}>Cancel</button>
              <button onClick={handleCropSave}>Save Crop</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StepImageUploader;
