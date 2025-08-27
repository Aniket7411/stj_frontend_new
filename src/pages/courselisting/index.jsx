import React from 'react'
import { FaArrowLeft } from "react-icons/fa";





function CourseListing() {
  return (
    <div className='p-10'>
      <FaArrowLeft className='text-2xl mb-3' />
      <div className='flex justify-between items-center mb-3'>
        <h2>Course Listing</h2>
        <p>Sort by:</p>
        <p>Created</p>
       

      </div>
      <hr />
   




    </div>
  )
}


export default CourseListing