import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Trophy, User, Menu, X, Wallet, LogOut, Zap, Sparkles, Crown } from 'lucide-react';
import { useAuthStore } from '../contexts/authStore';

export const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 shadow-2xl sticky top-0 z-50 border-b border-purple-500/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <Trophy className="h-10 w-10 text-yellow-400 group-hover:scale-110 transition-transform" />
                <Sparkles className="h-4 w-4 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                DesiPitch
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`px-3 py-2 rounded-lg font-medium transition-all ${
                isActive('/') 
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/50' 
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <span className="flex items-center space-x-2">
                <Zap className="h-4 w-4" />
                Dashboard
              </span>
            </Link>
            <Link
              to="/matches"
              className={`px-3 py-2 rounded-lg font-medium transition-all ${
                isActive('/matches') 
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/50' 
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <span className="flex items-center space-x-2">
                <Trophy className="h-4 w-4" />
                Matches
              </span>
            </Link>
            <Link
              to="/create-team"
              className={`px-3 py-2 rounded-lg font-medium transition-all ${
                isActive('/create-team') 
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/50' 
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <span className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                Create Team
              </span>
            </Link>
            <Link
              to="/my-teams"
              className={`px-3 py-2 rounded-lg font-medium transition-all ${
                isActive('/my-teams') 
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/50' 
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <span className="flex items-center space-x-2">
                <Crown className="h-4 w-4" />
                My Teams
              </span>
            </Link>
          </div>

          {/* User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <div className="flex items-center space-x-3 bg-gradient-to-r from-purple-800/50 to-pink-800/50 px-4 py-2 rounded-xl border border-purple-500/30">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                      <span className="text-gray-900 font-bold text-sm">
                        {user.username.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-medium">{user.username}</p>
                      <p className="text-yellow-400 text-sm">₹{user.balance?.toLocaleString() || 0}</p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all shadow-lg shadow-red-500/50"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg shadow-blue-500/50"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all shadow-lg shadow-green-500/50"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-all"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 border-t border-purple-500/30">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className={`block px-3 py-2 rounded-lg font-medium transition-all ${
                  isActive('/') 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <span className="flex items-center space-x-2">
                  <Zap className="h-4 w-4" />
                  Dashboard
                </span>
              </Link>
              <Link
                to="/matches"
                onClick={() => setIsMenuOpen(false)}
                className={`block px-3 py-2 rounded-lg font-medium transition-all ${
                  isActive('/matches') 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <span className="flex items-center space-x-2">
                  <Trophy className="h-4 w-4" />
                  Matches
                </span>
              </Link>
              <Link
                to="/create-team"
                onClick={() => setIsMenuOpen(false)}
                className={`block px-3 py-2 rounded-lg font-medium transition-all ${
                  isActive('/create-team') 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <span className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  Create Team
                </span>
              </Link>
              <Link
                to="/my-teams"
                onClick={() => setIsMenuOpen(false)}
                className={`block px-3 py-2 rounded-lg font-medium transition-all ${
                  isActive('/my-teams') 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <span className="flex items-center space-x-2">
                  <Crown className="h-4 w-4" />
                  My Teams
                </span>
              </Link>
              
              {user ? (
                <div className="border-t border-purple-500/30 pt-3 mt-3">
                  <div className="flex items-center justify-between bg-gradient-to-r from-purple-800/50 to-pink-800/50 p-3 rounded-xl border border-purple-500/30 mb-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                        <span className="text-gray-900 font-bold text-sm">
                          {user.username.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="text-white font-medium">{user.username}</p>
                        <p className="text-yellow-400 text-sm">₹{user.balance?.toLocaleString() || 0}</p>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <div className="border-t border-purple-500/30 pt-3 mt-3 space-y-2">
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="block w-full text-center px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsMenuOpen(false)}
                    className="block w-full text-center px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
