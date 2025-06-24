import React, { useContext } from 'react';
import { 
  Award,ChevronDown,BookOpen,GraduationCap,
  DollarSign,
  ClipboardList,
  CheckCircle,
  MapPin,
  Calendar,
  ArrowLeft
} from "lucide-react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import {ContextApi} from "../Context/ContextApi";
import { toast } from 'react-toastify';
const NewScholarshipPage = () => {
  const { url } = useContext(ContextApi);
  
  const [formDataState, setFormDataState] = React.useState({
    title: "",
    description: "",
    university: "",
    location: "",
    academicLevel: [],
    gpaRequirement: 3.7,
    fieldsOfStudy: [],
    otherRequirements: "",
    benefitAmount: "",
    benefitRenewable: false,
    additionalBenefits: "",
    deadline: "",
    termsAndConditions: ""
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormDataState(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleArrayChange = (field, value, isChecked) => {
    setFormDataState(prev => {
      const currentArray = [...prev[field]];
      if (isChecked) {
        return { ...prev, [field]: [...currentArray, value] };
      } else {
        return { ...prev, [field]: currentArray.filter(item => item !== value) };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Prepare the data for submission
      const submissionData = {
        ...formDataState,
        // Convert arrays to strings if your backend expects strings
        academicLevel: formDataState.academicLevel,
        fieldsOfStudy: formDataState.fieldsOfStudy,
        // Convert boolean to string if needed
        benefitRenewable: formDataState.benefitRenewable.toString()
      };

      const response = await axios.post(
        `${url}/api/scholarship/add-scholarShipDetails`,
        submissionData,
        {withCredentials:true},
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.success) {
        toast.success("Scholarship created successfully!");
        // Reset form
        setFormDataState({
          title: "",
          description: "",
          university: "",
          location: "",
          academicLevel: [],
          gpaRequirement: 3.7,
          fieldsOfStudy: [],
          otherRequirements: "",
          benefitAmount: "",
          benefitRenewable: false,
          additionalBenefits: "",
          deadline: "",
          termsAndConditions: ""
        });
      } else {
        toast.error(response.data.message || "Failed to create scholarship");
      }
    } catch (error) {
      console.error("Error in adding scholarship details", error);
      toast.error(
        error.response?.data?.message || 
        error.message || 
        "An error occurred while creating the scholarship"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <h1 className="text-xl font-bold text-gray-900">Scholarship Admin Portal</h1>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
                  A
                </div>
                <ChevronDown size={16} className="ml-1 text-gray-500 hidden md:inline" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6 flex items-center">
          <Link to="/dashboard" className="flex items-center text-blue-600 hover:text-blue-800">
            <ArrowLeft size={18} className="mr-1" />
            Back to Dashboard
          </Link>
        </div>

        <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
          {/* Form Header */}
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <Award size={20} className="text-blue-500" />
              Create New Scholarship
            </h2>
          </div>

          {/* Scholarship Form */}
          <form onSubmit={handleSubmit} className="p-6">
            {/* Basic Information */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                <BookOpen size={18} className="text-blue-500" />
                Basic Information
              </h3>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                    Scholarship Title *
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formDataState.title}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="university" className="block text-sm font-medium text-gray-700 mb-1">
                    University *
                  </label>
                  <input
                    type="text"
                    id="university"
                    name="university"
                    value={formDataState.university}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                    Location *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MapPin size={16} className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={formDataState.location}
                      onChange={handleChange}
                      className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="deadline" className="block text-sm font-medium text-gray-700 mb-1">
                    Application Deadline *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Calendar size={16} className="text-gray-400" />
                    </div>
                    <input
                      type="date"
                      id="deadline"
                      name="deadline"
                      value={formDataState.deadline}
                      onChange={handleChange}
                      className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Description *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={3}
                    value={formDataState.description}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Academic Requirements */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                <GraduationCap size={18} className="text-blue-500" />
                Academic Requirements
              </h3>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Academic Level *
                  </label>
                  <div className="space-y-2">
                    {["Undergraduate", "Graduate", "PhD"].map(level => (
                      <div key={level} className="flex items-center">
                        <input
                          id={`level-${level}`}
                          name="academicLevel"
                          type="checkbox"
                          checked={formDataState.academicLevel.includes(level)}
                          onChange={(e) => handleArrayChange("academicLevel", level, e.target.checked)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor={`level-${level}`} className="ml-2 text-sm text-gray-700">
                          {level}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="gpaRequirement" className="block text-sm font-medium text-gray-700 mb-1">
                    Minimum GPA Requirement *
                  </label>
                  <input
                    type="number"
                    id="gpaRequirement"
                    name="gpaRequirement"
                    step="0.1"
                    min="0"
                    max="4"
                    value={formDataState.gpaRequirement}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fields of Study *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {[
                      "Computer Science", 
                      "Electrical Engineering", 
                      "Biomedical Engineering",
                      "Data Science",
                      "Artificial Intelligence",
                      "Mechanical Engineering",
                      "Chemical Engineering",
                      "Mathematics",
                      "Physics"
                    ].map(field => (
                      <div key={field} className="flex items-center">
                        <input
                          id={`field-${field}`}
                          name="fieldsOfStudy"
                          type="checkbox"
                          checked={formDataState.fieldsOfStudy.includes(field)}
                          onChange={(e) => handleArrayChange("fieldsOfStudy", field, e.target.checked)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor={`field-${field}`} className="ml-2 text-sm text-gray-700">
                          {field}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Scholarship Benefits */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                <DollarSign size={18} className="text-blue-500" />
                Scholarship Benefits
              </h3>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="benefitAmount" className="block text-sm font-medium text-gray-700 mb-1">
                    Award Amount ($) *
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      type="number"
                      id="benefitAmount"
                      name="benefitAmount"
                      value={formDataState.benefitAmount}
                      onChange={handleChange}
                      className="pl-7 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>

                <div className="flex items-end">
                  <div className="flex items-center h-10">
                    <input
                      id="benefitRenewable"
                      name="benefitRenewable"
                      type="checkbox"
                      checked={formDataState.benefitRenewable}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="benefitRenewable" className="ml-2 text-sm text-gray-700">
                      Renewable Scholarship
                    </label>
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="additionalBenefits" className="block text-sm font-medium text-gray-700 mb-1">
                    Additional Benefits
                  </label>
                  <textarea
                    id="additionalBenefits"
                    name="additionalBenefits"
                    rows={3}
                    value={formDataState.additionalBenefits}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Application Requirements */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                <ClipboardList size={18} className="text-blue-500" />
                Application Requirements
              </h3>
              <div>
                <label htmlFor="otherRequirements" className="block text-sm font-medium text-gray-700 mb-1">
                  Required Materials *
                </label>
                <textarea
                  id="otherRequirements"
                  name="otherRequirements"
                  rows={4}
                  value={formDataState.otherRequirements}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>

            {/* Terms & Conditions */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                <CheckCircle size={18} className="text-blue-500" />
                Terms & Conditions
              </h3>
              <div>
                <label htmlFor="termsAndConditions" className="block text-sm font-medium text-gray-700 mb-1">
                  Scholarship Terms *
                </label>
                <textarea
                  id="termsAndConditions"
                  name="termsAndConditions"
                  rows={4}
                  value={formDataState.termsAndConditions}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>

            {/* Form Actions */}
            <div className="pt-5 border-t border-gray-200">
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Save as Draft
                </button>
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Publish Scholarship
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default NewScholarshipPage;





 // const [formData, setFormData] = React.useState({
  //   title: "STEM Excellence Scholarship",
  //   description: "A merit-based scholarship for outstanding students pursuing STEM fields at the undergraduate or graduate level.",
  //   university: "Tech Valley University",
  //   location: "San Francisco, California, USA",
  //   academicLevel: ["Undergraduate", "Graduate"],
  //   gpaRequirement: 3.7,
  //   fieldsOfStudy: [
  //     "Computer Science",
  //     "Electrical Engineering",
  //     "Biomedical Engineering",
  //     "Data Science",
  //     "Artificial Intelligence"
  //   ],
  //   otherRequirements: "Applicants must submit two recommendation letters, a personal statement, and proof of extracurricular activities in STEM fields.",
  //   benefitAmount: 15000,
  //   benefitRenewable: true,
  //   additionalBenefits: "Includes access to research labs, faculty mentorship program, and internship opportunities with partner companies.",
  //   deadline: "2024-12-15",
  //   termsAndConditions: "Recipients must maintain full-time enrollment and a minimum 3.5 GPA to renew the scholarship. Funds are disbursed directly to the university tuition account."
  // });