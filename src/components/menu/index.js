import React from 'react'
import { RxCross1 } from "react-icons/rx";
import { IoMdNotificationsOutline } from "react-icons/io";

function menu() {
  return (
    <div>
    <div className='flex'>
        <ul>
            <li>
                Home
            </li>
            <li>Post Jobs</li>
            <li>Find Jobs</li>
            <li>Courses</li>
            <li>About Us</li>
            <li>
              Contact Us
            </li>
        </ul>
    </div>
    <div>
       <ul>
        <li><RxCross1 /></li>
        <li>
        <IoMdNotificationsOutline />
        </li>
       </ul>
    </div>
    </div>
  )
}

export default menu