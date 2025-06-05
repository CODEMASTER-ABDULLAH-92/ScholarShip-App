import React, { useContext, useState } from 'react';
import { 
  FaIdCard, 
  FaFileAlt, 
  FaFileSignature, 
  FaHome, 
  FaUpload, 
  FaCheckCircle,
  FaArrowLeft,
  FaArrowRight,
  FaSpinner
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ContextApi } from '../Context/ContextApi';

const DocumentCard = ({ id, label, icon, description, onFileChange, file, required }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-300 hover:shadow-lg transition-shadow">
      <div className="flex items-start gap-4">
        <div className="bg-blue-50 p-3 rounded-full">
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800">
            {label} 
            {required && <span className="text-red-500 ml-1">*</span>}
          </h3>
          <p className="text-sm text-gray-500 mt-1">{description}</p>
          <div className="mt-4">
            <label className="flex flex-col items-center px-4 py-6 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 cursor-pointer hover:bg-gray-100 transition-colors">
              <div className="flex flex-col items-center">
                <FaUpload className="text-gray-400 text-xl mb-2" />
                <span className="text-sm text-gray-600">
                  {file ? file.name : 'Click to upload'}
                </span>
                <span className="text-xs text-gray-500 mt-1">
                  {file ? 'Click to change' : 'or drag and drop'}
                </span>
              </div>
              <input 
                type="file" 
                id={id}
                name={id}
                accept="image/*,.pdf"
                onChange={onFileChange}
                className="hidden" 
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

const Docs = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [files, setFiles] = useState({
    cnicFront: null,
    cnicBack: null,
    undergrateTranscript: null,
    affidavit: null,
    domicle: null
  });  
  const { url } = useContext(ContextApi);

  const checkFileSize = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // 5MB file size limit (adjust as needed)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      toast.error(`File size should be less than ${maxSize/1024/1024}MB`);
      event.target.value = null;
      return;
    }

    // Validate file types
    const validTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (!validTypes.includes(file.type)) {
      toast.error('Only JPG, PNG, or PDF files are allowed');
      event.target.value = null;
      return;
    }

    setFiles(prev => ({
      ...prev,
      [event.target.name]: file
    }));
  };


  // Update your handleSubmit function:
const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    const formData = new FormData();
    
    // Use EXACT field names that match your Multer configuration
    if (files.cnicFront) formData.append('cnicFront', files.cnicFront);
    if (files.cnicBack) formData.append('cnicBack', files.cnicBack);
    if (files.undergrateTranscript) formData.append('undergrateTranscript', files.undergrateTranscript);
    if (files.affidavit) formData.append('affidavit', files.affidavit);
    if (files.domicle) formData.append('domicle', files.domicle);



    const response = await axios.post(`${url}/api/docs/add-docs`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
      timeout: 30000
    });

    if (response.data.success) {
      toast.success("Documents uploaded successfully!");
      navigate(`/dashboard/user-dashboard/${localStorage.getItem("userId")}`);
    }
  } catch (error) {
    console.error('Upload error:', error);
    toast.error(error.response?.data?.message || 'Document upload failed');
  } finally {
    setIsSubmitting(false);
  }
};

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
          <span>Maximum file size: 2MB per document</span>
        </div>
      </div>

      {/* Form with document uploads */}
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <DocumentCard
            id="cnicFront"
            label="CNIC Front"
            icon={<FaIdCard className="text-blue-500" />}
            description="Clear scan of front side of CNIC"
            onFileChange={checkFileSize}
            file={files.cnicFront}
            required
          />
          
          <DocumentCard
            id="cnicBack"
            label="CNIC Back"
            icon={<FaIdCard className="text-blue-500" />}
            description="Clear scan of back side of CNIC"
            onFileChange={checkFileSize}
            file={files.cnicBack}
            required
          />
          
          <DocumentCard
            id="undergrateTranscript"
            label="Undergraduate Transcript"
            icon={<FaFileAlt className="text-green-500" />}
            description="Scanned copy of official transcript"
            onFileChange={checkFileSize}
            file={files.undergrateTranscript}
            required
          />
          
          <DocumentCard
            id="affidavit"
            label="Affidavit"
            icon={<FaFileSignature className="text-purple-500" />}
            description="Notarized affidavit document"
            onFileChange={checkFileSize}
            file={files.affidavit}
          />
          
          <DocumentCard
            id="domicle"
            label="Domicile Certificate"
            icon={<FaHome className="text-orange-500" />}
            description="Scanned copy of domicile certificate"
            onFileChange={checkFileSize}
            file={files.domicle}
          />
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 mt-10">
          <button
            type="button"
            onClick={() => navigate("/educational")}
            className="flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 px-6 rounded-lg transition duration-200"
          >
            <FaArrowLeft /> Previous
          </button>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition duration-200 shadow-md disabled:bg-blue-400 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <FaSpinner className="animate-spin" /> Processing...
              </>
            ) : (
              <>
                Submit Documents <FaArrowRight />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  </div>
  );
};

export default Docs;