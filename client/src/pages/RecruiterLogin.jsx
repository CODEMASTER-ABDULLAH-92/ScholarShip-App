import { useContext, useState } from 'react';
import { FaLock, FaGoogle, FaFacebook, FaTwitter } from 'react-icons/fa';
import { HiMail } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ContextApi } from "../Context/ContextApi";
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

const RecruiterLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { url } = useContext(ContextApi);
  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(`${url}/api/recruiter/recruiter-login`, {email, password},{withCredentials:true});
      if (response.data.success) {
        toast.success(response.data.message);
        setEmail("");
        setPassword("");
        navigate("/recruiter-dashboard");

      localStorage.setItem("recruiterId", response.data.isRecruiterExist._id);
      localStorage.setItem("nameR", response.data.isRecruiterExist.name);
      localStorage.setItem("emailR", response.data.isRecruiterExist.email);
      // localStorage.setItem("companyR", response.data.recruiter.company);
      Cookies.set("tokenR", response.data.tokenR);
console.log(response.data.tokenR);

    }  
    } catch (error) {
      console.error("Err in Logged In");
      toast.error(error.response.data.message);
    }
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-lg shadow-lg">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Recruiter Login</h2>
          <p className="mt-2 text-sm text-gray-600">
            Or{' '}
            <button
              onClick={() => navigate('/recruiter-register')}
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              create a recruiter account
            </button>
          </p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <form onSubmit={onSubmitHandler} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email address
              </label>
              <div className="relative">
                <HiMail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="recruiter@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <FaLock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="password123"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center text-sm text-gray-900">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded"
              />
              <span className="ml-2">Remember me</span>
            </label>

            <button
              type="button"
              onClick={() => navigate('/recruiter/forgot-password')}
              className="text-sm text-blue-600 hover:text-blue-500"
            >
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full flex justify-center py-2 px-4 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md ${
              isLoading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? 'Logging in...' : 'Log in'}
          </button>
        </form>

        <div className="mt-6">
          <div className="relative text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <span className="relative bg-white px-2 text-sm text-gray-500">Or continue with</span>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3">
            <button
              onClick={() => toast.info('Google login coming soon')}
              className="w-full flex justify-center py-2 border border-gray-300 rounded-md bg-white text-sm text-gray-500 hover:bg-gray-50"
            >
              <FaGoogle className="h-5 w-5" />
            </button>
            <button
              onClick={() => toast.info('Facebook login coming soon')}
              className="w-full flex justify-center py-2 border border-gray-300 rounded-md bg-white text-sm text-gray-500 hover:bg-gray-50"
            >
              <FaFacebook className="h-5 w-5" />
            </button>
            <button 
              onClick={() => toast.info('Twitter login coming soon')}
              className="w-full flex justify-center py-2 border border-gray-300 rounded-md bg-white text-sm text-gray-500 hover:bg-gray-50"
            >
              <FaTwitter className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RecruiterLoginPage;