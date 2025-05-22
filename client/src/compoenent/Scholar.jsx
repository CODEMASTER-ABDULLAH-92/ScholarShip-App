import React from "react";
import { FaGraduationCap, FaCalendarAlt, FaBookmark, FaMapMarkerAlt, FaMoneyBillWave } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Scholar = ({ 
  id,
  title,
  description,
  university,
  location,
  benefitAmount,
  deadline,
  onSave
}) => {
  return (
    <div className="border border-gray-200 rounded-lg p-6 mb-6 max-w-md w-full hover:shadow-md transition-shadow duration-300 bg-white">
      <div className="flex items-start mb-4">
        <FaGraduationCap className="text-blue-600 mr-3 text-2xl mt-1 flex-shrink-0" />
        <div className="flex-grow">
          <Link 

            to={`/Scholarship/${id}`} 
            className="text-xl font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-200 line-clamp-2"
          >
            {title}
          </Link>
          {university && (
            <p className="text-gray-500 text-sm mt-1">{university}</p>
          )}
        </div>
        <button 
          onClick={onSave}
          className="text-gray-400 hover:text-blue-500 transition-colors duration-200 p-1"
          aria-label="Save scholarship"
          title="Save this scholarship"
        >
          <FaBookmark className="text-xl" />
        </button>
      </div>

      <p className="text-gray-600 mb-5 line-clamp-3">{description}</p>

      <div className="flex flex-col gap-2 text-sm text-gray-600">
        {location && (
          <span className="flex items-center">
            <FaMapMarkerAlt className="mr-2 text-blue-500" />
            {location}
          </span>
        )}
        {benefitAmount && (
          <span className="flex items-center">
            <FaMoneyBillWave className="mr-2 text-green-500" />
            ${benefitAmount.toLocaleString()}
          </span>
        )}
        {deadline && (
          <span className="flex items-center">
            <FaCalendarAlt className="mr-2 text-red-500" />
            {new Date(deadline).toLocaleDateString()}
          </span>
        )}
      </div>
    </div>
  );
};

export default Scholar;