import React from 'react'
import { IoMdInformationCircleOutline } from 'react-icons/io'

const Infoicon = ({information}) => {
  return (
     <div className="relative group/tooltip">
            <IoMdInformationCircleOutline className="text-lg cursor-pointer" />
            
            {/* Tooltip content */}
            <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-max px-2 py-1 text-xs text-white bg-black rounded opacity-0 group-hover/tooltip:opacity-100 transition-opacity duration-200 z-10">
              {information}
            </div>
          </div>
  )
}

export default Infoicon