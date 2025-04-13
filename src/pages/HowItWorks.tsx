
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Search,
  Calendar,
  CreditCard,
  Home,
  User,
  Check,
  Map,
} from "lucide-react";

const HowItWorks = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Header */}
      <div className="bg-brand-50 py-16">
        <div className="container px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">How RentConnect Works</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Simple steps to find your perfect rental home or list your property
          </p>
        </div>
      </div>
      
      {/* For Tenants */}
      <section className="py-16 bg-white">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">For Tenants</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Finding your next home is simple and stress-free with RentConnect
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-brand-50 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-brand-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Search Properties</h3>
              <p className="text-gray-600">
                Use our smart search to filter properties by location, price, and features to find exactly what you're looking for.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-brand-50 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-brand-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Book Viewings</h3>
              <p className="text-gray-600">
                Schedule property viewings online with just a few clicks. Choose a date and time that works for you.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-brand-50 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Home className="h-8 w-8 text-brand-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Find Your Home</h3>
              <p className="text-gray-600">
                Visit properties, choose your favorite, and connect directly with landlords to finalize your rental agreement.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-10">
            <Link to="/properties">
              <Button size="lg">
                Start Your Search
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* For Landlords */}
      <section className="py-16 bg-gray-50">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">For Landlords</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              List your properties easily and connect with quality tenants
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-brand-500 mb-4">
                <User className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold mb-2">1. Create Account</h3>
              <p className="text-gray-600">
                Sign up as a landlord to access your personalized dashboard.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-brand-500 mb-4">
                <Home className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold mb-2">2. List Property</h3>
              <p className="text-gray-600">
                Add detailed information about your property, including photos and features.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-brand-500 mb-4">
                <CreditCard className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold mb-2">3. Verify Listing</h3>
              <p className="text-gray-600">
                Pay a small verification fee (KSh 500) to make your listing visible to potential tenants.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-brand-500 mb-4">
                <Calendar className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold mb-2">4. Manage Bookings</h3>
              <p className="text-gray-600">
                Receive viewing requests from interested tenants and manage your appointments.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-10">
            <Link to="/register">
              <Button size="lg">
                Become a Landlord
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Verification Process */}
      <section className="py-16 bg-white">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Verification Process</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our verification process ensures quality listings and builds trust in our platform
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="bg-brand-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Why We Verify Listings</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Ensures all properties are real and accurately described</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Prevents spam and fraudulent listings</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Creates a trustworthy platform for both landlords and tenants</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Provides better quality listings for potential tenants</span>
                </li>
              </ul>
            </div>
            
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">Verification Fee</h3>
              <p className="mb-4">
                The one-time verification fee of KSh 500 is processed securely through M-Pesa and helps maintain the quality of our platform.
              </p>
              
              <div className="bg-white border rounded-lg p-6 mt-4">
                <h4 className="font-semibold mb-2">Payment Process:</h4>
                <ol className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="bg-brand-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">1</span>
                    <span>Add your property details through the landlord dashboard</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-brand-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">2</span>
                    <span>Complete the listing form with accurate information</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-brand-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">3</span>
                    <span>Pay the KSh 500 verification fee via M-Pesa</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-brand-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">4</span>
                    <span>Your listing will be verified and made visible to potential tenants</span>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Location Services */}
      <section className="py-16 bg-gray-50">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Location Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find properties near you or in your preferred location
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8 items-center max-w-4xl mx-auto">
            <div className="md:w-1/2">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <Map className="h-12 w-12 text-brand-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Smart Location Detection</h3>
                <p className="text-gray-600 mb-4">
                  Our platform can automatically detect your location to show you nearby properties, or you can manually enter your preferred location.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Automatic location detection with your permission</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Manual location entry for flexible searching</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Search across multiple cities and neighborhoods</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="md:w-1/2">
              <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Map location visual placeholder</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-brand-500 text-white">
        <div className="container px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join RentConnect today and find your perfect home or list your property
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

export default HowItWorks;
