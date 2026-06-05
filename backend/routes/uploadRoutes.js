const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

console.log(
  "Cloudinary:",
  process.env.CLOUDINARY_CLOUD_NAME
);

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {

    const isVideo =
      file.mimetype.startsWith(
        "video"
      );

    return {
      folder: "shopsphere",
      resource_type:
        isVideo
          ? "video"
          : "image",

      allowed_formats: [
        "jpg",
        "jpeg",
        "png",
        "webp",
        "mp4",
        "mov",
        "avi",
      ],
    };
  },
});

const upload = multer({
  storage: storage,
});

router.get("/", (req, res) => {
  res.send("Upload Route Working ✅");
});

router.post(
  "/",
  (req, res, next) => {
    upload.single("image")(req, res, function (err) {

      if (err) {
        console.log("UPLOAD ERROR:", err);

        return res.status(500).json({
          success: false,
          message: err.message,
        });
      }

      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "No file uploaded",
        });
      }

      console.log("Uploaded File:", req.file);

      return res.status(200).json({
        success: true,
        url: req.file.path,
        resourceType: req.file.resource_type,
      });
    });
  }
);
  

module.exports = router;