import React, { useState, useEffect } from 'react';
import { FaUser, FaGraduationCap, FaSchool, FaUniversity, FaMapMarkerAlt, FaCalendarAlt, FaIdCard, FaMoneyBillWave, FaPassport, FaInfoCircle } from 'react-icons/fa';
import { IoDocumentTextOutline } from 'react-icons/io5';
import axios from 'axios';

const ScholarshipApplication = () => {
  const [applicationData, setApplicationData] = useState(null);
  const [scholarshipData, setScholarshipData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch application data
        const appResponse = await axios.get('/api/application');
        setApplicationData(appResponse.data);
        
        // Fetch scholarship data
        const scholarshipResponse = await axios.get('/api/scholarship');
        setScholarshipData(scholarshipResponse.data);
        
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  if (error) return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        Error: {error}
      </div>
    </div>
  );

  if (!applicationData || !scholarshipData) return null;

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Scholarship Header */}
      <div className="bg-blue-50 rounded-lg p-6 mb-8 shadow">
        <h1 className="text-3xl font-bold text-blue-800 mb-2">{scholarshipData.title}</h1>
        <p className="text-gray-700 mb-4">{scholarshipData.description}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div className="flex items-center">
            <FaUniversity className="text-blue-600 mr-2" />
            <span>{scholarshipData.university}</span>
          </div>
          <div className="flex items-center">
            <FaMapMarkerAlt className="text-blue-600 mr-2" />
            <span>{scholarshipData.location}</span>
          </div>
          <div className="flex items-center">
            <FaCalendarAlt className="text-blue-600 mr-2" />
            <span>Deadline: {new Date(scholarshipData.deadline).toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      {/* Applicant Information */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
          <FaUser className="mr-2 text-blue-600" />
          Applicant Information
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-2">Personal Details</h3>
            <div className="space-y-2">
              <p><span className="font-medium">Name:</span> {applicationData.firstName} {applicationData.lastName}</p>
              <p><span className="font-medium">Date of Birth:</span> {applicationData.dateOfBirth}</p>
              <p><span className="font-medium">Religion:</span> {applicationData.religion}</p>
              <p><span className="font-medium">Contact:</span> {applicationData.contactNumber}</p>
              <p><span className="font-medium">Passport:</span> {applicationData.passportNumber || 'N/A'}</p>
              <p><span className="font-medium">Family Income:</span> {applicationData.familyIncome}</p>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-2">Address</h3>
            <div className="space-y-2">
              <p><span className="font-medium">Country:</span> {applicationData.country}</p>
              <p><span className="font-medium">Province:</span> {applicationData.province}</p>
              <p><span className="font-medium">District:</span> {applicationData.district}</p>
              <p><span className="font-medium">City:</span> {applicationData.city}</p>
              <p><span className="font-medium">Full Address:</span> {applicationData.fullAddress}</p>
              <p><span className="font-medium">Domicile:</span> {applicationData.domicile}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Education Background */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
          <FaGraduationCap className="mr-2 text-blue-600" />
          Education Background
        </h2>
        
        {/* School Education */}
        <div className="mb-6">
          <h3 className="text-xl font-medium text-gray-700 mb-3 flex items-center">
            <FaSchool className="mr-2 text-blue-500" />
            School Education
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p><span className="font-medium">Degree Level:</span> {applicationData.degreeLevel}</p>
            <p><span className="font-medium">School Name:</span> {applicationData.schoolName}</p>
            <p><span className="font-medium">Discipline:</span> {applicationData.degreeDiscipline}</p>
            <p><span className="font-medium">Obtained Marks:</span> {applicationData.ontainedMarks}</p>
            <p><span className="font-medium">Total Marks:</span> {applicationData.totalMarks}</p>
            <p><span className="font-medium">Percentage:</span> {applicationData.percentage}%</p>
          </div>
        </div>
        
        {/* College Education */}
        <div className="mb-6">
          <h3 className="text-xl font-medium text-gray-700 mb-3 flex items-center">
            <FaSchool className="mr-2 text-blue-500" />
            College Education
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p><span className="font-medium">Degree Level:</span> {applicationData.collegedegreeLevel}</p>
            <p><span className="font-medium">College Name:</span> {applicationData.collegesName}</p>
            <p><span className="font-medium">Discipline:</span> {applicationData.collegeDegreeDiscipline}</p>
            <p><span className="font-medium">Obtained Marks:</span> {applicationData.collegeOntainedMarks}</p>
            <p><span className="font-medium">Total Marks:</span> {applicationData.collegeTotalMarks}</p>
            <p><span className="font-medium">Percentage:</span> {applicationData.collegePercentage}%</p>
          </div>
        </div>
        
        {/* University Education */}
        <div className="mb-6">
          <h3 className="text-xl font-medium text-gray-700 mb-3 flex items-center">
            <FaUniversity className="mr-2 text-blue-500" />
            University Education
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p><span className="font-medium">Degree Level:</span> {applicationData.universityDegreeLevel}</p>
            <p><span className="font-medium">University Name:</span> {applicationData.universityName}</p>
            <p><span className="font-medium">Current Semester:</span> {applicationData.universityCurrentSemeter}</p>
            <p><span className="font-medium">Discipline:</span> {applicationData.universityDegreeDiscipline}</p>
            <p><span className="font-medium">Obtained CGPA:</span> {applicationData.universityOntainedCGPA}</p>
            <p><span className="font-medium">Total CGPA:</span> {applicationData.universityTotalCGPA}</p>
            <p><span className="font-medium">Percentage:</span> {applicationData.universityPercentage}%</p>
          </div>
        </div>
        
        {/* Current Education */}
        <div>
          <h3 className="text-xl font-medium text-gray-700 mb-3 flex items-center">
            <FaInfoCircle className="mr-2 text-blue-500" />
            Current Education
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p><span className="font-medium">Institute Level:</span> {applicationData.currentInstituteLevel}</p>
            <p><span className="font-medium">Date of Admission:</span> {applicationData.dateOfAddmission}</p>
            <p><span className="font-medium">Program Faculty:</span> {applicationData.programFaculty}</p>
            <p><span className="font-medium">University Name:</span> {applicationData.universityName}</p>
          </div>
        </div>
      </div>

      {/* Documents Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
          <IoDocumentTextOutline className="mr-2 text-blue-600" />
          Submitted Documents
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border rounded p-3">
            <h4 className="font-medium mb-2">CNIC Front</h4>
            {applicationData.cnicFront?.map((doc, index) => (
              <a key={index} href={doc} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline block">
                Document {index + 1}
              </a>
            ))}
          </div>
          
          <div className="border rounded p-3">
            <h4 className="font-medium mb-2">CNIC Back</h4>
            {applicationData.cnicBack?.map((doc, index) => (
              <a key={index} href={doc} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline block">
                Document {index + 1}
              </a>
            ))}
          </div>
          
          <div className="border rounded p-3">
            <h4 className="font-medium mb-2">Affidavit</h4>
            {applicationData.affidavit?.map((doc, index) => (
              <a key={index} href={doc} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline block">
                Document {index + 1}
              </a>
            ))}
          </div>
          
          <div className="border rounded p-3">
            <h4 className="font-medium mb-2">Domicile</h4>
            {applicationData.domicile?.map((doc, index) => (
              <a key={index} href={doc} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline block">
                Document {index + 1}
              </a>
            ))}
          </div>
          
          <div className="border rounded p-3">
            <h4 className="font-medium mb-2">Undergraduate Transcript</h4>
            {applicationData.undergrateTranscript?.map((doc, index) => (
              <a key={index} href={doc} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline block">
                Document {index + 1}
              </a>
            ))}
          </div>
          
          <div className="border rounded p-3">
            <h4 className="font-medium mb-2">Profile Image</h4>
            {applicationData.profileImage?.map((doc, index) => (
              <a key={index} href={doc} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline block">
                Document {index + 1}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Scholarship Details */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
          <FaInfoCircle className="mr-2 text-blue-600" />
          Scholarship Details
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-2">Requirements</h3>
            <div className="space-y-2">
              <p><span className="font-medium">Academic Levels:</span> {scholarshipData.academicLevel?.join(', ')}</p>
              <p><span className="font-medium">GPA Requirement:</span> {scholarshipData.gpaRequirement}</p>
              <p><span className="font-medium">Fields of Study:</span> {scholarshipData.fieldsOfStudy?.join(', ')}</p>
              <p><span className="font-medium">Other Requirements:</span> {scholarshipData.otherRequirements}</p>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-2">Benefits</h3>
            <div className="space-y-2">
              <p><span className="font-medium">Benefit Amount:</span> ${scholarshipData.benefitAmount}</p>
              <p><span className="font-medium">Renewable:</span> {scholarshipData.benefitRenewable ? 'Yes' : 'No'}</p>
              <p><span className="font-medium">Additional Benefits:</span> {scholarshipData.additionalBenefits}</p>
              <p><span className="font-medium">Terms & Conditions:</span> {scholarshipData.termsAndConditions}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScholarshipApplication;