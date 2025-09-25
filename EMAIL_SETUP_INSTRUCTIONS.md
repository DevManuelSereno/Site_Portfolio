# 📧 Email Integration Setup Instructions

## Gmail App Password Setup

To enable the email functionality, you need to create an **App Password** for your Gmail account. Follow these steps:

### 1. Enable 2-Factor Authentication (if not already enabled)
1. Go to your [Google Account](https://myaccount.google.com/)
2. Click on **Security** in the left panel
3. Under "Signing in to Google", click **2-Step Verification**
4. Follow the setup process to enable 2FA

### 2. Create an App Password
1. Go to your [Google Account](https://myaccount.google.com/)
2. Click on **Security** in the left panel
3. Under "Signing in to Google", click **App passwords**
4. Select **Mail** and **Other (Custom name)**
5. Enter a name like "Portfolio Contact Form"
6. Click **Generate**
7. Copy the 16-character password (it will look like: `abcd efgh ijkl mnop`)

### 3. Update Environment Variables
Open your `.env.local` file and replace `your_app_password_here` with your generated app password:

```env
EMAIL_PASS=abcd efgh ijkl mnop
```

**Important**: 
- Use the App Password, NOT your regular Gmail password
- Keep the spaces in the app password
- Never share this password or commit it to version control

### 4. Test the Integration
1. Start your development server: `npm run dev`
2. Fill out the contact form on your website
3. Check your email for both:
   - Notification email (to you)
   - Auto-reply email (to the form submitter)

## Alternative Email Providers

If you prefer not to use Gmail, you can use other providers:

### Outlook/Hotmail
```env
EMAIL_HOST=smtp-mail.outlook.com
EMAIL_PORT=587
EMAIL_USER=your-email@outlook.com
EMAIL_PASS=your-password
```

### Yahoo
```env
EMAIL_HOST=smtp.mail.yahoo.com
EMAIL_PORT=587
EMAIL_USER=your-email@yahoo.com
EMAIL_PASS=your-app-password
```

### Professional Email Services
For production, consider using professional email services like:
- **SendGrid** (free tier available)
- **Mailgun** (free tier available)
- **Amazon SES** (pay per email)
- **Resend** (developer-friendly)

## Security Notes
- ✅ The API includes rate limiting (3 requests per 15 minutes per IP)
- ✅ Form validation prevents malicious data
- ✅ Sensitive information is stored in environment variables
- ✅ Auto-reply provides professional user experience

## Troubleshooting

### "Invalid login" error
- Make sure you're using an App Password, not your regular password
- Verify 2-Factor Authentication is enabled
- Check that the email and password in `.env.local` are correct

### Emails not being sent
- Check your console for error messages
- Verify your internet connection
- Test with a different email provider
- Make sure the `.env.local` file is in the project root

### Form validation errors
- Name must be at least 2 characters
- Email must be a valid format
- Message must be at least 10 characters
- Phone (optional) must contain only numbers and common symbols

## Features Included

✅ **Professional Email Templates** - Beautiful HTML emails with your branding
✅ **Auto-Reply System** - Users get immediate confirmation
✅ **Form Validation** - Prevents invalid submissions
✅ **Rate Limiting** - Protects against spam
✅ **Error Handling** - Graceful error messages
✅ **Mobile Responsive** - Works on all devices
✅ **Security** - No sensitive data exposure

Your contact form is now enterprise-level professional! 🚀