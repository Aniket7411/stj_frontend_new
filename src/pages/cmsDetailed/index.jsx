import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import Admindashboard from "../admin/adminpanel";
import { HttpClient } from "../../server/client/http";
import { useLocation } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

const CmsPage = () => {
  const { register, handleSubmit,setValue} = useForm();
  const [content, setContent] = useState("");
  const [selectedOption, setSelectedOption] = useState(""); // State for selected dropdown option
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState("active"); // Default status
  const [loading,setLoading]=useState(false);
  const location=useLocation();
  console.log(location.state,"...uuu")

  // Handle Image Upload
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    if (images.length + files.length > 4) {
      alert("You can only upload up to 4 images.");
      return;
    }

    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setImages((prevImages) => [...prevImages, ...newImages]);
  };

  // Remove Image
  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  // Handle form submission
  const onSubmit = async (data) => {
    if (!selectedOption) {
      alert("Please select an option from the dropdown.");
      return;
    }

    // Prepare data for submission
    const formData = {
      title: selectedOption,
      content,
      metaTitle: data?.metaTitle,
      metaDescription: data?.metaDescription,
      status,
      endPoint:location?.state?.endPoint
    };

     try{
         // debugger
          const response=await HttpClient.post('/cms',
           formData
          )
         // console.log(response)
          if(response?.success===true){
            toast.success("Form submitted successfully!");
            return;
          }
          toast.error(response?.message||"there is some error")
    
        }catch(err){
          toast.error(err.message||"internal server error")
        }

    console.log("Submitted Data:", {
      ...formData,
      images: images.map((img) => img.file.name),
    });

   
  };


  const handleGetCms=async()=>{
    try{
      if(selectedOption){
        setLoading(true)
        const response=await HttpClient.get('/cms/single',{
          title:selectedOption
        })
        setLoading(false)
        if(response?.success===true){
          setStatus(response?.data?.status);
          setContent(response?.data?.content);
          setValue("metaTitle", response?.data?.metaTitle || ""); 
          setValue("metaDescription", response?.data?.metaDescription || "");
          
          //Hey, I want to set metaTitle and metaDescription with the response data. can you help?

        }
      }
      return;
    }catch(err){
      setLoading(false);
      toast.error(err?.response?.data?.message || err?.message || "internal server error");
      return

    }
  }


  useEffect(()=>{
    handleGetCms()

  },[selectedOption])

  return (
    <div className="flex">
      <Admindashboard />

     {
      loading===false?
      <div className="p-6  bg-[#F2F9FF] w-full min-h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white mt-7 p-6 rounded-lg shadow-md"
      >
        {/* Dropdown for Title */}
        <label className="block text-gray-700 font-medium mb-2">Select Title*</label>
        <select
          value={selectedOption}
          onChange={(e) =>{
            setSelectedOption(e.target.value)
          }}
          className="w-full p-2 border rounded-lg mb-4"
        >
          <option value="">Select an option</option>
          <option value="About Us">About Us</option>
          <option value="Why Choose Us?">Why Choose Us?</option>
          <option value="Our Vision">Our Vision</option>
          <option value="Join Us.">Join Us.</option>
        </select>

        {/* Content Field (React-Quill) */}
        <label className="block text-gray-700 font-medium mb-2">
          Content
        </label>
        <ReactQuill
          theme="snow"
          value={content}
          onChange={setContent}
          className="mb-4 bg-white"
        />

        {/* Meta Title Field */}
        <label className="block text-gray-700 font-medium mb-2">
          Meta Title
        </label>
        <input
          type="text"
          {...register("metaTitle")}
          className="w-full p-2 border rounded-lg mb-4"
          placeholder="Enter meta title"
        />

        {/* Meta Description Field */}
        <label className="block text-gray-700 font-medium mb-2">
          Meta Description
        </label>
        <textarea
          {...register("metaDescription")}
          className="w-full p-2 border rounded-lg mb-4"
          placeholder="Enter meta description"
          rows="4"
        />

        {/* Status Dropdown */}
        <label className="block text-gray-700 font-medium mb-2">Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full p-2 border rounded-lg mb-4"
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>

        {/* Image Upload */}
        <label className="block text-gray-700 font-medium mb-2">
          Upload Images (Max: 4)
        </label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageUpload}
          className="mb-4"
        />

        {/* Image Preview */}
        <div className="flex flex-wrap gap-4 mb-4">
          {images.map((image, index) => (
            <div key={index} className="relative w-24 h-24">
              <img
                src={image.preview}
                alt={`Uploaded preview ${index + 1}`}
                className="w-full h-full object-cover rounded-lg"
              />
              <div className="absolute top-0 right-0 rounded-full w-7 h-7 bg-slate-500 rounded-md">
                <button
                  type="button"
                  className="rounded-md w-7 h-7 text-white"
                  onClick={() => removeImage(index)}
                >
                  X
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-[200px] bg-blue-600 text-white py-2 rounded-lg"
        >
          Submit
        </button>
      </form>
    </div>:
     <ClipLoader size={50} color="#4ade80" />
     }
    </div>
  );
};

export default CmsPage;
