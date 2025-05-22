import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ContextApi } from '../Context/ContextApi';

const Details = () => {
  const { id } = useParams();
  const [scholarship, setScholarship] = useState(null);

  const {data} = useContext(ContextApi);
  useEffect(() => {
    const foundScholarship = data.find((item) => item._id === id);
    
    if (foundScholarship) {
      // Save to localStorage
      localStorage.setItem("scholarship", JSON.stringify(foundScholarship));
      setScholarship(foundScholarship);
    } else {
      // Try to restore from localStorage on refresh
      const saved = localStorage.getItem("scholarship");
      if (saved) {
        setScholarship(JSON.parse(saved));
      }
    }
  }, [data, id]);
  

  if (!scholarship) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-gray-600">Loading scholarship details...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <header className="text-center mb-8 pb-6 border-b border-gray-200">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
          {scholarship.title}
        </h1>
        <h2 className="text-xl md:text-2xl text-gray-600 font-medium">
          Offered by: {scholarship.university}
        </h2>
        <p className="text-blue-500 mt-2 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
              clipRule="evenodd"
            />
          </svg>
          {scholarship.location}
        </p>
      </header>

      <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
        <section className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-100">
            Overview
          </h3>
          <p className="text-gray-700 leading-relaxed">{scholarship.description}</p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <section>
            <h3 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-100">
              Eligibility Requirements
            </h3>
            <ul className="space-y-3">
              <li className="text-gray-700">
                <span className="font-medium text-gray-800">Academic Level:</span>{' '}
                {scholarship.academicLevel.join(', ')}
              </li>
              <li className="text-gray-700">
                <span className="font-medium text-gray-800">Minimum GPA:</span>{' '}
                {scholarship.gpaRequirement}
              </li>
              <li className="text-gray-700">
                <span className="font-medium text-gray-800">Fields of Study:</span>{' '}
                {scholarship.fieldsOfStudy.join(', ')}
              </li>
              {scholarship.otherRequirements && (
                <li className="text-gray-700">
                  <span className="font-medium text-gray-800">Other Requirements:</span>{' '}
                  {scholarship.otherRequirements}
                </li>
              )}
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-100">
              Scholarship Benefits
            </h3>
            <ul className="space-y-3">
              <li className="text-gray-700">
                <span className="font-medium text-gray-800">Amount:</span> $
                {scholarship.benefitAmount.toLocaleString()}
              </li>
              <li className="text-gray-700">
                <span className="font-medium text-gray-800">Renewable:</span>{' '}
                {scholarship.benefitRenewable ? 'Yes' : 'No'}
              </li>
              {scholarship.additionalBenefits && (
                <li className="text-gray-700">
                  <span className="font-medium text-gray-800">Additional Benefits:</span>{' '}
                  {scholarship.additionalBenefits}
                </li>
              )}
            </ul>
          </section>
        </div>

        <section className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-100">
            Application Deadline
          </h3>
          <p className="text-red-500 font-bold text-lg">
            {new Date(scholarship.deadline).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </section>

        <section className="mb-8 bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
            Terms and Conditions
          </h3>
          <p className="text-gray-700 leading-relaxed">{scholarship.termsAndConditions}</p>
        </section>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
          <Link 
            to={`/apply/${scholarship._id}`} 
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition duration-300 text-center"
          >
            Apply Now
          </Link>
          <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 px-6 rounded-lg transition duration-300">
            Save Scholarship
          </button>
        </div>
      </div>
    </div>
  );
};

export default Details;