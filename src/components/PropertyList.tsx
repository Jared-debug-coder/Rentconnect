
import { useState, useEffect } from "react";
import { Property, PropertyType, PropertyFilters } from "@/types";
import { PropertyCard } from "@/components/PropertyCard";
import { api } from "@/services/api";
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface PropertyListProps {
  filters?: PropertyFilters;
  refreshTrigger?: number;
}

export function PropertyList({ filters, refreshTrigger = 0 }: PropertyListProps) {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      try {
        const data = await api.getProperties(filters);
        setProperties(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching properties:", err);
        setError("Failed to fetch properties. Please try again later.");
        toast({
          title: "Error",
          description: "Failed to fetch properties. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [filters, refreshTrigger, toast]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="h-10 w-10 text-brand-500 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <div className="text-center py-10">
        <h3 className="text-xl font-medium text-gray-600">No properties found</h3>
        <p className="text-gray-500 mt-2">Try adjusting your search filters</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}
