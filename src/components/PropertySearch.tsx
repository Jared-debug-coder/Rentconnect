
import { useState, useEffect } from "react";
import { useLocation } from "@/contexts/LocationContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { PropertyType } from "@/types";
import { Search, MapPin, Home as HomeIcon, DollarSign } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export function PropertySearch() {
  const navigate = useNavigate();
  const { currentLocation, detectCurrentLocation, locationLoading } = useLocation();
  const { toast } = useToast();
  
  const [searchParams, setSearchParams] = useState({
    location: currentLocation || "",
    type: "",
    minPrice: "",
    maxPrice: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({ ...prev, [name]: value }));
  };

  const handleTypeChange = (value: string) => {
    setSearchParams(prev => ({ ...prev, type: value }));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchParams.location) {
      toast({
        title: "Location Required",
        description: "Please enter a location to search for properties",
        variant: "destructive",
      });
      return;
    }
    
    // Build query string
    const queryParams = new URLSearchParams();
    
    if (searchParams.location) {
      queryParams.append("location", searchParams.location);
    }
    
    if (searchParams.type) {
      queryParams.append("type", searchParams.type);
    }
    
    if (searchParams.minPrice) {
      queryParams.append("minPrice", searchParams.minPrice);
    }
    
    if (searchParams.maxPrice) {
      queryParams.append("maxPrice", searchParams.maxPrice);
    }
    
    navigate(`/properties?${queryParams.toString()}`);
    
    toast({
      title: "Searching Properties",
      description: `Finding properties in ${searchParams.location}...`,
    });
  };

  const handleLocationDetect = async () => {
    try {
      await detectCurrentLocation();
      toast({
        title: "Location Detected",
        description: "Your current location has been detected successfully",
      });
    } catch (error) {
      toast({
        title: "Location Detection Failed",
        description: "Please enter your location manually",
        variant: "destructive",
      });
    }
  };

  // Update search location when context location changes
  useEffect(() => {
    if (currentLocation && !searchParams.location) {
      setSearchParams(prev => ({ ...prev, location: currentLocation }));
    }
  }, [currentLocation]); // Add dependency to ensure it runs when currentLocation changes

  return (
    <form onSubmit={handleSearch} className="bg-white p-4 md:p-6 rounded-lg shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Location */}
        <div className="relative">
          <div className="flex">
            <Input
              name="location"
              placeholder="Enter location"
              value={searchParams.location}
              onChange={handleChange}
              className="pr-10"
              required
            />
            <Button 
              type="button" 
              size="icon"
              variant="ghost"
              className="absolute right-0 top-0 h-full"
              onClick={handleLocationDetect}
              disabled={locationLoading}
            >
              {locationLoading ? (
                <div className="animate-spin h-4 w-4 border-2 border-brand-500 border-t-transparent rounded-full" />
              ) : (
                <MapPin className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
        
        {/* Property Type */}
        <Select value={searchParams.type} onValueChange={handleTypeChange}>
          <SelectTrigger className="flex items-center">
            <HomeIcon className="h-4 w-4 mr-2 text-gray-500" />
            <SelectValue placeholder="Property Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-types">All Types</SelectItem>
            {Object.values(PropertyType).map((type) => (
              <SelectItem key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        {/* Price Range */}
        <div className="flex space-x-2">
          <div className="relative flex-1">
            <DollarSign className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              name="minPrice"
              placeholder="Min Price"
              type="number"
              value={searchParams.minPrice}
              onChange={handleChange}
              className="pl-8"
            />
          </div>
          <div className="relative flex-1">
            <DollarSign className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              name="maxPrice"
              placeholder="Max Price"
              type="number"
              value={searchParams.maxPrice}
              onChange={handleChange}
              className="pl-8"
            />
          </div>
        </div>
        
        {/* Search Button */}
        <Button type="submit" className="w-full">
          <Search className="h-4 w-4 mr-2" />
          Search Properties
        </Button>
      </div>
    </form>
  );
}
