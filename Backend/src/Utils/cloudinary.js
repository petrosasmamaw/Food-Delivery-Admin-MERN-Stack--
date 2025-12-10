import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
  console.warn("Cloudinary credentials are not set. Image uploads will fail until environment variables are configured.");
}

export const uploadBuffer = (buffer, folder = "food_images") => {
  return new Promise((resolve, reject) => {
    if (!buffer) return reject(new Error("No buffer provided to uploadBuffer"));
    if (!Buffer.isBuffer(buffer)) {
      // Some multipart handlers might provide a Buffer-like object; try to convert
      try {
        buffer = Buffer.from(buffer);
      } catch (e) {
        return reject(new Error("uploadBuffer expected a Buffer"));
      }
    }

    const uploadStream = cloudinary.uploader.upload_stream({ folder }, (error, result) => {
      if (error) {
        console.error("Cloudinary upload error:", error && error.message ? error.message : error);
        return reject(error);
      }
      resolve(result);
    });

    try {
      streamifier.createReadStream(buffer).pipe(uploadStream);
    } catch (err) {
      console.error("streamifier error:", err);
      reject(err);
    }
  });
};

export default cloudinary;
