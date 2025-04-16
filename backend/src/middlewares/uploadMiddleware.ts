import multer from "multer";

// Use memory storage to avoid saving locally
const storage = multer.memoryStorage();

export const upload = multer({ storage });
