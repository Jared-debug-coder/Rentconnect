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
    description: "A beautiful modern apartment located in the heart of the city with easy access to public transport and amenities. This apartment features high ceilings, large windows for natural light, and modern finishes throughout. Perfect for young professionals or students.",
    type: PropertyType.APARTMENT,
    price: 45000,
    bedrooms: 2,
    bathrooms: 1,
    address: "123 City Center",
    city: "Nairobi",
    country: "Kenya",
    images: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267"],
    features: ["Parking", "Security", "Water", "Electricity", "Balcony", "Free WiFi"],
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
    description: "A comfortable bedsitter unit in a quiet neighborhood with 24/7 security and water supply. Located just 5 minutes from Westlands shopping center and public transport routes. Ideal for students or single professionals.",
    type: PropertyType.BEDSITTER,
    price: 17000,
    bedrooms: 1,
    bathrooms: 1,
    address: "45 Westlands",
    city: "Nairobi",
    country: "Kenya",
    images: ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688"],
    features: ["Security", "Water", "Shared WiFi", "Furnished", "Close to Shopping"],
    landlordId: "1",
    landlordName: "John Landlord",
    landlordPhone: "0712345678",
    isVerified: true,
    createdAt: new Date("2023-04-05"),
    updatedAt: new Date("2023-04-05")
  },
  {
    id: "3",
    title: "Spacious Family House in Karen",
    description: "A large family house with a garden, ideal for families with children. Located in a serene environment with easy access to international schools and shopping centers. The property includes a spacious garden and outdoor entertainment area.",
    type: PropertyType.HOUSE,
    price: 120000,
    bedrooms: 4,
    bathrooms: 3,
    address: "78 Karen Estate",
    city: "Nairobi",
    country: "Kenya",
    images: ["https://images.unsplash.com/photo-1570129477492-45c003edd2be"],
    features: ["Parking", "Garden", "Security", "Water", "Electricity", "Fiber Internet", "Swimming Pool", "Servant Quarter"],
    landlordId: "1",
    landlordName: "John Landlord",
    landlordPhone: "0712345678",
    isVerified: true,
    createdAt: new Date("2023-05-20"),
    updatedAt: new Date("2023-05-20")
  },
  {
    id: "4",
    title: "Modern Studio Apartment in Kilimani",
    description: "A stylish studio apartment in the upscale Kilimani area. Perfect for young professionals seeking a convenient location close to business districts. Features modern finishes and appliances.",
    type: PropertyType.APARTMENT,
    price: 35000,
    bedrooms: 1,
    bathrooms: 1,
    address: "Kilimani Heights, Argwings Kodhek Rd",
    city: "Nairobi",
    country: "Kenya",
    images: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267"],
    features: ["Parking", "Security", "Water", "Electricity", "Gym", "Rooftop Access"],
    landlordId: "1",
    landlordName: "John Landlord",
    landlordPhone: "0712345678",
    isVerified: true,
    createdAt: new Date("2023-06-15"),
    updatedAt: new Date("2023-06-15")
  },
  {
    id: "5",
    title: "Affordable 2-Bedroom in Eastlands",
    description: "A comfortable 2-bedroom apartment in a secure compound in Eastlands. Great value for families or roommates looking for affordable housing with good amenities.",
    type: PropertyType.APARTMENT,
    price: 25000,
    bedrooms: 2,
    bathrooms: 1,
    address: "Buruburu Phase 3",
    city: "Nairobi",
    country: "Kenya",
    images: ["https://images.unsplash.com/photo-1493809842364-78817add7ffb"],
    features: ["Security", "Water", "Electricity", "Children's Play Area"],
    landlordId: "1",
    landlordName: "John Landlord",
    landlordPhone: "0712345678",
    isVerified: true,
    createdAt: new Date("2023-06-22"),
    updatedAt: new Date("2023-06-22")
  },
  {
    id: "6",
    title: "Luxurious 3-Bedroom Apartment in Lavington",
    description: "An elegant 3-bedroom apartment in the prestigious Lavington area. Features high-end finishes, spacious rooms, and a beautiful view of the city skyline.",
    type: PropertyType.APARTMENT,
    price: 150000,
    bedrooms: 3,
    bathrooms: 2,
    address: "Lavington Green, James Gichuru Rd",
    city: "Nairobi",
    country: "Kenya",
    images: ["https://images.unsplash.com/photo-1512917774080-9991f1c4c750"],
    features: ["Parking", "Security", "Water", "Electricity", "Swimming Pool", "Gym", "Balcony"],
    landlordId: "1",
    landlordName: "John Landlord",
    landlordPhone: "0712345678",
    isVerified: true,
    createdAt: new Date("2023-07-05"),
    updatedAt: new Date("2023-07-05")
  },
  {
    id: "7",
    title: "Charming Cottage in Rosslyn",
    description: "A beautiful cottage-style home in the serene Rosslyn area. Perfect for expatriates or families looking for a quiet and secure neighborhood.",
    type: PropertyType.HOUSE,
    price: 180000,
    bedrooms: 3,
    bathrooms: 2,
    address: "Rosslyn Ridge",
    city: "Nairobi",
    country: "Kenya",
    images: ["https://images.unsplash.com/photo-1510798831971-661eb04b3739"],
    features: ["Parking", "Garden", "Security", "Water", "Electricity", "Servant Quarter"],
    landlordId: "1",
    landlordName: "John Landlord",
    landlordPhone: "0712345678",
    isVerified: true,
    createdAt: new Date("2023-07-15"),
    updatedAt: new Date("2023-07-15")
  },
  {
    id: "8",
    title: "Student-Friendly Bedsitter near UoN",
    description: "A cozy bedsitter located near the University of Nairobi. Ideal for students looking for convenient and affordable accommodation close to campus.",
    type: PropertyType.BEDSITTER,
    price: 12000,
    bedrooms: 1,
    bathrooms: 1,
    address: "State House Road",
    city: "Nairobi",
    country: "Kenya",
    images: ["https://images.unsplash.com/photo-1505693416388-ac5ce068fe85"],
    features: ["Security", "Water", "Electricity", "Study Desk", "Close to Campus"],
    landlordId: "1",
    landlordName: "John Landlord",
    landlordPhone: "0712345678",
    isVerified: true,
    createdAt: new Date("2023-08-01"),
    updatedAt: new Date("2023-08-01")
  },
  {
    id: "9",
    title: "Spacious 2-Bedroom in Langata",
    description: "A well-maintained 2-bedroom apartment in a family-friendly neighborhood in Langata. Close to shopping centers and schools.",
    type: PropertyType.APARTMENT,
    price: 35000,
    bedrooms: 2,
    bathrooms: 1,
    address: "Langata South Road",
    city: "Nairobi",
    country: "Kenya",
    images: ["https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e"],
    features: ["Parking", "Security", "Water", "Electricity"],
    landlordId: "1",
    landlordName: "John Landlord",
    landlordPhone: "0712345678",
    isVerified: true,
    createdAt: new Date("2023-08-15"),
    updatedAt: new Date("2023-08-15")
  },
  {
    id: "10",
    title: "Executive 1-Bedroom in Upper Hill",
    description: "A modern 1-bedroom apartment in the business district of Upper Hill. Perfect for corporate executives or business travelers looking for a convenient location.",
    type: PropertyType.APARTMENT,
    price: 70000,
    bedrooms: 1,
    bathrooms: 1,
    address: "Upper Hill Road",
    city: "Nairobi",
    country: "Kenya",
    images: ["https://images.unsplash.com/photo-1502672023488-70e25813eb80"],
    features: ["Parking", "Security", "Water", "Electricity", "Furnished", "Gym"],
    landlordId: "1",
    landlordName: "John Landlord",
    landlordPhone: "0712345678",
    isVerified: true,
    createdAt: new Date("2023-09-01"),
    updatedAt: new Date("2023-09-01")
  },
  {
    id: "11",
    title: "Affordable Studio in South B",
    description: "A compact and affordable studio apartment in South B. Great for singles or couples looking for a starter home in Nairobi.",
    type: PropertyType.APARTMENT,
    price: 18000,
    bedrooms: 0,
    bathrooms: 1,
    address: "South B Shopping Center",
    city: "Nairobi",
    country: "Kenya",
    images: ["https://images.unsplash.com/photo-1489171078254-c3365d6e359f"],
    features: ["Security", "Water", "Electricity"],
    landlordId: "1",
    landlordName: "John Landlord",
    landlordPhone: "0712345678",
    isVerified: true,
    createdAt: new Date("2023-09-10"),
    updatedAt: new Date("2023-09-10")
  },
  {
    id: "12",
    title: "Family Home in Runda",
    description: "A luxurious family home in the exclusive Runda estate. Features spacious living areas, a large garden, and premium security.",
    type: PropertyType.HOUSE,
    price: 350000,
    bedrooms: 5,
    bathrooms: 4,
    address: "Runda Evergreen",
    city: "Nairobi",
    country: "Kenya",
    images: ["https://images.unsplash.com/photo-1564013799919-ab600027ffc6"],
    features: ["Parking", "Garden", "Security", "Water", "Electricity", "Swimming Pool", "Home Office", "Servant Quarters"],
    landlordId: "1",
    landlordName: "John Landlord",
    landlordPhone: "0712345678",
    isVerified: true,
    createdAt: new Date("2023-09-20"),
    updatedAt: new Date("2023-09-20")
  },
  {
    id: "13",
    title: "Affordable Bedsitter in Zimmerman",
    description: "A clean and well-maintained bedsitter in Zimmerman. Perfect for students or young professionals on a budget.",
    type: PropertyType.BEDSITTER,
    price: 10000,
    bedrooms: 1,
    bathrooms: 1,
    address: "Zimmerman Estate",
    city: "Nairobi",
    country: "Kenya",
    images: ["https://images.unsplash.com/photo-1560448204-603b3fc33ddc"],
    features: ["Security", "Water", "Electricity", "Common Area"],
    landlordId: "1",
    landlordName: "John Landlord",
    landlordPhone: "0712345678",
    isVerified: true,
    createdAt: new Date("2023-10-01"),
    updatedAt: new Date("2023-10-01")
  },
  {
    id: "14",
    title: "Modern 3-Bedroom Townhouse in Kileleshwa",
    description: "A beautiful townhouse in the upscale Kileleshwa area. Features modern design, ample space, and a small private garden.",
    type: PropertyType.HOUSE,
    price: 150000,
    bedrooms: 3,
    bathrooms: 2,
    address: "Kileleshwa Ring Road",
    city: "Nairobi",
    country: "Kenya",
    images: ["https://images.unsplash.com/photo-1512917774080-9991f1c4c750"],
    features: ["Parking", "Garden", "Security", "Water", "Electricity", "Fiber Internet"],
    landlordId: "1",
    landlordName: "John Landlord",
    landlordPhone: "0712345678",
    isVerified: true,
    createdAt: new Date("2023-10-15"),
    updatedAt: new Date("2023-10-15")
  },
  {
    id: "15",
    title: "Spacious Apartment in Ngara",
    description: "A spacious and affordable apartment in Ngara area. Close to the CBD and public transport routes.",
    type: PropertyType.APARTMENT,
    price: 28000,
    bedrooms: 2,
    bathrooms: 1,
    address: "Ngara Road",
    city: "Nairobi",
    country: "Kenya",
    images: ["https://images.unsplash.com/photo-1493809842364-78817add7ffb"],
    features: ["Security", "Water", "Electricity"],
    landlordId: "1",
    landlordName: "John Landlord",
    landlordPhone: "0712345678",
    isVerified: true,
    createdAt: new Date("2023-11-01"),
    updatedAt: new Date("2023-11-01")
  },
  {
    id: "16",
    title: "Luxury Apartment in Riverside",
    description: "A high-end apartment in the prestigious Riverside Drive area. Features premium finishes and amenities in a secure compound.",
    type: PropertyType.APARTMENT,
    price: 180000,
    bedrooms: 3,
    bathrooms: 2,
    address: "Riverside Drive",
    city: "Nairobi",
    country: "Kenya",
    images: ["https://images.unsplash.com/photo-1515263487990-61b07816b324"],
    features: ["Parking", "Security", "Water", "Electricity", "Swimming Pool", "Gym", "Concierge Service"],
    landlordId: "1",
    landlordName: "John Landlord",
    landlordPhone: "0712345678",
    isVerified: true,
    createdAt: new Date("2023-11-15"),
    updatedAt: new Date("2023-11-15")
  },
  {
    id: "17",
    title: "Compact Studio in Parklands",
    description: "A neat and modern studio apartment in Parklands. Great for young professionals or students in the area.",
    type: PropertyType.APARTMENT,
    price: 25000,
    bedrooms: 0,
    bathrooms: 1,
    address: "3rd Parklands Avenue",
    city: "Nairobi",
    country: "Kenya",
    images: ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688"],
    features: ["Security", "Water", "Electricity", "Furnished"],
    landlordId: "1",
    landlordName: "John Landlord",
    landlordPhone: "0712345678",
    isVerified: true,
    createdAt: new Date("2023-12-01"),
    updatedAt: new Date("2023-12-01")
  },
  {
    id: "18",
    title: "Family-Friendly 3-Bedroom in South C",
    description: "A spacious 3-bedroom apartment in a quiet neighborhood in South C. Ideal for families looking for a comfortable home.",
    type: PropertyType.APARTMENT,
    price: 45000,
    bedrooms: 3,
    bathrooms: 2,
    address: "South C Shopping Center",
    city: "Nairobi",
    country: "Kenya",
    images: ["https://images.unsplash.com/photo-1493809842364-78817add7ffb"],
    features: ["Parking", "Security", "Water", "Electricity", "Children's Play Area"],
    landlordId: "1",
    landlordName: "John Landlord",
    landlordPhone: "0712345678",
    isVerified: true,
    createdAt: new Date("2023-12-15"),
    updatedAt: new Date("2023-12-15")
  },
  {
    id: "19",
    title: "Upscale Bedsitter in Hurlingham",
    description: "A modern bedsitter in the trendy Hurlingham area. Features quality finishes and is close to restaurants and shopping centers.",
    type: PropertyType.BEDSITTER,
    price: 22000,
    bedrooms: 1,
    bathrooms: 1,
    address: "Hurlingham Road",
    city: "Nairobi",
    country: "Kenya",
    images: ["https://images.unsplash.com/photo-1560448204-603b3fc33ddc"],
    features: ["Security", "Water", "Electricity", "Furnished", "Fiber Internet"],
    landlordId: "1",
    landlordName: "John Landlord",
    landlordPhone: "0712345678",
    isVerified: true,
    createdAt: new Date("2024-01-05"),
    updatedAt: new Date("2024-01-05")
  },
  {
    id: "20",
    title: "Rustic Family Home in Spring Valley",
    description: "A charming family home with rustic design elements in the prestigious Spring Valley area. Spacious garden and outdoor entertainment areas.",
    type: PropertyType.HOUSE,
    price: 250000,
    bedrooms: 4,
    bathrooms: 3,
    address: "Spring Valley Close",
    city: "Nairobi",
    country: "Kenya",
    images: ["https://images.unsplash.com/photo-1564013799919-ab600027ffc6"],
    features: ["Parking", "Garden", "Security", "Water", "Electricity", "Servant Quarters", "Fireplace"],
    landlordId: "1",
    landlordName: "John Landlord",
    landlordPhone: "0712345678",
    isVerified: true,
    createdAt: new Date("2024-01-20"),
    updatedAt: new Date("2024-01-20")
  }
];

