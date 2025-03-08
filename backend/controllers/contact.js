const asyncHandler = require('../middleware/asyncHandler.js');
const Contact = require("../models/contact.js");

// @desc Submit contact form
const submitContactForm = asyncHandler(async (req, res) => {
  const { name, email, message } = req.body;
  console.log(req.file);
  const fileUrl = req.file ? req.file.path : null;

  const contactMessage = await Contact.create({ name, email, message, fileUrl });
  if (contactMessage) {
    res.status(201).json({ message: "Message sent successfully!" });
  } else {
    res.status(400);
    throw new Error("Invalid data");
  }
});

// @desc Get all contact messages (Admin)
const getContactMessages = asyncHandler(async (req, res) => {
  const messages = await Contact.find();
  res.json(messages);
});

module.exports = { submitContactForm, getContactMessages };
