# Frontend-Backend Integration Guide

## ✅ Completed Setup

Your frontend has been successfully configured to connect with your Render backend at `https://portfolio-backend-1b35.onrender.com`.

### Files Updated:
1. **src/config/api.js** - Contains API configuration
2. **src/components/ContactMeUpdated.jsx** - Updated to use Render backend
3. **src/components/ContactMeUpdatedWithBackend.jsx** - New component with backend integration

### API Configuration:
```javascript
// src/config/api.js
export const API_CONFIG = {
  BASE_URL: 'https://portfolio-backend-1b35.onrender.com',
  ENDPOINTS: {
    CONTACT: '/api/contact'
  }
};
```

### Usage:
Replace your current contact form import with:
```javascript
// Instead of:
// import ContactMe from './components/ContactMe'

// Use:
import ContactMe from './components/ContactMeUpdatedWithBackend'
```

### Testing:
1. Ensure your Render backend is running at the provided URL
2. Test the contact form submission
3. Check browser console for any CORS issues
4. Verify email notifications are working

### Troubleshooting:
- **CORS Issues**: Ensure your backend has CORS configured for your frontend domain
- **Network Errors**: Check if the backend URL is accessible
- **Form Validation**: Backend should validate required fields (name, email, message)

### Backend Requirements:
Your backend should have:
- POST endpoint at `/api/contact`
- CORS enabled for your frontend domain
- Email service configured (Nodemailer or similar)
- Form validation and error handling
