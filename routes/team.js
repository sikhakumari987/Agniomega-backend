const express = require("express");
const router = express.Router();
const TeamContent = require("../model/Team");


// add team content
router.post('/', async (req, res) => {
  // console.log("POST request to team");
  try {
    const content = new TeamContent(req.body);
    await content.save();
    res.status(201).json(content);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET - fetch team content
router.get("/", async (req, res) => {
  // console.log("GET request to team content")
  try {
    const content = await TeamContent.findOne();
    res.json(content);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT - update team content (or create if not exists)
router.put("/", async (req, res) => {
  // console.log("update request to team Content");
  try {
    const { title, subtitle, filter } = req.body;

    let teamPage = await TeamContent.findOne();
    if (teamPage) {
      teamPage.title = title;
      teamPage.subtitle = subtitle;
      teamPage.filter = filter;
      await teamPage.save();
    } else {
      teamPage = new TeamContent({ title, subtitle, filter });
      await teamPage.save();
    }
    res.json(teamPage);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;