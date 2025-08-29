import React, { useEffect, useState } from "react";
import { PiStarFourThin } from "react-icons/pi";
import { CiBookmark, CiBookmarkCheck } from "react-icons/ci";
import axios from "axios";
import { type } from "@testing-library/user-event/dist/type";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../../components/loader";
import { HttpClient } from "../../server/client/http";
import { toast } from "react-toastify";
import { ukCities } from "../../utils/city";
import { Range } from "react-range";



const userInfoString = localStorage?.getItem("USER_INFO");
const userInfo = userInfoString ? JSON.parse(userInfoString) : null;
const userType = userInfo?.role;

console.log("userTypeuserType", userType);

const dashboardLink =
  userType === "employer"
    ? "/employerprofile"
    : userType === "employee"
      ? "/userprofile"
      : userType === "admin"
        ? "/admin-dashboard"
        : "/";



const generateRandomColor = () => {
  const letters = "89ABCDEF"; // Limit to lighter values for very soft pastel colors
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * letters?.length)];
  }
  return color;
};




function FindJobs() {
  const navigate = useNavigate();
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
  });
  const [isOpen, setIsOpen] = useState(false);

  const [error, setError] = useState(null);
  const [reloadKey, setreloadKey] = useState(0);
  const [totalJobs, setTotalJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [clrbtn, setClrBtn] = useState(false);
  const [experienceVal, setExperienceVal] = useState('')
  const [allJobs, setAllJobs] = useState([]);
  const [jobNameSearch, setJobNameSearch] = useState("");
  const [jobLocationSearch, setJobLocationSearch] = useState("");
  const [distanceRange, setDistanceRange] = useState("");
  const [recommendedJob, setRecommended] = useState(0);
  const [allJobsCategories, setAllJObsCategories] = useState([])
  const [fetchedJobs, setFetchedJobs] = useState([])

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 30;


  const STEP = 1000;
  const SalaryRangeFilter = ({ filters, setFilters, getTotalJobs }) => {
    const MIN = 0;
    const MAX = 200000;

    const [range, setRange] = useState([
      filters?.salaryRange?.minSalary,
      filters?.salaryRange?.maxSalary
    ]);

    const handleRangeChange = (values) => {
      setRange(values); // for UI immediate update
    };

    const handleFinalChange = (values) => {
      setFilters((prev) => ({
        ...prev,
        salaryRange: {
          minSalary: values[0],
          maxSalary: values[1]
        }
      }));

      // Trigger filtered job fetch
      getTotalJobs(1, {
        ...filters,
        salaryRange: {
          minSalary: values[0],
          maxSalary: values[1]
        }
      });
    };

    useEffect(() => {
      setRange([
        filters?.salaryRange?.minSalary,
        filters?.salaryRange?.maxSalary
      ]);
    }, [filters?.salaryRange]);


    useEffect(() => {

      if (location.latitude === null && location.longitude === null && navigator.geolocation) {
        // toast.error('Please enable location access. Click the “Site Information” icon (🔒 or ⓘ) next to the website address and allow Location permission')
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
            console.log("Coordinates:", position.coords);
          },
          (err) => {
            setError(err.message);
          }
        );
      }
      return
      //ran = true;
    }, []);


    return (
      <div className="flex items-center gap-x-2">
        <span className="">Salary Range</span>

        <span>£{MIN}</span>
        <Range
          values={range}
          step={STEP}
          min={MIN}
          max={MAX}
          onChange={handleRangeChange}
          onFinalChange={handleFinalChange}
          renderTrack={({ props, children }) => (
            <div
              {...props}
              className="w-full min-w-20 h-2 rounded bg-gray-300"
              style={{ margin: "0 10px" }}
            >
              {children}
            </div>
          )}
          renderThumb={({ props, index }) => (
            <div
              {...props}
              className="w-2 h-2 bg-[#D3555A] rounded-full shadow-md"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <div className="absolute -top-6 text-xs font-semibold text-white">
                £{range[index]}
              </div>
            </div>
          )}
        />

        {/* <div className="flex justify-between text-sm text-gray-600"> */}
        <span>£{MAX}</span>
        {/* </div> */}
      </div>
    );
  };








  const [filters, setFilters] = useState({
    experience: { minimumExp: 0, maximumExp: 5 },
    freshness: null,
    salaryRange: { minSalary: 0, maxSalary: 200000 },
    dateRange: { startRange: null, endRange: null },
    category: null,
    keyword: "", // Initialize as an empty string
    place: "", // Initialize as an empty string
    sortBy: {
      price: null,
      time: null
    }
  });

  // Get current jobs
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = totalJobs.slice(indexOfFirstJob, indexOfLastJob);

  // const isSearchDisabled = !searchKeyword.trim() && !searchCountryCity.trim();
  const isSearchDisabled =
    (!filters.keyword || !filters.keyword.trim()) &&
    (!filters.place || !filters.place.trim());


  // Handle page change
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    getTotalJobs(pageNumber); // Fetch jobs for the new page
  };

  const findJobs = (e) => {
    setJobNameSearch(e.target.value);
    if (jobNameSearch === "") {
      setTotalJobs(allJobs);
      setRecommended(10)
      console.log("setRecommended", allJobs)
    }
  };

  const seachJobCity = (e) => {
    setJobLocationSearch(e.target.value);
  };

  // Function to handle checkbox change
  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;

    // Add or remove the category from the selected categories list
    setSelectedCategories((prevState) => {
      if (checked) {
        // Add category to the list
        return [...prevState, value];
      } else {
        // Remove category from the list
        return prevState.filter((category) => category !== value);
      }
    });
  };





  const handleSalaryChange = (values) => {
    setFilters((prev) => ({
      ...prev,
      salaryRange: {
        minSalary: values[0],
        maxSalary: values[1],
      },
    }));
  };






  const getTotalJobs = async (page, updatedFilters = filters) => {
    try {
      setLoading(true);
      // debugger

      const params = {
        page,
        experience:
          updatedFilters.experience.minimumExp !== null ||
            updatedFilters.experience.maximumExp !== null
            ? JSON.stringify(updatedFilters.experience)
            : null,
        dateRange: updatedFilters.freshness
          ? JSON.stringify(updatedFilters.freshness)
          : null,
        salaryRange:
          updatedFilters.salaryRange.minSalary !== null ||
            updatedFilters.salaryRange.maxSalary !== null
            ? JSON.stringify(updatedFilters.salaryRange)
            : null,
        keyword: updatedFilters.keyword,
        place: updatedFilters.place,
        category: updatedFilters.category ? updatedFilters.category : null,
        // distanceRange: distanceRange && location.latitude && location.longitude ? {lat:51.5904256,lng:-0.1032137,range:distanceRange} : undefined,
        distanceRange: distanceRange && location.latitude && location.longitude ? { lat: location.latitude, lng: location.longitude, range: distanceRange } : undefined,
        sortBy: updatedFilters?.sortBy
      };

      const response = await HttpClient.get(`/jobs/job-posts/`, params);

      console.log("responseresponseresponseresponseresponse", response?.data?.jobDetails?.jobCategory)
      console.log("responseresponseresponseresponseresponse", response)
      setRecommended(response?.total)
      setLoading(false);
      // console.log("API Response:", response.data);

      if (!response.data || !Array.isArray(response.data)) {
        throw new Error("Invalid API response structure.");
      }


      // const availableJobCategory = [
      //   ...new Map(
      //     response?.data.map(item => {
      //       const { jobDetails } = item;
      //       return [
      //         jobDetails?.jobCategory || "N/A",
      //         { id: item._id, jobCategory: jobDetails?.jobCategory || "N/A" }
      //       ];
      //     })
      //   ).values()
      // ];

      const availableJobCategory = Array.from(
        new Map(
          response?.data.map(item => [
            item?.jobDetails?.jobCategory || "N/A",
            {
              id: item._id,
              jobCategory: item?.jobDetails?.jobCategory || "N/A"
            }
          ])
        ).values()
      );



      console.log()

      console.log("availableJobCategoryavailableJobCategory", availableJobCategory)
      setAllJObsCategories(availableJobCategory)


      // Format the data
      const formattedData = response?.data.map((item) => {
        const { companyDetails, jobDetails, jobRequirements, workSchedule, isBookmarked } =
          item;

        console.log(item, "..........item")

        return {
          id: item._id,
          companyName: companyDetails?.companyName || "N/A",
          jobTitle: jobDetails?.jobTitle || "N/A",
          city: jobDetails?.city || "N/A",
          state: jobDetails?.state || "N/A",
          employmentType: jobDetails?.employmentType || "N/A",

          salary: jobDetails?.salary?.amount || "N/A",
          jobCategory: jobDetails?.jobCategory || "N/A",
          minimumExperience: jobRequirements?.minimumExp || "N/A",
          maximumExperience: jobRequirements?.maximumExp || "N/A",
          skills: jobRequirements?.jobSkills || "N/A",
          postedOn: item.createdAt,
          isBookMarked: item.isBookmarked,
          isFeatured: item?.featured,
          frequency: item?.jobDetails?.salary?.frequency

        };
      });


      console.log('formattedData......', formattedData)


      setTotalJobs(formattedData);

      console.log("responseresponseresponse", formattedData)

      setAllJobs(response?.total);
    } catch (error) {
      console.error("Error fetching total jobs:", error.message);
    }
  };






  const findJobNameLocation = () => {

    // Filter jobs based on both company name and location
    const filteredJobs = allJobs.filter((each) => {
      // Filter by company name (case-insensitive)
      const isCompanyNameMatch = each.jobTitle
        .toLowerCase()
        .includes(jobNameSearch.toLowerCase());

      // If location is provided, filter by city or state
      const isLocationMatch = jobLocationSearch
        ? (each.city &&
          each.city
            .toLowerCase()
            .includes(jobLocationSearch.toLowerCase())) ||
        (each.state &&
          each.state.toLowerCase().includes(jobLocationSearch.toLowerCase()))
        : true; // If no location is specified, consider all locations as a match

      return isCompanyNameMatch && isLocationMatch;
    });


    setTotalJobs(filteredJobs);


  };

  const selectDistance = (event) => {
    setDistanceRange(event.target.value);
    if (location.latitude === null || location.longitude === null) {
      toast.error('Please enable location access. Click the “Site Information” icon (🔒 or ⓘ) next to the website address and allow Location permission')
    }
    setFilters((prev) => ({
      ...prev,
      city: event.target.value,
    }));
  };


  const findByCategory = () => {

    //debugger;
    if (selectedCategories.length === 0) {
      return; // Do nothing if no categories are selected
    }

    const updatedFilters = {
      ...filters,
      category: selectedCategories.join(","), // Convert to comma-separated string
    };

    setFilters(updatedFilters); // Update the filters state


  };

  function Pagination({ jobsPerPage, totalJobs, paginate }) {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalJobs / jobsPerPage); i++) {
      pageNumbers.push(i);
    }

    return (
      <nav
        className="flex justify-center mt-4"
        style={{
          marginTop: "2rem",
        }}
      >
        <ul className="flex space-x-2">
          {pageNumbers.map((number) => (
            <li key={number}>
              <button
                onClick={() => paginate(number)}
                className={`px-3 py-1 rounded border border-gray-300 hover:bg-gray-200 ${currentPage === number ? "bg-gray-300" : ""
                  }`}
              >
                {number}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    );
  }


  const selectExperience = (event, type) => {
    //debugger
    const value = parseInt(event.target.value, 10);
    let minExperience = null;
    let maxExperience = null;



    if (type === 'min') {
      setFilters((prevFilters) => ({
        ...prevFilters,
        experience: {
          ...prevFilters.experience,
          minimumExp: value
        },
      }));

    }
    else if (type === 'max') {
      setFilters((prevFilters) => ({
        ...prevFilters,
        experience: {
          ...prevFilters.experience,
          maximumExp: value
        },
      }));

    }

  };

  const selectFreshness = (event) => {
    const value = parseFloat(event.target.value);
    const today = new Date();
    let startRange = null;

    if (value === 0.5) {
      startRange = new Date(today.setDate(today.getDate() - 15));
    } else if (value === 1) {
      startRange = new Date(today.setMonth(today.getMonth() - 1));
    } else if (value === 2) {
      startRange = new Date(today.setMonth(today.getMonth() - 2));
    } else if (value === 3) {
      startRange = new Date(today.setMonth(today.getMonth() - 3));
    }

    const formattedStartRange = startRange
      ? startRange.toISOString().split("T")[0]
      : null;

    setFilters((prevFilters) => ({
      ...prevFilters,
      freshness: value === 0 ? null : {
        startRange: formattedStartRange,
        endRange: new Date().toISOString().split("T")[0],
      },
    }));


  };

  const handleSortBy = (event) => {
    const value = event.target.value;



    if (value === 'time:1') {
      setFilters((prevFilters) => ({
        ...prevFilters,
        sortBy: {
          price: null,
          time: 1
        }
      }));
    } else if (value === 'time:-1') {
      setFilters((prevFilters) => ({
        ...prevFilters,
        sortBy: {
          price: null,
          time: -1
        }
      }));
    }
    else if (value === 'price:-1') {
      setFilters((prevFilters) => ({
        ...prevFilters,
        sortBy: {
          price: -1,
          time: null
        }
      }));
    }
    else if (value === 'price:1') {
      setFilters((prevFilters) => ({
        ...prevFilters,
        sortBy: {
          price: 1,
          time: null
        }
      }));
    }




  };

  const handleKeywordChange = (e) => {
    const value = e.target.value;
    setFilters((prev) => ({
      ...prev,
      keyword: value,
    }));
  };

  const handleCountryCityChange = (e) => {
    const value = e.target.value;
    setFilters((prev) => ({
      ...prev,
      place: value,
    }));
  };

  // Clear filters handler
  const clearSearch = () => {
    setFilters((prev) => ({
      ...prev,
      keyword: "",
      place: "",
    }));
    setClrBtn(false);
    // getTotalJobs(1)
  };


  const createBookmark = async (courseId, isBookMarked, type) => {

    try {
      const response = await HttpClient.post('/bookmark', { referenceId: courseId, status: isBookMarked, type: type })
      if (response) {
        toast.info('Saved job status updated')
        getTotalJobs()
      }
    } catch (err) {
      if (err.response.status === 401) {
        toast.error('Unauthorized. Please log in.');
      } else if (err.response.status === 404) {
        toast.error('Bookmark endpoint not found.');
      } else {
        toast.error(`Error: ${err.response.data.message || 'Something went wrong'}`);
      }

    }



  }

  useEffect(() => {
    // Fetch all jobs on initial mount or fetch based on updated filters
    if (!filters.keyword.trim() && !filters.place.trim()) {
      getTotalJobs(1); // Fetch all jobs when no filters
    } else {
      getTotalJobs(1, filters); // Fetch filtered jobs

    }
  }, [filters]);




  // Search button handler
  const handleSearch = () => {
    console.log("Filters applied:", filters);

    // Check if either keyword or countryCity has a value
    if (filters.keyword?.trim() || filters.place?.trim()) {
      setClrBtn(true);

      // Call the API with the updated filters
      getTotalJobs(1, filters); // Pass `page` as 1 and the current filters
    } else {
      console.log("No filters applied for keyword or countryCity.");
    }
  };


  console.log("totalJobstotalJobstotalJobs", totalJobs)

  return (
    <div key={reloadKey}>
      {/* Search Bar Section */}
      <section className="bg-black text-white py-12">
        <div className="container mx-auto px-4 mt-7">



          <div className="flex flex-col items-center justify-between gap-2 mb-6 md:flex-row md:items-end">



            <div className="flex items-center ">
              <h1 className="text-2xl font-bold text-gray-800 md:text-4xl dark:text-white">
                Find Your <span className="text-indigo-600">Dream Job</span> Here
              </h1>
              <PiStarFourThin className="w-6 h-6 text-yellow-400 md:w-8 md:h-8 animate-pulse" />
            </div>

            <p style={{
              outline: "1px solid #fff"
            }} className="text-sm font-medium px-2 py-1 rounded-md text-[#fff] hover:text-indigo-800 transition-colors duration-200 md:text-base">
              <Link to={dashboardLink}>

                My Dashboard
              </Link>
            </p>

          </div>

          {/* Search Filters */}
          <div className="flex flex-col mb-4 md:flex-row bg-white rounded-lg lg:rounded-full items-center justify-between gap-3 p-2">
            {/* Keyword Input */}
            <input
              type="search"
              value={filters.keyword}
              onChange={handleKeywordChange}
              placeholder="Job title or keyword"
              className="p-4 rounded-full w-full md:w-1/3 text-black outline-none"
              style={{
                color: "#000",
              }}
            />

            <hr className="block md:hidden w-full border-t-2 border-black" />

            <div className="hidden md:block w-[1px] h-5 bg-gray-400"></div>

            <input
              type="text"
              placeholder="Add Country or City"
              value={filters?.place}
              onChange={handleCountryCityChange}
              className="p-4 rounded-full w-full md:w-1/3 text-black outline-none"
            />

            {/* Horizontal Line for Small Screens */}
            <hr className="block md:hidden w-full border-t-2 border-black" />


          </div>

          <div className="flex flex-wrap items-center gap-2  justify-between bg-black mt-3 text-white">
            {/* Experience Dropdown */}
            <div className="flex gap-3">
              <div className="flex items-center">
                <i className="fas fa-briefcase"></i>
                <select
                  value={filters.experience.minimumExp}
                  className="bg-black text-white border-none focus:outline-none"
                  onChange={(e) => selectExperience(e, 'min')}
                  style={{
                    cursor: "pointer",
                  }}
                >
                  <option selected disabled >min Experience</option>
                  <option value={0} >0 Yr</option>
                  <option value={1} >1 Yrs</option>
                  <option value={2} >2 Yrs</option>

                  <option value={3} >3 Yrs</option>
                  <option value={4} >4 Yrs</option>
                  <option value={5} >5 Yrs</option>


                  {/* <option value="4">3-4 Yrs</option>
                <option value="5">4+ Yrs</option> */}
                </select>
              </div>
              <div className="flex items-center ">
                <i className="fas fa-briefcase"></i>
                <select
                  value={filters.experience.maximumExp}
                  className="bg-black text-white border-none focus:outline-none"
                  onChange={(e) => selectExperience(e, 'max')}
                  style={{
                    cursor: "pointer",
                  }}
                >
                  <option disabled selected>max Experience</option>
                  {/* <option value="1">0 Yr</option> */}
                  {
                    (() => {
                      const min = Number(filters.experience.minimumExp || 0);
                      const maxLimit = 4;
                      const options = [];

                      for (let i = min + 1; i <= maxLimit; i++) {
                        options.push(
                          <option key={i} value={i}>
                            {i} {i === 1 ? "year" : "years"}
                          </option>
                        );
                      }

                      return options;
                    })()
                  }
                  <option value="5">5+ years</option>
                </select>
              </div>
            </div>

            {/* Vertical Divider */}
            <div className="w-[1px] h-8 bg-gray-600"></div>


            <div className="flex items-center space-x-2">
              <i className="fas fa-map-marker-alt"></i>
              <select
                value={distanceRange}

                onChange={selectDistance}
                className="bg-black text-white border-none focus:outline-none"
                style={{
                  cursor: "pointer",
                }}
              >
                <option disabled={location?.latitude !== null} value="">Distance Range</option>


                <option disabled={location?.latitude === null} value={2}>{"2 km"}</option>
                <option disabled={location?.latitude === null} value={5}>{"5 km"}</option>
                <option disabled={location?.latitude === null} value={10}>{"10 km"}</option>

                <option disabled={location?.latitude === null} value={30}>{"30 km"}</option>
                <option disabled={location?.latitude === null} value={80}>{"80 km"}</option>
                <option disabled={location?.latitude === null} value={100}>{"100 km"}</option>
                <option disabled={location?.latitude === null} value={150}>{"150 km"}</option>
                <option disabled={location?.latitude === null} value={300}>{"300 km"}</option>
                <option value="">{"Reset"}</option>

              </select>
            </div>

            {/* Vertical Divider */}
            <div className="w-[1px] h-8 bg-gray-600"></div>

            {/* Date Range Dropdown */}
            <div className="flex items-center ">
              <i className="fas fa-map-marker-alt"></i>
              <select
                className="bg-black text-white border-none focus:outline-none"
                value={filters?.freshness}
                onChange={selectFreshness}
                style={{
                  cursor: "pointer",
                }}
              >
                <option value="0">Freshness</option>
                <option value="0.5">Last 15 Days</option>
                <option value="1">Last 1 Month</option>
                <option value="2">Last 2 Months</option>
                <option value="3">Last 3 Months</option>
              </select>
            </div>

            {/* Vertical Divider */}
            <div className="w-[1px] h-8 bg-gray-600"></div>





            <SalaryRangeFilter
              filters={filters}
              setFilters={setFilters}
              getTotalJobs={getTotalJobs}
            />

          </div>
        </div>
      </section>

      <div className="flex flex-wrap">
        {/* Sidebar - Filters */}
        <div className="border-r-2 border-[#CBCBCB] p-4 w-full sm:w-1/4 lg:w-1/4">
          <div className="flex gap-2">

            <button
              className={`${selectedCategories.length === 0
                ? "bg-[#D3555A] cursor-not-allowed"
                : "bg-black hover:bg-gray-700"
                } text-white outline-gray-300 outline-1 py-1 px-2 rounded`}
              disabled={selectedCategories.length === 0}
              onClick={findByCategory}
            >
              Apply
            </button>
            <button
              className="rounded-md px-2"
              style={{ outline: "1px solid rgb(209 213 219)" }}
              onClick={() => window.location.reload()}
            >
              Reset Filter
            </button>
          </div>
          <h4 className="text-lg mt-4">Filter Category</h4>

          <div className="md:block">
            {/* Toggle button for small screens */}
            <button
              className="md:hidden bg-blue-500 text-white px-3 py-1 w-auto rounded "
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? "Hide Categories" : "Show Categories"}
            </button>


            {/* List: always visible on md+, toggled on small screens */}
            <ul
              className={`space-y-2 text-sm mt-2 ${isOpen ? "block" : "hidden"} md:block`}
              style={{ overflowY: "auto"}}
            >
              {allJobsCategories.map((each) => (
                <li className="flex items-center" key={each.id}>
                  <input
                    type="checkbox"
                    id={each?.id}
                    className="mr-2"
                    value={each?.jobCategory}
                    onChange={handleCheckboxChange}
                    checked={selectedCategories.includes(each?.jobCategory)}
                  />
                  <label htmlFor={each?.id}>{each?.jobCategory}</label>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Main Section - Recommended Jobs */}
        <div className="w-full sm:w-3/4 lg:w-3/4 p-4">
          {loading === false ? (
            <>
              <div className="flex justify-between flex-wrap items-center mb-6">
                <h2 className="text-2xl font-bold">
                  Recommended Jobs{" "}
                  <span className="bg-[#f6f6f6f6] rounded-full text-lg p-2">
                    {recommendedJob}
                  </span>
                </h2>

                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center flex-wrap gap-1">
                    <select
                      // value={filters.sortBy}
                      onChange={handleSortBy}
                      className="border border-gray-300 p-2 rounded-md cursor-pointer" style={{
                        fontSize: '12px'
                      }}>
                      <option disabled selected >Select</option>
                      <option value='time:-1'>Newest to Oldest</option>
                      <option value='time:1'>Oldest to Newest</option>
                      <option value='price:-1'>Price High to Low</option>
                      <option value='price:1'>Price Low to High</option>

                    </select>


                    {/* <span className="text-gray-600 text-sm">Sort by:</span>
                    <select className="border border-gray-300 py-1 text-sm p-3 rounded-full">
                      <option>Newest - Oldest</option>
                      <option>Oldest - Newest</option>
                    </select> */}
                  </div>

                  {/* <div>
                    <select className="border border-gray-300 p-3 rounded-full text-sm">
                      <option>New Jobs</option>
                      <option>Oldest - Newest</option>
                    </select>
                  </div> */}
                </div>
              </div>

              {/* Job Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">



                {totalJobs.map((job) => (
                  <div
                    key={job.id}
                    className="bg-white rounded-lg p-2 flex flex-col justify-between"
                    style={{ outline: "2px solid #D0CECE" }}
                  >
                    <div
                      className={`p-4 rounded-lg shadow-md relative`}
                      style={{
                        backgroundColor: generateRandomColor(),
                        height: '100%'
                      }}
                    >
                      {/* Featured Job Ribbon */}
                      {job?.isFeatured && (
                        <div className="absolute top-0 left-0 bg-[#c5363c] text-[#fff] text-xs font-bold px-2 py-1 rounded-br-lg">
                          Featured Job
                        </div>
                      )}

                      <div className="flex flex-row-reverse mt-2 items-center justify-between">
                        <div className="bg-white p-2 rounded-full">
                          <button
                            onClick={() => createBookmark(job?.id, job?.isBookMarked, "job")}
                            className={`flex items-center justify-center font-bold bg-white px-1 py-1 w-[28px] h-[28px] rounded-lg shadow ${job?.isBookMarked ? "text-green-500 bg-black" : "text-gray-500"}`}
                            aria-label={job?.isBookMarked ? "Remove bookmark" : "Add bookmark"}
                          >
                            {job?.isBookMarked === true ? (
                              <CiBookmarkCheck size={20} />
                            ) : (
                              <CiBookmark size={20} />
                            )}
                          </button>
                        </div>

                        <p className="bg-white rounded-md px-2 py-1"> {job.jobCategory}</p>
                      </div>

                      <h3 className="text-lg text-black font-bold">
                        {job?.companyName &&
                          job.companyName.charAt(0).toUpperCase() + job.companyName.slice(1)}
                      </h3>
                      <div className="flex justify-between items-center">
                        <p className="mb-2"><span className="text-1xl font-bold">{job.jobTitle}</span> </p>
                      </div>
                      <div className="flex flex-wrap mb-2">
                        {job?.skills?.map((skill, index) => (
                          <p
                            key={index}
                            className="text-[12px] outline outline-1 outline-gray-300 bg-white px-1 py-1 mr-2 rounded-md"
                          >
                            {skill}
                          </p>
                        ))}
                      </div>
                      <span className="text-[12px] w-auto outline outline-1 outline-gray-300 bg-white px-2 py-1 mr-2 rounded-lg">
                        {job?.minimumExperience} - {job?.maximumExperience} Yrs
                      </span>

                      <span className="text-[12px] w-auto mt-2 outline outline-1 outline-gray-300 bg-white px-2 py-1 mr-2 rounded-lg">
                        {job?.employmentType}
                      </span>
                      <br />

                      <p className="mt-4">
                        <span className="bg-[#fff] text-md font-semibold px-2 py-1 rounded-md">
                          Posted on {new Date(job?.postedOn).toLocaleDateString("en-GB")}
                        </span>
                      </p>
                    </div>

                    <div className="mt-2 px-2">
                      <span className="font-semibold">{job?.salary} £</span> / {job?.frequency}
                      <div className="flex justify-between items-center">
                        <p className="text-sm mt-2 mr-1 text-gray-600">
                          {job?.city},{job?.state}
                        </p>
                        <button
                          onClick={() => {
                            const accessToken = localStorage.getItem("accessToken");
                            if (accessToken) {
                              navigate(`/jobdescription/${job?.id}`);
                            } else {
                              toast.warn("Please login first to view job details", { position: "top-center" });
                              navigate("/login");
                            }
                          }}
                          className="px-1 py-1 border bg-black text-white rounded-lg hover:bg-black hover:text-white"
                        >
                          Details
                        </button>

                      </div>
                    </div>
                  </div>
                ))}


              </div>

              <Pagination
                jobsPerPage={jobsPerPage}
                totalJobs={allJobs}
                paginate={paginate}
                currentPage={currentPage}
              />
            </>
          ) : (
            <div className="min-h-[50vh] flex justify-center items-center">
              <Spinner />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FindJobs;
