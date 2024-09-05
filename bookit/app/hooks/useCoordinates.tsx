import { useState, useEffect } from "react";

const useCoordinates = (address: string) => {
  const [coordinates, setCoordinates] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        const encodedAddress = encodeURIComponent(address);
        const url = `https://nominatim.openstreetmap.org/search?q=${encodedAddress}&format=json&limit=1`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.length > 0) {
          const location = data[0];
          setCoordinates({
            latitude: parseFloat(location.lat),
            longitude: parseFloat(location.lon),
          });
        } else {
          throw new Error("Unable to fetch location data");
        }
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCoordinates();
  }, [address]);

  return { coordinates, loading, error };
};

export default useCoordinates;
