const express = require('express');
const router = express.Router();
const User = require('../models/User');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const twilio = require('twilio');

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

router.post('/send-otp', async (req, res) => {
  const { contact } = req.body;
  const otp = generateOTP();

  await User.findOneAndUpdate(
    { contact },
    { contact, otp, createdAt: new Date() },
    { upsert: true }
  );

  try {
    if (contact.includes('@')) {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: contact,
        subject: 'Your OTP',
        text: `Your OTP is ${otp}`,
      });
    } else {
      await client.messages.create({
        body: `Your OTP is ${otp}`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: contact,
      });
    }

    res.json({ message: 'OTP sent!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to send OTP' });
  }
});

router.post('/verify-otp', async (req, res) => {
  const { contact, otp } = req.body;
  const user = await User.findOne({ contact });

  if (user && user.otp === otp) {
    const token = jwt.sign({ contact }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ success: true, token });
  } else {
    res.status(401).json({ success: false, message: 'Invalid OTP' });
  }
});

module.exports = router;