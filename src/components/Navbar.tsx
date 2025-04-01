
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/types";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Home, User, LogOut, LogIn, Menu, X } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo and brand name */}
        <Link to="/" className="flex items-center space-x-2">
          <Home className="h-6 w-6 text-brand-500" />
          <span className="text-xl font-semibold text-brand-500">RentConnect</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-gray-700 hover:text-brand-500 transition-colors">
            Home
          </Link>
          <Link to="/properties" className="text-gray-700 hover:text-brand-500 transition-colors">
            Properties
          </Link>
          <Link to="/how-it-works" className="text-gray-700 hover:text-brand-500 transition-colors">
            How It Works
          </Link>
          <Link to="/contact" className="text-gray-700 hover:text-brand-500 transition-colors">
            Contact
          </Link>
        </nav>

        {/* Auth buttons / User menu */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                className="flex items-center space-x-2"
                onClick={() => navigate(user.role === UserRole.LANDLORD ? '/landlord/dashboard' : '/tenant/dashboard')}
              >
                <User className="h-5 w-5" />
                <span>{user.name}</span>
              </Button>
              <Button variant="outline" onClick={logout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <Button variant="ghost" onClick={() => navigate('/login')}>
                <LogIn className="h-4 w-4 mr-2" />
                Login
              </Button>
              <Button onClick={() => navigate('/register')}>
                Sign Up
              </Button>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <button 
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={toggleMobileMenu}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white px-4 pt-2 pb-4 shadow-lg">
          <div className="flex flex-col space-y-3">
            <Link 
              to="/" 
              className="px-3 py-2 rounded-md text-gray-700 hover:bg-brand-50 hover:text-brand-500"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/properties" 
              className="px-3 py-2 rounded-md text-gray-700 hover:bg-brand-50 hover:text-brand-500"
              onClick={() => setMobileMenuOpen(false)}
            >
              Properties
            </Link>
            <Link 
              to="/how-it-works" 
              className="px-3 py-2 rounded-md text-gray-700 hover:bg-brand-50 hover:text-brand-500"
              onClick={() => setMobileMenuOpen(false)}
            >
              How It Works
            </Link>
            <Link 
              to="/contact" 
              className="px-3 py-2 rounded-md text-gray-700 hover:bg-brand-50 hover:text-brand-500"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>

            <div className="border-t border-gray-200 my-2 pt-2">
              {user ? (
                <>
                  <div 
                    className="px-3 py-2 rounded-md text-gray-700 hover:bg-brand-50 hover:text-brand-500 cursor-pointer flex items-center"
                    onClick={() => {
                      navigate(user.role === UserRole.LANDLORD ? '/landlord/dashboard' : '/tenant/dashboard');
                      setMobileMenuOpen(false);
                    }}
                  >
                    <User className="h-5 w-5 mr-2" />
                    Dashboard
                  </div>
                  <div 
                    className="px-3 py-2 rounded-md text-gray-700 hover:bg-brand-50 hover:text-brand-500 cursor-pointer flex items-center"
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                  >
                    <LogOut className="h-5 w-5 mr-2" />
                    Logout
                  </div>
                </>
              ) : (
                <>
                  <div 
                    className="px-3 py-2 rounded-md text-gray-700 hover:bg-brand-50 hover:text-brand-500 cursor-pointer flex items-center"
                    onClick={() => {
                      navigate('/login');
                      setMobileMenuOpen(false);
                    }}
                  >
                    <LogIn className="h-5 w-5 mr-2" />
                    Login
                  </div>
                  <Button 
                    className="w-full mt-2"
                    onClick={() => {
                      navigate('/register');
                      setMobileMenuOpen(false);
                    }}
                  >
                    Sign Up
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
