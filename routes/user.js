const express = require('express');
const router = express.Router();

// Simple hardcoded admin credentials
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

module.exports = router;
