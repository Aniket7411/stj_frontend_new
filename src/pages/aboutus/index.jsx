import React, { useEffect, useState } from 'react'
import Section1 from './section1'
import VisionSection from './section2'
import JoinUsSection from './section3'
import { toast } from 'react-toastify'
import { HttpClient } from '../../server/client/http'
import { useLocation, useParams } from 'react-router-dom'

const AboutUs = () => {


  const location=useLocation();
  const [data,setData]=useState();


  const getPageData=async()=>{
    try{
      const response=await HttpClient.get('/cms/endpoint',{
        endPoint:location.pathname
      })
      setData(response?.data);
      console.log(response)

    }catch(err){
      toast.error(err.message||"internal server error")
    }
  }

  useEffect(()=>{
    getPageData()
  },[])
  return (
    <div>
      <div
        className="top-section flex justify-start items-end p-3"
        style={{
          backgroundImage: "url(/assets/aboutus-8.svg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "200px",
          width: "100vw",
        }}
      >
        {/* <h1 className="text-white text-2xl">About Us........</h1> */}
      </div>
      <Section1 data={data?.find((item)=>item?.title==='About Us')} />
      <VisionSection 
       data={data?.find((item)=>item?.title==='Our Vision')} 
       data2={data?.find((item)=>item?.title==='Why Choose Us?')} 
      

        />
      <JoinUsSection   data2={data?.find((item)=>item?.title==='Join Us.')} />
    </div>
  );
}

export default AboutUs