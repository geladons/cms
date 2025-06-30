
import nodemailer from 'nodemailer';

class NotificationService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  async sendBookingConfirmation(booking: any) {
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: booking.user.email,
      subject: 'Booking Confirmation',
      html: `<h1>Booking Confirmed</h1><p>Your booking for ${booking.date} from ${booking.startTime} to ${booking.endTime} has been confirmed.</p>`,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log('Booking confirmation email sent.');
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }

  async sendBookingCancellation(booking: any) {
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: booking.user.email,
      subject: 'Booking Cancellation',
      html: `<h1>Booking Cancelled</h1><p>Your booking for ${booking.date} from ${booking.startTime} to ${booking.endTime} has been cancelled.</p>`,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log('Booking cancellation email sent.');
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }
}

export default NotificationService;
