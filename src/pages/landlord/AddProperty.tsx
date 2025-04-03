
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
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
import { useToast } from "@/hooks/use-toast";
import { 
  Loader2, 
  Home, 
  Upload, 
  Check,
  AlertCircle,
  Image,
  X,
  CreditCard,
  PartyPopper,
  Phone
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";

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
  images: z.array(z.string()).min(1, "At least one image is required"),
  termsAccepted: z.boolean().refine(val => val === true, {
    message: "You must accept the terms and conditions",
  }),
});

const paymentSchema = z.object({
  phone: z.string().min(10, "Please enter a valid phone number").max(12, "Phone number is too long"),
});

const AddProperty = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [propertyId, setPropertyId] = useState<string | null>(null);
  const [uploadedImages, setUploadedImages] = useState<string[]>([
    "https://images.unsplash.com/photo-1568605114967-8130f3a36994",
    "https://images.unsplash.com/photo-1560518883-ce09059eeffa",
    "https://images.unsplash.com/photo-1600585154526-990dced4db0d"
  ]);
  const [phoneNumber, setPhoneNumber] = useState(user?.phone || "");
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);
  const [isCheckingPayment, setIsCheckingPayment] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  
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
      images: uploadedImages,
      termsAccepted: false,
    },
  });
  
  const paymentForm = useForm<z.infer<typeof paymentSchema>>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      phone: user?.phone || "",
    },
  });
  
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
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newImages = Array.from(e.target.files).map(file => URL.createObjectURL(file));
      const updatedImages = [...uploadedImages, ...newImages];
      setUploadedImages(updatedImages);
      form.setValue('images', updatedImages);
    }
  };
  
  const removeImage = (index: number) => {
    const updatedImages = [...uploadedImages];
    updatedImages.splice(index, 1);
    setUploadedImages(updatedImages);
    form.setValue('images', updatedImages);
  };
  
  const onSubmit = async (values: z.infer<typeof propertySchema>) => {
    if (!user) return;
    
    if (!values.termsAccepted) {
      toast({
        title: "Agreement Required",
        description: "You must accept the terms and conditions to list your property.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
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
      
      setShowPaymentDialog(true);
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
  
  const handlePayment = async () => {
    if (!paymentForm.getValues().phone || paymentForm.getValues().phone.trim() === "") {
      toast({
        title: "Phone Number Required",
        description: "Please enter a valid phone number to proceed with payment.",
        variant: "destructive",
      });
      return;
    }
    
    setIsPaymentProcessing(true);
    
    try {
      // Simulate payment processing with Till Number
      const tillNumber = "283746";
      
      toast({
        title: "Payment Instructions",
        description: `Please pay KSh 500 to Till Number: ${tillNumber}. System will automatically verify your payment.`,
      });
      
      // Simulate payment verification and STK push
      toast({
        title: "STK Push Sent",
        description: "Please check your phone and enter PIN to complete payment",
      });
      
      setTimeout(() => {
        setIsCheckingPayment(true);
        
        // After 3 seconds, simulate successful payment
        setTimeout(() => {
          if (propertyId) {
            api.verifyProperty(propertyId);
          }
          
          setPaymentSuccess(true);
          setShowSuccessMessage(true);
          setShowPaymentDialog(false); // Close the dialog
          
          toast({
            title: "Payment Confirmed!",
            description: "Your property has been successfully listed and is now live on the platform!",
            variant: "default",
          });
          
          setIsPaymentProcessing(false);
          setIsCheckingPayment(false);
          
          // Automatically redirect to dashboard after short delay
          setTimeout(() => {
            navigate("/landlord/dashboard");
          }, 3000);
        }, 3000);
      }, 2000);
    } catch (error) {
      console.error("Payment error:", error);
      toast({
        title: "Payment Failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive",
      });
      setIsPaymentProcessing(false);
    }
  };
  
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
        <div className="max-w-3xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold">List a New Property</h1>
            <p className="text-gray-600">
              Provide details about your property to attract potential tenants
            </p>
          </div>
          
          {showSuccessMessage && (
            <Alert className="mb-6 bg-green-50 border-green-200">
              <PartyPopper className="h-5 w-5 text-green-500" />
              <AlertTitle className="text-green-800 text-lg">Congratulations! Property Listed Successfully!</AlertTitle>
              <AlertDescription className="text-green-700">
                Your property has been successfully verified and is now live on our platform! 
                Tenants can now see your listing in the verified properties section. You can manage your 
                property from your dashboard. Thank you for listing with us!
              </AlertDescription>
              <Button 
                className="mt-2 bg-green-600 hover:bg-green-700" 
                onClick={() => navigate("/landlord/dashboard")}
              >
                View My Properties
              </Button>
            </Alert>
          )}
          
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
                <span className="text-sm mt-1 block">Images</span>
              </div>
              <div className={`flex-1 text-center ${step >= 4 ? "text-brand-500" : "text-gray-400"}`}>
                <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center ${step >= 4 ? "bg-brand-500 text-white" : "bg-gray-200"}`}>
                  4
                </div>
                <span className="text-sm mt-1 block">Review & Agreement</span>
              </div>
              <div className={`flex-1 text-center ${step >= 5 ? "text-brand-500" : "text-gray-400"}`}>
                <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center ${step >= 5 ? "bg-brand-500 text-white" : "bg-gray-200"}`}>
                  5
                </div>
                <span className="text-sm mt-1 block">Payment</span>
              </div>
            </div>
            <div className="relative h-2 bg-gray-200 mt-4 rounded-full overflow-hidden">
              <div 
                className="absolute top-0 left-0 h-full bg-brand-500 transition-all duration-300"
                style={{ width: `${((step - 1) / 4) * 100}%` }}
              ></div>
            </div>
          </div>
          
          <Card>
            <CardContent className="pt-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                  
                  {step === 3 && (
                    <div className="space-y-6">
                      <div>
                        <FormLabel className="block mb-3">Property Images</FormLabel>
                        <div className="border border-dashed border-gray-300 rounded-md p-6 text-center">
                          <Image className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                          <h3 className="text-sm font-medium">Upload Property Images</h3>
                          <p className="text-xs text-gray-500 mb-2">
                            Drag & drop images or click to browse. Upload multiple images to showcase your property.
                          </p>
                          <FormField
                            control={form.control}
                            name="images"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <div>
                                    <Input 
                                      id="image-upload"
                                      type="file" 
                                      accept="image/*"
                                      multiple
                                      className="hidden"
                                      onChange={handleImageUpload}
                                    />
                                    <Button 
                                      variant="outline" 
                                      type="button" 
                                      size="sm"
                                      onClick={() => document.getElementById('image-upload')?.click()}
                                    >
                                      Select Images
                                    </Button>
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <p className="text-xs text-gray-500 mt-2">
                            Add at least 3-5 high-quality images to make your listing stand out
                          </p>
                        </div>
                      </div>
                      
                      {uploadedImages.length > 0 && (
                        <div>
                          <h4 className="text-sm font-medium mb-2">Uploaded Images ({uploadedImages.length})</h4>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {uploadedImages.map((image, index) => (
                              <div key={index} className="relative rounded-md overflow-hidden h-24 bg-gray-100">
                                <img 
                                  src={image} 
                                  alt={`Property Image ${index + 1}`} 
                                  className="h-full w-full object-cover"
                                />
                                <button
                                  type="button"
                                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                                  onClick={() => removeImage(index)}
                                >
                                  <X className="h-3 w-3" />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      <div className="flex justify-between">
                        <Button type="button" variant="outline" onClick={() => setStep(2)}>
                          Previous
                        </Button>
                        <Button type="button" onClick={() => setStep(4)}>
                          Next
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  {step === 4 && (
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
                          
                          <div>
                            <h4 className="text-sm font-medium text-gray-500">Images</h4>
                            <div className="flex flex-wrap gap-2 mt-1">
                              {uploadedImages.map((image, index) => (
                                <div key={index} className="w-16 h-16 rounded-md overflow-hidden">
                                  <img 
                                    src={image} 
                                    alt={`Property Image ${index + 1}`} 
                                    className="h-full w-full object-cover"
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="border rounded-md p-4">
                        <h3 className="font-medium mb-2">Landlord Agreement</h3>
                        <div className="h-40 overflow-y-auto mb-4 p-3 border rounded bg-gray-50 text-sm text-gray-700">
                          <p className="mb-2">By listing your property on our platform, you agree to the following terms and conditions:</p>
                          <ol className="list-decimal pl-4 space-y-2">
                            <li>The information provided about the property is accurate and truthful.</li>
                            <li>You are the legal owner of the property or authorized to list it.</li>
                            <li>You will respond to inquiries from potential tenants in a timely manner.</li>
                            <li>You will not discriminate against potential tenants based on race, gender, religion, or any protected characteristics.</li>
                            <li>You understand that a verification fee of KSh 500 is required to make your property visible to potential tenants.</li>
                            <li>You agree to comply with all local housing laws and regulations.</li>
                            <li>You understand that our platform charges a commission fee for successful tenancy agreements.</li>
                            <li>You agree to maintain the accuracy of your listing and update it if any information changes.</li>
                            <li>You understand that we reserve the right to remove listings that violate our terms of service.</li>
                          </ol>
                        </div>
                        
                        <FormField
                          control={form.control}
                          name="termsAccepted"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>
                                  I agree to the terms and conditions
                                </FormLabel>
                                <FormDescription>
                                  You must accept these terms to list your property
                                </FormDescription>
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
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
                        <Button type="button" variant="outline" onClick={() => setStep(3)}>
                          Previous
                        </Button>
                        <Button 
                          type="button" 
                          onClick={() => {
                            if (!form.getValues("termsAccepted")) {
                              form.setError("termsAccepted", {
                                type: "manual",
                                message: "You must accept the terms and conditions",
                              });
                              return;
                            }
                            setStep(5);
                          }}
                        >
                          Next to Payment
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  {step === 5 && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Property Listing Payment</h3>
                        
                        <div className="bg-green-50 p-4 rounded-md flex items-start mb-6">
                          <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                          <div>
                            <p className="text-green-800 font-medium">Property Details Ready</p>
                            <p className="text-green-700 text-sm">
                              Your property information has been prepared. Complete the verification payment to make it visible to tenants.
                            </p>
                          </div>
                        </div>

                        <div className="border rounded-md p-4 mb-6">
                          <h3 className="font-medium mb-2">Payment Details</h3>
                          <dl className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <dt>Amount:</dt>
                              <dd className="font-medium">KSh 500.00</dd>
                            </div>
                            <div className="flex justify-between">
                              <dt>Payment Method:</dt>
                              <dd>Till Number</dd>
                            </div>
                            <div className="flex justify-between">
                              <dt>Payment To:</dt>
                              <dd className="font-medium">Till Number: 283746</dd>
                            </div>
                          </dl>
                        </div>
                        
                        <Form {...paymentForm}>
                          <form className="space-y-4">
                            <FormField
                              control={paymentForm.control}
                              name="phone"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Phone Number for Payment Verification</FormLabel>
                                  <FormControl>
                                    <Input 
                                      type="tel" 
                                      placeholder="07XXXXXXXX" 
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormDescription>
                                    Enter the phone number you'll use to make the payment
                                  </FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </form>
                        </Form>
                      </div>
                      
                      <div className="flex justify-between">
                        <Button type="button" variant="outline" onClick={() => setStep(4)}>
                          Previous
                        </Button>
                        <Button 
                          type="submit"
                          className="bg-green-600 hover:bg-green-700"
                          disabled={isSubmitting}
                          onClick={form.handleSubmit(onSubmit)}
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Submitting...
                            </>
                          ) : (
                            <>
                              <CreditCard className="mr-2 h-4 w-4" />
                              Submit and Pay KSh 500
                            </>
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
      
      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{paymentSuccess ? "Payment Successful!" : "Verify Your Listing"}</DialogTitle>
            <DialogDescription>
              {paymentSuccess 
                ? "Your property has been verified and is now live on our platform." 
                : "To make your property visible to tenants, a verification fee of KSh 500 is required."}
            </DialogDescription>
          </DialogHeader>
          
          {paymentSuccess ? (
            <div className="space-y-4">
              <div className="bg-green-50 p-4 rounded-md flex items-start">
                <PartyPopper className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                <div>
                  <p className="text-green-800 font-medium">Congratulations!</p>
                  <p className="text-green-700 text-sm">
                    Your property has been verified and is now live on our platform. It will be visible to all potential tenants searching for properties.
                  </p>
                </div>
              </div>
              <Button 
                className="w-full bg-green-600 hover:bg-green-700" 
                onClick={() => {
                  setShowPaymentDialog(false);
                  navigate("/landlord/dashboard");
                }}
              >
                View My Properties
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="border rounded-md p-4">
                <h3 className="font-medium mb-2">Payment Instructions</h3>
                <p className="text-sm mb-3">
                  To complete your property listing, please make a payment of <span className="font-bold">KSh 500</span> to our Till Number.
                </p>
                <div className="bg-gray-50 p-3 rounded-md text-center mb-3">
                  <p className="text-lg font-bold">Till Number: 283746</p>
                </div>
                <p className="text-sm text-gray-600">
                  After making the payment, the system will automatically verify and activate your listing.
                </p>
              </div>
              
              <div>
                <FormField
                  control={paymentForm.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number Used for Payment</FormLabel>
                      <FormControl>
                        <Input 
                          type="tel" 
                          placeholder="07XXXXXXXX" 
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            setPhoneNumber(e.target.value);
                          }}
                        />
                      </FormControl>
                      <FormDescription>
                        Enter the phone number you'll use to make the payment
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <Button 
                className="w-full"
                onClick={handlePayment}
                disabled={isPaymentProcessing}
              >
                {isPaymentProcessing ? (
                  <>
                    {isCheckingPayment ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Verifying Payment...
                      </>
                    ) : (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    )}
                  </>
                ) : (
                  <>
                    <CreditCard className="mr-2 h-4 w-4" />
                    Pay KSh 500 Now
                  </>
                )}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default AddProperty;
