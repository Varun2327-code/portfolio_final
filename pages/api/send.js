// pages/api/send.js
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: 'All fields are required' });
  }

  try {
    // Use environment variables for credentials
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER, // your Gmail address
        pass: process.env.EMAIL_PASS, // your Gmail App Password (not normal password!)
      },
    });

    const mailOptions = {
      from: `"${name}" <${process.env.EMAIL_USER}>`,
      replyTo: email,
      to: process.env.EMAIL_TO || process.env.EMAIL_USER, // fallback to self
      subject: `New message from ${name}`,
      text: `
Name: ${name}
Email: ${email}
Message:
${message}
      `,
    };

    await transporter.sendMail(mailOptions);
    return res.status(200).json({ success: true, message: 'Email sent successfully!' });
  } catch (error) {
    console.error('❌ Error sending email:', error);
    return res.status(500).json({ success: false, error: 'Error sending email. Please try again later.' });
  }
}
