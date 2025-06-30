
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import L from 'leaflet';

// Fix for default icon issue with Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const MapView = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/bookings/with-location');
        setBookings(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBookings();
  }, []);

  return (
    <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {bookings.map((booking: any) => (
        <Marker
          key={booking._id}
          position={[
            booking.user.location.coordinates[1],
            booking.user.location.coordinates[0],
          ]}
        >
          <Popup>
            <strong>{booking.user.name}</strong>
            <br />
            {booking.user.location.address}
            <br />
            {new Date(booking.date).toLocaleDateString()}
            <br />
            {`${booking.startTime} - ${booking.endTime}`}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapView;
