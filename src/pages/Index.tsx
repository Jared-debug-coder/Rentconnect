import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PropertySearch } from "@/components/PropertySearch";
import { PropertyList } from "@/components/PropertyList";
import { Button } from "@/components/ui/button";
import { 
  CheckCircle2, 
  Home, 
  Shield, 
  Clock, 
  Search, 
  CreditCard,
  Calendar
} from "lucide-react";
import { Link } from "react-router-dom";
import { UserRole } from "@/types";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="hero">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-500/20 to-brand-700/20 z-0" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3')] bg-cover bg-center opacity-30 z-0" />
        
        <div className="container relative z-10 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Find Your Perfect Rental Home
            </h1>
            <p className="text-xl text-gray-800 mb-8">
              Connecting landlords and tenants for a seamless rental experience
            </p>
            
            <div className="bg-white/90 backdrop-blur-sm p-5 rounded-lg shadow-lg">
              <PropertySearch />
            </div>
            
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              {!user ? (
                <>
                  <Link to="/affordable-housing">
                    <Button size="lg" variant="secondary" className="font-semibold">
                      Government Housing Initiative
                    </Button>
                  </Link>
                </>
              ) : (
                <Link to={user.role === UserRole.LANDLORD ? "/landlord/dashboard" : "/properties"}>
                  <Button size="lg" className="font-semibold">
                    {user.role === UserRole.LANDLORD ? "Go to Dashboard" : "Browse Properties"}
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Properties Section */}
      <section className="py-16 bg-white">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Properties</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Browse our selection of top rental properties across the country
            </p>
          </div>
          
          <PropertyList />
          
          <div className="text-center mt-10">
            <Link to="/properties">
              <Button variant="outline" size="lg">
                View All Properties
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              RentConnect makes finding and listing rental properties simple and efficient
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* For Tenants */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-brand-500 mb-4 flex justify-center">
                <Search className="h-12 w-12" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center">For Tenants</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Search for properties by location, budget, and features</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Book viewing appointments online</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Contact landlords directly through the platform</span>
                </li>
              </ul>
              <div className="mt-6 text-center">
                <Link to="/register">
                  <Button>Find a Home</Button>
                </Link>
              </div>
            </div>
            
            {/* For Landlords */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-brand-500 mb-4 flex justify-center">
                <Home className="h-12 w-12" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center">For Landlords</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>List your properties with detailed information</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Verify listings with a small KSh 500 fee</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Manage bookings and inquiries in one place</span>
                </li>
              </ul>
              <div className="mt-6 text-center">
                <Link to="/register">
                  <Button>List a Property</Button>
                </Link>
              </div>
            </div>
            
            {/* Booking Process */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-brand-500 mb-4 flex justify-center">
                <Calendar className="h-12 w-12" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center">Booking Process</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Schedule property viewings at convenient times</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Receive email/SMS confirmations automatically</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Landlords are notified of booking requests</span>
                </li>
              </ul>
              <div className="mt-6 text-center">
                <Link to="/how-it-works">
                  <Button>Learn More</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose RentConnect</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're revolutionizing the rental experience for both landlords and tenants
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-brand-50 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-brand-500" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Verified Listings</h3>
              <p className="text-gray-600">
                All listings are verified to ensure authenticity and quality
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-brand-50 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-brand-500" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Easy Scheduling</h3>
              <p className="text-gray-600">
                Book property viewings online with just a few clicks
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-brand-50 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-brand-500" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Smart Search</h3>
              <p className="text-gray-600">
                Find exactly what you're looking for with our advanced filters
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-brand-50 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="h-8 w-8 text-brand-500" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Secure Payments</h3>
              <p className="text-gray-600">
                Process listing fees securely through MPesa integration
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-brand-500 text-white">
        <div className="container px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of landlords and tenants using RentConnect today
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/register">
              <Button size="lg" variant="secondary" className="font-semibold bg-white text-brand-500 hover:bg-gray-100">
                Create an Account
              </Button>
            </Link>
            <Link to="/properties">
              <Button size="lg" variant="outline" className="font-semibold bg-white text-brand-500 hover:bg-gray-100">
                Browse Properties
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;