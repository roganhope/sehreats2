"use client";
import { useState } from "react";
import ImageUploadDropzone from "@/components/ImageUpload/ImageUploadDropZone";

export default function Page() {
  const [images, setImages] = useState([]);

  return (
    <ImageUploadDropzone maxImages={5} images={images} setImages={setImages} />
  );
}
