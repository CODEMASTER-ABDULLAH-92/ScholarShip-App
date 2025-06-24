import { useState, useContext } from 'react';
import { HiMail } from 'react-icons/hi';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FaLock, FaUser, FaBuilding } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ContextApi } from '../Context/ContextApi';
import Cookies from 'js-cookie'
const RecruiterRegister = () => {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const [showIcon, setShowIcon] = useState(true);
  const [showIcon2, setShowIcon2] = useState(true);
  const navigate = useNavigate();
  const { url } = useContext(ContextApi);

const onSubmitHandler = async (e) => {
  e.preventDefault();
  if (password != confirmPassword) {
    return setError("Password Not Matched");
  }
  try {
    const response = await axios.post(`${url}/api/recruiter/recruiter-register`,{name, company, email, password},{withCredentials:true});
    if (response.data.success) {
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setCompany("");
      navigate("/recruiter-dashboard");
      toast.success(response.data.message);
      // const recruiter

      localStorage.setItem("recruiterId", response.data.recruiter._id);
      localStorage.setItem("nameR", response.data.recruiter.name);
      localStorage.setItem("emailR", response.data.recruiter.email);
      // localStorage.setItem("companyR", response.data.recruiter.company);
      Cookies.set("tokenR", response.data.tokenR);
      console.log( response.data.tokenR);
      
    }
  } catch (error) {
    console.error("Err in register Recruiter" ,error);
    toast.error(error.response.data.message);
  }
}

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-lg shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Recruiter Register</h2>
          <p className="mt-2 text-sm text-gray-600">
            Already have an account?{' '}
            <button
              onClick={() => navigate('/recruiter-login')}
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Sign in
            </button>
          </p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            {error}
          </div>
        )}

        <form onSubmit={onSubmitHandler} className="space-y-5">
          <div className="relative">
            <FaUser className="absolute top-2.5 left-3 text-gray-400" />
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="pl-10 pr-3 py-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Full Name"
            />
          </div>

          <div className="relative">
            <FaBuilding className="absolute top-2.5 left-3 text-gray-400" />
            <input
              type="text"
              required
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="pl-10 pr-3 py-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Company Name"
            />
          </div>

          <div className="relative">
            <HiMail className="absolute top-2.5 left-3 text-gray-400" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10 pr-3 py-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Email Address"
            />
          </div>

          <div className="relative">
            <FaLock className="absolute top-2.5 left-3 text-gray-400" />
            <input
              type={`${showIcon ? "password": "text"}`}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-10 pr-3 py-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Password"
            />
            { showIcon ? <FaEye onClick={()=>setShowIcon(!showIcon)} className='absolute top-2.5 right-3 text-gray-400'/> : <FaEyeSlash onClick={()=>setShowIcon(!showIcon)} className='absolute top-2.5 right-3 text-gray-400'/>}
          </div>
          <div className="relative">
            <FaLock className="absolute top-2.5 left-3 text-gray-400" />
            <input
              type={`${showIcon2 ? "password" : "text"}`}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="pl-10 pr-3 py-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Confirm Password"
            />
            { showIcon2 ? <FaEye onClick={()=>setShowIcon2(!showIcon2)} className='absolute top-2.5 right-3 text-gray-400'/> : <FaEyeSlash onClick={()=>setShowIcon2(!showIcon2)} className='absolute top-2.5 right-3 text-gray-400'/>}
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 px-4 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
              isLoading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? 'Registering...' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RecruiterRegister;
