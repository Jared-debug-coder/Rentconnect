
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole, PropertyType } from "@/types";
import { api } from "@/services/api";
import { useToast } from "@/components/ui/use-toast";
import { 
  Loader2, 
  Home, 
  Upload, 
  Check,
  AlertCircle
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

// Define form schema
const propertySchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  type: z.nativeEnum(PropertyType),
  price: z.coerce.number().min(1000, "Price must be at least 1,000 KSh"),
  bedrooms: z.coerce.number().min(0, "Must be a valid number"),
  bathrooms: z.coerce.number().min(0, "Must be a valid number"),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  country: z.string().default("Kenya"),
  features: z.array(z.string()).optional(),
  images: z.array(z.string()).optional(),
});

const AddProperty = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPaymentPrompt, setShowPaymentPrompt] = useState(false);
  const [propertyId, setPropertyId] = useState<string | null>(null);
  
  // Form setup
  const form = useForm<z.infer<typeof propertySchema>>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      title: "",
      description: "",
      type: PropertyType.APARTMENT,
      price: 0,
      bedrooms: 1,
      bathrooms: 1,
      address: "",
      city: "",
      country: "Kenya",
      features: [],
      images: ["https://images.unsplash.com/photo-1568605114967-8130f3a36994"],
    },
  });
  
  // Available features for checkbox selection
  const availableFeatures = [
    "Parking",
    "Security",
    "Water",
    "Electricity",
    "Internet",
    "Furnished",
    "Balcony",
    "Garden",
    "Gym",
    "Swimming Pool",
  ];
  
  // Handle form submission
  const onSubmit = async (values: z.infer<typeof propertySchema>) => {
    if (!user) return;
    
    setIsSubmitting(true);
    
    try {
      // Add property to the database - ensure all required properties are provided
      const property = await api.addProperty({
        title: values.title,
        description: values.description,
        type: values.type,
        price: values.price,
        bedrooms: values.bedrooms,
        bathrooms: values.bathrooms,
        address: values.address,
        city: values.city,
        country: values.country,
        features: values.features || [],
        images: values.images || [],
        landlordId: user.id,
        landlordName: user.name,
        landlordPhone: user.phone || "",
      });
      
      setPropertyId(property.id);
      
      toast({
        title: "Property Added Successfully",
        description: "Proceed to verify your listing with a payment.",
      });
      
      setShowPaymentPrompt(true);
    } catch (error) {
      console.error("Error adding property:", error);
      toast({
        title: "Error",
        description: "Failed to add property. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Handle property verification payment
  const handlePayment = async () => {
    if (!user?.phone) {
      toast({
        title: "Phone Number Required",
        description: "Please update your profile with a phone number to proceed with payment.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await api.initiatePayment(
        user.phone,
        500, // KSh 500 verification fee
        "Property Listing Verification"
      );
      
      if (response.success) {
        toast({
          title: "Payment Initiated",
          description: response.message,
        });
        
        // Simulate successful payment and verification
        if (propertyId) {
          await api.verifyProperty(propertyId);
        }
        
        setTimeout(() => {
          navigate("/landlord/dashboard");
        }, 2000);
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast({
        title: "Payment Failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Make sure the user is a landlord
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  if (user.role !== UserRole.LANDLORD) {
    return <Navigate to="/" />;
  }
  
  // If payment prompt is shown, display payment UI
  if (showPaymentPrompt) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <div className="flex-1 flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Verify Your Listing</CardTitle>
              <CardDescription>
                To make your property visible to tenants, a verification fee of KSh 500 is required.
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="bg-green-50 p-4 rounded-md flex items-start">
                <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                <div>
                  <p className="text-green-800 font-medium">Property Added Successfully</p>
                  <p className="text-green-700 text-sm">
                    Your property has been added to our database. Complete the verification to make it visible to tenants.
                  </p>
                </div>
              </div>
              
              <div className="border rounded-md p-4">
                <h3 className="font-medium mb-2">Payment Details</h3>
                <dl className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <dt>Amount:</dt>
                    <dd className="font-medium">KSh 500.00</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt>Payment Method:</dt>
                    <dd>M-Pesa</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt>Phone Number:</dt>
                    <dd>{user.phone || "Not provided"}</dd>
                  </div>
                </dl>
              </div>
              
              {!user.phone && (
                <div className="bg-amber-50 p-4 rounded-md flex items-start">
                  <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5 mr-2 flex-shrink-0" />
                  <div>
                    <p className="text-amber-800 font-medium">Phone Number Required</p>
                    <p className="text-amber-700 text-sm">
                      Please update your profile with a phone number to proceed with M-Pesa payment.
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
            
            <CardFooter className="flex flex-col space-y-2">
              <Button 
                className="w-full" 
                onClick={handlePayment}
                disabled={isSubmitting || !user.phone}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Pay with M-Pesa"
                )}
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => navigate("/landlord/dashboard")}
              >
                Skip for Now
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold">List a New Property</h1>
            <p className="text-gray-600">
              Provide details about your property to attract potential tenants
            </p>
          </div>
          
          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex justify-between">
              <div className={`flex-1 text-center ${step >= 1 ? "text-brand-500" : "text-gray-400"}`}>
                <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center ${step >= 1 ? "bg-brand-500 text-white" : "bg-gray-200"}`}>
                  1
                </div>
                <span className="text-sm mt-1 block">Basic Info</span>
              </div>
              <div className={`flex-1 text-center ${step >= 2 ? "text-brand-500" : "text-gray-400"}`}>
                <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center ${step >= 2 ? "bg-brand-500 text-white" : "bg-gray-200"}`}>
                  2
                </div>
                <span className="text-sm mt-1 block">Details & Features</span>
              </div>
              <div className={`flex-1 text-center ${step >= 3 ? "text-brand-500" : "text-gray-400"}`}>
                <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center ${step >= 3 ? "bg-brand-500 text-white" : "bg-gray-200"}`}>
                  3
                </div>
                <span className="text-sm mt-1 block">Review & Submit</span>
              </div>
            </div>
            <div className="relative h-2 bg-gray-200 mt-4 rounded-full overflow-hidden">
              <div 
                className="absolute top-0 left-0 h-full bg-brand-500 transition-all duration-300"
                style={{ width: `${((step - 1) / 2) * 100}%` }}
              ></div>
            </div>
          </div>
          
          <Card>
            <CardContent className="pt-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* Step 1: Basic Information */}
                  {step === 1 && (
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Property Title</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="e.g. Modern 2-Bedroom Apartment in Westlands" 
                                {...field} 
                              />
                            </FormControl>
                            <FormDescription>
                              Choose a descriptive title for your property
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Describe your property in detail..." 
                                className="min-h-[120px]"
                                {...field} 
                              />
                            </FormControl>
                            <FormDescription>
                              Include information about the property, neighborhood, and amenities
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="type"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Property Type</FormLabel>
                              <Select 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select type" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {Object.values(PropertyType).map((type) => (
                                    <SelectItem key={type} value={type}>
                                      {type.charAt(0).toUpperCase() + type.slice(1)}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="price"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Monthly Rent (KSh)</FormLabel>
                              <FormControl>
                                <Input 
                                  type="number" 
                                  placeholder="e.g. 15000" 
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="flex justify-end">
                        <Button type="button" onClick={() => setStep(2)}>
                          Next
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  {/* Step 2: Property Details */}
                  {step === 2 && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <FormField
                          control={form.control}
                          name="bedrooms"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Bedrooms</FormLabel>
                              <FormControl>
                                <Input 
                                  type="number" 
                                  min="0"
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="bathrooms"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Bathrooms</FormLabel>
                              <FormControl>
                                <Input 
                                  type="number" 
                                  min="0"
                                  step="0.5"
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="city"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>City</FormLabel>
                              <Select 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select city" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="Nairobi">Nairobi</SelectItem>
                                  <SelectItem value="Mombasa">Mombasa</SelectItem>
                                  <SelectItem value="Kisumu">Kisumu</SelectItem>
                                  <SelectItem value="Nakuru">Nakuru</SelectItem>
                                  <SelectItem value="Eldoret">Eldoret</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Address</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Street address or neighborhood" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div>
                        <FormLabel>Property Features</FormLabel>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                          {availableFeatures.map((feature) => (
                            <FormField
                              key={feature}
                              control={form.control}
                              name="features"
                              render={({ field }) => (
                                <FormItem className="flex items-center space-x-2">
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(feature)}
                                      onCheckedChange={(checked) => {
                                        const currentValues = field.value || [];
                                        if (checked) {
                                          field.onChange([...currentValues, feature]);
                                        } else {
                                          field.onChange(
                                            currentValues.filter((value) => value !== feature)
                                          );
                                        }
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="text-sm font-normal cursor-pointer">
                                    {feature}
                                  </FormLabel>
                                </FormItem>
                              )}
                            />
                          ))}
                        </div>
                      </div>
                      
                      <div className="border border-dashed border-gray-300 rounded-md p-6 text-center">
                        <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                        <h3 className="text-sm font-medium">Property Images</h3>
                        <p className="text-xs text-gray-500 mb-2">
                          Drag & drop images or click to browse
                        </p>
                        <Button variant="outline" type="button" size="sm">
                          Upload Images
                        </Button>
                        <p className="text-xs text-gray-500 mt-2">
                          Temporarily using placeholder images for demo
                        </p>
                      </div>
                      
                      <div className="flex justify-between">
                        <Button type="button" variant="outline" onClick={() => setStep(1)}>
                          Previous
                        </Button>
                        <Button type="button" onClick={() => setStep(3)}>
                          Next
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  {/* Step 3: Review and Submit */}
                  {step === 3 && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Review Property Information</h3>
                        
                        <div className="bg-gray-50 p-4 rounded-md space-y-4">
                          <div>
                            <h4 className="text-sm font-medium text-gray-500">Property Title</h4>
                            <p>{form.getValues("title")}</p>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <h4 className="text-sm font-medium text-gray-500">Property Type</h4>
                              <p>{form.getValues("type")}</p>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium text-gray-500">Monthly Rent</h4>
                              <p>KSh {form.getValues("price").toLocaleString()}</p>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium text-gray-500">Location</h4>
                              <p>{form.getValues("address")}, {form.getValues("city")}</p>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <h4 className="text-sm font-medium text-gray-500">Bedrooms</h4>
                              <p>{form.getValues("bedrooms")}</p>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium text-gray-500">Bathrooms</h4>
                              <p>{form.getValues("bathrooms")}</p>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-medium text-gray-500">Description</h4>
                            <p className="text-sm">{form.getValues("description")}</p>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-medium text-gray-500">Features</h4>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {form.getValues("features")?.map((feature) => (
                                <span 
                                  key={feature} 
                                  className="bg-brand-50 text-brand-700 px-2 py-1 rounded text-xs"
                                >
                                  {feature}
                                </span>
                              )) || "None specified"}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-brand-50 p-4 rounded-md">
                        <div className="flex items-start">
                          <div className="mr-3 text-brand-500">
                            <AlertCircle className="h-5 w-5" />
                          </div>
                          <div>
                            <h4 className="font-medium text-brand-700">Verification Required</h4>
                            <p className="text-sm text-brand-600">
                              To make your property visible to potential tenants, a verification fee of KSh 500 is required.
                              This helps us maintain quality listings on our platform.
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-between">
                        <Button type="button" variant="outline" onClick={() => setStep(2)}>
                          Previous
                        </Button>
                        <Button type="submit" disabled={isSubmitting}>
                          {isSubmitting ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Submitting...
                            </>
                          ) : (
                            "Submit Property"
                          )}
                        </Button>
                      </div>
                    </div>
                  )}
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AddProperty;
