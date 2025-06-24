import React, { useContext } from 'react';

import axios from 'axios';
import { FiLogOut } from 'react-icons/fi';
import { 
  UserCircle,  
  School, 
  FileText, 
  Award, 
  Home, 
  Bell,
  Search,
} from "lucide-react";
import Cookies from "js-cookie";
import { toast } from 'react-toastify';
import { Link, NavLink, useNavigate, useParams } from 'react-router-dom';
import { ContextApi } from '../Context/ContextApi';
const UserDashBoard = () => {
  // Mock data for dashboard cards
const navigate = useNavigate();


const userId = localStorage.getItem("userId");
const {status, statusAddress, statusEdu, url,totalApplications} = useContext(ContextApi);
  const stats = [
    { title: "Total Applications", value: `${totalApplications}`, icon: <FileText size={20} className="text-blue-600" />, bg: "bg-blue-100" },
    { title: "Applied Scholarships", value: "5", icon: <Award size={20} className="text-green-600" />, bg: "bg-green-100" },
    { title: "Notifications", value: "3", icon: <Bell size={20} className="text-yellow-600" />, bg: "bg-yellow-100" },
    { title: "Profile Completion", value: "75%", icon: <UserCircle size={20} className="text-purple-600" />, bg: "bg-purple-100" },
  ];

  // Mock recent activities
  const activities = [
    { id: 1, title: "Application submitted for Need-Based Scholarship", time: "2 hours ago", icon: <FileText size={16} className="text-blue-500" /> },
    { id: 2, title: "Your merit scholarship application was approved", time: "1 day ago", icon: <Award size={16} className="text-green-500" /> },
    { id: 3, title: "Reminder: Complete your profile information", time: "2 days ago", icon: <UserCircle size={16} className="text-purple-500" /> },
  ];
// Logout  
const handleLogout = async () => {
  try {
    const response = await axios.post(`${url}/api/user/logout`);
    if (response.data.success) {
      Cookies.remove("token");
      toast.success("Logged out successfully");
      navigate("/");
      localStorage.removeItem("scholarship");
      localStorage.removeItem("userId");
      localStorage.removeItem("name");
      localStorage.removeItem("email");
    }
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="hidden md:block w-64 bg-white border-r border-gray-200 p-4">
        <div className="flex items-center gap-3 mb-8 p-2">
          <School size={24} className="text-blue-600" />
          <Link to={`/dashboard/user-dashboard/${userId}`} className="text-xl font-bold text-blue-800">Scholarship Portal</Link>
        </div>
        
        <nav className="space-y-1">
          <a href="#" className="flex items-center gap-3 p-3 rounded-lg bg-blue-50 text-blue-700 font-medium">
            <Home size={18} />
            Dashboard
          </a>
          <Link
  to={status === "Pending" ? `/dashboard/user-dashboard/${userId}` : `/dashboard/data/${userId}`}
  onClick={(e) => {
    if (status === "Pending") {
      e.preventDefault(); // Prevent navigation
      toast.error("Please complete the Details section first!");
    }
  }}
  className="flex items-center gap-3 p-3 rounded-lg text-gray-700 hover:bg-gray-100 font-medium"
>
  <UserCircle size={18} />
  Profile
</Link>

          <div 
 onClick={handleLogout}
  className="flex items-center gap-3 p-3 rounded-lg text-gray-700 hover:bg-gray-100 font-medium"
>
  <FiLogOut size={18} color='red' />
  Logout
</div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 md:p-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-blue-800 mb-1">Dashboard</h1>
            <p className="text-gray-600">Welcome back! Dear {localStorage.getItem("name")}</p>
          </div>
          
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition"
              />
            </div>
            <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
                {localStorage.getItem("name").charAt(0).toUpperCase() || "k"}
                {localStorage.getItem("name").charAt(1).toUpperCase() || "k"}
              </div>
              <span className="font-medium hidden md:inline">{localStorage.getItem("name")}</span>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className={`${stat.bg} p-6 rounded-xl shadow-sm flex items-center justify-between`}>
              <div>
                <p className="text-gray-600 text-sm font-medium">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</p>
              </div>
              <div className="p-3 rounded-full bg-white">
                {stat.icon}
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Applications */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-blue-800 flex items-center gap-3">
                <FileText size={24} className="text-blue-600" />
                Recent Applications
              </h2>
            </div>
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Scholarship</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">Need-Based Scholarship</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500">May 15, 2023</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          In Review
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <a href="#" className="text-blue-600 hover:text-blue-900">View</a>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">Merit Scholarship</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500">April 28, 2023</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Approved
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <a href="#" className="text-blue-600 hover:text-blue-900">View</a>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">Sports Scholarship</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500">March 10, 2023</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                          Rejected
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <a href="#" className="text-blue-600 hover:text-blue-900">View</a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-blue-800 flex items-center gap-3">
                <Bell size={24} className="text-blue-600" />
                Recent Activity
              </h2>
            </div>
            <div className="p-6 space-y-4">
              {activities.map(activity => (
                <div key={activity.id} className="flex gap-3">
                  <div className="flex-shrink-0 mt-1">
                    <div className="h-8 w-8 rounded-full bg-blue-50 flex items-center justify-center">
                      {activity.icon}
                    </div>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{activity.title}</p>
                    <p className="text-sm text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Profile Completion Section */}
        <div className="mt-8 bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-blue-800 flex items-center gap-3">
              <UserCircle size={24} className="text-blue-600" />
              Profile Completion
            </h2>
          </div>
          <div className="p-6">
            <div className="mb-4">
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">75% Complete</span>
                <span className="text-sm font-medium text-blue-600">4 of 6 sections</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
                <div className={`h-8 w-8 rounded-full flex items-center justify-center ${true ? 'bg-green-100 text-green-600 disabled:'  : 'bg-gray-100 text-gray-400'}`}>
                  <UserCircle size={16} />
                </div>
                <div>
                  <NavLink to={`${status === "Completed" ? "": "/personal-Info"}`} className={`${status === "Completed" ? " cursor-not-allowed" : ""} font-medium`} >Personal Details</NavLink>
                  <p className={` text-sm text-gray-500`}>{status}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
                <div className={`h-8 w-8 rounded-full flex items-center justify-center ${true ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                  <Home size={16} />
                </div>
                <div>
                <NavLink to={`${status === "Completed" ? "": "/address"}`} className={`${status === "Completed" ? " cursor-not-allowed" : ""} font-medium`} >Address</NavLink>

                  <p className="text-sm text-gray-500">{statusAddress}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
                <div className={`h-8 w-8 rounded-full flex items-center justify-center ${true ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                  <School size={16} />
                </div>
                <div>
                <NavLink to={`${status === "Completed" ? "": "/education"}`} className={`${status === "Completed" ? " cursor-not-allowed" : ""} font-medium`} >Education</NavLink>
                  <p className="text-sm text-gray-500">{statusEdu}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
                <div className={`h-8 w-8 rounded-full flex items-center justify-center ${true ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                  <FileText size={16} />
                </div>
                <div>
                <NavLink to={`${status === "Completed" ? "": "/docs"}`} className={`${status === "Completed" ? "cursor-not-allowed" : ""} font-medium`} >Documents</NavLink>
                  <p className="text-sm text-gray-500"></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};



export default UserDashBoard
