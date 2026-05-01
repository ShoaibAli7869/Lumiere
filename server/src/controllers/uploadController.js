import sharp from "sharp";
import cloudinary from "../config/cloudinary.js";
import { ApiError } from "../utils/ApiError.js";

export const uploadImage = async (req, res) => {
  if (!req.file) throw new ApiError("No file provided", 400);

  const compressed = await sharp(req.file.buffer)
    .resize({ width: 1200, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toBuffer();

  const result = await new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "jewelry", resource_type: "image" },
      (err, result) => (err ? reject(err) : resolve(result)),
    );
    stream.end(compressed);
  });

  res.json({ url: result.secure_url, public_id: result.public_id });
};

export const deleteImage = async (req, res) => {
  const { public_id } = req.body;
  if (!public_id) throw new ApiError("public_id required", 400);
  await cloudinary.uploader.destroy(public_id);
  res.json({ message: "Image deleted" });
};
