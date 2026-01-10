import nodemailer from 'nodemailer'
import { NextResponse } from 'next/server'

type ContactPayload = {
  message: {
    Fname?: string
    email?: string
    message?: string
  }
}

export async function POST(req: Request) {
  try {
    const body: ContactPayload = await req.json()
    const msg = body?.message || {}

    const name = msg.Fname || 'No name'
    const fromEmail = msg.email || 'no-reply@example.com'
    const text = msg.message || ''

    if (!text || !fromEmail) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    // Create transporter using environment variables
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    const mailOptions = {
      from: `${name} <${fromEmail}>`,
      to: process.env.EMAIL_TO || process.env.SMTP_USER,
      subject: `Website contact form: ${name}`,
      text: `You have a new message from ${name} <${fromEmail}>:\n\n${text}`,
      html: `<p>You have a new message from <strong>${name}</strong> &lt;${fromEmail}&gt;:</p>
             <div style="white-space:pre-wrap">${text}</div>`,
    }

    const info = await transporter.sendMail(mailOptions)

    return NextResponse.json({ ok: true, messageId: info.messageId })
  } catch (err: any) {
    console.error('send-email error:', err)
    return NextResponse.json({ error: err?.message || 'Server error' }, { status: 500 })
  }
}
