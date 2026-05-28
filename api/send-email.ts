import nodemailer from 'nodemailer';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { type, data } = req.body;

  if (!data) {
    return res.status(400).json({ error: 'Missing data payload' });
  }

  // Configure transporter using SMTP settings
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 465,
    secure: Number(process.env.SMTP_PORT) === 465, 
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  // Determine recipients based on notification type
  let toEmails = ['admin@acquansventures.com', 'info@acquansventures.com'];
  if (type === 'quote') {
    toEmails.push('sales@acquansventures.com');
  }

  // Construct Email Subject & Body
  let subject = `New Notification from ${data.name}`;
  let htmlBody = `<h3>You have a new submission</h3><p>Name: ${data.name}</p><p>Email: ${data.email}</p>`;

  if (type === 'quote') {
    subject = `New Quote Request: ${data.service || 'Service'}`;
    htmlBody = `
      <h2>New Quote Request</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone:</strong> ${data.phone}</p>
      <p><strong>Service:</strong> ${data.service}</p>
      <p><strong>Project Details:</strong></p>
      <p>${data.message}</p>
    `;
  } else if (type === 'contact') {
    subject = `New Contact Form Message from ${data.name}`;
    htmlBody = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Message:</strong></p>
      <p>${data.message}</p>
    `;
  }

  try {
    const info = await transporter.sendMail({
      from: `"Acquans Ventures" <${process.env.SMTP_USER}>`,
      replyTo: data.email,
      to: toEmails.join(', '),
      subject,
      html: htmlBody,
    });

    return res.status(200).json({ success: true, messageId: info.messageId });
  } catch (error: any) {
    console.error('Error sending email:', error);
    return res.status(500).json({ error: 'Failed to send email', details: error.message });
  }
}
