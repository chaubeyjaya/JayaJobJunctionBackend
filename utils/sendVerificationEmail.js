// utils/sendVerificationEmail.js
import nodemailer from 'nodemailer';

export const sendVerificationEmail = async (email, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // your Gmail
        pass: process.env.EMAIL_PASS, // your app password
      },
    });

    const subject = 'Verify Your Email - OTP';
    const message = `
      <div style="font-family: Arial, sans-serif;">
        <h2>Hello,</h2>
        <p>Your OTP for Job Junction is:</p>
        <h3 style="color: #007bff;">${otp}</h3>
        <p>Use this OTP to verify your email address. It will expire in 10 minutes.</p>
        <br />
        <p>Thanks,<br/>Job Junction Team</p>
      </div>
    `;

    await transporter.sendMail({
      from: `"Job Junction" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: subject,
      html: message,
    });

    console.log('✅ OTP email sent to', email);
  } catch (err) {
    console.error('❌ Error sending OTP email:', err);
    throw err;
  }
};
