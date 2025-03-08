const express = require("express");
const multer = require("multer");
const { submitContactForm, getContactMessages } = require("../controllers/contact.js");
const { protect, admin } = require("../middleware/authMiddleware.js");
const { cloudinary } = require("../config/Cloudinary.js");
const Contact = require("../models/contact.js");

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded!" });
    }

    // Upload file to Cloudinary
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "contact_uploads", resource_type: "auto" },
        (error, result) => (error ? reject(error) : resolve(result))
      );
      stream.end(req.file.buffer);
    });

    const fileUrl = result.secure_url;
    const { name, email, message } = req.body;
    const newContact = new Contact({ name, email, message, fileUrl });
    await newContact.save();

    res.status(201).json({ message: "Form submitted successfully!", contact: newContact });
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.route("/").get(protect, admin, getContactMessages);

module.exports = router;
