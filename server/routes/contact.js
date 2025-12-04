const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");
const nodemailer = require("nodemailer");

function safeMailSend(mailOptions) {
  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      },
      tls: { rejectUnauthorized: false }
    });

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) reject(err);
      else resolve(info);
    });
  });
}

// ✅ Form Submit + DB Save + Email Send
router.post("/submit", async (req, res) => {
  console.log("📨 Incoming Body:", req.body);

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  try {
    // DB save
    const newContact = new Contact({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      message: message.trim()
    });

    const saved = await newContact.save();
    console.log("✅ Saved to DB:", saved._id);

    // Safe email send
    try {
      const mailOptions = {
        from: `"${newContact.name}" <${process.env.EMAIL_USER}>`,
        replyTo: newContact.email,
        to: process.env.EMAIL_TO || process.env.EMAIL_USER,
        subject: `📬 New Contact from ${newContact.name}`,
        text: `Name: ${newContact.name}\nEmail: ${newContact.email}\nMessage:\n${newContact.message}`
      };

      const info = await Promise.race([
        safeMailSend(mailOptions),
        new Promise((_, rej) => setTimeout(() => rej(new Error("Mail timeout")), 10000))
      ]);

      console.log("✅ Mail Response:", info.response);
    } catch (mailErr) {
      console.warn("⚠ Mail failed but DB saved:", mailErr.message);
      // NOT throwing error → won't break route
    }

    return res.status(201).json({ success: true, message: "Message stored and mail attempted ✅", id: saved._id });

  } catch (dbErr) {
    console.error("❌ Database Save Failed:", dbErr.message);
    return res.status(500).json({ success: false, message: "Database error", error: dbErr.message });
  }
});

module.exports = router;
