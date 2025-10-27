const express = require('express');
const router = express.Router();
const CareerContent = require('../model/Career');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
        cloud_name: process.env.cloud_name,
        api_key: process.env.api_key,
        api_secret: process.env.api_secret
})

// Create new content
router.post('/', async (req, res) => {
  // console.log("POST request to Career");
  try {
    const content = new CareerContent(req.body);
    await content.save();
    res.status(201).json(content);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get existing content
router.get('/', async (req, res) => {
  // console.log("GET request to Career");
  try {
    const content = await CareerContent.findOne(); // Assuming only one document
    res.json(content);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update content
router.put('/', async (req, res) => {
  // console.log("UPDATE request to careerContent");
  try {
    const existing = await CareerContent.findOne();

    if (existing) {
      // Update existing document
      existing.title = req.body.title;
      existing.subtitle = req.body.subtitle;
      existing.description = req.body.description;
      existing.quote = req.body.quote;
      existing.email = req.body.email;
      await existing.save();
      res.json(existing);
    } else {
      // If not found, create one
      const newContent = new CareerContent(req.body);
      await newContent.save();
      res.status(201).json(newContent);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});




module.exports = router;
