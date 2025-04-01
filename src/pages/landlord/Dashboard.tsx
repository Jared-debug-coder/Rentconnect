
import { useState, useEffect } from "react";
import { Navigate, Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { Property, Booking, UserRole } from "@/types";
import { api } from "@/services/api";
import {
  Home,
  Plus,
  Calendar,
  Settings,
  User,
  CreditCard,
  Check,
  XCircle,
  Clock,
  Loader2
} from "lucide-react";

const LandlordDashboard = () => {
  const { user } = useAuth();
  const [properties, setProperties] = useState<Property[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      
      setLoading(true);
      try {
        // Fetch landlord properties
        const propertiesData = await api.getLandlordProperties(user.id);
        setProperties(propertiesData);
        
        // Fetch landlord bookings
        const bookingsData = await api.getLandlordBookings(user.id);
        setBookings(bookingsData);
      } catch (error) {
        console.error("Error fetching landlord data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [user]);
  
  // Ensure user is a landlord
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  if (user.role !== UserRole.LANDLORD) {
    return <Navigate to="/" />;
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Landlord Dashboard</h1>
          <p className="text-gray-600">Manage your properties and bookings</p>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-10 w-10 text-brand-500 animate-spin" />
          </div>
        ) : (
          <>
            {/* Dashboard Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Properties
                  </CardTitle>
                  <Home className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{properties.length}</div>
                  <p className="text-xs text-muted-foreground">
                    {properties.filter(p => p.isVerified).length} verified
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Booking Requests
                  </CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{bookings.length}</div>
                  <p className="text-xs text-muted-foreground">
                    {bookings.filter(b => b.status === "pending").length} pending
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Account Status
                  </CardTitle>
                  <User className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Active</div>
                  <p className="text-xs text-muted-foreground">
                    Since {new Date(user.createdAt).toLocaleDateString()}
                  </p>
                </CardContent>
              </Card>
            </div>
            
            {/* Main Dashboard Content */}
            <Tabs defaultValue="properties" className="space-y-4">
              <TabsList>
                <TabsTrigger value="properties" className="flex items-center">
                  <Home className="h-4 w-4 mr-2" />
                  Properties
                </TabsTrigger>
                <TabsTrigger value="bookings" className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  Bookings
                </TabsTrigger>
                <TabsTrigger value="payments" className="flex items-center">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Payments
                </TabsTrigger>
                <TabsTrigger value="settings" className="flex items-center">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </TabsTrigger>
              </TabsList>
              
              {/* Properties Tab */}
              <TabsContent value="properties" className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Your Properties</h2>
                  <Link to="/landlord/add-property">
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Property
                    </Button>
                  </Link>
                </div>
                
                {properties.length === 0 ? (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-10">
                      <Home className="h-12 w-12 text-gray-400 mb-4" />
                      <h3 className="text-lg font-medium">No Properties Yet</h3>
                      <p className="text-gray-500 mb-4 text-center">
                        You haven't added any properties yet. Click the button below to add your first property.
                      </p>
                      <Link to="/landlord/add-property">
                        <Button>
                          <Plus className="h-4 w-4 mr-2" />
                          Add Property
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {properties.map((property) => (
                      <Card key={property.id} className="overflow-hidden">
                        <div className="aspect-video relative">
                          <img
                            src={property.images[0] || "https://images.unsplash.com/photo-1568605114967-8130f3a36994"}
                            alt={property.title}
                            className="w-full h-full object-cover"
                          />
                          {property.isVerified ? (
                            <Badge className="absolute top-2 right-2 bg-green-500">
                              Verified
                            </Badge>
                          ) : (
                            <Badge className="absolute top-2 right-2 bg-amber-500">
                              Pending Verification
                            </Badge>
                          )}
                        </div>
                        <CardHeader>
                          <CardTitle className="text-lg">{property.title}</CardTitle>
                          <CardDescription>
                            KSh {property.price.toLocaleString()}/month • {property.type}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <div className="flex items-center text-sm">
                            <Calendar className="h-4 w-4 mr-1 text-gray-500" />
                            <span>Listed on {new Date(property.createdAt).toLocaleDateString()}</span>
                          </div>
                          
                          {!property.isVerified && (
                            <div className="mt-4">
                              <Button className="w-full">
                                Pay to Verify
                              </Button>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>
              
              {/* Bookings Tab */}
              <TabsContent value="bookings" className="space-y-4">
                <h2 className="text-xl font-semibold">Booking Requests</h2>
                
                {bookings.length === 0 ? (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-10">
                      <Calendar className="h-12 w-12 text-gray-400 mb-4" />
                      <h3 className="text-lg font-medium">No Bookings Yet</h3>
                      <p className="text-gray-500 text-center">
                        You haven't received any booking requests yet.
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    {bookings.map((booking) => {
                      const property = properties.find(p => p.id === booking.propertyId);
                      return (
                        <Card key={booking.id}>
                          <CardContent className="p-6">
                            <div className="flex flex-col md:flex-row justify-between">
                              <div>
                                <h3 className="font-semibold mb-2">
                                  {property?.title || "Unknown Property"}
                                </h3>
                                <div className="space-y-1 text-sm">
                                  <div className="flex items-center">
                                    <Calendar className="h-4 w-4 mr-1 text-gray-500" />
                                    <span>
                                      {new Date(booking.date).toLocaleDateString()} at {booking.time}
                                    </span>
                                  </div>
                                  <div className="flex items-center">
                                    <User className="h-4 w-4 mr-1 text-gray-500" />
                                    <span>{booking.tenantName}</span>
                                  </div>
                                  <div>
                                    <Badge
                                      className={
                                        booking.status === "confirmed" 
                                          ? "bg-green-500" 
                                          : booking.status === "cancelled" 
                                            ? "bg-red-500" 
                                            : "bg-amber-500"
                                      }
                                    >
                                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                    </Badge>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="flex items-center mt-4 md:mt-0 space-x-2">
                                {booking.status === "pending" && (
                                  <>
                                    <Button variant="outline" size="sm" className="flex items-center">
                                      <Check className="h-4 w-4 mr-1" />
                                      Confirm
                                    </Button>
                                    <Button variant="outline" size="sm" className="flex items-center text-red-500 hover:text-red-600">
                                      <XCircle className="h-4 w-4 mr-1" />
                                      Decline
                                    </Button>
                                  </>
                                )}
                                {booking.status === "confirmed" && (
                                  <Button variant="outline" size="sm" className="flex items-center">
                                    <Clock className="h-4 w-4 mr-1" />
                                    Reschedule
                                  </Button>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                )}
              </TabsContent>
              
              {/* Payments Tab */}
              <TabsContent value="payments">
                <Card>
                  <CardHeader>
                    <CardTitle>Payment History</CardTitle>
                    <CardDescription>
                      Verify your properties with M-Pesa payments
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p>Your payment history will appear here.</p>
                    <p className="text-sm text-gray-600">
                      Each property listing requires a one-time verification fee of KSh 500.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Settings Tab */}
              <TabsContent value="settings">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                    <CardDescription>
                      Manage your personal information and preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-2">Personal Information</h3>
                      <div className="space-y-1 text-sm">
                        <p><span className="font-medium">Name:</span> {user.name}</p>
                        <p><span className="font-medium">Email:</span> {user.email}</p>
                        <p><span className="font-medium">Phone:</span> {user.phone || "Not provided"}</p>
                        <p><span className="font-medium">Account Type:</span> Landlord</p>
                      </div>
                    </div>
                    
                    <Button variant="outline">Update Profile</Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default LandlordDashboard;
