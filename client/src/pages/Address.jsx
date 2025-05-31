import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaMapMarkerAlt,
  FaGlobeAmericas,
  FaCity,
  FaChevronLeft,
  FaChevronRight,
  FaSave,
} from "react-icons/fa";
import axios from "axios";
import { ContextApi } from "../Context/ContextApi";
import { toast } from "react-toastify";

const Address = () => {
  const { url } = useContext(ContextApi);
  // Dropdown options
  const countries = [
    "United States",
    "Canada",
    "United Kingdom",
    "Pakistan",
    "India",
  ];
  const provinces = ["Punjab", "Sindh", "Khyber Pakhtunkhwa", "Balochistan"];
  const districts = ["Lahore", "Islamabad", "Karachi", "Rawalpindi"];
  const cities = ["Lahore", "Islamabad", "Karachi", "Rawalpindi"];

  // Form state
  const [formData, setFormData] = useState({
    country: "",
    province: "",
    district: "",
    city: "",
    fullAddress: "",
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("country", formData.country);
      formDataToSend.append("city", formData.city);
      formDataToSend.append("district", formData.district);
      formDataToSend.append("fullAddress", formData.fullAddress);
      formDataToSend.append("province", formData.province);
      const response = await axios.post(
        `${url}/api/address/add-address`,
        formDataToSend,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      
      if (response.data.success) {
        toast.success("Address details saved successfully!");
        setFormData({
          country: "",
          province: "",
          district: "",
          city: "",
          fullAddress: "",
        });
      } else {
        toast.error(response.data.message || "Failed to save address details");
      }
    } catch (error) {
      console.error("Error in adding address details", error);
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "An error occurred while saving the Address Info"
      );
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-gray-100 shadow-lg rounded-lg p-6 sm:p-10 my-10">
      <h1 className="text-3xl font-bold text-blue-800 text-center mb-6">
        Address Information
      </h1>

      <form onSubmit={handleSubmit}>
        {/* Country */}
        <div className="space-y-2 mb-4">
          <label className="text-gray-700 font-medium flex items-center gap-2">
            <FaGlobeAmericas className="text-blue-500" />
            Country <span className="text-red-500">*</span>
          </label>
          <select
            name="country"
            value={formData.country}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-300"
            required
          >
            <option value="">Select Country</option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>

        {/* Province */}
        <div className="space-y-2 mb-4">
          <label className="text-gray-700 font-medium flex items-center gap-2">
            <FaMapMarkerAlt className="text-blue-500" />
            Province <span className="text-red-500">*</span>
          </label>
          <select
            name="province"
            value={formData.province}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-300"
            required
          >
            <option value="">Select Province</option>
            {provinces.map((province) => (
              <option key={province} value={province}>
                {province}
              </option>
            ))}
          </select>
        </div>

        {/* District */}
        <div className="space-y-2 mb-4">
          <label className="text-gray-700 font-medium flex items-center gap-2">
            <FaMapMarkerAlt className="text-blue-500" />
            District <span className="text-red-500">*</span>
          </label>
          <select
            name="district"
            value={formData.district}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-300"
            required
          >
            <option value="">Select District</option>
            {districts.map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
          </select>
        </div>

        {/* City */}
        <div className="space-y-2 mb-4">
          <label className="text-gray-700 font-medium flex items-center gap-2">
            <FaCity className="text-blue-500" />
            City <span className="text-red-500">*</span>
          </label>
          <select
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-300"
            required
          >
            <option value="">Select City</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        {/* Full Address */}
        <div className="space-y-2 mb-6">
          <label className="text-gray-700 font-medium flex items-center gap-2">
            <FaHome className="text-blue-500" />
            Full Address <span className="text-red-500">*</span>
          </label>
          <textarea
            name="fullAddress"
            value={formData.fullAddress}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-300"
            rows="3"
            required
          />
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row justify-between mt-6">
          <Link
            to="/PersonalDetail"
            className="bg-gray-300 px-6 py-3 rounded-md text-gray-800 flex items-center gap-2 hover:bg-gray-400 transition"
          >
            <FaChevronLeft /> Previous
          </Link>
          <div className="flex gap-4 mt-4 sm:mt-0">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-md flex items-center gap-2 hover:bg-blue-700 transition"
            >
              <FaSave /> Save
            </button>
            <Link
              to="/education"
              className="bg-green-600 text-white px-6 py-3 rounded-md flex items-center gap-2 hover:bg-green-700 transition"
            >
              Next <FaChevronRight />
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Address;