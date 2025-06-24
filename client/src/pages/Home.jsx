
import { Link } from "react-router-dom";
import TopCompanies from "../compoenent/Compnies"
import { Home, User, Settings, BookOpen, School, Award, Clock, CheckCircle } from "lucide-react";
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useEffect, useRef } from "react";
import ScrollTrigger from "gsap/src/ScrollTrigger";
import BackendConnectionNotice from "../compoenent/Backend";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger, useGSAP);
const HomePage = () => {
  
  const headingRef = useRef();
    useGSAP(() => {
    gsap.fromTo(
      headingRef.current,
      { y: -15, opacity: 0 }, // Initial state
      { 
        y: 0, opacity: 1, duration: 2.4,
      } 
    );
  })
  return (
    <div  className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <School className="h-12 w-12 text-blue-600" />
          </div>
          <h1 ref={headingRef} className="text-4xl font-bold text-gray-900 mb-6">Welcome to EduScholarship</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            Your gateway to educational opportunities. Find and apply for scholarships that match your profile and aspirations.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/scholaships" 
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition"
            >
              Get Started
            </Link>
            <Link 
              to="/login" 
              className="px-6 py-3 border border-blue-600 text-blue-600 font-medium rounded-md hover:bg-blue-50 transition"
            >
              Login
            </Link>
          </div>
        </div>
      </section>
<TopCompanies/>
      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Choose EduScholarship?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition">
              <div className="flex items-center mb-4">
                <Award className="h-8 w-8 text-blue-600 mr-3" />
                <h3 className="text-xl font-semibold text-gray-800">Wide Range of Scholarships</h3>
              </div>
              <p className="text-gray-600">
                Access hundreds of scholarships from various institutions and organizations all in one place.
              </p>
            </div>
            <div  className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition">
              <div className="flex items-center mb-4">
                <CheckCircle className="h-8 w-8 text-blue-600 mr-3" />
                <h3 className="text-xl font-semibold text-gray-800">Personalized Matches</h3>
              </div>
              <p className="text-gray-600">
                Our system matches you with scholarships that fit your qualifications and interests.
              </p>
            </div>
            <div  className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition">
              <div className="flex items-center mb-4">
                <Clock className="h-8 w-8 text-blue-600 mr-3" />
                <h3 className="text-xl font-semibold text-gray-800">Deadline Alerts</h3>
              </div>
              <p className="text-gray-600">
                Never miss an application deadline with our timely reminders and notifications.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section  className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">


            <div  className="text-center border-2 border-blue-600 group rounded-lg py-[30px] px-[10px] hover:bg-blue-50 transition">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-blue-600">1. Create Your Profile</h3>
              <p className="text-gray-600">
                Register and complete your profile with your academic and personal information.
              </p>
            </div>


            <div  className="text-center border-2 border-blue-600 group rounded-lg py-[30px] px-[10px] hover:bg-blue-50 transitionr">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex  items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-blue-600">2. Find Scholarships</h3>
              <p className="text-gray-600">
                Browse or get matched with scholarships that fit your profile.
              </p>
            </div>



            <div  className="text-center border-2 border-blue-600 group rounded-lg py-[30px] px-[10px] hover:bg-blue-50 transition">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-blue-600">3. Apply Easily</h3>
              <p className="text-gray-600">
                Submit applications directly through our platform with all required documents.
              </p>
            </div>



          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Find Your Scholarship?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Join thousands of students who have found their perfect scholarship through our platform.
          </p>
          <Link 
            to="/register" 
            className="inline-block px-8 py-3 bg-white text-blue-600 font-medium rounded-md hover:bg-gray-100 transition"
          >
            Sign Up Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
