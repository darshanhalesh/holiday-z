// Quick Email Diagnostic Tool
// This will check your email configuration step by step

require('dotenv').config();

console.log('='.repeat(60));
console.log('📧 EMAIL CONFIGURATION DIAGNOSTIC');
console.log('='.repeat(60));
console.log('');

// Step 1: Check environment variables
console.log('STEP 1: Checking Environment Variables');
console.log('-'.repeat(60));

const mailHost = process.env.MAIL_HOST;
const mailUser = process.env.MAIL_USER;
const mailPass = process.env.MAIL_PASS;

console.log('MAIL_HOST:', mailHost || '❌ NOT SET');
console.log('MAIL_USER:', mailUser || '❌ NOT SET');
console.log('MAIL_PASS:', mailPass ? `✓ SET (${mailPass.length} characters)` : '❌ NOT SET');
console.log('');

if (!mailHost || !mailUser || !mailPass) {
  console.log('❌ PROBLEM FOUND: Missing email configuration!');
  console.log('');
  console.log('SOLUTION:');
  console.log('Add these to your .env file:');
  console.log('  MAIL_HOST=smtp.gmail.com');
  console.log('  MAIL_USER=your-email@gmail.com');
  console.log('  MAIL_PASS=your-app-password');
  console.log('');
  console.log('For Gmail App Password:');
  console.log('  1. Go to: https://myaccount.google.com/apppasswords');
  console.log('  2. Enable 2-Factor Authentication');
  console.log('  3. Generate App Password');
  console.log('  4. Copy the 16-character password');
  console.log('');
  process.exit(1);
}

console.log('✅ All environment variables are set!');
console.log('');

// Step 2: Validate email format
console.log('STEP 2: Validating Email Format');
console.log('-'.repeat(60));

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(mailUser)) {
  console.log('❌ MAIL_USER is not a valid email format:', mailUser);
  process.exit(1);
}
console.log('✅ Email format is valid');
console.log('');

// Step 3: Check SMTP host
console.log('STEP 3: Checking SMTP Host');
console.log('-'.repeat(60));

const validHosts = ['smtp.gmail.com', 'smtp-mail.outlook.com', 'smtp.mail.yahoo.com'];
if (!validHosts.includes(mailHost) && !mailHost.includes('smtp')) {
  console.log('⚠️  WARNING: MAIL_HOST might be incorrect:', mailHost);
  console.log('   Common values: smtp.gmail.com, smtp-mail.outlook.com');
} else {
  console.log('✅ SMTP host looks valid:', mailHost);
}
console.log('');

// Step 4: Check password length
console.log('STEP 4: Checking Password');
console.log('-'.repeat(60));

if (mailPass.length < 10) {
  console.log('⚠️  WARNING: Password seems too short');
  console.log('   Gmail App Passwords are 16 characters');
  console.log('   Make sure you\'re using an App Password, not your regular password');
} else {
  console.log('✅ Password length looks good');
}
console.log('');

// Step 5: Test email sending
console.log('STEP 5: Testing Email Connection');
console.log('-'.repeat(60));
console.log('Attempting to send test email...');
console.log('');

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: mailHost,
  port: 465,
  secure: true,
  auth: {
    user: mailUser,
    pass: mailPass,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

transporter.sendMail({
  from: mailUser,
  to: mailUser,
  subject: 'holidayz - Email Test',
  text: 'If you receive this, your email configuration works!',
}, (error, info) => {
  console.log('');
  console.log('='.repeat(60));
  if (error) {
    console.log('❌ EMAIL TEST FAILED');
    console.log('='.repeat(60));
    console.log('');
    console.log('Error:', error.message);
    console.log('');
    console.log('COMMON SOLUTIONS:');
    console.log('');
    
    if (error.message.includes('Invalid login')) {
      console.log('  ❌ Invalid Login Error');
      console.log('  → You\'re using your regular Gmail password');
      console.log('  → You need to use a Gmail App Password instead');
      console.log('');
      console.log('  How to fix:');
      console.log('  1. Go to: https://myaccount.google.com/apppasswords');
      console.log('  2. Enable 2-Factor Authentication (required)');
      console.log('  3. Create new App Password');
      console.log('  4. Update MAIL_PASS in .env with the 16-char password');
    } else if (error.message.includes('ETIMEDOUT') || error.message.includes('timeout')) {
      console.log('  ❌ Connection Timeout');
      console.log('  → Firewall or network blocking SMTP');
      console.log('');
      console.log('  How to fix:');
      console.log('  1. Check your internet connection');
      console.log('  2. Try disabling firewall temporarily');
      console.log('  3. Try a different network (mobile hotspot)');
    } else {
      console.log('  Check the error message above for details');
    }
    
    console.log('');
    process.exit(1);
  } else {
    console.log('✅ EMAIL TEST SUCCESSFUL!');
    console.log('='.repeat(60));
    console.log('');
    console.log('Message ID:', info.messageId);
    console.log('Email sent to:', mailUser);
    console.log('');
    console.log('📬 Check your inbox (and spam folder) for the test email');
    console.log('');
    console.log('✨ Your forgot password feature should work now!');
    console.log('');
    console.log('Next steps:');
    console.log('  1. Start your server: node app.js');
    console.log('  2. Go to: http://localhost:8080/forgot-password');
    console.log('  3. Enter your email and submit');
    console.log('  4. Check your inbox for the reset link');
    console.log('');
    process.exit(0);
  }
});
