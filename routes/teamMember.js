const express = require("express");
const router = express.Router();
const TeamMember = require("../model/TeamMember");
const cloudinary = require('cloudinary').v2;

cloudinary.config({
        cloud_name: process.env.cloud_name,
        api_key: process.env.api_key,
        api_secret: process.env.api_secret
})

// CREATE Team Member
router.post("/add", async (req, res) => {
  // console.log("Post request to add team Member");
  // console.log(req.body);
  // console.log(req.files);

  const memberIcon = await cloudinary.uploader.upload(req.files.icon.tempFilePath)
    console.log(memberIcon)

    try {
      const newMember = new TeamMember({
          name: req.body.name,
          role: req.body.role,
          description : req.body.description,
          linkedin : req.body.linkedin,
          twitter : req.body.twitter,
          instagram : req.body.instagram,
          imageUrl: memberIcon.secure_url,
          imageId : memberIcon.public_id
      });
      await newMember.save();
     res.status(201).json(newMember);
   } catch (err) {
     res.status(500).json({ error: err.message });
   }
  });
  

// Get existing content
router.get('/get', async (req, res) => {
  // console.log("GET request to get all team member");
  try {
    const allMember = await TeamMember.find(); 
    res.json(allMember);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Update by ID
router.put("/:id", async (req, res) => {
    // console.log("UPDATE request to update team Member");
  const updated = await TeamMember.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// ✅ Delete by ID
router.delete("/:id", async (req, res) => {
    // console.log("DELETE request to team Member");
  await TeamMember.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted Successfully" });
});

module.exports = router;