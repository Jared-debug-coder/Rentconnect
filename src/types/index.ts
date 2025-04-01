
export enum UserRole {
  TENANT = "tenant",
  LANDLORD = "landlord",
  ADMIN = "admin"
}

export enum PropertyType {
  APARTMENT = "apartment",
  HOUSE = "house",
  BEDSITTER = "bedsitter",
  SINGLE_ROOM = "single room",
  ONE_BEDROOM = "1 bedroom",
  TWO_BEDROOM = "2 bedroom",
  THREE_BEDROOM = "3 bedroom"
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  phone?: string;
  createdAt: Date;
}

export interface Property {
  id: string;
  title: string;
  description: string;
  type: PropertyType;
  price: number;
  bedrooms: number;
  bathrooms: number;
  address: string;
  city: string;
  country: string;
  images: string[];
  features: string[];
  landlordId: string;
  landlordName: string;
  landlordPhone: string;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Booking {
  id: string;
  propertyId: string;
  tenantId: string;
  tenantName: string;
  tenantPhone: string;
  tenantEmail: string;
  date: Date;
  time: string;
  status: "pending" | "confirmed" | "cancelled";
  message?: string;
  createdAt: Date;
}

export interface PaymentDetails {
  phone: string;
  amount: number;
  description: string;
}
