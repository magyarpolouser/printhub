import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router';

export function Footer() {
  return (
    <footer className="bg-black text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div>
            <div className="text-2xl mb-4">
              <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 bg-clip-text text-transparent">
                PrintHub
              </span>
            </div>
            <p className="text-gray-400 mb-6">
              Your one-stop shop for premium custom printed products. Quality guaranteed, creativity unlimited.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">How It Works</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Design Tool</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Bulk Orders</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Affiliates</a></li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-lg mb-4">Products</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">T-Shirts</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Mugs</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Pillows</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Phone Cases</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Tote Bags</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Stickers</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-purple-400 mt-1" />
                <span className="text-gray-400">123 Print Street<br />Design City, DC 12345</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-pink-400" />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-blue-400" />
                <span className="text-gray-400">support@printhub.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © 2024 PrintHub. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Shipping Policy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Returns</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
