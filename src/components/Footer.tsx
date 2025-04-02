
import { Home, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Home className="h-6 w-6 text-brand-400" />
              <span className="text-xl font-semibold">RentConnect</span>
            </div>
            <p className="text-gray-400 mb-4">
              Connecting landlords and tenants for a seamless rental experience in Kenya. Find your perfect home or list your property today.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/properties" className="text-gray-400 hover:text-white transition-colors">
                  Properties
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-gray-400 hover:text-white transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-gray-400 hover:text-white transition-colors">
                  Register
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-medium mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="/resources/rental-guides" className="text-gray-400 hover:text-white transition-colors">
                  Rental Guides
                </a>
                <p className="text-xs text-gray-500 mt-1">
                  Comprehensive guides to help you navigate the rental process in Kenya.
                </p>
              </li>
              <li>
                <a href="/resources/market-reports" className="text-gray-400 hover:text-white transition-colors">
                  Property Market Reports
                </a>
                <p className="text-xs text-gray-500 mt-1">
                  Quarterly analysis of property trends and pricing across major Kenyan cities.
                </p>
              </li>
              <li>
                <a href="/resources/tenant-rights" className="text-gray-400 hover:text-white transition-colors">
                  Tenant Rights
                </a>
                <p className="text-xs text-gray-500 mt-1">
                  Learn about your legal rights and protections as a tenant in Kenya.
                </p>
              </li>
              <li>
                <a href="/resources/landlord-tips" className="text-gray-400 hover:text-white transition-colors">
                  Landlord Tips
                </a>
                <p className="text-xs text-gray-500 mt-1">
                  Best practices for property management and tenant relations.
                </p>
              </li>
              <li>
                <a href="/legal/privacy" className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </a>
                <p className="text-xs text-gray-500 mt-1">
                  How we protect and handle your personal information.
                </p>
              </li>
              <li>
                <a href="/legal/terms" className="text-gray-400 hover:text-white transition-colors">
                  Terms of Service
                </a>
                <p className="text-xs text-gray-500 mt-1">
                  Rules and guidelines for using our platform.
                </p>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-medium mb-4">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                <span className="text-gray-400">123 Main Street, Nairobi, Kenya</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-gray-400" />
                <a href="tel:+254710464858" className="text-gray-400 hover:text-white transition-colors">
                  +254 710 464 858
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-gray-400" />
                <a href="mailto:info@rentconnect.co.ke" className="text-gray-400 hover:text-white transition-colors">
                  info@rentconnect.co.ke
                </a>
              </div>
              <div className="mt-4">
                <p className="text-gray-400">
                  Office Hours: Mon-Fri, 8:00 AM - 5:00 PM
                </p>
                <p className="text-gray-400 mt-1">
                  Weekend Support: Sat, 9:00 AM - 1:00 PM
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} RentConnect. All rights reserved. The premier property rental platform in Kenya.</p>
        </div>
      </div>
    </footer>
  );
}
