import { useContext, useState } from "react";
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { HiMail, HiUserCircle } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { ContextApi } from "../Context/ContextApi";
import { toast } from "react-toastify";
import axios from "axios";
import Cookies from "js-cookie";

const RegisterPage = ({ onSwitchToLogin }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const navigate = useNavigate();
  const { url } = useContext(ContextApi);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setError("");

  //   // Input validation
  //   if (!name.trim()) return setError("Please enter your name");
  //   if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setError("Invalid email address");
  //   if (password.length < 6) return setError("Password must be at least 6 characters");
  //   if (password !== confirmPassword) return setError("Passwords don't match!");

  //   setIsLoading(true);

  //   try {
  //     const { data } = await axios.post(`${url}/api/user/register`, {
  //       name: name.trim(),
  //       email: email.trim(),
  //       password,
  //     });

  //     if (data.success) {
  //       toast.success(data.message || "Registration successful!");

  //       // Store user data
  //       localStorage.setItem("userId", data.user.id);
  //       localStorage.setItem("name", data.user.name);
  //       localStorage.setItem("email", data.user.email);
  //       Cookies.set("token", data.token, {
  //         expires: 1,
  //         secure: process.env.NODE_ENV === "production",
  //         sameSite: "strict",
  //       });

  //       // Clear form
  //       setName("");
  //       setEmail("");
  //       setPassword("");
  //       setConfirmPassword("");

  //       navigate("/");
  //     } else {
  //       setError(data.message || "Registration failed. Please try again.");
  //       toast.error(data.message || "Registration failed");
  //     }
  //   } catch (error) {
  //     console.error("Registration error:", error); // Add this for debugging
      
  //     let errorMessage = "Registration failed. Please try again.";
  //     if (error.response) {
  //       // Server responded with a status code outside 2xx
  //       if (error.response.status === 409) {
  //         errorMessage = "Email already exists. Try logging in instead.";
  //       } else if (error.response.status === 400) {
  //         errorMessage = "Invalid registration data. Please check your inputs.";
  //       } else if (error.response.data?.message) {
  //         errorMessage = error.response.data.message;
  //       }
  //     } else if (error.request) {
  //       // Request was made but no response received
  //       errorMessage = "No response from server. Please check your connection.";
  //     }

  //     setError(errorMessage);
  //     toast.error(errorMessage);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${url}/api/user/register`, {
        name: name.trim(),
        email: email.trim(),
        password,
      });
  
      const data = response.data;
      console.log("✅ Registration success:", data);
  
      if (data.success && data.data && data.data.user && data.data.token) {
        const { user, token } = data.data;
  
        // Store in localStorage
        localStorage.setItem("userId", user.id);
        localStorage.setItem("name", user.name);
        localStorage.setItem("email", user.email);
  
        // Store token in cookies (if using js-cookie)
        Cookies.set("token", token);
  
        // Redirect or success state
        navigate("/"); // or wherever you want
      } else {
        setError("Unexpected server response. Please try again.");
      }
    } catch (error) {
      console.error("Registration error:", error);
  
      if (error.response && error.response.status === 409) {
        setError("Email already exists. Please login or use a different email.");
      } else {
        setError("Registration failed. Please try again.");
      }
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-lg shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Create a new account</h2>
          <p className="mt-2 text-sm text-gray-600">
            Or{" "}
            <button
              onClick={onSwitchToLogin}
              className="text-blue-600 hover:underline"
            >
              sign in to your existing account
            </button>
          </p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            {error}
            {error.includes("already") && (
              <button onClick={onSwitchToLogin} className="underline text-blue-600 ml-2">
                Login now
              </button>
            )}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <InputField
            label="Full Name"
            icon={<HiUserCircle className="text-gray-400" />}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
          />
          <InputField
            label="Email address"
            icon={<HiMail className="text-gray-400" />}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
          <PasswordField
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            isOpen={open}
            toggle={() => setOpen(!open)}
          />
          <PasswordField
            label="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            isOpen={open2}
            toggle={() => setOpen2(!open2)}
          />

          <div className="flex items-center">
            <input
              type="checkbox"
              required
              className="h-4 w-4 text-blue-600 rounded"
            />
            <label className="ml-2 text-sm text-gray-900">
              I agree to the{" "}
              <a href="/terms" className="text-blue-600 hover:underline">
                Terms and Conditions
              </a>
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition ${
              isLoading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

const InputField = ({ label, icon, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        {icon}
      </div>
      <input
        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        {...props}
      />
    </div>
  </div>
);

const PasswordField = ({ label, value, onChange, isOpen, toggle }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <FaLock className="text-gray-400" />
      </div>
      <input
        type={isOpen ? "text" : "password"}
        value={value}
        onChange={onChange}
        className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        placeholder="••••••••"
        minLength="6"
        required
      />
      <div
        onClick={toggle}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
      >
        {isOpen ? <FaEyeSlash /> : <FaEye />}
      </div>
    </div>
  </div>
);

export default RegisterPage;