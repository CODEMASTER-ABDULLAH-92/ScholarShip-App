import React from "react";

import { FaGraduationCap,FaCalendarAlt , FaBookmark, FaEdit, FaMapMarkerAlt, FaMoneyBillWave } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Scholar = ({ title, description, onApply, onSave, id, location, amount, deadline }) => {
  return (
    <div className="border border-gray-200 rounded-lg p-6 mb-6 max-w-md w-full hover:shadow-md transition-shadow duration-300 bg-white">
      <div className="flex items-start mb-4">
        <FaGraduationCap className="text-blue-600 mr-3 text-2xl mt-1 flex-shrink-0" />
        <div className="flex-grow">
          <Link 
            to={id} 
            className="text-xl font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-200 line-clamp-2"
          >
            {title}
          </Link>
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

      <div className="flex gap-2 items-start flex-col mt-2 text-sm text-gray-600 space-x-4">
            {location && (
              <span className="flex items-center">
                <FaMapMarkerAlt className="mr-1 text-blue-500" />
                {location}
              </span>
            )}
            {amount && (
              <span className="flex items-center">
                <FaMoneyBillWave className="mr-1 text-green-500" />
                ${amount.toLocaleString()}
              </span>
            )}
            {deadline && (
              <span className="flex items-center">
                <FaCalendarAlt className="mr-1 text-red-500" />
                {deadline.toLocaleString()}
              </span>
            )}
          </div>

    </div>
  );
};

export default Scholar;