const express = require("express");
const jwt = require("jsonwebtoken");
const Editor = require("../model/Editor");
const OTP = require("../model/OTP");
const sendMail = require("../utils/sendMail");
const bcrypt = require("bcrypt"); 

const router = express.Router();

// -------------------------
// 1️⃣ Signup - Send OTP
// -------------------------
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if editor already exists
    const existingEditor = await Editor.findOne({ email });
    if (existingEditor) {
      return res.status(400).json({ message: "User already exists and approved" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate OTP
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

    // Save OTP
    const otp = new OTP({
      email,
      code: otpCode,
      expires: Date.now() + 5 * 60 * 1000, // 5 min
      password: hashedPassword, // store password temporarily until approval
      name

    });
    await otp.save();

    // Send OTP email to user
    await sendMail(
      email,
      "Verify your email",
      `Your OTP is ${otpCode}`,
      `<p>Your OTP is: <b>${otpCode}</b></p>`
    );

    res.json({ message: "Signup successful. Check email for OTP." });
  } catch (err) {
    // console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// -------------------------
// 2️⃣ Verify OTP & Send Admin Email
// -------------------------
router.post("/verify", async (req, res) => {
  try {
    const { email, code } = req.body;

    const otpRecord = await OTP.findOne({ email, code });
    if (!otpRecord) return res.status(400).json({ message: "Invalid OTP" });
    if (otpRecord.expires < Date.now()) return res.status(400).json({ message: "OTP expired" });

    // Send admin email
    const approveUrl = process.env.approveUrl;
    const denyUrl = process.env.denyUrl;

    const htmlContent = `
      <h3>New Editor Signup</h3>
      <p>${email} has signed up. Approve or Deny the request:</p>
      <a href="${approveUrl}" style="padding:10px;background-color:green;color:white;text-decoration:none;">Approve</a>
      &nbsp;
      <a href="${denyUrl}" style="padding:10px;background-color:red;color:white;text-decoration:none;">Deny</a>
    `;

    await sendMail(
      "sikhachandra541@gmail.com",
      "Editor Approval Request",
      `${email} has signed up. Please approve or deny.`,
      htmlContent
    );

    res.json({ message: "OTP verified. Waiting for admin approval." });
  } catch (err) {
    // console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// -------------------------
// 3️⃣ Admin Approves / Denies
// -------------------------
router.get("/approve-editor", async (req, res) => {
  try {
    const { email, action } = req.query;

    const otpRecord = await OTP.findOne({ email });
    if (!otpRecord) return res.status(400).send("Request not found");

if (action === "approve") {
    if (!otpRecord.password) {
    return res.status(400).send("Password missing in OTP record. Try registering again.");
  }
  const editor = new Editor({
    name: otpRecord.name || "Editor",
    email: otpRecord.email,
    password: otpRecord.password, 
    isVerified: true,
    isApproved: true
  });
  await editor.save();

  await OTP.deleteOne({ email });

  await sendMail(
    email,
    "Approved",
    "Your account is approved! You can now login.",
    `<p>Your account is approved! You can now login.</p>`
  );

  res.send("Editor approved successfully");
}
 else if (action === "deny") {
      await OTP.deleteOne({ email });

      await sendMail(
        email,
        "Denied",
        "Your account request has been denied by admin.",
        `<p>Your account request has been denied by admin.</p>`
      );

      res.send("Editor denied successfully");
    } else {
      res.status(400).send("Invalid action");
    }
  } catch (err) {
    // console.error(err);
    res.status(500).send("Internal server error");
  }
});

// -------------------------
// 4️⃣ Login
// -------------------------
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const editor = await Editor.findOne({ email });
    if (!editor) return res.status(400).json({ message: "Editor not found" });

    // Check approval
    if (!editor.isApproved) {
      return res.status(403).json({ message: "Editor not approved yet. Please wait for admin approval." });
    }

    const isMatch = await bcrypt.compare(password, editor.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: editor._id }, "secretKey", { expiresIn: "1h" });

    res.json({ token, message: "Login successful" });
  } catch (err) {
    // console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});


module.exports = router;
