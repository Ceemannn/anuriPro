import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

interface ContactFormData {
  name: string
  email: string
  phone: string
  eventType: string
  eventDate: string
  guestCount: string
  message: string
  savedMix: string
}

export async function POST(request: NextRequest) {
  try {
    const data: ContactFormData = await request.json()

    // Validate required fields
    if (!data.name || !data.email || !data.eventType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create transporter using environment variables
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    })

    // Format event date for display
    const formattedDate = data.eventDate 
      ? new Date(data.eventDate).toLocaleDateString('en-GB', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      : 'Not specified'

    // Email to Añuri (contact@anurigroup.com)
    const adminEmailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #c9632b 0%, #631b23 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .header h1 { margin: 0; font-size: 24px; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
          .field { margin-bottom: 15px; padding: 15px; background: white; border-radius: 6px; border-left: 4px solid #c9632b; }
          .field-label { font-weight: bold; color: #631b23; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; }
          .field-value { margin-top: 5px; font-size: 16px; }
          .message-box { background: white; padding: 20px; border-radius: 6px; margin-top: 20px; border: 1px solid #e0e0e0; }
          .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🍷 New Event Booking Request</h1>
          </div>
          <div class="content">
            <div class="field">
              <div class="field-label">Client Name</div>
              <div class="field-value">${data.name}</div>
            </div>
            <div class="field">
              <div class="field-label">Email Address</div>
              <div class="field-value"><a href="mailto:${data.email}">${data.email}</a></div>
            </div>
            <div class="field">
              <div class="field-label">Phone Number</div>
              <div class="field-value">${data.phone || 'Not provided'}</div>
            </div>
            <div class="field">
              <div class="field-label">Event Type</div>
              <div class="field-value">${data.eventType}</div>
            </div>
            <div class="field">
              <div class="field-label">Event Date</div>
              <div class="field-value">${formattedDate}</div>
            </div>
            <div class="field">
              <div class="field-label">Number of Guests</div>
              <div class="field-value">${data.guestCount || 'Not specified'}</div>
            </div>
            ${data.savedMix ? `
            <div class="field">
              <div class="field-label">Saved Mix Reference</div>
              <div class="field-value">${data.savedMix}</div>
            </div>
            ` : ''}
            ${data.message ? `
            <div class="message-box">
              <div class="field-label">Additional Message</div>
              <p style="margin-top: 10px; white-space: pre-wrap;">${data.message}</p>
            </div>
            ` : ''}
            <div class="footer">
              <p>This booking request was submitted via the Añuri website contact form.</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `

    // Confirmation email to the customer
    const customerEmailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #c9632b 0%, #631b23 100%); color: white; padding: 40px 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .header h1 { margin: 0 0 10px 0; font-size: 28px; }
          .header p { margin: 0; opacity: 0.9; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
          .greeting { font-size: 18px; margin-bottom: 20px; }
          .summary { background: white; padding: 20px; border-radius: 6px; margin: 20px 0; }
          .summary-item { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee; }
          .summary-item:last-child { border-bottom: none; }
          .summary-label { color: #666; }
          .summary-value { font-weight: 500; color: #631b23; }
          .cta { text-align: center; margin: 30px 0; }
          .cta a { display: inline-block; background: linear-gradient(135deg, #c9632b 0%, #631b23 100%); color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: 500; }
          .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; color: #666; font-size: 14px; }
          .social { margin: 15px 0; }
          .social a { color: #c9632b; text-decoration: none; margin: 0 10px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Thank You, ${data.name}! 🍷</h1>
            <p>We've received your event booking request</p>
          </div>
          <div class="content">
            <p class="greeting">
              Thank you for choosing Añuri for your upcoming ${data.eventType.toLowerCase()}! We're excited about the opportunity to make your event truly special.
            </p>
            
            <div class="summary">
              <h3 style="margin-top: 0; color: #631b23;">Your Request Summary</h3>
              <div class="summary-item">
                <span class="summary-label">Event Type</span>
                <span class="summary-value">${data.eventType}</span>
              </div>
              <div class="summary-item">
                <span class="summary-label">Date</span>
                <span class="summary-value">${formattedDate}</span>
              </div>
              ${data.guestCount ? `
              <div class="summary-item">
                <span class="summary-label">Guests</span>
                <span class="summary-value">${data.guestCount}</span>
              </div>
              ` : ''}
            </div>

            <p>
              <strong>What happens next?</strong><br>
              Our team will review your request and get back to you within <strong>24 hours</strong> with more details and a personalized quote for your event.
            </p>

            <p>
              In the meantime, feel free to explore our services or reach out if you have any questions.
            </p>

            <div class="cta">
              <a href="https://anurigroup.com/services">Explore Our Services</a>
            </div>

            <div class="footer">
              <p><strong>Añuri</strong> — Where art meets flavor in every pour.</p>
              <div class="social">
                <a href="https://www.instagram.com/anurigroup">Instagram</a> |
                <a href="https://wa.me/+447407025981">WhatsApp</a> |
                <a href="mailto:contact@anurigroup.com">Email</a>
              </div>
              <p style="font-size: 12px; color: #999;">
                376 Lees Road, Oldham, Greater Manchester, UK<br>
                +44 740-702-5981
              </p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `

    // Send email to Añuri
    await transporter.sendMail({
      from: `"Añuri Website" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to: 'contact@anurigroup.com',
      subject: `New Event Booking: ${data.eventType} - ${data.name}`,
      html: adminEmailHtml,
      replyTo: data.email,
    })

    // Send confirmation email to customer
    await transporter.sendMail({
      from: `"Añuri" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to: data.email,
      subject: `Thank you for your booking request - Añuri`,
      html: customerEmailHtml,
    })

    return NextResponse.json({ success: true, message: 'Emails sent successfully' })

  } catch (error) {
    console.error('Email sending error:', error)
    return NextResponse.json(
      { error: 'Failed to send email. Please try again later.' },
      { status: 500 }
    )
  }
}
