import { useEffect, useState } from "react";
import { deafultCords } from "../consts/defaultCords";
import { Coordinates } from "../types/userLocation";

export const useUserLocation = () => {
  const [userLocation, setUserLocation] = useState<Coordinates>(() => {
    const savedLocation = localStorage.getItem("userLocation");
    return savedLocation ? JSON.parse(savedLocation) : deafultCords;
  });

  const [error, setError] = useState<string | boolean>(false);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported by your browser");
      return;
    }

    const handleSuccess = (position: GeolocationPosition) => {
      const newLocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      setUserLocation(newLocation);
      localStorage.setItem("userLocation", JSON.stringify(newLocation));
    };

    const handleError = (error: GeolocationPositionError) => {
      setError(error.message);
    };

    if (!localStorage.getItem("userLocation")) {
      navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
    }
  }, []);

  const resetLocation = () => {
    setUserLocation(deafultCords);
    localStorage.removeItem("userLocation");
  };

  return { userLocation, error, resetLocation };
};
