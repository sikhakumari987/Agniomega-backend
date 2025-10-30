// backend/routes/admin.js
const express = require("express");
const EditorRequest = require("../model/EditorRequest");
const Editor = require("../model/Editor");
const sendMail = require("../Utils/sendMail");

const router = express.Router();

// GET /admin/approve-editor?email=...&action=approve/deny
router.get("/approve-editor", async (req, res) => {
  try {
    const { email, action } = req.query;

    const request = await EditorRequest.findOne({ email });
    if (!request) return res.status(404).send("Request not found");

    if (action === "approve") {
      // Create editor in Editor collection
      const editor = new Editor({
        name: request.name,
        email: request.email,
        password: request.password, // already hashed
        isVerified: true,
        isApproved: true,
      });
      await editor.save();

      request.status = "approved";
      await request.save();

      await sendMail(request.email, "Approved", "Your account is approved! You can now login.");
      res.send("Editor approved successfully!");
    } else if (action === "deny") {
      request.status = "denied";
      await request.save();

      await sendMail(request.email, "Denied", "Your account request was denied.");
      res.send("Editor request denied.");
    } else {
      res.status(400).send("Invalid action");
    }
  } catch (error) {
    // console.error(error);
    res.status(500).send("Server error");
  }
});

module.exports = router;
