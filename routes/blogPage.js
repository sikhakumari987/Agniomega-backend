const express = require("express");
const router = express.Router();
const BlogPage = require("../model/BlogPage");


// Add new content
router.post("/add", async (req, res) => {
  // console.log("POST request to blog Page content")
  try {
    const { title = '', subtitle = '' } = req.body || {};
    const blogContent = new BlogPage({title, subtitle});
    await blogContent.save();
    res.json(blogContent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET - fetch blogPage content
router.get("/get", async (req, res) => {
  // console.log("GET request to blog Page content")
  try {
    const blogcontent = await BlogPage.findOne();
    res.json(blogcontent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// PUT - update page content (or create if not exists)
router.put("/update", async (req, res) => {
  // console.log("UPDATE request to blog Page content")
  try {
    const { title = '', subtitle = '' } = req.body || {};

    let pageContent = await BlogPage.findOne();
    if (pageContent) {
      pageContent.title = title;
      pageContent.subtitle = subtitle;
      await pageContent.save();
    } else {
      pageContent = new BlogPage({ title, subtitle });
      await pageContent.save();
    }
    res.json(pageContent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
