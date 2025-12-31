import cloudinaryConfig from "../configs/cloudinary.config.js";
import multer from "multer";
import {CloudinaryStorage} from "multer-storage-cloudinary";
const storage = new CloudinaryStorage({
  cloudinary: cloudinaryConfig,
  params: {
    folder: "Pop-corn-films",
    allowed_formats: ["jpg", "jpeg", "png", "gif", "webp"],
    transformation: [{ width: 1000, height: 1000, crop: "limit" }],
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Chỉ chấp nhận file ảnh!"), false);
    }
  },
});
export default upload;
