
import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PropertySearch } from "@/components/PropertySearch";
import { PropertyList } from "@/components/PropertyList";
import { PropertyType, PropertyFilters } from "@/types";
import { useLocation as useRouterLocation } from "react-router-dom";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const Properties = () => {
  const location = useRouterLocation();
  const queryParams = new URLSearchParams(location.search);
  
  const [filters, setFilters] = useState<PropertyFilters>({
    city: queryParams.get("location") || "",
    type: queryParams.get("type") as PropertyType | null,
    minPrice: queryParams.get("minPrice") ? parseInt(queryParams.get("minPrice") as string) : 0,
    maxPrice: queryParams.get("maxPrice") ? parseInt(queryParams.get("maxPrice") as string) : 50000,
  });
  
  const [priceRange, setPriceRange] = useState<number[]>([
    filters.minPrice || 0,
    filters.maxPrice || 50000
  ]);
  
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Update active filters display
  useEffect(() => {
    const newActiveFilters: string[] = [];
    
    if (filters.city) {
      newActiveFilters.push(`Location: ${filters.city}`);
    }
    
    if (filters.type) {
      newActiveFilters.push(`Type: ${filters.type}`);
    }
    
    if (filters.minPrice && filters.minPrice > 0 || filters.maxPrice && filters.maxPrice < 50000) {
      newActiveFilters.push(`Price: KSh ${filters.minPrice?.toLocaleString() || 0} - KSh ${filters.maxPrice?.toLocaleString() || 50000}`);
    }
    
    setActiveFilters(newActiveFilters);
  }, [filters]);

  const handlePriceChange = (values: number[]) => {
    setPriceRange(values);
  };

  const applyPriceFilter = () => {
    setFilters(prev => ({
      ...prev,
      minPrice: priceRange[0],
      maxPrice: priceRange[1]
    }));
  };

  const handleTypeChange = (value: string) => {
    setFilters(prev => ({
      ...prev,
      type: value ? value as PropertyType : null
    }));
  };

  const handleLocationChange = (value: string) => {
    setFilters(prev => ({
      ...prev,
      city: value
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      city: "",
      type: null,
      minPrice: 0,
      maxPrice: 50000
    });
    setPriceRange([0, 50000]);
  };

  const removeFilter = (filter: string) => {
    if (filter.startsWith("Location:")) {
      setFilters(prev => ({ ...prev, city: "" }));
    } else if (filter.startsWith("Type:")) {
      setFilters(prev => ({ ...prev, type: null }));
    } else if (filter.startsWith("Price:")) {
      setFilters(prev => ({ ...prev, minPrice: 0, maxPrice: 50000 }));
      setPriceRange([0, 50000]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="bg-brand-50 py-8">
        <div className="container px-4">
          <h1 className="text-3xl font-bold mb-6">Find Your Perfect Rental</h1>
          <PropertySearch />
        </div>
      </div>
      
      <div className="container px-4 py-8">
        {/* Mobile filters toggle */}
        <div className="md:hidden mb-4">
          <Button 
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            variant="outline"
            className="w-full"
          >
            {showMobileFilters ? "Hide Filters" : "Show Filters"}
          </Button>
        </div>
        
        {/* Active filters */}
        {activeFilters.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center mb-2">
              <h3 className="text-sm font-medium">Active Filters:</h3>
              <button 
                onClick={clearAllFilters}
                className="ml-3 text-sm text-brand-500 hover:underline"
              >
                Clear All
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {activeFilters.map((filter) => (
                <div 
                  key={filter}
                  className="flex items-center bg-brand-50 px-3 py-1 rounded-full text-sm"
                >
                  {filter}
                  <button 
                    onClick={() => removeFilter(filter)}
                    className="ml-2 text-gray-500 hover:text-gray-800"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters sidebar */}
          <div className={`md:w-1/4 ${showMobileFilters ? 'block' : 'hidden'} md:block`}>
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="text-lg font-semibold mb-4">Refine Search</h2>
              
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="location">
                  <AccordionTrigger className="text-sm font-medium">Location</AccordionTrigger>
                  <AccordionContent>
                    <Select 
                      value={filters.city || ""}
                      onValueChange={handleLocationChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All Locations</SelectItem>
                        <SelectItem value="Nairobi">Nairobi</SelectItem>
                        <SelectItem value="Mombasa">Mombasa</SelectItem>
                        <SelectItem value="Kisumu">Kisumu</SelectItem>
                        <SelectItem value="Nakuru">Nakuru</SelectItem>
                      </SelectContent>
                    </Select>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="type">
                  <AccordionTrigger className="text-sm font-medium">Property Type</AccordionTrigger>
                  <AccordionContent>
                    <Select
                      value={filters.type || ""}
                      onValueChange={handleTypeChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All Types</SelectItem>
                        {Object.values(PropertyType).map((type) => (
                          <SelectItem key={type} value={type}>
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="price">
                  <AccordionTrigger className="text-sm font-medium">Price Range</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <Slider
                        value={priceRange}
                        max={50000}
                        step={1000}
                        onValueChange={handlePriceChange}
                      />
                      
                      <div className="flex justify-between text-sm">
                        <span>KSh {priceRange[0].toLocaleString()}</span>
                        <span>KSh {priceRange[1].toLocaleString()}</span>
                      </div>
                      
                      <Button 
                        onClick={applyPriceFilter}
                        size="sm"
                        className="w-full"
                      >
                        Apply
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
          
          {/* Properties list */}
          <div className="md:w-3/4">
            <h2 className="text-xl font-semibold mb-6">Available Properties</h2>
            <PropertyList filters={filters} />
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Properties;
