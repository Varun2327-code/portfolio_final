//server/models/Contact.js
const mongoose = require('mongoose');

// Define schema with improved indexing and safety
const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters long'],
      maxlength: [50, 'Name cannot exceed 50 characters']
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [/^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please enter a valid email address'],
      index: true // improves lookup performance for admin panel
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
      trim: true,
      minlength: [10, 'Message must be at least 10 characters long'],
      maxlength: [1000, 'Message cannot exceed 1000 characters']
    },
    isRead: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true, // automatically adds createdAt and updatedAt
    collection: 'contacts' // ensures consistent collection name
  }
);

// Optional: pre-save hook for sanitizing input (prevent HTML/script injection)
contactSchema.pre('save', function (next) {
  this.name = this.name.replace(/<[^>]*>?/gm, '');
  this.message = this.message.replace(/<[^>]*>?/gm, '');
  next();
});

// Optional: toJSON method to clean response data
contactSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.__v; // remove internal version key
  return obj;
};

// Create model
const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
