
import PDFDocument from 'pdfkit';
import { IBooking } from '../../models/booking.model';

class InvoiceService {
  generateInvoice(booking: IBooking): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const doc = new PDFDocument({ size: 'A4', margin: 50 });
      const buffers: Buffer[] = [];

      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => {
        resolve(Buffer.concat(buffers));
      });
      doc.on('error', reject);

      // --- Invoice Content ---
      doc.fontSize(20).text('Invoice', { align: 'center' });
      doc.moveDown();

      doc.fontSize(12).text(`Booking ID: ${booking._id}`);
      doc.text(`Booking Date: ${new Date(booking.date).toLocaleDateString()}`);
      doc.text(`Time: ${booking.startTime} - ${booking.endTime}`);
      doc.moveDown();

      doc.text('---');
      doc.moveDown();

      doc.fontSize(16).text('Total');
      doc.fontSize(12).text(`Fee: $${booking.fee.toFixed(2)}`);
      doc.moveDown();

      doc.fontSize(10).text('Thank you for your business!', { align: 'center' });
      // --- End Content ---

      doc.end();
    });
  }
}

export default new InvoiceService();
