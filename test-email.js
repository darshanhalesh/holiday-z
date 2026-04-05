// Test Email Configuration
// Run this file to verify your email settings work correctly
// Usage: node test-email.js

require('dotenv').config();
const nodemailer = require('nodemailer');

console.log('📧 Testing Email Configuration...\n');

// Check if environment variables are set
console.log('Environment Variables:');
console.log('  MAIL_HOST:', process.env.MAIL_HOST || '❌ NOT SET');
console.log('  MAIL_USER:', process.env.MAIL_USER || '❌ NOT SET');
console.log('  MAIL_PASS:', process.env.MAIL_PASS ? '✓ SET (hidden)' : '❌ NOT SET');
console.log('');

if (!process.env.MAIL_HOST || !process.env.MAIL_USER || !process.env.MAIL_PASS) {
  console.error('❌ ERROR: Missing email configuration in .env file\n');
  console.log('Please add these to your .env file:');
  console.log('  MAIL_HOST=smtp.gmail.com');
  console.log('  MAIL_USER=your-email@gmail.com');
  console.log('  MAIL_PASS=your-app-password\n');
  process.exit(1);
}

// Create transporter
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
  logger: true,
  debug: true,
});

console.log('🔄 Sending test email...\n');

// Send test email
transporter.sendMail({
  from: process.env.MAIL_USER,
  to: process.env.MAIL_USER, // Send to yourself for testing
  subject: 'holidayz - Email Configuration Test',
  text: 'Success! Your email configuration is working correctly. The forgot password feature should now work.',
  html: `
    <h2>✅ Email Test Successful!</h2>
    <p>Your email configuration is working correctly.</p>
    <p>The forgot password feature should now work properly.</p>
    <hr>
    <p><small>This is a test email from your holidayz application.</small></p>
  `,
}, (error, info) => {
  if (error) {
    console.error('\n❌ Email test FAILED:\n');
    console.error('Error:', error.message);
    console.error('\nCommon solutions:');
    console.error('  1. Make sure you\'re using an App Password, not your regular Gmail password');
    console.error('  2. Enable 2-Factor Authentication on your Google account');
    console.error('  3. Generate a new App Password at: https://myaccount.google.com/apppasswords');
    console.error('  4. Check for typos in your .env file');
    console.error('  5. Make sure MAIL_HOST is smtp.gmail.com\n');
    process.exit(1);
  } else {
    console.log('\n✅ Email test SUCCESSFUL!\n');
    console.log('Message ID:', info.messageId);
    console.log('Email sent to:', process.env.MAIL_USER);
    console.log('\n📬 Check your inbox (and spam folder) for the test email.\n');
    console.log('✨ Your forgot password feature should now work correctly!\n');
    process.exit(0);
  }
});
