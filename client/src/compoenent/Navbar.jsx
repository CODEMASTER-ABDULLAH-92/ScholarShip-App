import { useContext, useEffect, useRef, useState } from "react";
import { data, Link, useNavigate, useParams } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";
import {
  Home,
  User,
  Settings,
  LogOut,
  BookOpen,
  School,
  Menu,
  X,
} from "lucide-react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { ContextApi } from "../Context/ContextApi";
import axios from "axios";


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogIn, setShowLogIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const { url } = useContext(ContextApi);
  const regRef = useRef();
  const openPopUp = () => {
    let intervalId;
  
    const handleMouseEnter = () => {
      intervalId = setInterval(() => {
        setShowRegister(true);
        clearInterval(intervalId); // Clear immediately after showing
      }, 5000);
    };
  
    const handleMouseLeave = () => {
      clearInterval(intervalId);
      setShowRegister(false);
    };
  
    regRef.current.addEventListener("mouseenter", handleMouseEnter);
    regRef.current.addEventListener("mouseleave", handleMouseLeave);
  
    // Cleanup function to remove event listeners
    return () => {
      clearInterval(intervalId);
      regRef.current.removeEventListener("mouseenter", handleMouseEnter);
      regRef.current.removeEventListener("mouseleave", handleMouseLeave);
    };
  };
  
  useEffect(() => {
    const cleanup = openPopUp();
    return cleanup; // This will run when component unmounts
  }, []);
  // setShowRegister(!showRegister)
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.post(`${url}/api/user/logout`);
      if (response.data.success) {
        Cookies.remove("token");
        toast.success("Logged out successfully");
        setIsLoggedIn(false);
        navigate("/login");
        localStorage.removeItem("scholarship");
        localStorage.removeItem("userId");
        localStorage.removeItem("name");
        localStorage.removeItem("email");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const checkAuthStatus = () => {
    const token = Cookies.get("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left side - Logo/Brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <School className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-800">
                EduScholarship
              </span>
            </Link>
          </div>

          {/* Desktop Navigation - Right side */}

<div className="hidden md:flex items-center space-x-4 relative">
  {isLoggedIn ? (
    <>
      <Link
        to={`/dashboard/user-dashboard/${userId}`}
        className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition"
      >
        <Home className="h-5 w-5 mr-1" />
        Dashboard
      </Link>
      <button
        onClick={handleLogout}
        className="flex items-center px-3 py-2 text-sm font-medium text-red-600 hover:text-red-800 transition"
      >
        <LogOut className="h-5 w-5 mr-1" />
        Logout
      </button>
    </>
  ) : (
    <>
      {/* Login Dropdown */}
      <div
        onMouseEnter={() => setShowLogIn(true)}
        onMouseLeave={() => setShowLogIn(false)}
        className="relative"
      >
        <span className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition cursor-pointer">
          Login <FaChevronDown className="h-3.4 w-3.4 ml-1" />
        </span>
        {showLogIn && (
          <div className="absolute top-full mt-1 bg-gray-200 rounded-md w-[130px] py-1 text-center shadow">
            <Link to="/login" className="block py-1 hover:text-blue-600" onClick={() => setShowLogIn(false)}>
              User Login
            </Link>
            <Link to="/recruiter-login" className="block py-1 hover:text-blue-600" onClick={() => setShowLogIn(false)}>
              Recruiter Login
            </Link>
          </div>
        )}
      </div>

      {/* Register Dropdown */}
      <div ref={regRef}
        onMouseEnter={() => setShowRegister(true)}
        onMouseLeave={() => setShowRegister(false)}
        className="relative"
      >
        <span className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition cursor-pointer">
          Register <FaChevronDown className="h-3.4 w-3.4 ml-1" />
        </span>
        {showRegister && (
          <div className="absolute top-full mt-1 bg-gray-200 rounded-md w-[130px] py-1 text-center shadow">
            <Link to="/register" className="block py-1 hover:text-blue-600" onClick={() => setShowRegister(false)}>
              Register User
            </Link>
            <Link to="/recruiter-register" className="block py-1 hover:text-blue-600" onClick={() => setShowRegister(false)}>
              Register Recruiter
            </Link>
          </div>
        )}
      </div>
    </>
  )}
</div>


          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 focus:outline-none transition"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`md:hidden ${isOpen ? "block" : "hidden"}`}>
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
                to="/applications"
                className="flex items-center px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition"
                onClick={() => setIsOpen(false)}
              >
                <BookOpen className="h-5 w-5 mr-2" />
                Applications
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
                className="flex items-center px-3 py-2 text-base font-medium text-blue-600 hover:text-blue-800 hover:bg-gray-50 rounded-md transition"
                onClick={() => setIsOpen(false)}
              >
                <User className="h-5 w-5 mr-2" />
                Login
              </Link>
              <Link
                to="/register"
                className="flex items-center px-3 py-2 text-base font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition justify-center"
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
