import { useState } from "react";
import { Link } from "react-router-dom";
import { Home, User, Settings, LogOut, BookOpen, School, Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Simple local state for login status= () => {

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left side - Logo/Brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <School className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-800">EduScholarship</span>
            </Link>
          </div>

          {/* Desktop Navigation - Right side */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                <Link to="/personal" className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition">
                  <Home className="h-5 w-5 mr-1" />
                  Dashboard
                </Link>
                <Link to="/application" className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition">
                  <BookOpen className="h-5 w-5 mr-1" />
                  Application
                </Link>
                <Link to="/settings" className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition">
                  <Settings className="h-5 w-5 mr-1" />
                  Settings
                </Link>
                <button  className="flex items-center px-3 py-2 text-sm font-medium text-red-600 hover:text-red-800 transition">
                  <LogOut className="h-5 w-5 mr-1" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition">
                  <LogOut className="h-5 w-5 mr-1" />
                  Login
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 focus:outline-none transition"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
          {isLoggedIn ? (
            <>
              <Link
                to="/dashboard"
                className="flex items-center px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition"
                onClick={() => setIsOpen(false)}
              >
                <Home className="h-5 w-5 mr-2" />
                Dashboard
              </Link>
              <Link
                to="/profile"
                className="flex items-center px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition"
                onClick={() => setIsOpen(false)}
              >
                <User className="h-5 w-5 mr-2" />
                Profile
              </Link>
              <Link
                to="/applications"
                className="flex items-center px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition"
                onClick={() => setIsOpen(false)}
              >
                <BookOpen className="h-5 w-5 mr-2" />
                Applications
              </Link>
              <Link
                to="/settings"
                className="flex items-center px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition"
                onClick={() => setIsOpen(false)}
              >
                <Settings className="h-5 w-5 mr-2" />
                Settings
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="flex items-center px-3 py-2 text-base font-medium text-red-600 hover:text-red-800 hover:bg-gray-50 rounded-md transition w-full"
              >
                <LogOut className="h-5 w-5 mr-2" />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="block px-3 py-2 text-base font-medium text-blue-600 hover:text-blue-800 hover:bg-gray-50 rounded-md transition"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block px-3 py-2 text-base font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition"
                onClick={() => setIsOpen(false)}
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;