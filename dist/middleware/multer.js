import multer from "multer";
import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url";
const __dirname = dirname(fileURLToPath(import.meta.url));
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, "../uploads");
        console.log("Destination path:", uploadPath); // Log the path
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        console.log("Generated filename:", uniqueSuffix);
        cb(null, `${uniqueSuffix}-${file.originalname}`);
    },
});
export const upload = multer({ storage });
