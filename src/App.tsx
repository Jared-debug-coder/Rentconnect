// src/App.tsx
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { LocationProvider } from "@/contexts/LocationContext";

// Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Properties from "./pages/Properties";
import PropertyDetails from "./pages/PropertyDetails";
import HowItWorks from "./pages/HowItWorks";
import Contact from "./pages/Contact";
import LandlordDashboard from "./pages/landlord/Dashboard";
import AddProperty from "./pages/landlord/AddProperty";
import TenantDashboard from "./pages/tenant/Dashboard";
import NotFound from "./pages/NotFound";
import AffordableHousing from "./pages/AffordableHousing";

// Resource Pages
import RentalGuides from "./pages/resources/RentalGuides"; // Import RentalGuides.tsx

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <LocationProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter basename="/Rentconnect">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/properties" element={<Properties />} />
              <Route path="/properties/:id" element={<PropertyDetails />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/affordable-housing" element={<AffordableHousing />} />

              {/* Use RentalGuides for Tips page */}
              <Route path="/tips" element={<RentalGuides />} />

              {/* Landlord routes */}
              <Route path="/landlord/dashboard" element={<LandlordDashboard />} />
              <Route path="/landlord/add-property" element={<AddProperty />} />
              
              {/* Tenant routes */}
              <Route path="/tenant/dashboard" element={<TenantDashboard />} />
              
              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </LocationProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
