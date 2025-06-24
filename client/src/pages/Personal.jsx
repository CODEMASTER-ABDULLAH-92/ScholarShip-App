import React, { useState, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UploadCloud, File, X } from "lucide-react";
import { Phone, Calendar, Home, DollarSign, CreditCard } from 'lucide-react';
import {
  User,
  UserCircle,
  BookOpen,
  School,
} from "lucide-react";
import axios from 'axios'
import { ContextApi } from "../Context/ContextApi";
import { toast } from "react-toastify";

const PersonalDetail = () => {
  const { url } = useContext(ContextApi);
  const navigate = useNavigate();
  const religion = [
    "Islam",
    "Christianity",
    "Hinduism",
    "Sikhism",
    "Buddhism",
    "Judaism",
    "Atheism",
    "Other",
  ];
  
  const institutes = [
    "Primary School",
    "Middle School",
    "High School",
    "College",
    "University",
    "Technical Institute",
    "Vocational Training Center",
  ];
  
  const disciplines = [
    "Computer Science",
    "Software Engineering",
    "Information Technology",
    "Data Science",
    "Artificial Intelligence",
    "Cybersecurity",
    "Electrical Engineering",
    "Mechanical Engineering",
    "Business Administration",
    "Medicine",
  ];
  
  const universities = [
    "Harvard University",
    "Stanford University",
    "Massachusetts Institute of Technology (MIT)",
    "University of Oxford",
    "University of Cambridge",
    "California Institute of Technology (Caltech)",
    "University of California, Berkeley",
    "National University of Sciences and Technology (NUST)",
    "University of the Punjab",
    "FAST-NUCES",
  ];
  
  const degreeTitles = [
    "BSCS - Computer Science",
    "BSSE - Software Engineering",
    "BSIT - Information Technology",
    "BBA - Business Administration",
    "MBBS - Medicine",
    "BEEE - Electrical Engineering",
    "BS Data Science",
  ];
  
  const domiciles = [
    "Lahore",
    "Faisalabad",
    "Rawalpindi",
    "Karachi",
    "Islamabad",
    "Peshawar",
    "Multan",
    "Quetta",
    "Gujranwala",
    "Hyderabad",
  ];
    

  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  // State for form data
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    religion: "",
    contactNumber: "",
    currentInstituteLevel: "",
    dateOfAddmission: "",
    programFaculty: "",
    universityName: "",
    profileImage: null,
    dateOfBirth: "",
    domicle: "",
    familyIncome: "",
    passportNumber: "",
  });

  // Handle file changes
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setFormData(prev => ({ ...prev, profileImage: selectedFile }));
  };


  // Handle form input changes
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      // Object.keys(formData).forEach(key => {
      //   if (formData[key] !== null) {
      //     formDataToSend.append(key, formData[key]);
      //   }
      // });
      formDataToSend.append("firstName", formData.firstName)
      formDataToSend.append("lastName", formData.lastName)
      formDataToSend.append("contactNumber", formData.contactNumber)
      formDataToSend.append("currentInstituteLevel", formData.currentInstituteLevel)
      formDataToSend.append("dateOfAddmission", formData.dateOfAddmission)
      formDataToSend.append("domicle", formData.domicle)
      formDataToSend.append("familyIncome", formData.familyIncome)
      formDataToSend.append("passportNumber", formData.passportNumber)
      formDataToSend.append("profileImage", formData.profileImage)
      formDataToSend.append("programFaculty", formData.programFaculty)
      formDataToSend.append("religion", formData.religion)
      formDataToSend.append("universityName", formData.universityName)
      formDataToSend.append("dateOfBirth", formData.dateOfBirth);

      const response = await axios.post(
        `${url}/api/personal/add-personal-info`,
        formDataToSend,{withCredentials:true},
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      if (response.data.success) {
        toast.success("Personal details saved successfully!");
        navigate("/address");
        // Reset form
        setFormData({
          firstName: "",
          lastName: "",
          religion: "",
          contactNumber: "",
          currentInstituteLevel: "",
          dateOfAddmission: "",
          programFaculty: "",
          universityName: "",
          profileImage: null,
          dateOfBirth: "",
          domicle: "",
          familyIncome: "",
          passportNumber: "",
        });
        setFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      } else {
        toast.error(response.data.message || "Failed to save personal details");
      }
    } catch (error) {
      console.error("Error in adding Personal details", error);
      toast.error(
        error.response?.data?.message || 
        error.message || 
        "An error occurred while saving the Personal Info"
      );
    }
  };
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="flex-1 p-6 md:p-10">
        <div className="bg-white rounded-xl shadow-md overflow-hidden p-6 md:p-8">
          <h1 className="text-2xl md:text-3xl font-bold text-blue-800 flex items-center gap-3 mb-6">
            <UserCircle size={28} />
            Personal Details
          </h1>
          <form className="space-y-6" onSubmit={onSubmitHandler}>
            {/* Basic Information Section */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <User size={20} className="text-blue-600" />
                <h2 className="text-xl font-semibold text-blue-800">
                  Basic Information
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* First Name */}
                <div className="space-y-2">
                  <label className="text-gray-700 font-medium flex items-center gap-2">
                    <UserCircle size={16} className="text-gray-500" />
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    onChange={onChangeHandler}
                    value={formData.firstName}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition"
                    placeholder="First Name"
                    required
                  />
                </div>

                {/* Last Name */}
                <div className="space-y-2">
                  <label className="text-gray-700 font-medium flex items-center gap-2">
                    <UserCircle size={16} className="text-gray-500" />
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    onChange={onChangeHandler}
                    value={formData.lastName}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition"
                    placeholder="Last Name"
                    required
                  />
                </div>

                {/* Religion */}
                <div className="space-y-2">
                  <label className="text-gray-700 font-medium flex items-center gap-2">
                    <BookOpen size={16} className="text-gray-500" />
                    Religion <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="religion"
                    value={formData.religion}
                    onChange={onChangeHandler}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition appearance-none"
                    required
                  >
                    <option value="">Select Religion</option>
                    {religion.map((religionItem) => (
                      <option key={religionItem} value={religionItem}>
                        {religionItem}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Contact Number */}
                <div className="space-y-2">
                  <label className="text-gray-700 font-medium flex items-center gap-2">
                    <Phone size={16} className="text-gray-500" />
                    Contact Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="contactNumber"
                    onChange={onChangeHandler}
                    value={formData.contactNumber}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition"
                    placeholder="Contact Number"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Academic Information Section */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <School size={20} className="text-blue-600" />
                <h2 className="text-xl font-semibold text-blue-800">
                  Academic Information
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Institute */}
                <div className="space-y-2">
                  <label className="text-gray-700 font-medium flex items-center gap-2">
                    <School size={16} className="text-gray-500" />
                    Institute <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="currentInstituteLevel"
                    value={formData.currentInstituteLevel}
                    onChange={onChangeHandler}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition appearance-none"
                    required
                  >
                    <option value="">Select Institute</option>
                    {institutes.map((institute) => (
                      <option key={institute} value={institute}>
                        {institute}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Date of Admission */}
                <div className="space-y-2">
                  <label className="text-gray-700 font-medium flex items-center gap-2">
                    <Calendar size={16} className="text-gray-500" />
                    Date of Admission <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="dateOfAddmission"
                    value={formData.dateOfAddmission}
                    onChange={onChangeHandler}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition"
                    required
                  />
                </div>

                {/* Program Discipline */}
                <div className="space-y-2">
                  <label className="text-gray-700 font-medium flex items-center gap-2">
                    <BookOpen size={16} className="text-gray-500" />
                    Program Discipline <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="programFaculty"
                    value={formData.programFaculty}
                    onChange={onChangeHandler}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition appearance-none"
                    required
                  >
                    <option value="">Select Discipline</option>
                    {disciplines.map((discipline) => (
                      <option key={discipline} value={discipline}>
                        {discipline}
                      </option>
                    ))}
                  </select>
                </div>

                {/* University */}
                <div className="space-y-2">
                  <label className="text-gray-700 font-medium flex items-center gap-2">
                    <School size={16} className="text-gray-500" />
                    University <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="universityName"
                    value={formData.universityName}
                    onChange={onChangeHandler}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition appearance-none"
                    required
                  >
                    <option value="">Select University</option>
                    {universities.map((university) => (
                      <option key={university} value={university}>
                        {university}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-gray-700 font-medium flex items-center gap-2">
                    <Calendar size={16} className="text-gray-500" />
                    Date of Birth <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={onChangeHandler}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition"
                    placeholder="Date of Birth"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-gray-700 font-medium flex items-center gap-2">
                    <Home size={16} className="text-gray-500" />
                    Domicile <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="domicle"
                    value={formData.domicle}
                    onChange={onChangeHandler}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition appearance-none"
                    required
                  >
                    <option value="">Select Domicile</option>
                    {domiciles.map((dom) => (
                      <option key={dom} value={dom}>
                        {dom}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-gray-700 font-medium flex items-center gap-2">
                    <DollarSign size={16} className="text-gray-500" />
                    Family Income <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="familyIncome"
                    value={formData.familyIncome}
                    onChange={onChangeHandler}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition"
                    placeholder="Family Income"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-gray-700 font-medium flex items-center gap-2">
                    <CreditCard size={16} className="text-gray-500" />
                    Passport Number
                  </label>
                  <input
                    type="text"
                    name="passportNumber"
                    value={formData.passportNumber}
                    onChange={onChangeHandler}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition"
                    placeholder="Passport Number"
                  />
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex flex-col sm:flex-row justify-between gap-4 pt-6 border-t border-gray-200">
              <Link
                to="/award"
                className="flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 px-6 rounded-lg transition"
              >
                Previous
              </Link>
              <div className="flex gap-4 justify-center sm:justify-end">
                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition shadow-md"
                >
                  Save
                </button>
                <Link
                  to="/address"
                  className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition shadow-md"
                >
                  Next
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* File Upload Section (Desktop) */}
      <div className="hidden md:block w-full max-w-[300px] p-6">
        <div className="space-y-2 sticky top-6">
          <label className="block text-sm font-medium text-gray-700">
            Upload Profile Image
          </label>
          <div
            className={`relative border-2 border-dashed rounded-lg px-6 py-10 flex flex-col items-center justify-center transition-all ${
              file
                ? "border-blue-300 bg-blue-50"
                : "border-gray-300 hover:border-blue-400 bg-gray-50 hover:bg-blue-50"
            }`}
          >
            <input
  type="file"
  ref={fileInputRef}
  onChange={handleFileChange}
  className="absolute inset-0 w-full h-full opacity-1 cursor-pointer bg-transparent text-transparent"
  accept="image/*,.pdf"
  required
/>


              <div className="flex flex-col items-center text-center space-y-3">
                <UploadCloud className="h-10 w-10 text-gray-400" />
                <div className="flex flex-col items-center text-sm text-gray-600">
                  <span>Drag and drop files here</span>
                  <span>or</span>
                  <span className="font-medium text-blue-600 hover:text-blue-500">
                    browse files
                  </span>
                </div>
                <span className="text-xs text-gray-500">
                  PDF, JPG, PNG up to 5MB
                </span>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalDetail;