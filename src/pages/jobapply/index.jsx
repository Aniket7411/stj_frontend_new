import React, { useEffect, useState } from "react";
import { AiOutlineSchedule } from "react-icons/ai";
import { CiBookmark, CiClock1, CiLocationOn, CiShare2 } from "react-icons/ci";
import { FaDollarSign, FaMoneyBillWave, FaPoundSign } from "react-icons/fa";
import { IoIosAlert, IoIosAttach } from "react-icons/io";
import { MdCalendarMonth } from "react-icons/md";
import { HttpClient } from "../../server/client/http";
import uploadImageOnCloudinary from "../../components/uploads/uploadImg";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import DocViewer, { DocViewerRenderers } from "react-doc-viewer"


import ClipLoader from "react-spinners/ClipLoader";

const Jobapplying = () => {

  const [jobDetails, setjobDetails] = useState();
  const location = useLocation();


  const params = location?.pathname
  const navigate = useNavigate();
  const [proposal, setProposal] = useState("");
  const [resume, setResume] = useState(null);
  const [amount, setAmount] = useState("");
  const [billamount, setbillAmount] = useState(0);
  const [specialist, setSpecialist] = useState("");
  const [featured, setFeatured] = useState(false);
  const [elite, setElite] = useState(false);
  const [notify, setNotify] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [coverLetter, setCoverLetter] = useState("");


  const handleProposalChange = (e) => setProposal(e.target.value);


  const getJobDetails = async () => {
    setLoading(true)
    try {
      // setLoading(true);
      const response = await HttpClient.get(`/jobs/job-posts/${location?.pathname.split('/').pop()}`);
      setjobDetails(response?.data);
      setjobDetails(response.data)
      setLoading(false)


    } catch (error) {
      console.error("Error fetching total jobs:", error.message);
    }
  };

  useEffect(() => {
    getJobDetails();
  }, [])


  const handleResumeChange = async (e, type) => {
    setLoading(true);
    try {
      const url = await uploadImageOnCloudinary(e);
      setResume(url);
    } catch (error) {
      console.error("Image upload failed:", error);
      alert("Failed to upload image. Please try again.");
    } finally {
      setLoading(false);
    }
  };




  const handleCoverLetterChange = async (e, type) => {
    setLoading(true);
    try {
      const url = await uploadImageOnCloudinary(e);
      setCoverLetter(url);
    } catch (error) {
      console.error("Image upload failed:", error);
      alert("Failed to upload image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAmountChange = (e) => setAmount(e.target.value);
  const handleSpecialistChange = (e) => setSpecialist(e.target.value);

  const validateInputs = () => {
    const newErrors = {};
    if (!proposal) newErrors.proposal = "Proposal is required.";
    if (!amount) newErrors.amount = "Proposal amount is required.";
    //if (!resume) newErrors.resume = "resume is required.";
    else if (isNaN(amount)) newErrors.amount = "Amount must be a number.";
    return newErrors;
  };

  const handleSubmit = async () => {
    const newErrors = validateInputs();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const userData = JSON.parse(localStorage.getItem('userData'));
    const sendData = {
      jobId: location?.pathname.split('/').pop(),
      coverLetter,
      description: proposal,
      resume: resume,
      specialist: specialist,
      bidAmount: amount,
      featured: featured,
      elite: elite,
      notify: notify,
      username: userData?.name,
      email: userData?.email,
      contact: userData?.phoneNumber,
    }

    try {
      if (billamount > 0) {
        let sendData = { type: 'proposal', amount: billamount };
        navigate('/payment', { state: sendData });
        return;
      }

      const response = await HttpClient.post(`/applyJob/create`, sendData);

      if (response?.message === 'Job application submitted successfully') {
        toast.success('Application Submitted Successfully'); // success message

        setTimeout(() => {
          navigate('/findjobs');
        }, 4000); // wait 2 seconds before redirect
      }
    } catch (err) {
      toast.error(err?.response?.data?.message);
      return;
    }






    // Reset fields after submission
    // setProposal("");
    // setResume(null);
    // setAmount("");
    // setFeatured(false);
    // setElite(false);
    // setNotify(false);
    // setErrors({});
  };

  return (
    <div className="p-6 sm:p-8 md:p-10">

      {
        loading ? <div className="flex justify-center items-center h-[100vh]">
          <ClipLoader />
        </div>
          : <div className="border-2 border-blue-400 mt-10 rounded-lg p-5 shadow-md">
            {/* Job Details */}
            <div className="flex justify-between items-center">
              <div>

                <p className="text-[#976063] text-sm sm:text-base"> <strong className="text-[#c5363c]">Company Name: </strong> {jobDetails?.companyDetails?.companyName}</p>
                <h2 className="text-lg sm:text-xl font-semibold"> <strong className="text-[#c5363c]">Job Title: </strong>
                  {jobDetails?.jobDetails?.jobTitle}
                </h2>
              </div>
              {/* <div className="flex mb-4 space-x-2">
                <CiBookmark className="bg-[#E6E6E6] w-[30px] h-[30px] rounded-md px-1" />
                <CiShare2 className="bg-[#E6E6E6] w-[30px] h-[30px] rounded-md px-1" />
              </div> */}
            </div>
            <div>
              <div className="flex items-center text-sm sm:text-base">
                <p className="mb-1">
                  Posted Date:{" "}
                  {new Date(jobDetails?.createdAt)
                    .toLocaleDateString("en-GB", {
                      month: "2-digit",
                      day: "2-digit",
                      year: "numeric",
                    })}
                </p>

              </div>
              <div className="flex items-center text-[#976063] text-sm sm:text-base gap-1">
                <CiLocationOn className="text-lg" />
                <p className="font-bold">
                  {jobDetails?.jobDetails?.city}, {jobDetails?.jobDetails?.country}
                </p>
                {jobDetails?.jobDetails?.location && (
                  <span className="ml-1 text-gray-600">({jobDetails?.jobDetails?.location})</span>
                )}
              </div>


              <div className="flex flex-wrap mt-2 gap-2">
                <p className="bg-[#F0F0F0] w-fit rounded-md px-2 py-1">
                  <strong>
                    £ {jobDetails?.jobDetails?.salary?.amount} /{" "}
                  </strong>
                  {jobDetails?.jobDetails?.salary?.frequency === "Hourly"
                    ? "Hour"
                    : "Month"}
                </p>

                <p className="bg-[#EBF6FF] rounded-lg px-2 py-1 text-xs sm:text-sm">
                  {jobDetails?.jobDetails?.employmentType}
                </p>
                <p className="rounded-lg text-xs sm:text-sm flex flex-wrap gap-2">
                  {jobDetails?.workSchedule?.workingDays.map((each, index) => (
                    <span
                      key={index}
                      className="bg-blue-200 rounded-md px-3 py-1 text-sm inline-flex items-center justify-center"
                    >
                      {each}
                    </span>
                  ))}
                </p>

                <p className="bg-[#EBF6FF] rounded-md px-2 py-1">
                  {jobDetails?.jobRequirements?.minimumExp} -  {jobDetails?.jobRequirements?.maximumExp}  Yrs
                </p>
              </div>

              <div className="flex items-center text-sm sm:text-base mt-1 text-gray-700">
                <span className="font-semibold text-[#976063] mr-1">Dress Code:</span>
                <span>{jobDetails?.jobRequirements?.dressCode || "Not specified"}</span>
              </div>

             
            </div>

         <p className="text-right mt-2 text-[#505050] text-sm sm:text-base">
  Required Credits :{" "}
  <span className="font-semibold text-[#407BFF]">1 Credit</span>
</p>


            <div className="flex justify-between mt-2">
              <strong className="text-sm sm:text-base">Write your proposal</strong>
              {/* <h3 className="text-[#407BFF] underline text-sm sm:text-base">
          Upgrade your plan to get more credits & earn more
        </h3> */}
            </div>


            {/* Proposal Text Area */}
            {/* <strong className="text-sm sm:text-base">Write your proposal</strong> */}
            <textarea
              style={{ outline: "1px solid #CBCBCB" }}
              className={`h-32 rounded-lg w-full mt-2 p-2 placeholder:text-gray-400 text-sm sm:text-base ${errors.proposal ? "border-red-500" : ""
                }`}
              placeholder="Type here"
              value={proposal}
              onChange={handleProposalChange}
            ></textarea>
            {errors.proposal && (
              <p className="text-red-500 text-sm mt-1">{errors.proposal}</p>
            )}


            {/* File Upload */}
            {
              loading ? (

                <div className="flex justify-center items-center h-full">
                  <ClipLoader />
                </div>


              ) :
                (
                  <>

                  {
                    jobDetails?.jobRequirements?.coverletterRequired  &&<div className="flex gap-2 items-center text-[#407BFF] mt-2">
                      <IoIosAttach />
                      <input
                        type="file"
                        className="hidden"
                        id="file-upload"
                        accept=".pdf"
                        onChange={handleResumeChange}
                        required
                      />
                      <label htmlFor="file-upload" className="cursor-pointer">
                        <span className="text-[#407BFF] font-semibold underline text-sm sm:text-base">
                          Add resume (pdf)
                        </span>
                      </label>
                    </div>
                  }
                    
                  </>
                )
            }

            {
              resume?.length > 0 &&
              <iframe
                src={`https://docs.google.com/gview?url=${encodeURIComponent(resume)}&embedded=true`}
                width="100%"
                height="500px"
                style={{ border: "none" }}
              ></iframe>

            }


            {/* Cover Letter Upload */}
            {
              loading ? (
                <div className="flex justify-center items-center h-full">
                  <ClipLoader />
                </div>
              ) : (
                <>

                
                  {jobDetails?.jobRequirements?.coverletterRequired  &&  <div className="flex gap-2 items-center text-[#407BFF] mt-2">
                    <IoIosAttach />
                    <input
                      type="file"
                      className="hidden"
                      id="cover-letter-upload"
                      accept=".pdf"
                      onChange={handleCoverLetterChange}
                      required
                    />
                    <label htmlFor="cover-letter-upload" className="cursor-pointer">
                      <span className="text-[#407BFF] font-semibold underline text-sm sm:text-base">
                        Add cover letter (pdf)
                      </span>
                    </label>
                  </div>}
                
                 
                </>
              )
            }

            {coverLetter?.length > 0 && (
              coverLetter.includes("docx") || coverLetter.includes("doc") ? (
                <DocViewer
                  documents={[{ uri: coverLetter }]}
                  pluginRenderers={DocViewerRenderers}
                />
              ) : (
                <iframe
                  src={coverLetter}
                  width="100%"
                  height="500px"
                  style={{ border: "none" }}
                ></iframe>
              )
            )}



            {/* Proposal Amount */}
            <h2 className="text-sm sm:text-base mt-4">Add proposal amount</h2>
            <div className="bg-[#EBEBEB] w-full sm:w-[250px] flex items-center p-2 rounded-md">
              <FaPoundSign className="text-[#000] mr-2" />
              <input
                type="number"
                className="bg-transparent border-none outline-none placeholder:text-gray-500 text-black w-full"
                placeholder="Enter amount"
                value={amount}
                onChange={handleAmountChange}
              />
            </div>
            {errors.amount && (
              <p className="text-red-500 text-sm mt-1">{errors.amount}</p>
            )}


            {/* <h2 className="text-sm sm:text-base mt-4">Enter Especialisation</h2> */}
            {/* <div className="bg-[#EBEBEB] w-full sm:w-[250px] flex items-center p-2 rounded-md"> */}
            {/* <FaDollarSign className="text-[#000] mr-2" /> */}
            {/* <input
                type="text"
                className="bg-transparent border-none outline-none placeholder:text-gray-500 text-black w-full"
                placeholder="Enter your Especialisation"
                value={specialist}
                onChange={handleSpecialistChange}
              /> */}
            {/* </div> */}
            {errors.amount && (
              <p className="text-red-500 text-sm mt-1">{errors.amount}</p>
            )}

            {/* Featured & Elite Options */}
            {/* <div className="rounded-lg p-4 my-2" style={{ outline: "1px solid #D6D6D6" }}>
        <div className="flex">
          <input
            type="checkbox"
            checked={featured}
            onChange={(e) =>{
               setFeatured(e.target.checked)
               e.target.checked===true && setbillAmount(pre=>pre+10000);
            }
              }
            className="mr-3"
          />
          <div>
            <strong className="text-[#F4B400]">Featured <span className="text-[red]">*</span> </strong>
            <p className="text-[#505050] text-xs sm:text-sm">
              Proposals that are featured are{" "}
              <strong className="text-[#000]">
                70 to 100 times more likely to be awarded
              </strong>
              .
            </p>
            <p className="mt-1 text-xs sm:text-sm">Cost: <strong> £.10</strong></p>
          </div>
        </div>
      </div>
      <div className="rounded-lg p-4 my-2" style={{ outline: "1px solid #D6D6D6" }}>
        <div className="flex">
          <input
            type="checkbox"
            checked={elite}
            onChange={(e) =>{
              setElite(e.target.checked)
              e.target.checked===true && setbillAmount(pre=>pre+5000);
            } }
            className="mr-3"
          />
          <div>
            <strong className="text-[#34A853]">Elite</strong>
            <p className="text-[#505050] text-xs sm:text-sm">
              Attract more attention. Highlight your proposal to stand out.
            </p>
            <p className="mt-1 text-xs sm:text-sm">Cost: <strong> £.5</strong></p>
          </div>
        </div>
      </div> */}

            {/* Notification Option */}
            <div className="flex items-center mt-2 text-sm sm:text-base">
              <input
                type="checkbox"
                id="notify"
                checked={notify}
                onChange={(e) => setNotify(e.target.checked)}
                className="mr-2"
              />
              <label htmlFor="notify">Notify me if the job is awarded to someone else</label>
            </div>

            {/* Buttons */}
            <div className="flex flex-col md:flex-row justify-center mt-8 gap-4">
              <button
                style={{ outline: "1px solid #787878" }}
                type="button"
                className="py-3 h-[40px] px-6 border-red-500 border-2 rounded-lg text-[#787878] w-full md:w-auto"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="py-3 px-6 h-[40px] bg-[#3A62B7] text-white rounded-lg w-full md:w-auto"
              >
                Send Proposal
              </button>
            </div>
          </div>
      }


    </div>
  );
};

export default Jobapplying;
