import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now();
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

// Configure Multer to handle multiple file uploads (limit to 5 files)
// 'images' is the field name in your request
const uploadFiles = multer({ storage: storage }).array("images", 5);

export default uploadFiles;
