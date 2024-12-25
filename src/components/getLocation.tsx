import { useEffect, useState } from 'react';
import axios from 'axios';

interface Location {
  lat: number | null;
  lng: number | null;
}


const GetUserLocation = () => {
  const [location, setLocation] = useState<Location>({ lat: null, lng: null });
  const [address, setAddress] = useState('');

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });
          fetchAddress(latitude, longitude);
        },
        (error) => {
          console.error('Error obtaining location:', error);
        }
      );
    } else {
      console.log('Geolocation is not available in this browser.');
    }
  }, []);

  const fetchAddress = async (lat, lng) => {
    const apiKey = process.env.NEXT_PUBLIC_GEO_LOCATION_KEY;
    console.log(lat, lng, process.env.NEXT_PUBLIC_GEO_LOCATION_KEY)
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;

    try {
      const response = await axios.get(url);
      const address = response.data.results[0]?.formatted_address || 'Address not found';
      setAddress(address);
    } catch (error) {
      console.error('Error fetching address:', error);
    }
  };

  return (
    <div>
      {/* <h1>User Location</h1>
      <p>Latitude: {location.lat}</p>
      <p>Longitude: {location.lng}</p> */}
      <p>{address}</p>
    </div>
  );
};

export default GetUserLocation;
