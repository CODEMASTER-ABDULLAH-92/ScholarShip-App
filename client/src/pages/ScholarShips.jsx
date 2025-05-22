
import Scholar from "../compoenent/Scholar"
import data from '../assets/data';

const ScholarShips = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Available Scholarships</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {data.map((item) => (
          <Scholar
            key={item._id} // Better to use _id instead of index for keys
            id={item._id}
            title={item.title}
            description={item.description}
            university={item.university}
            location={item.location}
            benefitAmount={item.benefitAmount}
            deadline={item.deadline}
          />
        ))}
      </div>
    </div>
  );
};
export default ScholarShips;