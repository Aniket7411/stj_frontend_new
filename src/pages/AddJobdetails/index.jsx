import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { JobContext } from "../jobcontext";
import { HttpClient } from "../../server/client/http";
import { ukCities } from "../../utils/city";
import { LoadScript } from "@react-google-maps/api";
import Autocomplete from "react-google-autocomplete";
import MapSearch from "../../components/mapsearch";


// UK Regions (states)
const ukStates = [
  "Greater London",
  "South East",
  "South West",
  "North East",
  "North West",
  "Yorkshire and the Humber",
  "East Midlands",
  "West Midlands",
  "East of England",
  "Scotland",
  "Wales",
  "Northern Ireland",
];

// Cities and Boroughs in each region
const cityOptions = {
  "Greater London": [
    "City of London",
    "Camden",
    "Greenwich",
    "Hackney",
    "Hammersmith and Fulham",
    "Islington",
    "Kensington and Chelsea",
    "Lambeth",
    "Lewisham",
    "Merton",
    "Newham",
    "Redbridge",
    "Southwark",
    "Tower Hamlets",
    "Wandsworth",
    "Westminster",
    "Barking and Dagenham",
    "Barnet",
    "Bexley",
    "Brent",
    "Bromley",
    "Croydon",
    "Ealing",
    "Enfield",
    "Haringey",
    "Harrow",
    "Hillingdon",
    "Hounslow",
    "Kingston upon Thames",
    "Merton",
    "Newham",
    "Redbridge",
    "Richmond upon Thames",
    "Sutton",
    "Waltham Forest",
  ],
  "South East": [
    "Brighton and Hove",
    "Reading",
    "Oxford",
    "Guildford",
    "Woking",
    "Basingstoke",
    "Winchester",
    "Portsmouth",
    "Southampton",
    "Crawley",
    "Chichester",
    "Farnborough",
  ],
  "South West": [
    "Bristol",
    "Exeter",
    "Plymouth",
    "Truro",
    "Bath",
    "Swindon",
    "Gloucester",
    "Cheltenham",
  ],
  "North East": [
    "Newcastle upon Tyne",
    "Sunderland",
    "Durham",
    "Middlesbrough",
    "Hartlepool",
  ],
  "North West": [
    "Manchester",
    "Liverpool",
    "Blackpool",
    "Preston",
    "Warrington",
    "Salford",
    "Stockport",
    "Chester",
  ],
  "Yorkshire and the Humber": [
    "Leeds",
    "Sheffield",
    "Bradford",
    "Hull",
    "Wakefield",
  ],
  "East Midlands": [
    "Nottingham",
    "Leicester",
    "Derby",
    "Lincoln",
    "Northampton",
  ],
  "West Midlands": [
    "Birmingham",
    "Coventry",
    "Wolverhampton",
    "Solihull",
    "Stoke-on-Trent",
  ],
  "East of England": [
    "Cambridge",
    "Norwich",
    "Ipswich",
    "Colchester",
    "Chelmsford",
  ],
  Scotland: [
    "Edinburgh",
    "Glasgow",
    "Aberdeen",
    "Dundee",
    "Inverness",
  ],
  Wales: [
    "Cardiff",
    "Swansea",
    "Newport",
    "Wrexham",
    "Bangor",
  ],
  "Northern Ireland": [
    "Belfast",
    "Derry",
    "Lisburn",
    "Newtownabbey",
  ],
};



const FormField = ({ label, required, children }) => (
  <div className="mb-4">
    <label className="block text-gray-700 font-medium mb-2">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {children}
  </div>
);

