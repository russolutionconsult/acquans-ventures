import nodemailer from 'nodemailer';
import fs from 'fs';

const envConfig = fs.readFileSync('.env', 'utf8').split('\n').reduce((acc, line) => {
  const [key, ...value] = line.split('=');
  if (key && value) {
    acc[key.trim()] = value.join('=').trim().replace(/['"]/g, '');
  }
  return acc;
}, {});

async function testEmail() {
  console.log('Testing SMTP connection...');
  console.log('HOST:', envConfig.SMTP_HOST);
  console.log('PORT:', envConfig.SMTP_PORT);
  console.log('USER:', envConfig.SMTP_USER);
  
  const transporter = nodemailer.createTransport({
    host: envConfig.SMTP_HOST,
    port: Number(envConfig.SMTP_PORT) || 465,
    secure: Number(envConfig.SMTP_PORT) === 465, 
    auth: {
      user: envConfig.SMTP_USER,
      pass: envConfig.SMTP_PASS,
    },
  });

  try {
    const info = await transporter.sendMail({
      from: `"Acquans Ventures" <${envConfig.SMTP_USER}>`,
      to: 'info@acquansventures.com', 
      subject: 'Test Email from Local',
      html: '<p>This is a test email to verify SMTP settings.</p>',
    });
    console.log('Success! Email sent. Message ID:', info.messageId);
  } catch (error) {
    console.error('Failed to send email:', error);
  }
}

testEmail();
