import { v2 as cloudinary } from "cloudinary";
import { Readable } from "stream";

export const uploadToCloudinary = (
  fileBuffer: Buffer,
  folder: string
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error) return reject(error);
        resolve(result?.secure_url || "");
      }
    );

    const readable = new Readable();
    readable._read = () => {};
    readable.push(fileBuffer);
    readable.push(null);
    readable.pipe(stream);
  });
};
