import { FaSchool, FaUniversity, FaGraduationCap, FaBook, FaPercentage, FaChevronLeft, FaChevronRight, FaSave, FaCalendarAlt, FaClipboardList } from "react-icons/fa";
import { Link } from "react-router-dom";
const Educational = () => {
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
              <select className="w-full border border-gray-300 rounded-lg px-4 py-3 pl-10 focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition duration-200 bg-white appearance-none">
                <option value="" disabled selected>Select Degree</option>
                <option>Matriculation</option>
                <option>O-Level</option>
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
            <select className="w-full border border-gray-300 rounded-lg px-4 py-3 pl-10 focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition duration-200 bg-white appearance-none">
              <option value="" disabled selected>Select Discipline</option>
              <option>Science</option>
              <option>Arts</option>
            </select>
          </div>

          {/* Marks Section */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-gray-700 font-medium">Obtained Marks <span className="text-red-500">*</span></label>
              <input
                type="number"
                placeholder="Obtained marks"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition duration-200"
              />
            </div>
            <div className="space-y-2">
              <label className="text-gray-700 font-medium">Total Marks <span className="text-red-500">*</span></label>
              <input
                type="number"
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
              <select className="w-full border border-gray-300 rounded-lg px-4 py-3 pl-10 focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition duration-200 bg-white appearance-none">
                <option value="" disabled selected>Select Degree</option>
                <option>Matriculation</option>
                <option>O-Level</option>
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
            <select className="w-full border border-gray-300 rounded-lg px-4 py-3 pl-10 focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition duration-200 bg-white appearance-none">
              <option value="" disabled selected>Select Discipline</option>
              <option>Science</option>
              <option>Arts</option>
            </select>
          </div>

          {/* Marks Section */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-gray-700 font-medium">Obtained Marks <span className="text-red-500">*</span></label>
              <input
                type="number"
                placeholder="Obtained marks"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition duration-200"
              />
            </div>
            <div className="space-y-2">
              <label className="text-gray-700 font-medium">Total Marks <span className="text-red-500">*</span></label>
              <input
                type="number"
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
          {/* Educational System */}
          <div className="space-y-2">
            <label className="text-gray-700 font-medium flex items-center gap-1">
              <FaCalendarAlt className="text-purple-500" />
              Educational System <span className="text-red-500">*</span>
            </label>
            <select className="w-full border border-gray-300 rounded-lg px-4 py-3 pl-10 focus:ring-2 focus:ring-purple-300 focus:border-purple-500 outline-none transition duration-200 bg-white appearance-none">
              <option value="" disabled selected>Select System</option>
              <option>Semester</option>
              <option>Annual</option>
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
              placeholder="Current Semester"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 pl-10 focus:ring-2 focus:ring-purple-300 focus:border-purple-500 outline-none transition duration-200"
            />
          </div>

          {/* CGPA Section */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-gray-700 font-medium">Obtained CGPA <span className="text-red-500">*</span></label>
              <input
                type="number"
                placeholder="Obtained CGPA"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-300 focus:border-purple-500 outline-none transition duration-200"
              />
            </div>
            <div className="space-y-2">
              <label className="text-gray-700 font-medium">Total CGPA <span className="text-red-500">*</span></label>
              <input
                type="number"
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
          <button className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition duration-200 shadow-md">
            <FaSave /> Save
          </button>
          <Link to="/docs" className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition duration-200 shadow-md">
            Next <FaChevronRight />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Educational;
