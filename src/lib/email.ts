import nodemailer from 'nodemailer';
import type { Lead, Business } from '@/types';

// Create Gmail SMTP transporter
function getTransporter() {
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || '465', 10);
  const secure = process.env.SMTP_SECURE === 'true';
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    throw new Error('Missing SMTP environment variables');
  }

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass,
    },
  });
}

// Get the from address for emails
function getFromAddress(): string {
  return process.env.SMTP_FROM || process.env.SMTP_USER || 'noreply@example.com';
}

// Format phone number for display
function formatPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  return phone;
}

// Send lead notification email to a business
export async function sendLeadNotificationEmail(
  lead: Lead,
  business: Business
): Promise<boolean> {
  try {
    const transporter = getTransporter();
    const fromAddress = getFromAddress();

    const subject = `New Lead: ${lead.full_name} - ${lead.zip}`;

    const textContent = `
NEW LEAD NOTIFICATION
=====================

You have received a new lead through Canton Mobile Detail Pros!

CUSTOMER DETAILS
----------------
Name: ${lead.full_name}
Phone: ${formatPhone(lead.phone)}
Email: ${lead.email || 'Not provided'}
ZIP Code: ${lead.zip}

SERVICE REQUEST
---------------
Service: ${lead.service_type}
Preferred Timing: ${lead.preferred_timing || 'Not specified'}
Additional Details: ${lead.details || 'None provided'}

NEXT STEPS
----------
Please contact this customer as soon as possible. Quick response times lead to higher conversion rates!

---
This lead was sent to you exclusively as part of your Canton Mobile Detail Pros subscription.
Lead ID: ${lead.id}
Received: ${new Date(lead.created_at).toLocaleString('en-US', { timeZone: 'America/Detroit' })}
    `.trim();

    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Lead Notification</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0;">
    <h1 style="margin: 0; font-size: 24px;">New Lead Notification</h1>
    <p style="margin: 5px 0 0 0; opacity: 0.9;">Canton Mobile Detail Pros</p>
  </div>

  <div style="background: #f8fafc; padding: 20px; border: 1px solid #e2e8f0; border-top: none;">
    <p style="margin-top: 0;">You have received a new lead!</p>

    <div style="background: white; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0; margin-bottom: 20px;">
      <h2 style="margin-top: 0; color: #1e40af; font-size: 18px; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">Customer Details</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px 0; font-weight: bold; width: 120px;">Name:</td>
          <td style="padding: 8px 0;">${lead.full_name}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-weight: bold;">Phone:</td>
          <td style="padding: 8px 0;">
            <a href="tel:${lead.phone}" style="color: #2563eb; text-decoration: none; font-weight: bold;">${formatPhone(lead.phone)}</a>
          </td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-weight: bold;">Email:</td>
          <td style="padding: 8px 0;">
            ${lead.email
              ? `<a href="mailto:${lead.email}" style="color: #2563eb; text-decoration: none;">${lead.email}</a>`
              : '<span style="color: #94a3b8;">Not provided</span>'}
          </td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-weight: bold;">ZIP Code:</td>
          <td style="padding: 8px 0;">${lead.zip}</td>
        </tr>
      </table>
    </div>

    <div style="background: white; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0; margin-bottom: 20px;">
      <h2 style="margin-top: 0; color: #1e40af; font-size: 18px; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">Service Request</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px 0; font-weight: bold; width: 120px;">Service:</td>
          <td style="padding: 8px 0;">${lead.service_type}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-weight: bold;">Timing:</td>
          <td style="padding: 8px 0;">${lead.preferred_timing || '<span style="color: #94a3b8;">Not specified</span>'}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-weight: bold; vertical-align: top;">Details:</td>
          <td style="padding: 8px 0;">${lead.details || '<span style="color: #94a3b8;">None provided</span>'}</td>
        </tr>
      </table>
    </div>

    <div style="background: #fef3c7; padding: 15px; border-radius: 8px; border: 1px solid #f59e0b;">
      <p style="margin: 0; font-weight: bold; color: #92400e;">
        Quick response times lead to higher conversion rates! Contact this customer as soon as possible.
      </p>
    </div>
  </div>

  <div style="background: #1e293b; color: #94a3b8; padding: 15px; border-radius: 0 0 8px 8px; font-size: 12px; text-align: center;">
    <p style="margin: 0;">This lead was sent to you exclusively as part of your subscription.</p>
    <p style="margin: 5px 0 0 0;">Lead ID: ${lead.id} | Received: ${new Date(lead.created_at).toLocaleString('en-US', { timeZone: 'America/Detroit' })}</p>
  </div>
</body>
</html>
    `.trim();

    await transporter.sendMail({
      from: `"Canton Mobile Detail Pros" <${fromAddress}>`,
      to: business.email,
      subject,
      text: textContent,
      html: htmlContent,
    });

    return true;
  } catch (error) {
    // Log error but don't throw - email failure shouldn't block lead creation
    console.error('Failed to send lead notification email:', error);
    return false;
  }
}
