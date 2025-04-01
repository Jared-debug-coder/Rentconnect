
import { Booking, Property, PropertyType, User, UserRole } from "@/types";

// Mock data
const users: User[] = [
  {
    id: "1",
    email: "landlord@example.com",
    name: "John Landlord",
    role: UserRole.LANDLORD,
    phone: "0712345678",
    createdAt: new Date("2023-01-15")
  },
  {
    id: "2",
    email: "tenant@example.com",
    name: "Mary Tenant",
    role: UserRole.TENANT,
    phone: "0723456789",
    createdAt: new Date("2023-02-20")
  }
];

const properties: Property[] = [
  {
    id: "1",
    title: "Modern Apartment in City Center",
    description: "A beautiful modern apartment located in the heart of the city with easy access to public transport and amenities.",
    type: PropertyType.APARTMENT,
    price: 15000,
    bedrooms: 2,
    bathrooms: 1,
    address: "123 City Center",
    city: "Nairobi",
    country: "Kenya",
    images: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267"],
    features: ["Parking", "Security", "Water", "Electricity"],
    landlordId: "1",
    landlordName: "John Landlord",
    landlordPhone: "0712345678",
    isVerified: true,
    createdAt: new Date("2023-03-10"),
    updatedAt: new Date("2023-03-10")
  },
  {
    id: "2",
    title: "Cozy Bedsitter in Westlands",
    description: "A comfortable bedsitter unit in a quiet neighborhood with 24/7 security and water supply.",
    type: PropertyType.BEDSITTER,
    price: 7000,
    bedrooms: 1,
    bathrooms: 1,
    address: "45 Westlands",
    city: "Nairobi",
    country: "Kenya",
    images: ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688"],
    features: ["Security", "Water", "Shared WiFi"],
    landlordId: "1",
    landlordName: "John Landlord",
    landlordPhone: "0712345678",
    isVerified: true,
    createdAt: new Date("2023-04-05"),
    updatedAt: new Date("2023-04-05")
  },
  {
    id: "3",
    title: "Spacious Family House",
    description: "A large family house with a garden, ideal for families with children. Located in a serene environment.",
    type: PropertyType.HOUSE,
    price: 35000,
    bedrooms: 3,
    bathrooms: 2,
    address: "78 Karen Estate",
    city: "Nairobi",
    country: "Kenya",
    images: ["https://images.unsplash.com/photo-1570129477492-45c003edd2be"],
    features: ["Parking", "Garden", "Security", "Water", "Electricity"],
    landlordId: "1",
    landlordName: "John Landlord",
    landlordPhone: "0712345678",
    isVerified: true,
    createdAt: new Date("2023-05-20"),
    updatedAt: new Date("2023-05-20")
  }
];

const bookings: Booking[] = [];

// API functions
export const api = {
  // Auth
  login: async (email: string, password: string): Promise<User | null> => {
    // In a real app, this would validate credentials against a backend
    const user = users.find(u => u.email === email);
    return user || null;
  },
  
  register: async (name: string, email: string, password: string, role: UserRole, phone?: string): Promise<User> => {
    // In a real app, this would create a new user in the database
    const newUser: User = {
      id: (users.length + 1).toString(),
      email,
      name,
      role,
      phone,
      createdAt: new Date()
    };
    users.push(newUser);
    return newUser;
  },
  
  // Properties
  getProperties: async (filters?: { 
    type?: PropertyType; 
    minPrice?: number; 
    maxPrice?: number;
    city?: string;
  }): Promise<Property[]> => {
    let filtered = [...properties];
    
    if (filters) {
      if (filters.type) {
        filtered = filtered.filter(p => p.type === filters.type);
      }
      
      if (filters.minPrice) {
        filtered = filtered.filter(p => p.price >= filters.minPrice);
      }
      
      if (filters.maxPrice) {
        filtered = filtered.filter(p => p.price <= filters.maxPrice);
      }
      
      if (filters.city) {
        filtered = filtered.filter(p => 
          p.city.toLowerCase().includes(filters.city.toLowerCase()));
      }
    }
    
    return filtered;
  },
  
  getPropertyById: async (id: string): Promise<Property | null> => {
    return properties.find(p => p.id === id) || null;
  },
  
  getLandlordProperties: async (landlordId: string): Promise<Property[]> => {
    return properties.filter(p => p.landlordId === landlordId);
  },
  
  addProperty: async (property: Omit<Property, 'id' | 'createdAt' | 'updatedAt' | 'isVerified'>): Promise<Property> => {
    const newProperty: Property = {
      ...property,
      id: (properties.length + 1).toString(),
      isVerified: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    properties.push(newProperty);
    return newProperty;
  },
  
  updateProperty: async (id: string, updates: Partial<Property>): Promise<Property | null> => {
    const index = properties.findIndex(p => p.id === id);
    if (index === -1) return null;
    
    properties[index] = {
      ...properties[index],
      ...updates,
      updatedAt: new Date()
    };
    
    return properties[index];
  },
  
  verifyProperty: async (id: string): Promise<Property | null> => {
    const index = properties.findIndex(p => p.id === id);
    if (index === -1) return null;
    
    properties[index].isVerified = true;
    properties[index].updatedAt = new Date();
    
    return properties[index];
  },
  
  // Bookings
  createBooking: async (booking: Omit<Booking, 'id' | 'createdAt' | 'status'>): Promise<Booking> => {
    const newBooking: Booking = {
      ...booking,
      id: (bookings.length + 1).toString(),
      status: "pending",
      createdAt: new Date()
    };
    bookings.push(newBooking);
    return newBooking;
  },
  
  getLandlordBookings: async (landlordId: string): Promise<Booking[]> => {
    const landlordProperties = properties.filter(p => p.landlordId === landlordId).map(p => p.id);
    return bookings.filter(b => landlordProperties.includes(b.propertyId));
  },
  
  getTenantBookings: async (tenantId: string): Promise<Booking[]> => {
    return bookings.filter(b => b.tenantId === tenantId);
  },
  
  updateBookingStatus: async (id: string, status: Booking['status']): Promise<Booking | null> => {
    const index = bookings.findIndex(b => b.id === id);
    if (index === -1) return null;
    
    bookings[index].status = status;
    return bookings[index];
  },
  
  // Payment
  initiatePayment: async (phone: string, amount: number, description: string): Promise<{ success: boolean; message: string }> => {
    // In a real app, this would make a request to MPesa API
    return { 
      success: true, 
      message: `Payment request of KSH ${amount} sent to ${phone} for ${description}` 
    };
  }
};
