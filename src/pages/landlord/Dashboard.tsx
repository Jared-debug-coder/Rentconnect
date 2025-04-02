
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
  CardFooter,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
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
  Loader2,
  DollarSign,
  BarChart3,
  Bell,
  UserCheck,
  BuildingIcon,
  MapPin,
  Bed,
  Bath,
  Eye,
  Phone,
  Mail
} from "lucide-react";

const LandlordDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
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
        toast({
          title: "Error",
          description: "Failed to load dashboard data. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [user, toast]);

  const handleConfirmBooking = (bookingId: string) => {
    api.updateBookingStatus(bookingId, "confirmed")
      .then(() => {
        setBookings(prev => 
          prev.map(booking => 
            booking.id === bookingId 
              ? { ...booking, status: "confirmed" } 
              : booking
          )
        );
        toast({
          title: "Booking Confirmed",
          description: "The viewing has been confirmed.",
        });
      })
      .catch(error => {
        console.error("Error confirming booking:", error);
        toast({
          title: "Action Failed",
          description: "Could not confirm the booking. Please try again.",
          variant: "destructive",
        });
      });
  };

  const handleDeclineBooking = (bookingId: string) => {
    api.updateBookingStatus(bookingId, "cancelled")
      .then(() => {
        setBookings(prev => 
          prev.map(booking => 
            booking.id === bookingId 
              ? { ...booking, status: "cancelled" } 
              : booking
          )
        );
        toast({
          title: "Booking Declined",
          description: "The viewing request has been declined.",
        });
      })
      .catch(error => {
        console.error("Error declining booking:", error);
        toast({
          title: "Action Failed",
          description: "Could not decline the booking. Please try again.",
          variant: "destructive",
        });
      });
  };
  
  // Ensure user is a landlord
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  if (user.role !== UserRole.LANDLORD) {
    return <Navigate to="/" />;
  }

  const pendingBookingsCount = bookings.filter(b => b.status === "pending").length;
  const confirmedBookingsCount = bookings.filter(b => b.status === "confirmed").length;
  const verifiedPropertiesCount = properties.filter(p => p.isVerified).length;
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <div className="container px-4 py-8">
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Landlord Dashboard</h1>
            <p className="text-gray-600">Welcome back, {user.name}</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Link to="/landlord/add-property">
              <Button className="bg-brand-500 hover:bg-brand-600">
                <Plus className="h-4 w-4 mr-2" />
                Add New Property
              </Button>
            </Link>
          </div>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-10 w-10 text-brand-500 animate-spin" />
          </div>
        ) : (
          <>
            {/* Dashboard Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card className="bg-white border-l-4 border-brand-500">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Properties
                  </CardTitle>
                  <div className="h-8 w-8 rounded-full bg-brand-100 flex items-center justify-center">
                    <BuildingIcon className="h-4 w-4 text-brand-500" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{properties.length}</div>
                  <p className="text-xs text-muted-foreground">
                    {verifiedPropertiesCount} verified
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-white border-l-4 border-amber-500">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Pending Bookings
                  </CardTitle>
                  <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center">
                    <Bell className="h-4 w-4 text-amber-500" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{pendingBookingsCount}</div>
                  <p className="text-xs text-muted-foreground">
                    {confirmedBookingsCount} confirmed
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-white border-l-4 border-green-500">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Potential Revenue
                  </CardTitle>
                  <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                    <DollarSign className="h-4 w-4 text-green-500" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">KSh {properties.reduce((sum, property) => sum + property.price, 0).toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">
                    Monthly total
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-white border-l-4 border-purple-500">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Account Status
                  </CardTitle>
                  <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                    <UserCheck className="h-4 w-4 text-purple-500" />
                  </div>
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
              <TabsList className="bg-white">
                <TabsTrigger value="properties" className="flex items-center">
                  <Home className="h-4 w-4 mr-2" />
                  Properties
                </TabsTrigger>
                <TabsTrigger value="bookings" className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  Bookings
                </TabsTrigger>
                <TabsTrigger value="analytics" className="flex items-center">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Analytics
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
                    <Button className="bg-brand-500 hover:bg-brand-600">
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
                      <Card key={property.id} className="overflow-hidden hover:shadow-md transition-shadow">
                        <div className="aspect-video relative">
                          <img
                            src={property.images[0] || "https://images.unsplash.com/photo-1568605114967-8130f3a36994"}
                            alt={property.title}
                            className="w-full h-full object-cover"
                          />
                          {property.isVerified ? (
                            <Badge className="absolute top-2 right-2 bg-green-500 text-white">
                              Verified
                            </Badge>
                          ) : (
                            <Badge className="absolute top-2 right-2 bg-amber-500 text-white">
                              Pending Verification
                            </Badge>
                          )}
                        </div>
                        <CardHeader>
                          <CardTitle className="text-lg truncate">{property.title}</CardTitle>
                          <CardDescription>
                            KSh {property.price.toLocaleString()}/month • {property.type}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <div className="flex items-center text-sm text-gray-600">
                            <MapPin className="h-4 w-4 mr-1 text-gray-500" />
                            <span className="truncate">{property.address}, {property.city}</span>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-2 mt-2">
                            <div className="flex items-center text-sm">
                              <Bed className="h-4 w-4 mr-1 text-gray-500" />
                              <span>{property.bedrooms} {property.bedrooms === 1 ? 'bed' : 'beds'}</span>
                            </div>
                            <div className="flex items-center text-sm">
                              <Bath className="h-4 w-4 mr-1 text-gray-500" />
                              <span>{property.bathrooms} {property.bathrooms === 1 ? 'bath' : 'baths'}</span>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between space-x-2">
                          <Link to={`/properties/${property.id}`} className="flex-1">
                            <Button variant="outline" className="w-full">
                              <Eye className="h-4 w-4 mr-2" />
                              View
                            </Button>
                          </Link>
                          {!property.isVerified && (
                            <Button className="bg-green-500 hover:bg-green-600">
                              Verify
                            </Button>
                          )}
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>
              
              {/* Bookings Tab */}
              <TabsContent value="bookings" className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Booking Requests</h2>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      All ({bookings.length})
                    </Button>
                    <Button variant="outline" size="sm" className="text-amber-500 border-amber-500">
                      Pending ({pendingBookingsCount})
                    </Button>
                    <Button variant="outline" size="sm" className="text-green-500 border-green-500">
                      Confirmed ({confirmedBookingsCount})
                    </Button>
                  </div>
                </div>
                
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
                        <Card key={booking.id} className={`
                          border-l-4 
                          ${booking.status === "confirmed" ? "border-green-500" : 
                            booking.status === "cancelled" ? "border-red-500" : 
                            "border-amber-500"}
                        `}>
                          <CardContent className="p-6">
                            <div className="flex flex-col md:flex-row justify-between">
                              <div>
                                <div className="flex items-center mb-2">
                                  <h3 className="font-semibold mr-2">
                                    {property?.title || "Unknown Property"}
                                  </h3>
                                  <Badge
                                    className={
                                      booking.status === "confirmed" 
                                        ? "bg-green-500 text-white" 
                                        : booking.status === "cancelled" 
                                          ? "bg-red-500 text-white" 
                                          : "bg-amber-500 text-white"
                                    }
                                  >
                                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                  </Badge>
                                </div>
                                <div className="space-y-2 text-sm">
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
                                  <div className="flex items-center">
                                    <Phone className="h-4 w-4 mr-1 text-green-500" />
                                    <a href={`tel:${booking.tenantPhone}`} className="text-green-600 hover:underline">
                                      {booking.tenantPhone}
                                    </a>
                                  </div>
                                  <div className="flex items-center">
                                    <Mail className="h-4 w-4 mr-1 text-blue-500" />
                                    <a href={`mailto:${booking.tenantEmail}`} className="text-blue-600 hover:underline">
                                      {booking.tenantEmail}
                                    </a>
                                  </div>
                                  {booking.message && (
                                    <p className="mt-2 text-gray-600 bg-gray-50 p-2 rounded italic">
                                      "{booking.message}"
                                    </p>
                                  )}
                                </div>
                              </div>
                              
                              <div className="flex items-center mt-4 md:mt-0 space-x-2">
                                {booking.status === "pending" && (
                                  <>
                                    <Button 
                                      variant="outline" 
                                      size="sm" 
                                      className="flex items-center text-green-500 border-green-500 hover:bg-green-50"
                                      onClick={() => handleConfirmBooking(booking.id)}
                                    >
                                      <Check className="h-4 w-4 mr-1" />
                                      Confirm
                                    </Button>
                                    <Button 
                                      variant="outline" 
                                      size="sm" 
                                      className="flex items-center text-red-500 border-red-500 hover:bg-red-50"
                                      onClick={() => handleDeclineBooking(booking.id)}
                                    >
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
              
              {/* Analytics Tab */}
              <TabsContent value="analytics">
                <Card>
                  <CardHeader>
                    <CardTitle>Property Analytics</CardTitle>
                    <CardDescription>
                      Track your property performance and tenant interest
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm">Most Viewed</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold truncate">
                            {properties[0]?.title || "No data"}
                          </div>
                          <p className="text-xs text-muted-foreground">
                            32 views this week
                          </p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm">Most Booked</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold truncate">
                            {properties[0]?.title || "No data"}
                          </div>
                          <p className="text-xs text-muted-foreground">
                            5 booking requests
                          </p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm">Conversion Rate</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">
                            45%
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Views to bookings
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div className="bg-gray-50 p-8 rounded-lg flex items-center justify-center">
                      <p className="text-gray-500">Detailed analytics charts will appear here</p>
                    </div>
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-medium mb-3">Personal Information</h3>
                        <Card className="bg-gray-50">
                          <CardContent className="pt-6">
                            <div className="space-y-2">
                              <div className="grid grid-cols-3">
                                <span className="font-medium text-gray-500">Name:</span>
                                <span className="col-span-2">{user.name}</span>
                              </div>
                              <div className="grid grid-cols-3">
                                <span className="font-medium text-gray-500">Email:</span>
                                <span className="col-span-2">{user.email}</span>
                              </div>
                              <div className="grid grid-cols-3">
                                <span className="font-medium text-gray-500">Phone:</span>
                                <span className="col-span-2">{user.phone || "Not provided"}</span>
                              </div>
                              <div className="grid grid-cols-3">
                                <span className="font-medium text-gray-500">Account Type:</span>
                                <span className="col-span-2">Landlord</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                      
                      <div>
                        <h3 className="font-medium mb-3">Account Preferences</h3>
                        <Card className="bg-gray-50">
                          <CardContent className="pt-6">
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <span>Email Notifications</span>
                                <Button variant="outline" size="sm">Manage</Button>
                              </div>
                              <div className="flex items-center justify-between">
                                <span>Payment Methods</span>
                                <Button variant="outline" size="sm">Manage</Button>
                              </div>
                              <div className="flex items-center justify-between">
                                <span>Security Settings</span>
                                <Button variant="outline" size="sm">Manage</Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button className="bg-brand-500 hover:bg-brand-600">Update Profile</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>
      
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default LandlordDashboard;
