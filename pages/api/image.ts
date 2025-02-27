import { NextApiRequest, NextApiResponse } from "next";
import sharp from "sharp";
import fs from "fs";
import path from "path";

// Define supported formats
const SUPPORTED_FORMATS = ["jpg", "jpeg", "png", "webp"];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { url, w, h, format } = req.query;

    // Validate the URL
    if (!url || typeof url !== "string") {
      return res.status(400).json({ error: "Missing image URL" });
    }

    const width = w ? parseInt(w as string, 10) : undefined;
    const height = h ? parseInt(h as string, 10) : undefined;
    const outputFormat = SUPPORTED_FORMATS.includes(format as string)
      ? format
      : "webp";

    // Fetch the original image
    const imagePath = path.join(process.cwd(), "public", url);
    if (!fs.existsSync(imagePath)) {
      return res.status(404).json({ error: "Image not found" });
    }

    const imageBuffer = fs.readFileSync(imagePath);

    // Optimize the image
    const optimizedImage = await sharp(imageBuffer)
      .resize(width, height, { fit: "inside" }) // Resize while maintaining aspect ratio
      .toFormat(outputFormat as keyof sharp.FormatEnum, { quality: 80 })
      .toBuffer();

    res.setHeader("Content-Type", `image/${outputFormat}`);
    res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
    res.end(optimizedImage);
  } catch (error) {
    console.error("Image Processing Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