const AddJobDetailsStep2 = () => {
  const { jobDetails, setJobDetails, setPostingJob } = useContext(JobContext);
  const [allCategories, setAllCategories] = useState([])
  const [address, setAddress] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [googleMapData, setgoogleMapData] = useState({
    city: "",
    state: "",
    address: "",
    latitude: null,
    longitude: null,
  })


  const navigate = useNavigate();

  const handleSalaryAmountChange = (e) => {
    const updatedAmount = e.target.value;
    setJobDetails((prevDetails) => ({
      ...prevDetails,
      salary: {
        ...prevDetails.salary,
        amount: updatedAmount, // Update the amount
      },
    }));
  };

  const handleSalaryFrequencyChange = (e) => {
    const selectedValue = e.target.value;
    setJobDetails((prevDetails) => ({
      ...prevDetails,
      salary: {
        ...prevDetails.salary,
        frequency: selectedValue, // Update only the frequency field
      },
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();


    // setJobDetails((pre) => ({
    //   ...pre,
    //   city: googleMapData?.city,
    //   state: googleMapData?.state,
    //   jobAddress:googleMapData?.address,
    //   latitude:googleMapData?.latitude,
    //   longitude:googleMapData?.longitude

    // }))
    console.log(jobDetails, "..........................220")
    setPostingJob((prevPostingJob) => ({
      ...prevPostingJob,
      jobDetails,
    }));
    navigate("/jobrequirements");
  };


  const getAllCategories = async () => {
    const response = await HttpClient.get("/category/")
    const formattedCategories = response.data.map((each) => ({
      id: each._id,
      categoryName: each.categoryName,

    }))

    setAllCategories(formattedCategories)

  }

  useEffect(() => {
    getAllCategories()
  }, [])

  console.log("jobDetailsjobDetailsjobDetails", jobDetails?.location)

  return (
    <>
      <div
        className="top-section flex justify-start items-end p-5"
        style={{
          backgroundImage: 'url("/assets/publishingjob.png")',

          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "200px",
          width: "100vw",
        }}
      >
        <div>
          <img src="/assets/star.png" alt="star" className="w-[25px]" />
          <h1 className="text-white text-2xl">Post Job : Job Details</h1>
          <p className="text-[#fff]">
            Fill in the details below to reach qualified candidates quickly and
            securely.
          </p>
        </div>
      </div>
      <div className="min-h-screen bg-[#F0F0F0] py-8 p-2 md:p-10 flex justify-center">
        <div className="w-full bg-white shadow-md rounded-lg  p-3 md:p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            Add New Job Details
          </h2>
          <div className="hidden md:flex justify-between flex-wrap items-center mb-3">
            {[
              {
                step: 1,
                label: "Enter Company Details",
                active: true,
                navroute: "entercompanydetails",
              },
              {
                step: 2,
                label: "Enter Job Details",
                active: false,
                navroute: "enterjobdetails",
              },
              {
                step: 3,
                label: "Job Requirements",
                active: false,
                navroute: "jobrequirements",
              },
              {
                step: 4,
                label: "Job Timings & Dates",
                active: false,
                navroute: "jobtimings",
              },
              {
                step: 5,
                label: "Publish",
                active: false,
                navroute: "publishjob",
              },
            ].map((item, index, array) => (
              <React.Fragment key={item.step}>
                <div className="flex items-center flex-col">
                  {/* Step Number Circle */}
                  <div
                    className={`w-10 h-10 flex justify-center items-center rounded-full ${item.active
                      ? "bg-[#D3555A] text-white" // Highlight for active steps
                      : "bg-white text-gray-700 border border-gray-300" // Default style for inactive steps
                      }`}
                  >
                    {item.step}
                  </div>

                  {/* Step Label */}
                  <Link to={`/${item.navroute}`}>
                    <p
                      className={`text-sm font-medium w-35 text-center transition duration-200 ${item.active ? "text-[#D3555A]" : "text-gray-600 hover:text-[#D3555A]"
                        }`}
                    >
                      {item.label}
                    </p>
                  </Link>
                </div>

                {/* Dashed Line Between Steps */}
                {index !== array.length - 1 && (
                  <div
                    className={`flex-1 h-1 border-dashed mx-4 ${item.active ? "border-t-4 border-[#D3555A]" : "border-t-2 border-gray-300"
                      }`}
                  ></div>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Compact Step Navigation (Visible on Small Screens) */}
          <div className="md:hidden flex justify-between items-center bg-gray-100 p-4 rounded-md">
            <p className="text-sm font-medium text-gray-600">
              Step 2 of 5:{" "}
              <span className="text-[#D3555A] font-semibold">
                Enter Company Details
              </span>
            </p>

          </div>

          <form onSubmit={handleSave}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <FormField label="Job Title" required>
                  <input
                    type="text"
                    required
                    name="jobTitle"
                    placeholder="Enter Job Title"
                    className="w-full border border-gray-300 rounded-lg p-3"
                    value={jobDetails.jobTitle}
                    onChange={(e) => {
                      setJobDetails((prevDetails) => ({
                        ...prevDetails,
                        jobTitle: e.target.value, // Update title field
                      }));
                    }}
                  />
                </FormField>

                {jobDetails?.location && (
                  <div className="flex items-center gap-2 mt-2 text-gray-700">
                    <span className="font-semibold text-gray-900">📍Current Job Location:</span>
                    <span className="capitalize">{jobDetails.location}</span>
                  </div>
                )}



                {/* <FormField label="Address">
                  <input
                    type="text"
                    required
                    name="jobAddress"
                    placeholder="Enter location "
                    className="w-full border border-gray-300 rounded-lg p-3"
                    value={jobDetails?.jobAddress || ""} // Safeguard against undefined jobDetails
                    onChange={(e) =>
                      setJobDetails((prevDetails) => ({
                        ...prevDetails,
                        jobAddress: e.target.value, // Update the zipCode field
                      }))
                    }
                  />
                </FormField> */}

                <MapSearch setJobDetails={setJobDetails} jobDetails={jobDetails} type={"job"} />




                <FormField label="Job Description" required>
                  <textarea
                    name="jobDescription"
                    required
                    placeholder="Type your job description here"
                    rows="5"
                    className="w-full border border-gray-300 rounded-lg p-3"
                    value={jobDetails.jobDescription}
                    onChange={(e) => {
                      setJobDetails((prevDetails) => ({
                        ...prevDetails,
                        jobDescription: e.target.value, // Update description field
                      }));
                    }}
                  ></textarea>
                </FormField>

                <FormField label="Employment Type" required>
                  <select
                    name="employmentType"
                    required
                    className="w-full border border-gray-300 rounded-lg p-3 bg-white"
                    style={{
                      height: '50px'
                    }}
                    value={jobDetails.employmentType}
                    onChange={(e) => {
                      setJobDetails((prevDetails) => ({
                        ...prevDetails,
                        employmentType: e.target.value, // Update employment type field
                      }));
                    }}
                  >
                    <option value="">Select Job Type</option>
                    <option value="Full-Time">Full-Time</option>
                    <option value="Part-Time">Part-Time</option>
                  </select>
                </FormField>



                <FormField label="Postcode">
                  <input
                    type="text"
                    required
                    name="zipCode"
                    placeholder="Enter location zipcode"
                    className="w-full border border-gray-300 rounded-lg p-3"
                    value={jobDetails.zipCode} // Bind directly to jobDetails.zipcode
                    onChange={(e) =>
                      setJobDetails((prevDetails) => ({
                        ...prevDetails,
                        zipCode: e.target.value, // Directly update the zipcode field
                      }))
                    }
                  />
                </FormField>
              </div>

              <div>
                <FormField label="Job Category" required>
                  <select
                    name="jobCategory"
                    className="w-full border border-gray-300 rounded-lg p-3"
                    style={{
                      height: '50px'
                    }}
                    value={jobDetails.jobCategory} // Bind to the jobCategory in jobDetails state
                    onChange={(e) => {
                      setJobDetails((prevDetails) => ({
                        ...prevDetails,
                        jobCategory: e.target.value, // Update the jobCategory field
                      }));
                    }}
                  >
                    <option value="">Select Job Category</option> {/* Default option */}
                    {allCategories.map((category) => (
                      <option key={category.id} value={category.categoryName}>
                        {category.categoryName}
                      </option>
                    ))}
                  </select>
                </FormField>


                {/* <FormField label="Country" required>
                  <select
                    name="country"
                    required
                    className="w-full border border-gray-300 rounded-lg p-3"
                    value={jobDetails.country}
                    onChange={(e) =>
                      setJobDetails((prev) => ({
                        ...prev,
                        country: e.target.value, 
                      }))
                    }
                  >
                    <option value="">Select Country</option>
                    <option value="UK">UK</option>

                   
                  </select>
                </FormField> */}
                <FormField label="County" required>
                  <input
                    disabled
                    type="text"
                    name="state"
                    className="w-full border border-gray-300 rounded-lg p-3"
                    value={jobDetails?.state}
                    onChange={(e) => setSelectedState(e.target.value)}
                    placeholder="Enter County"
                  />
                </FormField>

                <FormField label="City" required>
                  <input
                    disabled
                    type="text"
                    name="city"
                    className="w-full border border-gray-300 rounded-lg p-3"
                    value={jobDetails?.city}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    placeholder="Enter City"
                  />
                </FormField>

                {/* <LoadScript googleMapsApiKey="AIzaSyAtc1qnhk3GcaqTFm2MO4H-dsBSyjyVcl8" libraries={["places"]}>
                  <div className="flex flex-col items-start justify-start text-left mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Enter Address</label>
                    <Autocomplete
                      apiKey="AIzaSyAtc1qnhk3GcaqTFm2MO4H-dsBSyjyVcl8"
                      onPlaceSelected={(place) => {
                        setAddress(place.formatted_address);
                        console.log("Selected Place:", place);
                      }}
                      options={{
                        types: ["geocode"], // Suggests only locations
                        componentRestrictions: { country: "GB" },
                      }}
                      className="w-full border border-gray-300 rounded-lg p-3"
                      placeholder="Start typing an address..."
                    />
                    {address && (
                      <p className="mt-4 text-green-600">Selected Address: {address}</p>
                    )}
                  </div>
                </LoadScript> */}


                <FormField label="Application Deadline" required>
                  <input
                    type="date"
                    className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                    min={new Date().toISOString().split("T")[0]} // No past dates
                    value={(() => {
                      const [y, m, d] = (jobDetails.applicationDeadline || "0000-00-00").split("-");
                      return `${y.padStart(4, "0")}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`;
                    })()}
                    onChange={(e) => {
                      const [year, month, day] = e.target.value.split("-");
                      setJobDetails((prev) => ({
                        ...prev,
                        applicationDeadline: `${Number(year)}-${Number(month)}-${Number(day)}`,
                      }));
                    }}
                  />
                  {jobDetails.applicationDeadline && (
                    <span className="ml-3 text-sm text-gray-600">
                      {(() => {
                        const [y, m, d] = (jobDetails.applicationDeadline || "0000-00-00").split("-");
                        return `${d.padStart(2, "0")}/${m.padStart(2, "0")}/${y}`;
                      })()}
                    </span>
                  )}
                </FormField>





                <FormField label="Salary/Pay Range(in £)" required>
                  <div className="flex">
                    <input
                      type="number"
                      required
                      name="salary"
                      placeholder="Amount"
                      className="w-full border border-gray-300 rounded-l-lg p-3"
                      value={jobDetails.salary.amount}
                      onChange={handleSalaryAmountChange} // Handle input changes
                    />
                    <select
                      required
                      name="salaryUnit"
                      className="border border-gray-300 rounded-r-lg p-3 bg-white"
                      value={jobDetails.salary.frequency} // Bind to context state
                      onChange={handleSalaryFrequencyChange} // Update state on change
                    >

                      <option value="Hourly">Hourly</option>
                      {/* <option value="Annual">Annualy</option> */}

                      <option value="Monthly">Monthly</option>


                    </select>
                  </div>
                </FormField>

                {/* <FormField label="Salary/Pay Range" required>
                  <div className="w-full border flex justify-between border-gray-300 rounded-l-lg p-3">
                    <div>
                      <input
                        type="text"
                        placeholder="$$"
                        className="w-[100px] rounded-sm px-1 bg-[#a2c9e9] focus:outline focus:outline-1 focus:outline-[#5788ac]"
                      />

                      {rateType === "Hourly Rate" && (
                        <>
                          {" - "}
                          <input
                            type="text"
                            placeholder="$$"
                            className="w-[100px] px-1 rounded-sm bg-[#a2c9e9] focus:outline focus:outline-1 focus:outline-[#5788ac]"
                          />
                        </>
                      )}
                    </div>
                    <select value={rateType} onChange={handleRateChange}>
                      <option>Hourly Rate</option>
                      <option>Base Rate</option>
                      <option>Monthly Rate</option>
                    </select>
                  </div>
                </FormField> */}
              </div>
            </div>

            <div className="flex justify-center mt-8">
              <Link to="/entercompanydetails">
                <button
                  style={{
                    outline: "1px solid #c5363c"
                  }}
                  type="button"
                  className="py-1 mr-2 px-2  border text-[#c5363c] rounded-lg  hover:bg-gray-200"
                >
                  Back
                </button>
              </Link>
              <button
                type="submit"
                className="py-1 px-2 bg-[#c5363c] text-white rounded-lg hover:bg-[#c5363c]"
              >
                Save & Next
              </button>
            </div>
          </form>
        </div>
      </div >
    </>
  );
};

export default AddJobDetailsStep2;
