
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
import { Booking, UserRole } from "@/types";
import { api } from "@/services/api";
import {
  Home,
  Calendar,
  Settings,
  User,
  Clock,
  Loader2,
  Search
} from "lucide-react";

const TenantDashboard = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      
      setLoading(true);
      try {
        // Fetch tenant bookings
        const bookingsData = await api.getTenantBookings(user.id);
        setBookings(bookingsData);
      } catch (error) {
        console.error("Error fetching tenant data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [user]);
  
  // Ensure user is a tenant
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  if (user.role !== UserRole.TENANT) {
    return <Navigate to="/" />;
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Tenant Dashboard</h1>
          <p className="text-gray-600">Manage your property bookings and preferences</p>
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
                    Viewing Appointments
                  </CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{bookings.length}</div>
                  <p className="text-xs text-muted-foreground">
                    {bookings.filter(b => b.status === "confirmed").length} confirmed
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Saved Properties
                  </CardTitle>
                  <Home className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">0</div>
                  <p className="text-xs text-muted-foreground">
                    Save properties to view later
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
            <Tabs defaultValue="bookings" className="space-y-4">
              <TabsList>
                <TabsTrigger value="bookings" className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  My Bookings
                </TabsTrigger>
                <TabsTrigger value="saved" className="flex items-center">
                  <Home className="h-4 w-4 mr-2" />
                  Saved Properties
                </TabsTrigger>
                <TabsTrigger value="settings" className="flex items-center">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </TabsTrigger>
              </TabsList>
              
              {/* Bookings Tab */}
              <TabsContent value="bookings" className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Your Viewing Appointments</h2>
                  <Link to="/properties">
                    <Button>
                      <Search className="h-4 w-4 mr-2" />
                      Find Properties
                    </Button>
                  </Link>
                </div>
                
                {bookings.length === 0 ? (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-10">
                      <Calendar className="h-12 w-12 text-gray-400 mb-4" />
                      <h3 className="text-lg font-medium">No Bookings Yet</h3>
                      <p className="text-gray-500 mb-4 text-center">
                        You haven't booked any property viewings yet. Start browsing properties to find your next home.
                      </p>
                      <Link to="/properties">
                        <Button>
                          <Search className="h-4 w-4 mr-2" />
                          Browse Properties
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    {bookings.map((booking) => (
                      <Card key={booking.id}>
                        <CardContent className="p-6">
                          <div className="flex flex-col md:flex-row justify-between">
                            <div>
                              <h3 className="font-semibold mb-2">
                                Property Viewing Appointment
                              </h3>
                              <div className="space-y-1 text-sm">
                                <div className="flex items-center">
                                  <Calendar className="h-4 w-4 mr-1 text-gray-500" />
                                  <span>
                                    {new Date(booking.date).toLocaleDateString()} at {booking.time}
                                  </span>
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
                              <Link to={`/properties/${booking.propertyId}`}>
                                <Button variant="outline" size="sm">
                                  View Property
                                </Button>
                              </Link>
                              
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
                    ))}
                  </div>
                )}
              </TabsContent>
              
              {/* Saved Properties Tab */}
              <TabsContent value="saved">
                <Card>
                  <CardHeader>
                    <CardTitle>Saved Properties</CardTitle>
                    <CardDescription>
                      Properties you've saved for later
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center justify-center py-10">
                    <Home className="h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium">No Saved Properties</h3>
                    <p className="text-gray-500 mb-4 text-center">
                      You haven't saved any properties yet. Browse properties and save your favorites.
                    </p>
                    <Link to="/properties">
                      <Button>
                        <Search className="h-4 w-4 mr-2" />
                        Browse Properties
                      </Button>
                    </Link>
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
                        <p><span className="font-medium">Account Type:</span> Tenant</p>
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

export default TenantDashboard;
