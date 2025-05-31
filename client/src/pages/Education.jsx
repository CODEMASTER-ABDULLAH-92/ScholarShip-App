import axios from "axios";
import { useContext, useState } from "react";
import { FaSchool, FaUniversity, FaGraduationCap, FaBook, FaPercentage, FaChevronLeft, FaChevronRight, FaSave, FaCalendarAlt, FaClipboardList } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ContextApi } from "../Context/ContextApi";
import { toast } from "react-toastify";

const Educational = () => {
  const {url} = useContext(ContextApi);
  const [formData, setFormData] = useState({
    /* School Education */
    degreeLevel: "",
    schoolName: "",
    degreeDiscipline: "",
    ontainedMarks: "",
    totalMarks: "",
    percentage: "",

    /* College Education */
    collegedegreeLevel: "",
    collegesName: "",
    collegeDegreeDiscipline: "",
    collegeOntainedMarks: "",
    collegeTotalMarks: "",
    collegePercentage: "",

    /* University Education */
    universityDegreeLevel: "",
    universityName: "",
    universityCurrentSemeter: "",
    universityDegreeDiscipline: "",
    universityOntainedCGPA: "",
    universityTotalCGPA: "",
    universityPercentage: ""
  });

  const onChangeHandler = (e) => {
    const {name, value} = e.target;
    
    // Auto-calculate percentage when marks change
    if (name === 'ontainedMarks' || name === 'totalMarks') {
      const obtained = name === 'ontainedMarks' ? value : formData.ontainedMarks;
      const total = name === 'totalMarks' ? value : formData.totalMarks;
      
      if (obtained && total && !isNaN(obtained)) {
        const percentage = (parseFloat(obtained) / parseFloat(total)) * 100;
        setFormData(prev => ({
          ...prev,
          [name]: value,
          percentage: percentage.toFixed(2),
        }));
        return;
      }
    }
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      
      formDataToSend.append("degreeLevel", formData.degreeLevel);
      formDataToSend.append("schoolName", formData.schoolName);
      formDataToSend.append("degreeDiscipline", formData.degreeDiscipline);
      formDataToSend.append("ontainedMarks", formData.ontainedMarks);
      formDataToSend.append("totalMarks", formData.totalMarks);
      formDataToSend.append("percentage", formData.percentage);
      
      // College Education
      formDataToSend.append("collegedegreeLevel", formData.collegedegreeLevel);
      formDataToSend.append("collegesName", formData.collegesName);
      formDataToSend.append("collegeDegreeDiscipline", formData.collegeDegreeDiscipline);
      formDataToSend.append("collegeOntainedMarks", formData.collegeOntainedMarks);
      formDataToSend.append("collegeTotalMarks", formData.collegeTotalMarks);
      formDataToSend.append("collegePercentage", formData.collegePercentage);
      
      // University Education
      formDataToSend.append("universityDegreeLevel", formData.universityDegreeLevel);
      formDataToSend.append("universityName", formData.universityName);
      formDataToSend.append("universityCurrentSemeter", formData.universityCurrentSemeter);
      formDataToSend.append("universityDegreeDiscipline", formData.universityDegreeDiscipline);
      formDataToSend.append("universityOntainedCGPA", formData.universityOntainedCGPA);
      formDataToSend.append("universityTotalCGPA", formData.universityTotalCGPA);
      formDataToSend.append("universityPercentage", formData.universityPercentage);

      const response = await axios.post(
        `${url}/api/education/add-education`, 
        formDataToSend,
        {
          headers: {
            "Content-Type": "application/json",
          }
        }
      );

      if (response.data.success) {
        toast.success("Educational data saved successfully!");
        // Reset form if needed
        setFormData({
          degreeLevel: "",
          schoolName: "",
          degreeDiscipline: "",
          ontainedMarks: "",
          totalMarks: "",
          percentage: "",
          collegedegreeLevel: "",
          collegesName: "",
          collegeDegreeDiscipline: "",
          collegeOntainedMarks: "",
          collegeTotalMarks: "",
          collegePercentage: "",
          universityDegreeLevel: "",
          universityName: "",
          universityCurrentSemeter: "",
          universityDegreeDiscipline: "",
          universityOntainedCGPA: "",
          universityTotalCGPA: "",
          universityPercentage: ""
        });
      } else {
        toast.error(response.data.message || "Failed to save educational details");
      }
    } catch (error) {
      console.error("Error saving educational details", error);
      toast.error(
        error.response?.data?.message || 
        error.message || 
        "An error occurred while saving the educational information"
      );
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-gradient-to-br from-blue-50 to-gray-50 shadow-2xl rounded-2xl overflow-hidden p-6 sm:p-10 my-10 border border-gray-100">
      {/* Header */}
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-blue-800 flex items-center justify-center gap-3">
          <FaGraduationCap className="text-blue-600" />
          Educational Information
        </h1>
        <p className="text-gray-600 mt-2">Please provide your complete academic history</p>
      </div>

      <form onSubmit={onSubmitHandler}>
        {/* Matric/O-Level Section */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-8 border-l-4 border-blue-500">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-blue-100 p-3 rounded-full">
              <FaSchool className="text-blue-600 text-xl" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800">
              Secondary School Certificate / Matriculation / O-Level
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Program Title */}
            <div className="space-y-2">
              <label className="text-gray-700 font-medium flex items-center gap-1">
                <FaBook className="text-blue-500" />
                Program Title <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select 
                  name="degreeLevel"
                  value={formData.degreeLevel}
                  onChange={onChangeHandler}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 pl-10 focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition duration-200 bg-white appearance-none"
                >
                  <option value="" disabled>Select Degree</option>
                  <option value="Matriculation">Matriculation</option>
                  <option value="O-Level">O-Level</option>
                </select>
                <FaGraduationCap className="absolute left-3 top-3.5 text-gray-400" />
              </div>
            </div>

            {/* Institution Name */}
            <div className="space-y-2">
              <label className="text-gray-700 font-medium flex items-center gap-1">
                <FaUniversity className="text-blue-500" />
                Institution Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="schoolName"
                value={formData.schoolName}
                onChange={onChangeHandler}
                placeholder="Enter institution name"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 pl-10 focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition duration-200"
              />
            </div>

            {/* Discipline */}
            <div className="space-y-2">
              <label className="text-gray-700 font-medium flex items-center gap-1">
                <FaClipboardList className="text-blue-500" />
                Discipline <span className="text-red-500">*</span>
              </label>
              <select 
                name="degreeDiscipline"
                value={formData.degreeDiscipline}
                onChange={onChangeHandler}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 pl-10 focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition duration-200 bg-white appearance-none"
              >
                <option value="" disabled>Select Discipline</option>
                <option value="Science">Science</option>
                <option value="Arts">Arts</option>
              </select>
            </div>

            {/* Marks Section */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-gray-700 font-medium">Obtained Marks <span className="text-red-500">*</span></label>
                <input
                  type="number"
                  name="ontainedMarks"
                  value={formData.ontainedMarks}
                  onChange={onChangeHandler}
                  placeholder="Obtained marks"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition duration-200"
                />
              </div>
              <div className="space-y-2">
                <label className="text-gray-700 font-medium">Total Marks <span className="text-red-500">*</span></label>
                <input
                  type="number"
                  name="totalMarks"
                  value={formData.totalMarks}
                  onChange={onChangeHandler}
                  placeholder="Total marks"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition duration-200"
                />
              </div>
            </div>

            {/* Percentage */}
            <div className="space-y-2">
              <label className="text-gray-700 font-medium flex items-center gap-1">
                <FaPercentage className="text-blue-500" />
                Percentage <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="percentage"
                value={formData.percentage}
                readOnly
                className="w-full border border-gray-300 bg-gray-100 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition duration-200"
              />
            </div>
          </div>
        </div>

        {/* Intermediate/A-Level Section */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-8 border-l-4 border-green-500">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-green-100 p-3 rounded-full">
              <FaUniversity className="text-green-600 text-xl" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800">
              Higher Secondary School Certificate / Intermediate / A-Level
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Program Title */}
            <div className="space-y-2">
              <label className="text-gray-700 font-medium flex items-center gap-1">
                <FaBook className="text-blue-500" />
                Program Title <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select 
                  name="collegedegreeLevel"
                  value={formData.collegedegreeLevel}
                  onChange={onChangeHandler}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 pl-10 focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition duration-200 bg-white appearance-none"
                >
                  <option value="" disabled>Select Degree</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="A-Level">A-Level</option>
                </select>
                <FaGraduationCap className="absolute left-3 top-3.5 text-gray-400" />
              </div>
            </div>

            {/* Institution Name */}
            <div className="space-y-2">
              <label className="text-gray-700 font-medium flex items-center gap-1">
                <FaUniversity className="text-blue-500" />
                Institution Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="collegesName"
                value={formData.collegesName}
                onChange={onChangeHandler}
                placeholder="Enter institution name"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 pl-10 focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition duration-200"
              />
            </div>

            {/* Discipline */}
            <div className="space-y-2">
              <label className="text-gray-700 font-medium flex items-center gap-1">
                <FaClipboardList className="text-blue-500" />
                Discipline <span className="text-red-500">*</span>
              </label>
              <select 
                name="collegeDegreeDiscipline"
                value={formData.collegeDegreeDiscipline}
                onChange={onChangeHandler}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 pl-10 focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition duration-200 bg-white appearance-none"
              >
                <option value="" disabled>Select Discipline</option>
                <option value="Pre-Medical">Pre-Medical</option>
                <option value="Pre-Engineering">Pre-Engineering</option>
                <option value="Commerce">Commerce</option>
                <option value="Arts">Arts</option>
              </select>
            </div>

            {/* Marks Section */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-gray-700 font-medium">Obtained Marks <span className="text-red-500">*</span></label>
                <input
                  type="number"
                  name="collegeOntainedMarks"
                  value={formData.collegeOntainedMarks}
                  onChange={onChangeHandler}
                  placeholder="Obtained marks"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition duration-200"
                />
              </div>
              <div className="space-y-2">
                <label className="text-gray-700 font-medium">Total Marks <span className="text-red-500">*</span></label>
                <input
                  type="number"
                  name="collegeTotalMarks"
                  value={formData.collegeTotalMarks}
                  onChange={onChangeHandler}
                  placeholder="Total marks"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition duration-200"
                />
              </div>
            </div>

            {/* Percentage */}
            <div className="space-y-2">
              <label className="text-gray-700 font-medium flex items-center gap-1">
                <FaPercentage className="text-blue-500" />
                Percentage <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="collegePercentage"
                value={formData.collegePercentage}
                readOnly
                className="w-full border border-gray-300 bg-gray-100 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition duration-200"
              />
            </div>
          </div>
        </div>

        {/* Undergraduate Section */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-8 border-l-4 border-purple-500">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-purple-100 p-3 rounded-full">
              <FaGraduationCap className="text-purple-600 text-xl" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800">
              Undergraduate Degree Program
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Degree Level */}
            <div className="space-y-2">
              <label className="text-gray-700 font-medium flex items-center gap-1">
                <FaBook className="text-purple-500" />
                Degree Level <span className="text-red-500">*</span>
              </label>
              <select 
                name="universityDegreeLevel"
                value={formData.universityDegreeLevel}
                onChange={onChangeHandler}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 pl-10 focus:ring-2 focus:ring-purple-300 focus:border-purple-500 outline-none transition duration-200 bg-white appearance-none"
              >
                <option value="" disabled>Select Degree</option>
                <option value="Bachelor">Bachelor's</option>
                <option value="Master">Master's</option>
                <option value="PhD">PhD</option>
              </select>
            </div>

            {/* Current Semester */}
            <div className="space-y-2">
              <label className="text-gray-700 font-medium flex items-center gap-1">
                <FaClipboardList className="text-purple-500" />
                Current Semester <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="universityCurrentSemeter"
                value={formData.universityCurrentSemeter}
                onChange={onChangeHandler}
                placeholder="Current Semester"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 pl-10 focus:ring-2 focus:ring-purple-300 focus:border-purple-500 outline-none transition duration-200"
              />
            </div>

            <div className="space-y-2">
              <label className="text-gray-700 font-medium flex items-center gap-1">
                <FaUniversity className="text-purple-500" />
                University Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="universityName"
                value={formData.universityName}
                onChange={onChangeHandler}
                placeholder="University Name"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 pl-10 focus:ring-2 focus:ring-purple-300 focus:border-purple-500 outline-none transition duration-200"
              />
            </div>

            {/* Discipline */}
            <div className="space-y-2">
              <label className="text-gray-700 font-medium flex items-center gap-1">
                <FaClipboardList className="text-purple-500" />
                Major/Specialization <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="universityDegreeDiscipline"
                value={formData.universityDegreeDiscipline}
                onChange={onChangeHandler}
                placeholder="Major/Specialization"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 pl-10 focus:ring-2 focus:ring-purple-300 focus:border-purple-500 outline-none transition duration-200"
              />
            </div>

            {/* CGPA Section */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-gray-700 font-medium">Obtained CGPA <span className="text-red-500">*</span></label>
                <input
                  type="number"
                  name="universityOntainedCGPA"
                  value={formData.universityOntainedCGPA}
                  onChange={onChangeHandler}
                  placeholder="Obtained CGPA"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-300 focus:border-purple-500 outline-none transition duration-200"
                />
              </div>
              <div className="space-y-2">
                <label className="text-gray-700 font-medium">Total CGPA <span className="text-red-500">*</span></label>
                <input
                  type="number"
                  name="universityTotalCGPA"
                  value={formData.universityTotalCGPA}
                  onChange={onChangeHandler}
                  placeholder="Total CGPA"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-300 focus:border-purple-500 outline-none transition duration-200"
                />
              </div>
            </div>

            {/* Percentage */}
            <div className="space-y-2">
              <label className="text-gray-700 font-medium flex items-center gap-1">
                <FaPercentage className="text-purple-500" />
                Percentage <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="universityPercentage"
                value={formData.universityPercentage}
                readOnly
                className="w-full border border-gray-300 bg-gray-100 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-300 focus:border-purple-500 outline-none transition duration-200"
              />
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8">
          <Link to="/address" className="flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 px-6 rounded-lg transition duration-200">
            <FaChevronLeft /> Previous
          </Link>
          <div className="flex gap-4 justify-center sm:justify-end">
            <button 
              type="submit" 
              className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition duration-200 shadow-md"
            >
              <FaSave /> Save
            </button>
            <Link to="/docs" className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition duration-200 shadow-md">
              Next <FaChevronRight />
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Educational;