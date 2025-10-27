const express = require('express');
const router = express.Router();
const AboutPage = require('../model/About');
const mongoose = require('mongoose');

// ✅ POST: Create new About page content
router.post('/', async (req, res) => {
  // console.log("POST request to about");

  const {
    aboutAgniomega,
    aboutWriteUp,
    content,
    mission,
    vision,
    value1,
    value2,
    value3,
    value4,
    value5,
    value6,
    stage1,
    stage2,
    stage3
  } = req.body;

  try {
    const aboutPage = new AboutPage({
      aboutAgniomega,
      aboutWriteUp,
      content,
      mission,
      vision,
      value1,
      value2,
      value3,
      value4,
      value5,
      value6,
      stage1,
      stage2,
      stage3
    });

    await aboutPage.save();
    res.json(aboutPage);
  } catch (error) {
    // console.error("POST error:", error);
    res.status(500).json({ error: error.message });
  }
});

// ✅ GET: Fetch About page content
router.get('/', async (req, res) => {
  // console.log("GET request to about");

  try {
    const aboutPage = await AboutPage.findOne();
    if (!aboutPage) {
      return res.status(404).json({ message: 'No About page content found' });
    }
    res.json(aboutPage);
  } catch (error) {
    // console.error("GET error:", error);
    res.status(500).json({ error: error.message });
  }
});

// ✅ PUT: Update or create About page content
router.put('/', async (req, res) => {
  // console.log("PUT request to about");

  const {
    aboutAgniomega,
    aboutWriteUp,
    content,
    mission,
    vision,
    value1,
    value2,
    value3,
    value4,
    value5,
    value6,
    stage1,
    stage2,
    stage3
  } = req.body;

  if (
    !aboutAgniomega &&
    !aboutWriteUp &&
    !content &&
    !mission &&
    !vision &&
    !value1 &&
    !value2 &&
    !value3 &&
    !value4 &&
    !value5 &&
    !value6 &&
    !stage1 &&
    !stage2 &&
    !stage3
  ) {
    return res.status(400).json({ message: 'No content to update' });
  }

  try {
    const updatedAboutPage = await AboutPage.findOneAndUpdate(
      {},
      {
        aboutAgniomega,
        aboutWriteUp,
        content,
        mission,
        vision,
        value1,
        value2,
        value3,
        value4,
        value5,
        value6,
        stage1,
        stage2,
        stage3
      },
      { new: true }
    );

    if (updatedAboutPage) {
      res.json(updatedAboutPage);
    } else {
      const newAboutPage = new AboutPage({
        aboutAgniomega,
        aboutWriteUp,
        content,
        mission,
        vision,
        value1,
        value2,
        value3,
        value4,
        value5,
        value6,
        stage1,
        stage2,
        stage3
      });
      await newAboutPage.save();
      res.json(newAboutPage);
    }
  } catch (error) {
    // console.error("PUT error:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
