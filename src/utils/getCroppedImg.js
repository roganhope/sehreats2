// src/utils/getCroppedImg.js
export default function getCroppedImg(imageSrc, croppedAreaPixels) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = "anonymous"; // allow cross-origin if needed
    image.src = imageSrc;

    image.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        if (!ctx) return reject(new Error("Failed to get canvas context"));

        const { width, height, x, y } = croppedAreaPixels;

        if (width <= 0 || height <= 0)
          return reject(new Error("Canvas is empty"));

        // Set canvas to cropped area size
        canvas.width = width;
        canvas.height = height;

        // Use naturalWidth/naturalHeight to scale correctly
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;

        ctx.drawImage(
          image,
          x * scaleX,
          y * scaleY,
          width * scaleX,
          height * scaleY,
          0,
          0,
          width,
          height
        );

        canvas.toBlob((blob) => {
          if (!blob) return reject(new Error("Canvas is empty"));
          const croppedImageUrl = URL.createObjectURL(blob);
          resolve(croppedImageUrl);
        }, "image/jpeg");
      } catch (err) {
        reject(err);
      }
    };

    image.onerror = () => reject(new Error("Failed to load image"));
  });
}
