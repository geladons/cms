
import User from '../../models/user.model';
import TimeOff from '../../models/timeoff.model';
import { IBooking } from '../../models/booking.model';

class AvailabilityService {
  async isEmployeeAvailable(employeeId: string, booking: IBooking): Promise<boolean> {
    const employee = await User.findById(employeeId);
    if (!employee) return false;

    // 1. Check weekly availability
    const bookingDay = new Date(booking.date).toLocaleString('en-us', { weekday: 'long' });
    const availabilityDay = employee.availability.find(a => a.day === bookingDay);
    if (!availabilityDay) return false;

    const isWithinSlot = availabilityDay.slots.some(slot => 
      booking.startTime >= slot.startTime && booking.endTime <= slot.endTime
    );
    if (!isWithinSlot) return false;

    // 2. Check for time off
    const timeOff = await TimeOff.findOne({
      employee: employeeId,
      status: 'approved',
      startDate: { $lte: booking.date },
      endDate: { $gte: booking.date },
    });
    if (timeOff) return false;

    // 3. Check for conflicting bookings
    const conflictingBooking = await User.findOne({
        _id: employeeId,
        'bookings': {
            $elemMatch: {
                date: booking.date,
                $or: [
                    { startTime: { $lt: booking.endTime }, endTime: { $gt: booking.startTime } }
                ]
            }
        }
    });

    if(conflictingBooking) return false;


    return true;
  }
}

export default new AvailabilityService();