// Booking messages templates
const BOOKING_MESSAGES = {
  CANCELLED: "Thank you for your interest in our property. Unfortunately, this property is currently not available for viewing at the requested time. We encourage you to browse our other excellent properties that might suit your needs. Our team is always ready to assist you in finding your ideal home.",
  CONFIRMED: "Great news! Your viewing request has been confirmed. We look forward to showing you the property at the scheduled time. Please arrive on time and feel free to ask any questions during the viewing. We're excited to help you find your new home!"
};

// Adding at least 5 pending bookings
const bookings: Booking[] = [
  {
    id: "1",
    propertyId: "3",
    tenantId: "2",
    tenantName: "Mary Tenant",
    tenantEmail: "tenant@example.com",
    tenantPhone: "0723456789",
    date: new Date("2024-02-15"),
    time: "14:00",
    message: "I'm interested in viewing this property this weekend if possible.",
    status: "pending",
    createdAt: new Date("2024-02-10")
  },
  {
    id: "2",
    propertyId: "1",
    tenantId: "2",
    tenantName: "James Smith",
    tenantEmail: "james@example.com",
    tenantPhone: "0734567890",
    date: new Date("2024-02-16"),
    time: "10:00",
    message: "Looking for a place close to my new office.",
    status: "pending",
    createdAt: new Date("2024-02-11")
  },
  {
    id: "3",
    propertyId: "4",
    tenantId: "guest",
    tenantName: "Sarah Johnson",
    tenantEmail: "sarah@example.com",
    tenantPhone: "0745678901",
    date: new Date("2024-02-17"),
    time: "15:30",
    message: "Would like to know if any discounts are available for long-term leases.",
    status: "confirmed",
    createdAt: new Date("2024-02-12")
  },
  {
    id: "4",
    propertyId: "6",
    tenantId: "guest",
    tenantName: "Michael Wong",
    tenantEmail: "michael@example.com",
    tenantPhone: "0756789012",
    date: new Date("2024-02-18"),
    time: "11:00",
    message: "Looking for a family-friendly apartment with good security.",
    status: "pending",
    createdAt: new Date("2024-02-13")
  },
  {
    id: "5",
    propertyId: "12",
    tenantId: "guest",
    tenantName: "Emma Davis",
    tenantEmail: "emma@example.com",
    tenantPhone: "0767890123",
    date: new Date("2024-02-19"),
    time: "16:00",
    message: "Interested in this luxury home for my family of 5.",
    status: "pending",
    createdAt: new Date("2024-02-14")
  }
];

// API functions
export const api = {
  // Auth
  login: async (email: string, password: string): Promise<User | null> => {
    const user = users.find(u => u.email === email);
    return user || null;
  },
  
  register: async (name: string, email: string, password: string, role: UserRole, phone?: string): Promise<User> => {
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
    
    if (status === "cancelled") {
      bookings[index].statusMessage = BOOKING_MESSAGES.CANCELLED;
    } else if (status === "confirmed") {
      bookings[index].statusMessage = BOOKING_MESSAGES.CONFIRMED;
    }
    
    return bookings[index];
  },
  
  // Payment
  initiatePayment: async (phone: string, amount: number, description: string): Promise<{ success: boolean; message: string }> => {
    return { 
      success: true, 
      message: `Payment request of KSH ${amount} sent to ${phone} for ${description}` 
    };
  }
};
