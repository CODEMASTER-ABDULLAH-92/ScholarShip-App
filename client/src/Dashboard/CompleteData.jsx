import React, { useState, useEffect, useContext } from 'react';
import { 
  FaUser, 
  FaGraduationCap, 
  FaMapMarkerAlt, 
  FaFileAlt,
  FaSpinner,
  FaExclamationTriangle
} from 'react-icons/fa';
import { ContextApi } from '../Context/ContextApi';

const ScholarshipApplication = () => {
  const [scholarshipData, setScholarshipData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const context = useContext(ContextApi);

  useEffect(() => {
    const processData = () => {
      try {
        setLoading(true);
        setError(null);

        // Destructure context data with defaults
        const { 
          personalData = {}, 
          addressData = {}, 
          educationData = {}, 
          docsData = {} 
        } = context || {};

        // Check if we have at least personal data (minimum requirement)
        // if (!personalData || Object.keys(personalData).length === 0) {
        //   throw new Error('Basic personal information is required');
        // }

        // Create merged data object with fallbacks
        const mergedData = {
          // Personal Info (required)
          ...personalData,
          
          // Address Info (optional with defaults)
          country: addressData?.country || 'Not provided',
          province: addressData?.province || 'Not provided',
          district: addressData?.district || 'Not provided',
          city: addressData?.city || 'Not provided',
          fullAddress: addressData?.fullAddress || 'Not provided',
          domicle: addressData?.domicle || personalData.domicle || 'Not provided',
          
          // Education Info (optional with defaults)
          universityName: educationData?.universityName || personalData.universityName || 'Not provided',
          programFaculty: educationData?.programFaculty || personalData.programFaculty || 'Not provided',
          currentInstituteLevel: educationData?.currentInstituteLevel || personalData.currentInstituteLevel || 'Not provided',
          
          // Documents (optional)
          cnicFront: docsData?.cnicFront || null,
          cnicBack: docsData?.cnicBack || null,
          affidavit: docsData?.affidavit || null,
          undergrateTranscript: docsData?.undergrateTranscript || null
        };

        setScholarshipData(mergedData);
      } catch (err) {
        console.error('Data processing error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    processData();
  }, [context]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-8">
        <FaSpinner className="animate-spin text-4xl text-blue-600 mb-4" />
        <p className="text-lg text-gray-600">Loading your application data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 max-w-md w-full">
          <div className="flex items-center gap-2 mb-2">
            <FaExclamationTriangle className="text-xl" />
            <h2 className="font-bold text-lg">Application Incomplete</h2>
          </div>
          <p>{error}</p>
          <p className="mt-3 text-sm">
            Please complete all required sections in the application form.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="flex-1 p-6 md:p-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-blue-800 mb-1">
              Scholarship Application
            </h1>
            <p className="text-gray-600">
              {scholarshipData.firstName}'s Application Details
            </p>
          </div>
        </div>

        {/* Personal Information Section */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-blue-800 flex items-center gap-3">
              <FaUser className="text-blue-600" />
              Personal Information
            </h2>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <InfoItem label="Full Name" value={`${scholarshipData.firstName} ${scholarshipData.lastName}`} />
              <InfoItem label="Date of Birth" value={scholarshipData.dateOfBirth} />
              <InfoItem label="Religion" value={scholarshipData.religion} />
            </div>
            <div className="space-y-3">
              <InfoItem label="Contact Number" value={scholarshipData.contactNumber} />
              <InfoItem label="Passport Number" value={scholarshipData.passportNumber || 'Not provided'} />
              <InfoItem label="Family Income" value={scholarshipData.familyIncome} />
            </div>
          </div>
        </div>

        {/* Education Information - Only show if we have education data */}
        {(scholarshipData.universityName !== 'Not provided' || 
          scholarshipData.programFaculty !== 'Not provided') && (
          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-blue-800 flex items-center gap-3">
                <FaGraduationCap className="text-green-600" />
                Education Information
              </h2>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <InfoItem label="University" value={scholarshipData.universityName} />
                <InfoItem label="Faculty/Program" value={scholarshipData.programFaculty} />
              </div>
              <div className="space-y-3">
                <InfoItem label="Current Level" value={scholarshipData.currentInstituteLevel} />
                <InfoItem label="Date of Admission" value={scholarshipData.dateOfAddmission || 'Not provided'} />
              </div>
            </div>
          </div>
        )}

        {/* Address Information - Only show if we have address data */}
        {(scholarshipData.country !== 'Not provided' || 
          scholarshipData.city !== 'Not provided') && (
          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-blue-800 flex items-center gap-3">
                <FaMapMarkerAlt className="text-red-600" />
                Address Information
              </h2>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <InfoItem label="Country" value={scholarshipData.country} />
                <InfoItem label="Province/State" value={scholarshipData.province} />
                <InfoItem label="District" value={scholarshipData.district} />
              </div>
              <div className="space-y-3">
                <InfoItem label="City" value={scholarshipData.city} />
                <InfoItem label="Full Address" value={scholarshipData.fullAddress} />
                <InfoItem label="Domicile" value={scholarshipData.domicle} />
              </div>
            </div>
          </div>
        )}

        {/* Documents Section - Only show if we have documents */}
        {(scholarshipData.cnicFront || 
          scholarshipData.cnicBack || 
          scholarshipData.affidavit || 
          scholarshipData.undergrateTranscript) && (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-blue-800 flex items-center gap-3">
                <FaFileAlt className="text-purple-600" />
                Uploaded Documents
              </h2>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {scholarshipData.cnicFront && (
                <DocumentPreview label="CNIC Front" src={scholarshipData.cnicFront} />
              )}
              {scholarshipData.cnicBack && (
                <DocumentPreview label="CNIC Back" src={scholarshipData.cnicBack} />
              )}
              {scholarshipData.affidavit && (
                <DocumentPreview label="Affidavit" src={scholarshipData.affidavit} />
              )}
              {scholarshipData.undergrateTranscript && (
                <DocumentPreview label="Transcript" src={scholarshipData.undergrateTranscript} />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Reusable Info Item Component
const InfoItem = ({ label, value }) => (
  <div className="flex items-start">
    <span className="font-medium text-gray-700 w-40">{label}:</span>
    <span className="text-gray-800 flex-1">{value}</span>
  </div>
);

// Reusable Document Preview Component
const DocumentPreview = ({ label, src }) => {
  const [imgError, setImgError] = useState(false);

  if (!src || imgError) return null;

  return (
    <div className="border border-gray-200 rounded-lg p-3 hover:shadow-md transition">
      <p className="font-medium text-gray-700 mb-2">{label}</p>
      <img 
        src={src} 
        alt={label} 
        onError={() => setImgError(true)}
        className="rounded-lg object-cover h-48 w-full border border-gray-200" 
      />
    </div>
  );
};

export default ScholarshipApplication;