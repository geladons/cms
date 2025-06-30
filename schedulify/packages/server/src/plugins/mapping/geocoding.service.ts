
import axios from 'axios';

class GeocodingService {
  private nominatimUrl: string;

  constructor() {
    this.nominatimUrl = process.env.NOMINATIM_URL || 'https://nominatim.openstreetmap.org';
  }

  async getCoordinates(address: string) {
    try {
      const response = await axios.get(`${this.nominatimUrl}/search`, {
        params: {
          q: address,
          format: 'json',
          limit: 1,
        },
      });

      if (response.data && response.data.length > 0) {
        const { lat, lon } = response.data[0];
        return {
          type: 'Point',
          coordinates: [parseFloat(lon), parseFloat(lat)],
        };
      }
      return null;
    } catch (error) {
      console.error('Error geocoding address:', error);
      return null;
    }
  }
}

export default new GeocodingService();
