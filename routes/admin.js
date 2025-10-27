const express = require('express');
const router = express.Router();
const Editor = require('../model/Editor');
const EditorRequest = require('../model/EditorRequest'); // ✅ Add this

// 🔐 Admin Login (Hardcoded)
const adminEmail = process.env.adminEmail;
const adminPassword = process.env.adminPassword;

router.post('/login', (req, res) => {
  const { email, password, role } = req.body;

  if (role !== "admin") {
    return res.status(403).json({ message: "Only admin login allowed here" });
  }

  if (email === adminEmail && password === adminPassword) {
    return res.json({ message: "Login successful" });
  } else {
    return res.status(401).json({ message: "Invalid email or password" });
  }
});

// ✅ Admin Approval Route
router.get('/approve-editor/:id', async (req, res) => {
  const request = await EditorRequest.findById(req.params.id);
  if (!request) return res.status(404).send('Request not found');

  const existing = await Editor.findOne({ email: request.email });
  if (existing) return res.send('Editor already registered');

  const newEditor = new Editor({
    name: request.name,
    email: request.email,
    password: request.password,
    isApproved: true
  });

  await newEditor.save();
  await EditorRequest.findByIdAndDelete(req.params.id);

  res.send('Editor approved and account created!');
});

module.exports = router;
