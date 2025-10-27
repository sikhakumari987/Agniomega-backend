const express = require('express');
const router = express.Router();
const CareerPosition = require('../model/CareerPosition.js');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
        cloud_name: process.env.cloud_name,
        api_key: process.env.api_key,
        api_secret: process.env.api_secret
})

// Add new Position
router.post('/position', async (req, res) => {
  // console.log("POST request to CareerPosition");
  // console.log(req.files);
  // console.log(req.body);
  
    const positionIcon = await cloudinary.uploader.upload(req.files.icon.tempFilePath)
    // console.log(positionIcon)
  try {
    const content = new CareerPosition({
        role: req.body.role,
        description: req.body.description,
        iconUrl: positionIcon.secure_url,
        iconId : positionIcon.public_id
    });
    await content.save();
   res.status(201).json(content);
 } catch (err) {
   res.status(500).json({ error: err.message });
 }
});

// Get existing content
router.get('/position', async (req, res) => {
  // console.log("GET request to Career Position");
  try {
    const content = await CareerPosition.find(); 
    res.json(content);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Update by ID
router.put("/position/:id", async (req, res) => {
    // console.log("UPDATE request to career position");
  const updated = await CareerPosition.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// ✅ Delete by ID
router.delete("/position/:id", async (req, res) => {
    // console.log("DELETE request to career position");
  await CareerPosition.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted Successfully" });
});

module.exports = router;