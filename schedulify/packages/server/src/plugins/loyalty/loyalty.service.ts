
import User from '../../models/user.model';
import LoyaltyTransaction from '../../models/loyalty.model';
import { IBooking } from '../../models/booking.model';

// Default: 1 point per dollar spent
const POINTS_PER_DOLLAR = 1; 
// Default: 10 points = $1 discount
const CENTS_PER_POINT = 10; 

class LoyaltyService {
  async awardPoints(booking: IBooking) {
    const pointsToAward = Math.floor(booking.fee * POINTS_PER_DOLLAR);
    
    await User.findByIdAndUpdate(booking.user, { $inc: { loyaltyPoints: pointsToAward } });

    await LoyaltyTransaction.create({
      user: booking.user,
      points: pointsToAward,
      type: 'earned',
      description: `Earned from booking ${booking._id}`,
    });
  }

  async redeemPoints(userId: string, pointsToRedeem: number): Promise<{success: boolean, discount: number}> {
    const user = await User.findById(userId);
    if (!user || user.loyaltyPoints < pointsToRedeem) {
      return { success: false, discount: 0 };
    }

    const discount = (pointsToRedeem * CENTS_PER_POINT) / 100;

    await User.findByIdAndUpdate(userId, { $inc: { loyaltyPoints: -pointsToRedeem } });

    await LoyaltyTransaction.create({
      user: userId,
      points: pointsToRedeem,
      type: 'redeemed',
      description: 'Redeemed for discount',
    });

    return { success: true, discount };
  }
}

export default new LoyaltyService();
