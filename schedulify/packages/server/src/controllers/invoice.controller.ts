
import { Request, Response } from 'express';
import Booking from '../models/booking.model';
import { invoiceService } from '../plugins/invoicing';

export const downloadInvoice = async (req: Request, res: Response) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('user');

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // In a real app, you'd also check if the user is authorized to view this invoice
    
    const pdfBuffer = await invoiceService.generateInvoice(booking);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=invoice-${booking._id}.pdf`);
    res.send(pdfBuffer);

  } catch (error) {
    console.error('Error generating invoice:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};
