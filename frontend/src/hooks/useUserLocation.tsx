import { useEffect, useState } from "react";
import { deafultCords } from "../consts/defaultCords";
import { Coordinates } from "../types/userLocation";

export const useUserLocation = () => {
  const [userLocation, setUserLocation] = useState<Coordinates>(() => {
    const savedLocation = localStorage.getItem("userLocation");
    return savedLocation ? JSON.parse(savedLocation) : deafultCords;
  });

  const [error, setError] = useState<string | boolean>(false);
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported by your browser");
      setHasInteracted(true);
      return;
    }

    const handleSuccess = (position: GeolocationPosition) => {
      const newLocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      setUserLocation(newLocation);
      localStorage.setItem("userLocation", JSON.stringify(newLocation));
      setHasInteracted(true);
    };

    const handleError = (error: GeolocationPositionError) => {
      setError(error.message);
      setHasInteracted(true);
    };

    // eslint-disable-next-line unicorn/no-negated-condition
    if (!localStorage.getItem("userLocation")) {
      navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
    } else {
      setHasInteracted(true);
    }
  }, []);

  const resetLocation = () => {
    setUserLocation(deafultCords);
    localStorage.removeItem("userLocation");
  };

  return { userLocation, error, resetLocation, hasInteracted };
};
