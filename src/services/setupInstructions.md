# Email Service Setup Instructions

## Overview
This email service uses EmailJS to send form data directly to your email without requiring a backend server.

## Setup Steps

### 1. Create EmailJS Account
1. Go to https://www.emailjs.com/
2. Sign up for a free account
3. Verify your email address

### 2. Setup Email Service
1. In EmailJS dashboard, click "Email Services"
2. Click "Add New Service"
3. Choose "Gmail" (or your preferred provider)
4. Connect your Gmail account (devperfection0@gmail.com)
5. Save the Service ID

### 3. Create Email Template
1. Go to "Email Templates" in EmailJS
2. Click "Create New Template"
3. Use this template structure:

```
To: {{to_email}}
From: {{from_email}}
Subject: {{subject}}

New message from {{from_name}} ({{from_email}})

Service: {{service}}
Phone: {{phone}}

Message:
{{message}}

Sent at: {{timestamp}}
```

4. Save the template and note the Template ID

### 4. Update Environment Variables
Replace the placeholder values in `.env` with your actual EmailJS credentials:
- VITE_EMAILJS_SERVICE_ID=your_actual_service_id
- VITE_EMAILJS_TEMPLATE_ID=your_actual_template_id
- VITE_EMAILJS_PUBLIC_KEY=your_actual_public_key

### 5. Install Required Package
```bash
npm install emailjs-com
```

### 6. Test the Setup
1. Start your development server
2. Navigate to the contact form
3. Fill out and submit the form
4. Check your email (devperfection0@gmail.com) for the test message

## Security Notes
- Never commit actual credentials to version control
- Use environment variables for all sensitive data
- Consider upgrading to EmailJS paid plan for higher limits
