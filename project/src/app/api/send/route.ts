import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, email, phone, dates, guests, message } = await request.json();

    const { data, error } = await resend.emails.send({
      from: "Ria Sea House <onboarding@resend.dev>",
      to: ["riaseahouse@gmail.com"],
      subject: `New Booking Inquiry from ${name}`,
      reply_to: email,
      html: `
        <h2>New Booking Inquiry</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
        <p><strong>Preferred Dates:</strong> ${dates || "Not provided"}</p>
        <p><strong>Number of Guests:</strong> ${guests || "Not provided"}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ error: "Error sending email" }, { status: 500 });
  }
}
