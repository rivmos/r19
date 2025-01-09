import multer from "multer";
import path from "path";
import fs from 'fs';

// Define the directory for uploads
const uploadDir = path.join(__dirname,'..','/uploads');

// Ensure the directory exists, and create it if it doesn't
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const fileStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
})

export const uploadFile = multer({ storage: fileStorage })