import { FaServer, FaExclamationTriangle } from 'react-icons/fa';

const BackendConnectionNotice = ({ isUnderConstruction = false }) => {
  return (
    <div className="flex items-center gap-3 bg-red-50 border-l-4 border-red-500 text-red-900 p-4 rounded-md shadow-sm max-w-md">
      {isUnderConstruction ? (
        <FaServer className="text-red-600 text-xl" />
      ) : (
        <FaExclamationTriangle className="text-red-600 text-xl" />
      )}
      <div>
        <p className="font-semibold">
          {isUnderConstruction ? 'Backend Under Construction' : 'Backend Connection Failed'}
        </p>
        <p className="text-sm">
          {isUnderConstruction
            ? 'This backend service is currently under construction. Some features may not work as expected.'
            : 'Unable to connect to the backend server. Please check your connection or try again later.'}
        </p>
      </div>
    </div>
  );
};

export default BackendConnectionNotice;