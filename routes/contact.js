const express = require('express');
const router = express.Router();
const ContactPage = require('../model/Contact');
const mongoose = require('mongoose');

// ✅ POST: Create new About page content
router.post('/', async (req, res) => {
  // console.log("POST request to contact");

  const {
  contactHeading,
  contactWriteUp,
  address,
  phone,
  email,
  workingHours
  } = req.body;

  try {
    const contactPage = new ContactPage({
  contactHeading,
  contactWriteUp,
  address,
  phone,
  email,
  workingHours
    });

    await contactPage.save();
    res.json(contactPage);
  } catch (error) {
    // console.error("POST error:", error);
    res.status(500).json({ error: error.message });
  }
});

// ✅ GET: Fetch About page content
router.get('/', async (req, res) => {
  // console.log("GET request to contact");

  try {
    const contactPage = await ContactPage.findOne();
    // console.log("MongoDB result:", contactPage);

    if (!contactPage) {
      return res.status(404).json({ message: 'No About page content found' });
    }
    res.json(contactPage);
  } catch (error) {
    // console.error("GET error:", error);
    res.status(500).json({ error: error.message });
  }
});


// ✅ PUT: Update or create About page content
router.put('/', async (req, res) => {
  // console.log("PUT request to contact");

  const {
  contactHeading,
  contactWriteUp,
  address,
  phone,
  email,
  workingHours
  } = req.body;

  if (
  !contactHeading &&
  !contactWriteUp &&
  !address &&
  !phone &&
  !email &&
  workingHours
  ) {
    return res.status(400).json({ message: 'No content to update' });
  }

  try {
    const updatedContactPage = await ContactPage.findOneAndUpdate(
      {},
      {
       contactHeading,
       contactWriteUp,
       address,
       phone,
       email,
       workingHours
      },
      { new: true }
    );

    if (updatedContactPage) {
      res.json(updatedContactPage);
    } else {
      const newContactPage = new ContactPage({
       contactHeading,
       contactWriteUp,
       address,
       phone,
       email,
       workingHours
      });
      await newContactPage.save();
      res.json(newContactPage);
    }
  } catch (error) {
    // console.error("PUT error:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
