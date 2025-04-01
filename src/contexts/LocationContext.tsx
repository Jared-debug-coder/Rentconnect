
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useToast } from "@/components/ui/use-toast";

interface LocationContextType {
  currentLocation: string | null;
  locationLoading: boolean;
  locationError: string | null;
  setManualLocation: (location: string) => void;
  detectCurrentLocation: () => Promise<void>;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export function LocationProvider({ children }: { children: ReactNode }) {
  const [currentLocation, setCurrentLocation] = useState<string | null>(null);
  const [locationLoading, setLocationLoading] = useState<boolean>(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Check if location is stored in localStorage
    const storedLocation = localStorage.getItem("userLocation");
    if (storedLocation) {
      setCurrentLocation(storedLocation);
    }
  }, []);

  const setManualLocation = (location: string) => {
    setCurrentLocation(location);
    localStorage.setItem("userLocation", location);
  };

  const detectCurrentLocation = async () => {
    setLocationLoading(true);
    setLocationError(null);

    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser");
      setLocationLoading(false);
      toast({
        title: "Location Error",
        description: "Geolocation is not supported by your browser",
        variant: "destructive",
      });
      return;
    }

    try {
      // In a real app, we would use the coordinates to get the city name
      // through a reverse geocoding service like Google Maps API
      
      // For demo purposes, we'll just simulate getting a location
      setTimeout(() => {
        const demoLocation = "Nairobi, Kenya";
        setCurrentLocation(demoLocation);
        localStorage.setItem("userLocation", demoLocation);
        setLocationLoading(false);
        
        toast({
          title: "Location Detected",
          description: `We've detected your location as ${demoLocation}`,
        });
      }, 1500);
    } catch (error) {
      console.error("Error getting location:", error);
      setLocationError("Failed to get your location");
      setLocationLoading(false);
      
      toast({
        title: "Location Error",
        description: "Failed to get your location. Please enter it manually.",
        variant: "destructive",
      });
    }
  };

  return (
    <LocationContext.Provider
      value={{
        currentLocation,
        locationLoading,
        locationError,
        setManualLocation,
        detectCurrentLocation,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
}

export function useLocation() {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error("useLocation must be used within a LocationProvider");
  }
  return context;
}
