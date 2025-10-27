const express = require('express');
const router = express.Router();
const CareerWork = require('../model/CareerWork.js');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
        cloud_name: 'dhj4jg9tw',
        api_key: '246854736755225',
        api_secret: 'yVFvT2Z_xHTTIwL4FuoTKMBloi4'
})

// Create new content
router.post('/work', async (req, res) => {
  // console.log("POST request to CareerWork");
  // console.log(req.files);
  // console.log(req.body);
  
    const workIcon = await cloudinary.uploader.upload(req.files.icon.tempFilePath)
    // console.log(workIcon)
  try {
    const content = new CareerWork({
        title: req.body.title,
        text: req.body.text,
        iconUrl: workIcon.secure_url,
        iconId : workIcon.public_id
    });
    await content.save();
   res.status(201).json(content);
 } catch (err) {
   res.status(500).json({ error: err.message });
 }
});

// Get existing content
router.get('/work', async (req, res) => {
  // console.log("GET request to Career Work");
  try {
    const content = await CareerWork.find(); 
    res.json(content);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Update by ID
router.put("/work/:id", async (req, res) => {
    // console.log("UPDATE request to career work");
  const updated = await CareerWork.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// ✅ Delete by ID
router.delete("/work/:id", async (req, res) => {
    // console.log("DELETE request to career work");
  await CareerWork.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted Successfully" });
});

module.exports = router;