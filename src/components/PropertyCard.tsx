
import { Property } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { MapPin, Bed, Bath, Home, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <Card className="property-card h-full flex flex-col">
      <div className="relative h-48 overflow-hidden">
        <img
          src={property.images[0] || "https://images.unsplash.com/photo-1568605114967-8130f3a36994"}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <Badge className="absolute top-2 right-2 bg-brand-500">
          KSH {property.price.toLocaleString()}/month
        </Badge>
        {property.isVerified && (
          <Badge className="absolute top-2 left-2 bg-green-500">
            Verified
          </Badge>
        )}
      </div>
      
      <CardContent className="flex-grow pt-4">
        <h3 className="text-lg font-semibold mb-2 truncate">{property.title}</h3>
        
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="truncate">{property.address}, {property.city}</span>
        </div>
        
        <div className="grid grid-cols-3 gap-2 mb-3">
          <div className="flex items-center text-sm">
            <Home className="h-4 w-4 mr-1 text-gray-500" />
            <span>{property.type}</span>
          </div>
          <div className="flex items-center text-sm">
            <Bed className="h-4 w-4 mr-1 text-gray-500" />
            <span>{property.bedrooms} {property.bedrooms === 1 ? 'bed' : 'beds'}</span>
          </div>
          <div className="flex items-center text-sm">
            <Bath className="h-4 w-4 mr-1 text-gray-500" />
            <span>{property.bathrooms} {property.bathrooms === 1 ? 'bath' : 'baths'}</span>
          </div>
        </div>
        
        <div className="flex items-center text-xs text-gray-500 mt-2">
          <Calendar className="h-3 w-3 mr-1" />
          <span>Listed on {formatDate(property.createdAt)}</span>
        </div>
      </CardContent>
      
      <CardFooter className="border-t pt-4">
        <Link to={`/properties/${property.id}`} className="w-full">
          <Button variant="default" className="w-full">View Details</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
