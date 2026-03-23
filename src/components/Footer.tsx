import React from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube, Sparkles, Zap, Shield } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 border-t border-purple-500/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="relative">
                <Trophy className="h-10 w-10 text-yellow-400" />
                <Sparkles className="h-4 w-4 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                DesiPitch
              </span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
              India's most trusted fantasy sports platform. Create your dream team, 
              join contests, and win exciting prizes. Experience cricket like never before!
            </p>
            <div className="flex space-x-4">
              <a href="#" className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition-opacity"></div>
                <Facebook className="h-5 w-5 text-gray-400 hover:text-white relative z-10 transition-colors" />
              </a>
              <a href="#" className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-sky-500 to-sky-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition-opacity"></div>
                <Twitter className="h-5 w-5 text-gray-400 hover:text-white relative z-10 transition-colors" />
              </a>
              <a href="#" className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-pink-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition-opacity"></div>
                <Instagram className="h-5 w-5 text-gray-400 hover:text-white relative z-10 transition-colors" />
              </a>
              <a href="#" className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition-opacity"></div>
                <Youtube className="h-5 w-5 text-gray-400 hover:text-white relative z-10 transition-colors" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4 flex items-center">
              <Zap className="h-5 w-5 mr-2 text-yellow-400" />
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="/matches" className="text-gray-300 hover:text-white transition-colors flex items-center">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                  All Matches
                </a>
              </li>
              <li>
                <a href="/create-team" className="text-gray-300 hover:text-white transition-colors flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  Create Team
                </a>
              </li>
              <li>
                <a href="/my-teams" className="text-gray-300 hover:text-white transition-colors flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  My Teams
                </a>
              </li>
              <li>
                <a href="/leaderboard" className="text-gray-300 hover:text-white transition-colors flex items-center">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                  Leaderboard
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4 flex items-center">
              <Shield className="h-5 w-5 mr-2 text-green-400" />
              Support
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors flex items-center">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  How to Play
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Terms & Conditions
                </a>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-gray-300 hover:text-white transition-colors flex items-center">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4 flex items-center">
              <Mail className="h-5 w-5 mr-2 text-purple-400" />
              Contact Us
            </h3>
            <div className="space-y-3">
              <div className="flex items-center text-gray-300">
                <Mail className="h-4 w-4 mr-2 text-purple-400" />
                <span>support@desipitch.com</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Phone className="h-4 w-4 mr-2 text-green-400" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center text-gray-300">
                <MapPin className="h-4 w-4 mr-2 text-red-400" />
                <span>Mumbai, India</span>
              </div>
            </div>
            
            <div className="mt-4">
              <p className="text-gray-400 text-sm mb-2">Download our app:</p>
              <div className="flex space-x-2">
                <button className="px-3 py-1 bg-gradient-to-r from-gray-700 to-gray-800 rounded-lg text-xs text-white hover:from-gray-600 hover:to-gray-700 transition-all">
                  App Store
                </button>
                <button className="px-3 py-1 bg-gradient-to-r from-gray-700 to-gray-800 rounded-lg text-xs text-white hover:from-gray-600 hover:to-gray-700 transition-all">
                  Play Store
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-purple-500/30 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2026 DesiPitch. All rights reserved. Made with ❤️ in India
            </p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <span className="text-gray-400 text-sm">Secure Payments:</span>
              <div className="flex space-x-2">
                <div className="w-8 h-5 bg-gradient-to-r from-blue-600 to-blue-700 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">VISA</span>
                </div>
                <div className="w-8 h-5 bg-gradient-to-r from-orange-500 to-orange-600 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">MC</span>
                </div>
                <div className="w-8 h-5 bg-gradient-to-r from-red-500 to-red-600 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">RUPAY</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
