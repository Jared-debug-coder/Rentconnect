import { Home, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { FaTiktok, FaWhatsapp } from 'react-icons/fa'; // Import TikTok icon
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
            <a href="https://www.facebook.com/profile.php?id=61575045777018" target="_blank" rel="noopener noreferrer" className="transition-colors">
                <Facebook className="h-5 w-5" style={{ color: '#1877f2' }} /> 
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="transition-colors">
                <Twitter className="h-5 w-5" style={{ color: '#1da1f2' }} /> 
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="transition-colors">
                <Instagram className="h-5 w-5" style={{ color: '#e4405f' }} /> 
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="transition-colors">
                <Linkedin className="h-5 w-5" style={{ color: '#0077b5' }} /> 
              </a>
              <a href="https://www.tiktok.com/@rentconnect?_t=ZM-8vFbeJOwwtj&_r=1" target="_blank" rel="noopener noreferrer" className="transition-colors">
                <FaTiktok className="h-5 w-5" style={{ color: '#000000' }} /> 
              </a>
              <a href="https://wa.me/+254710464858" target="_blank" rel="noopener noreferrer" className="transition-colors">
                <FaWhatsapp className="h-5 w-5" style={{ color: '#25D366' }} /> 
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
      <Link to="/affordable-housing" className="text-gray-400 hover:text-white transition-colors">
        Affordable Housing
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
      <Link to="/tips" className="text-gray-400 hover:text-white transition-colors">
        Tips
      </Link> {/* Consistent "Tips" link */}
    </li>
  </ul>
</div>


              {/* Contact Info */}
              <div>
            <h3 className="text-lg font-medium mb-4">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5" style={{ color: '#FF6347' }} /> 
                <span className="text-gray-400">123 Main Street, Nairobi, Kenya</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5" style={{ color: '#25D366' }} /> 
                <a href="tel:+254710464858" className="text-gray-400 hover:text-white transition-colors">
                  +254 710 464 858
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5" style={{ color: '#FF9900' }} /> 
                <a href="mailto:rentconnect53@gmail.com" className="text-gray-400 hover:text-white transition-colors">
                  rentconnect53@gmail.com
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
