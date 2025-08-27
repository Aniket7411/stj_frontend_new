import React from 'react'
import { useNavigate } from 'react-router-dom'

const Backbutton = () => {
    const navigate=useNavigate()
  return (
    <button
      onClick={() => navigate(-1)}
      className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-800 hover:bg-gray-200 border border-gray-300 rounded-lg transition-all duration-200 shadow-sm"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M7.707 14.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L4.414 9H17a1 1 0 110 2H4.414l3.293 3.293a1 1 0 010 1.414z"
          clipRule="evenodd"
        />
      </svg>
      Back
    </button>
  )
}

export default Backbutton