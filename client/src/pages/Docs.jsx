import React from 'react';

import { 
  FaIdCard, 
  FaFileAlt, 
  FaFileSignature, 
  FaHome, 
  FaUpload, 
  FaCheckCircle,
  FaArrowLeft,
  FaArrowRight
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Docs = () => {
  const checkFileSize = (event) => {
    if (event.target.files[0]?.size > 200 * 1024) {
      alert('File size should be less than 200 KB');
      event.target.value = null;
    }
  };

  const documentTypes = [
    {
      id: 'cnicFront',
      label: 'CNIC Front',
      icon: <FaIdCard className="text-blue-500" />,
      description: 'Clear scan of front side of CNIC'
    },
    {
      id: 'cnicBack',
      label: 'CNIC Back',
      icon: <FaIdCard className="text-blue-500" />,
      description: 'Clear scan of back side of CNIC'
    },
    {
      id: 'transcript',
      label: 'Undergraduate Transcript',
      icon: <FaFileAlt className="text-green-500" />,
      description: 'Scanned copy of official transcript'
    },
    {
      id: 'affidavit',
      label: 'Affidavit',
      icon: <FaFileSignature className="text-purple-500" />,
      description: 'Notarized affidavit document'
    },
    {
      id: 'domicile',
      label: 'Domicile Certificate',
      icon: <FaHome className="text-orange-500" />,
      description: 'Scanned copy of domicile certificate'
    }
  ];
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center justify-center gap-3">
            <FaUpload className="text-blue-600" />
            Document Upload
          </h1>
          <p className="mt-2 text-gray-600">
            Please upload clear scanned copies of the following documents
          </p>
          <div className="mt-4 bg-blue-100 text-blue-800 p-3 rounded-lg inline-flex items-center gap-2">
            <FaCheckCircle />
            <span>Maximum file size: 200KB per document</span>
          </div>
        </div>

        {/* Upload Cards */}
        <div className="space-y-6">
          {documentTypes.map((doc) => (
            <div key={doc.id} className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-300 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="bg-blue-50 p-3 rounded-full">
                  {doc.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800">{doc.label}</h3>
                  <p className="text-sm text-gray-500 mt-1">{doc.description}</p>
                  <div className="mt-4">
                    <label className="flex flex-col items-center px-4 py-6 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 cursor-pointer hover:bg-gray-100 transition-colors">
                      <div className="flex flex-col items-center">
                        <FaUpload className="text-gray-400 text-xl mb-2" />
                        <span className="text-sm text-gray-600">Click to upload</span>
                        <span className="text-xs text-gray-500 mt-1">or drag and drop</span>
                      </div>
                      <input 
                        type="file" 
                        id={doc.id}
                        accept="image/*,.pdf"
                        onChange={checkFileSize}
                        className="hidden" 
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 mt-10">
        <button
      onClick={() => navigate("/educational")}
      className="flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 px-6 rounded-lg transition duration-200"
    >
      <FaArrowLeft /> Previous
    </button>

          <button className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition duration-200 shadow-md">
            Submit Documents <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Docs;