import { FaServer, FaExclamationTriangle } from 'react-icons/fa';

const BackendConnectionNotice = ({ isUnderConstruction = false }) => {
  return (
    <div className="flex items-center justify-center w-[100%] gap-3 bg-red-50 border-l-4 border-red-500 text-red-900 p-4 rounded-md shadow-sm">
        <p className="text-[15px] font-semibold">
         'This backend service is currently under construction. Some features may not work as expected.'
        </p>

    </div>
  );
};

export default BackendConnectionNotice;