import React from 'react'
import Scholar from '../compoenent/Scholar'
import data from '../assets/data'
const ScholarShips = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
      {
        data.map((item,index)=>(
          <Scholar key={index} deadline={item.deadline} location={item.location} amount={item.benefits.amount} id={item._id} title={item.title} description={item.description}/>
        ))
      }
      </div>
    </div>
  )
}

export default ScholarShips
