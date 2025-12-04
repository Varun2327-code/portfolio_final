//server/routes/contact.js
const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// ✅ Helper function to standardize responses
const sendResponse = (res, status, success, message, data = null) => {
  res.status(status).json({ success, message, data });
};

// ✅ POST /api/contact/submit — Submit contact form
router.post('/submit', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validation
    if (!name || !email || !message) {
      return sendResponse(res, 400, false, 'All fields are required');
    }

    const emailRegex = /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(email)) {
      return sendResponse(res, 400, false, 'Please provide a valid email address');
    }

    if (message.trim().length < 10) {
      return sendResponse(res, 400, false, 'Message must be at least 10 characters long');
    }

    // Create new contact entry
    const newContact = new Contact({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      message: message.trim()
    });

    await newContact.save();

    return sendResponse(res, 201, true, 'Thank you for your message! I will get back to you soon.', {
      id: newContact._id,
      name: newContact.name,
      email: newContact.email,
      createdAt: newContact.createdAt
    });
  } catch (error) {
    console.error('❌ Error saving contact form:', error);

    if (error.name === 'ValidationError') {
      const details = Object.values(error.errors).map(err => err.message);
      return sendResponse(res, 400, false, 'Validation failed', { details });
    }

    if (['MongoNetworkError', 'MongoTimeoutError'].includes(error.name)) {
      console.error('⚠️ Database connection issue detected');
      return sendResponse(res, 500, false, 'Database connection error. Please try again later.');
    }

    return sendResponse(res, 500, false, 'An unexpected error occurred while processing your request.');
  }
});

// ✅ GET /api/contact/messages — Fetch all messages (for admin)
router.get('/messages', async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    return sendResponse(res, 200, true, 'Messages fetched successfully', {
      count: messages.length,
      messages
    });
  } catch (error) {
    console.error('❌ Error fetching messages:', error);
    return sendResponse(res, 500, false, 'An error occurred while fetching messages');
  }
});

// ✅ GET /api/contact/messages/:id — Fetch single message
router.get('/messages/:id', async (req, res) => {
  try {
    const message = await Contact.findById(req.params.id);
    if (!message) {
      return sendResponse(res, 404, false, 'Message not found');
    }
    return sendResponse(res, 200, true, 'Message fetched successfully', message);
  } catch (error) {
    console.error('❌ Error fetching message:', error);
    return sendResponse(res, 500, false, 'An error occurred while fetching the message');
  }
});

// ✅ PUT /api/contact/messages/:id/read — Mark message as read
router.put('/messages/:id/read', async (req, res) => {
  try {
    const message = await Contact.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );

    if (!message) {
      return sendResponse(res, 404, false, 'Message not found');
    }

    return sendResponse(res, 200, true, 'Message marked as read', message);
  } catch (error) {
    console.error('❌ Error updating message:', error);
    return sendResponse(res, 500, false, 'An error occurred while updating the message');
  }
});

module.exports = router;
