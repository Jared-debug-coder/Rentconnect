import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Building, Clock, Home, Info, MapPin, Shield, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const registrationSchema = z.object({
  fullName: z.string().min(3, { message: "Full name is required" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  county: z.string().min(2, { message: "County is required" }),
  preferredArea: z.string().optional(),
});

type RegistrationFormValues = z.infer<typeof registrationSchema>;

const AffordableHousing = () => {
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      county: "",
      preferredArea: "",
    },
  });

  function onRegisterSubmit(values: RegistrationFormValues) {
    console.log("Registration values:", values);
    setRegistrationSuccess(true);
    toast({
      title: "Registration Successful",
      description: "You have been registered for the Affordable Housing Program. We'll notify you when properties become available.",
    });
    form.reset();
  }

  const handleUnavailableProperties = (e: React.MouseEvent) => {
    e.preventDefault();
    toast({
      title: "Properties Not Available Yet",
      description: "The Government Affordable Housing properties have not been launched yet. Please register your interest to be notified once they become available.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
    {/* Hero Section */}
<section className="relative min-h-screen">
  {/* Background Image */}
  <div className="absolute inset-0 bg-[url('/images/housing7.jpg')] bg-cover bg-center z-0" />

  {/* Optional Gradient Overlay (for a nice color blend) */}
  <div className="absolute inset-0 bg-gradient-to-r from-[#6E59A5]/70 to-[#0EA5E9]/70 z-10" />

  {/* Content */}
  <div className="container px-4 py-20 relative z-20 flex items-center justify-center min-h-screen">
    <div className="max-w-4xl mx-auto text-center">
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
        Government Affordable Housing Initiative
      </h1>
      <p className="text-xl text-white/90 mb-8">
        Quality and affordable housing for all Kenyans
      </p>
      <Button 
        size="lg" 
        className="bg-white text-[#6E59A5] hover:bg-white/90"
        onClick={() => {
          const registerSection = document.getElementById("register-section");
          if (registerSection) {
            registerSection.scrollIntoView({ behavior: "smooth" });
          }
        }}
      >
        Register Your Interest
      </Button>
    </div>
  </div>
</section>

      
      <div className="container px-4 py-10 flex-1">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-amber-50 to-sky-50 border border-amber-200 rounded-lg p-6 mb-10">
            <div className="flex items-start">
              <Clock className="h-10 w-10 text-[#8B5CF6] mr-4 mt-1 flex-shrink-0" />
              <div>
                <h2 className="text-2xl font-semibold text-[#6E59A5] mb-2">
                  Coming Soon!
                </h2>
                <p className="text-gray-700 mb-4">
                  The Government of Kenya Affordable Housing Properties will be launched soon on our platform. 
                  Register your interest now to be notified when these properties become available.
                </p>
                <Button 
                  className="bg-[#8B5CF6] hover:bg-[#7E69AB]"
                  onClick={() => {
                    const registerSection = document.getElementById("register-section");
                    if (registerSection) {
                      registerSection.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                >
                  Register Interest
                </Button>
              </div>
            </div>
          </div>
          
          <div className="space-y-8 mb-12">
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">About the Initiative</h2>
              <p className="text-gray-700 mb-4">
                The Affordable Housing Program is one of the Government of Kenya's Big 4 Agenda pillars aimed at delivering 
                affordable housing units to Kenyans. The program seeks to address the housing deficit by providing decent 
                and affordable housing to low and middle-income households.
              </p>
              <p className="text-gray-700">
                Through this initiative, the government plans to build 500,000 affordable housing units across the country 
                by 2027, ensuring that more Kenyans have access to decent housing at affordable rates.
              </p>
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">Key Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
                  <div className="flex items-center mb-3">
                    <Home className="h-6 w-6 text-[#8B5CF6] mr-2" />
                    <h3 className="font-medium text-lg">Affordable Pricing</h3>
                  </div>
                  <p className="text-gray-600">
                    Units priced between KSh 1.5M to KSh 3M, making homeownership accessible to more Kenyans.
                  </p>
                </div>
                
                <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
                  <div className="flex items-center mb-3">
                    <MapPin className="h-6 w-6 text-[#8B5CF6] mr-2" />
                    <h3 className="font-medium text-lg">Strategic Locations</h3>
                  </div>
                  <p className="text-gray-600">
                    Properties located in areas with access to public transport, schools, healthcare, and other amenities.
                  </p>
                </div>
                
                <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
                  <div className="flex items-center mb-3">
                    <Building className="h-6 w-6 text-[#8B5CF6] mr-2" />
                    <h3 className="font-medium text-lg">Modern Designs</h3>
                  </div>
                  <p className="text-gray-600">
                    Contemporary architecture with quality finishes, maximizing space and comfort.
                  </p>
                </div>
                
                <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
                  <div className="flex items-center mb-3">
                    <Info className="h-6 w-6 text-[#8B5CF6] mr-2" />
                    <h3 className="font-medium text-lg">Flexible Payment</h3>
                  </div>
                  <p className="text-gray-600">
                    Various payment options including mortgages and tenant purchase schemes to accommodate different financial situations.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">Program Benefits</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-full mr-3">
                    <Shield className="h-6 w-6 text-[#0EA5E9]" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-2">Government Backed</h3>
                    <p className="text-gray-600">
                      Official government program ensuring quality and legitimacy of all housing projects
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-full mr-3">
                    <Users className="h-6 w-6 text-[#0EA5E9]" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-2">Community Focused</h3>
                    <p className="text-gray-600">
                      Developments designed with community spaces and amenities for improved living standards
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-full mr-3">
                    <Building className="h-6 w-6 text-[#0EA5E9]" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-2">Sustainable Design</h3>
                    <p className="text-gray-600">
                      Energy-efficient designs with water conservation features to reduce utility costs
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">How to Apply</h2>
              <ol className="list-decimal pl-5 space-y-2 text-gray-700">
                <li>Register on the Boma Yangu portal (Government's official housing platform)</li>
                <li>Submit your application with all required documentation</li>
                <li>Wait for verification and approval</li>
                <li>Once approved, you'll be notified about available units</li>
                <li>Make your down payment and complete the necessary paperwork</li>
              </ol>
              
              <div className="mt-6">
                <Button asChild className="bg-[#8B5CF6] hover:bg-[#7E69AB]">
                  <a href="https://bomayangu.go.ke/" target="_blank" rel="noopener noreferrer">
                    Visit Boma Yangu Portal
                  </a>
                </Button>
              </div>
            </div>

            {/* Registration Form */}
            <div id="register-section" className="bg-gradient-to-br from-violet-50 to-blue-50 p-6 rounded-lg border border-violet-100">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">Register Your Interest</h2>
              <p className="text-gray-700 mb-6">
                Complete the form below to register your interest in the Affordable Housing Program. 
                We'll notify you when new properties become available in your preferred area.
              </p>
              
              {registrationSuccess ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-medium text-green-800 mb-2">Registration Successful!</h3>
                  <p className="text-green-700">
                    Thank you for your interest in the Affordable Housing Program. 
                    We'll notify you as soon as properties become available.
                  </p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => setRegistrationSuccess(false)}
                  >
                    Register Another Person
                  </Button>
                </div>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onRegisterSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" {...field} />
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
                              <Input type="email" placeholder="john@example.com" {...field} />
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
                              <Input placeholder="+254 700 000000" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="county"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>County</FormLabel>
                            <FormControl>
                              <Input placeholder="Nairobi" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="preferredArea"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Preferred Area (Optional)</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., Westlands, Parklands" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="pt-4">
                      <Button type="submit" className="bg-[#8B5CF6] hover:bg-[#7E69AB] w-full md:w-auto">
                        Register Interest
                      </Button>
                    </div>
                  </form>
                </Form>
              )}
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-gray-600 mb-6">
              Want to explore other housing options while waiting for affordable housing units?
            </p>
            <Button 
              variant="outline" 
              className="mr-4"
              onClick={handleUnavailableProperties}
            >
              Browse Available Properties
            </Button>
            <Link to="/contact">
              <Button className="bg-[#8B5CF6] hover:bg-[#7E69AB]">Contact Us for Assistance</Button>
            </Link>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AffordableHousing;