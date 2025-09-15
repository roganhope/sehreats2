/**
 * Generates a cropped image URL from an image and crop area.
 * @param {string} imageSrc - The source URL of the image
 * @param {object} crop - Cropped area pixels { x, y, width, height }
 * @returns {Promise<string>} - Object URL of the cropped image
 */
export default function getCroppedImg(imageSrc, crop) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = imageSrc;
    image.crossOrigin = "anonymous"; // handle CORS if needed

    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = crop.width;
      canvas.height = crop.height;
      const ctx = canvas.getContext("2d");

      ctx.drawImage(
        image,
        crop.x,
        crop.y,
        crop.width,
        crop.height,
        0,
        0,
        crop.width,
        crop.height
      );

      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error("Canvas is empty"));
          return;
        }
        const croppedImageUrl = URL.createObjectURL(blob);
        resolve(croppedImageUrl);
      }, "image/jpeg"); // JPEG for universal compatibility
    };

    image.onerror = (err) => reject(err);
  });
}
