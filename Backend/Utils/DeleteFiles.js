import fs from "fs";
import path from "path";

const deleteFiles = (filePaths) => {
  if (!Array.isArray(filePaths) || filePaths.length === 0) {
    throw new Error("No files to delete.");
  }

  const baseUploadPath = path.resolve("D:/CustomTShirt/Backend");

  filePaths.forEach((filePath) => {
    const fileToDelete = path.join(baseUploadPath, filePath);

    if (fs.existsSync(fileToDelete)) {
      fs.unlinkSync(fileToDelete);
    } else {
      console.log(`File not found: ${fileToDelete}`);
    }
  });
};

export default deleteFiles;
