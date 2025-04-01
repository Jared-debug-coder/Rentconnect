
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { 
  MapPin, 
  Bed, 
  Bath, 
  Home, 
  Calendar, 
  MessageSquare, 
  Mail,
  Check,
  Loader2,
  Shield,
  CreditCard
} from "lucide-react";
import { Property, Booking } from "@/types";
import { api } from "@/services/api";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const bookingSchema = z.object({
  date: z.string().min(1, "Please select a date"),
  time: z.string().min(1, "Please select a time"),
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  message: z.string().optional(),
});

const paymentSchema = z.object({
  phone: z.string().min(10, "Please enter a valid phone number"),
  amount: z.number().min(100, "Minimum amount is KSh 100"),
});

const PropertyDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<Property | null>(null);
  const [similarProperties, setSimilarProperties] = useState<Property[]>([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  
  const { user } = useAuth();
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof bookingSchema>>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      date: "",
      time: "",
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      message: "",
    },
  });

  const paymentForm = useForm<z.infer<typeof paymentSchema>>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      phone: user?.phone || "",
      amount: 1000,
    },
  });

  useEffect(() => {
    const fetchProperty = async () => {
      if (!id) return;
      
      setLoading(true);
      try {
        const data = await api.getPropertyById(id);
        setProperty(data);
        
        // Fetch similar properties
        if (data) {
          const allProperties = await api.getProperties();
          const similar = allProperties.filter(p => 
            p.id !== data.id && p.type === data.type
          ).slice(0, 3);
          setSimilarProperties(similar);
        }
      } catch (err) {
        console.error("Error fetching property:", err);
        setError("Failed to load property details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Today's date in YYYY-MM-DD format for the date input min
  const today = new Date().toISOString().split('T')[0];

  const onSubmitBooking = async (values: z.infer<typeof bookingSchema>) => {
    if (!property || !id) return;
    
    setBookingLoading(true);
    
    try {
      const bookingData: Omit<Booking, 'id' | 'createdAt' | 'status'> = {
        propertyId: id,
        tenantId: user?.id || "guest",
        tenantName: values.name,
        tenantEmail: values.email,
        tenantPhone: values.phone,
        date: new Date(values.date),
        time: values.time,
        message: values.message
      };
      
      await api.createBooking(bookingData);
      
      setBookingSuccess(true);
      
      toast({
        title: "Booking Request Submitted",
        description: "Your viewing request has been sent. The property manager will contact you shortly.",
      });
      
      // Reset form after successful submission
      form.reset();
      
      // Close dialog after a brief delay to show success message
      setTimeout(() => {
        setBookingDialogOpen(false);
        setBookingSuccess(false);
      }, 2000);
    } catch (err) {
      console.error("Error creating booking:", err);
      toast({
        title: "Booking Failed",
        description: "There was a problem processing your request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setBookingLoading(false);
    }
  };

  const onSubmitPayment = async (values: z.infer<typeof paymentSchema>) => {
    if (!property) return;
    
    setPaymentLoading(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real implementation, this would call an API to your payment gateway
      const response = await api.initiatePayment(
        values.phone,
        values.amount,
        `Viewing fee for ${property.title}`
      );
      
      if (response.success) {
        setPaymentSuccess(true);
        
        toast({
          title: "Payment Initiated",
          description: `An STK push has been sent to ${values.phone}. Please complete the payment on your phone.`,
        });
        
        // Simulate successful payment after 5 seconds
        setTimeout(() => {
          toast({
            title: "Payment Successful",
            description: "Your payment has been received. You can now view the property details.",
            variant: "default",
          });
          
          // Close dialog after success
          setTimeout(() => {
            setPaymentDialogOpen(false);
            setPaymentSuccess(false);
          }, 1000);
        }, 5000);
      } else {
        throw new Error("Payment initialization failed");
      }
    } catch (err) {
      console.error("Error processing payment:", err);
      toast({
        title: "Payment Failed",
        description: "There was a problem processing your payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setPaymentLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex justify-center items-center">
          <Loader2 className="h-10 w-10 text-brand-500 animate-spin" />
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex justify-center items-center flex-col p-4">
          <h2 className="text-2xl font-bold text-red-500 mb-4">Error</h2>
          <p className="text-gray-600 mb-6">{error || "Property not found"}</p>
          <Link to="/properties">
            <Button>Back to Properties</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container px-4 py-8">
        <div className="mb-6">
          <Link to="/properties" className="text-brand-500 hover:underline flex items-center">
            ← Back to Properties
          </Link>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Property Images and Details */}
          <div className="lg:col-span-2">
            {/* Property Images */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              <div className="relative aspect-video">
                <img
                  src={property.images[0] || "https://images.unsplash.com/photo-1568605114967-8130f3a36994"}
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
                {property.isVerified && (
                  <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                    <Check className="mr-1 h-4 w-4" />
                    Verified
                  </div>
                )}
              </div>
              
              {/* Multiple images would go here in a real implementation */}
              <div className="p-4 flex overflow-x-auto gap-2">
                {/* Placeholder for multiple images */}
                <div className="flex-shrink-0 w-24 h-24 bg-gray-200 rounded"></div>
                <div className="flex-shrink-0 w-24 h-24 bg-gray-200 rounded"></div>
                <div className="flex-shrink-0 w-24 h-24 bg-gray-200 rounded"></div>
              </div>
            </div>
            
            {/* Property Details */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              <div className="p-6">
                <div className="flex flex-wrap items-start justify-between mb-4">
                  <div>
                    <h1 className="text-2xl font-bold">{property.title}</h1>
                    <div className="flex items-center text-gray-600 mt-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{property.address}, {property.city}</span>
                    </div>
                  </div>
                  <div className="bg-brand-500 text-white px-4 py-2 rounded-md font-bold">
                    KSh {property.price.toLocaleString()}/month
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="flex flex-col items-center p-3 bg-gray-50 rounded-md">
                    <Home className="h-6 w-6 text-gray-600 mb-1" />
                    <span className="text-sm text-gray-600">Type</span>
                    <span className="font-medium">{property.type}</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-gray-50 rounded-md">
                    <Bed className="h-6 w-6 text-gray-600 mb-1" />
                    <span className="text-sm text-gray-600">Bedrooms</span>
                    <span className="font-medium">{property.bedrooms}</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-gray-50 rounded-md">
                    <Bath className="h-6 w-6 text-gray-600 mb-1" />
                    <span className="text-sm text-gray-600">Bathrooms</span>
                    <span className="font-medium">{property.bathrooms}</span>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h2 className="text-lg font-semibold mb-3">Description</h2>
                  <p className="text-gray-700">{property.description}</p>
                </div>
                
                <div className="mb-6">
                  <h2 className="text-lg font-semibold mb-3">Features</h2>
                  <div className="grid grid-cols-2 gap-2">
                    {property.features.map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <Check className="h-4 w-4 text-green-500 mr-2" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="text-sm text-gray-600">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>Listed on {formatDate(property.createdAt)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Landlord Info */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Contact Property Manager</CardTitle>
                <CardDescription>Schedule a viewing of this property</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Shield className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm">Trusted Property Manager</span>
                  </div>
                  <div className="flex items-center">
                    <MessageSquare className="h-4 w-4 text-gray-500 mr-2" />
                    <span className="text-sm">Quick response time</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 text-gray-500 mr-2" />
                    <span className="text-sm">Contact via our secure platform</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-3">
                <Dialog open={bookingDialogOpen} onOpenChange={setBookingDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full mb-2">Book a Viewing</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Schedule a Property Viewing</DialogTitle>
                    </DialogHeader>
                    
                    {bookingSuccess ? (
                      <div className="py-6 text-center">
                        <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                          <Check className="h-6 w-6 text-green-600" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-1">Request Submitted!</h3>
                        <p className="text-gray-500 mb-4">
                          The property manager will contact you shortly.
                        </p>
                      </div>
                    ) : (
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmitBooking)} className="space-y-4">
                          <FormField
                            control={form.control}
                            name="date"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Preferred Viewing Date</FormLabel>
                                <FormControl>
                                  <Input 
                                    type="date" 
                                    min={today}
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="time"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Preferred Time</FormLabel>
                                <FormControl>
                                  <Input type="time" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Full Name</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email Address</FormLabel>
                                <FormControl>
                                  <Input type="email" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Phone Number</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Message (Optional)</FormLabel>
                                <FormControl>
                                  <Textarea 
                                    placeholder="Any questions about the property?"
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <div className="text-sm text-gray-500 my-2">
                            <p>Contact information will only be shared with the property manager after you submit your request.</p>
                          </div>
                          
                          <Button type="submit" className="w-full" disabled={bookingLoading}>
                            {bookingLoading ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Processing...
                              </>
                            ) : (
                              "Submit Viewing Request"
                            )}
                          </Button>
                        </form>
                      </Form>
                    )}
                  </DialogContent>
                </Dialog>

                {/* Pay to View Property Dialog */}
                <Dialog open={paymentDialogOpen} onOpenChange={setPaymentDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full bg-green-600 hover:bg-green-700">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Pay to View Live
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Pay to View Property Live</DialogTitle>
                    </DialogHeader>
                    
                    {paymentSuccess ? (
                      <div className="py-6 text-center">
                        <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                          <Check className="h-6 w-6 text-green-600" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-1">Payment Successful!</h3>
                        <p className="text-gray-500 mb-4">
                          Congratulations! You can now view the property live.
                        </p>
                        <Button className="mt-2" onClick={() => setPaymentDialogOpen(false)}>
                          View Property Now
                        </Button>
                      </div>
                    ) : (
                      <Form {...paymentForm}>
                        <form onSubmit={paymentForm.handleSubmit(onSubmitPayment)} className="space-y-4">
                          <p className="text-sm text-gray-600 mb-4">
                            Pay a small fee to get live access to view this property remotely without traveling to the location.
                          </p>
                          
                          <FormField
                            control={paymentForm.control}
                            name="amount"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Amount (KSh)</FormLabel>
                                <FormControl>
                                  <Input 
                                    type="number" 
                                    value={field.value}
                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                    disabled
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={paymentForm.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>M-Pesa Number</FormLabel>
                                <FormControl>
                                  <Input 
                                    {...field} 
                                    placeholder="07XXXXXXXX"
                                    className="font-medium"
                                  />
                                </FormControl>
                                <p className="text-sm text-gray-500 mt-1">
                                  Payment will be sent to 0710464858
                                </p>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <div className="text-sm text-gray-500 my-2">
                            <p>You will receive an STK push to complete the payment on your phone.</p>
                          </div>
                          
                          <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={paymentLoading}>
                            {paymentLoading ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Processing Payment...
                              </>
                            ) : (
                              "Pay Now"
                            )}
                          </Button>
                        </form>
                      </Form>
                    )}
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>
            
            {/* Similar Properties */}
            <Card>
              <CardHeader>
                <CardTitle>Similar Properties</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {similarProperties.map(similarProperty => (
                    <Link to={`/properties/${similarProperty.id}`} key={similarProperty.id} className="block">
                      <div className="flex gap-3 hover:bg-gray-50 p-2 rounded-lg transition-colors">
                        <div className="w-16 h-16 bg-gray-200 rounded-md flex-shrink-0 overflow-hidden">
                          <img 
                            src={similarProperty.images[0] || "https://images.unsplash.com/photo-1568605114967-8130f3a36994"} 
                            alt={similarProperty.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-medium text-sm line-clamp-1">{similarProperty.title}</h3>
                          <p className="text-sm text-gray-500">KSh {similarProperty.price.toLocaleString()}/month</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                  
                  {similarProperties.length === 0 && (
                    <p className="text-sm text-gray-600">
                      More similar properties will be listed here soon.
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default PropertyDetails;
