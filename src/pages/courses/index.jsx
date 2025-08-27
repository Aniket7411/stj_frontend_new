import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { VscSettings } from "react-icons/vsc";
import AllCourses from "../allcourses";
import Featured from "../featured";
import { Link } from "react-router-dom";
import { HttpClient } from "../../server/client/http";
import CourseDescription from "../coursedescription";
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "react-toastify";

const Courses = () => {
   const [location, setLocation] = useState({
      latitude: null,
      longitude: null,
    });
    const [distanceRange, setDistanceRange] = useState("");
     const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("allCourses");
  const [courseData, setCourseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [reload, setReload] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [allCategories, setAllCategories] = useState([]);


  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState(""); // Holds the input value
  const [debouncedKeyword, setDebouncedKeyword] = useState(""); // Holds the debounced value
  const [selectedCategory, setSelectedCategory] = useState("");
  // const [selectedCountry, setSelectedCountry] = useState(""); // State for country
  const [selectedCity, setSelectedCity] = useState("");



  const getAllCategories = async () => {
    setIsLoading(true);
    try {
      const response = await HttpClient.get("/category/");
      const formattedCategories = response.data.map((each) => ({
        id: each._id,
        categoryName: each.categoryName,
        createdAt: each.createdAt,
      }));
      setAllCategories(formattedCategories);

      console.log("HHH", formattedCategories)
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
   const selectDistance = (event) => {
      setDistanceRange(event.target.value);
      if(location.latitude===null || location.longitude===null){
        toast.error('you need to allow location sharing for this filter')
      }
      setFilters((prev) => ({
        ...prev,
        city: event.target.value,
      }));
    };

  useEffect(() => {
    getAllCategories()
  }, [])


  const [filters, setFilters] = useState({
    course: "",
    distanceRange: 0,
    country: "",
    category: "",
    keyword: "",
  });

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    fetchCoursesData(pageNumber); // Fetch courses for the new page
  };

  const fetchCoursesData = async (page, updatedFilters = filters) => {
    try {
      setLoading(true);
      //debugger;
      const params = {
        page,
        course: updatedFilters.course,
        //city: updatedFilters.city,
        // country: updatedFilters.country,
        distanceRange:location.latitude?{latitude:location.latitude,longitude:location.longitude,range:distanceRange}:undefined,
        category: updatedFilters.category,
        keyword: updatedFilters.keyword, // Pass the keyword
      };


      const response = await HttpClient.get(`/course/get/`, params);
      console.log("formattedCourses", response);

      const formattedCourses = response.courses.map((eachCourse) => ({
        courseId: eachCourse?._id,
        productId:eachCourse?.productId,
        courseImage: eachCourse?.courseCertificates?.courseImage,
        courseTitle: eachCourse?.courseDetails?.title,
        cratedOn: eachCourse?.createdAt,
        createdBy: eachCourse?.createdBy,
        address: eachCourse?.courseDetails?.address?.address,
        townCity: eachCourse?.courseDetails?.address?.town_city,
        postCode: eachCourse?.courseDetails?.address?.postCode,
        amount: eachCourse?.courseDetails?.amount,
        days: eachCourse?.courseDetails?.days,
        duration: eachCourse?.courseDetails?.duration,
        enrollmentLimit: eachCourse?.courseDetails?.enrollmentLimit,
        startDate: eachCourse?.courseDetails?.startDate,
        endDate: eachCourse?.courseDetails?.endDate,
        courseCategory: eachCourse?.courseDetails?.category,
        startHour: eachCourse?.courseDetails?.startTime?.hour,
        startAmPM: eachCourse?.courseDetails?.startTime?.am_pm,
        endHour: eachCourse?.courseDetails?.endTime?.hour,
        endAmPM: eachCourse?.courseDetails?.endTime?.am_pm,
        courseDescription: eachCourse?.courseDetails?.description,
        certificateImage: eachCourse?.courseCertificates?.certificateImage,
        courseInstructor:eachCourse?.courseDetails?.instructorName,
        
      }))
      console.log("formattedCourses", formattedCourses)
      setCourseData(formattedCourses)
      setLoading(false);

      // Format the data before setting it

      setTotalPages(
        Array.from({ length: response.totalPages }, (_, i) => i + 1)
      );
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      setDebouncedKeyword(searchKeyword);
    }, 500); // 500ms delay

    return () => clearTimeout(debounceTimeout); // Cleanup previous timeout
  }, [searchKeyword]);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value); // Update selected category
  };

  // Update filters and trigger API when debouncedKeyword changes
  useEffect(() => {
    // Update filters to reflect changes
    setFilters((prevFilters) => ({
      ...prevFilters,
      course: debouncedKeyword,
      category: selectedCategory,
       distanceRange:location.latitude?{latitude:location.latitude,longitude:location.longitude,range:distanceRange}:undefined,
      //city: selectedCity,
    }));
  }, [selectedCategory, debouncedKeyword, selectedCity, showFilters]);

  useEffect(() => {
    fetchCoursesData(1, filters);
  }, [filters, reload]);

  useEffect(() => {
    // console.log("Filters updated:", filters);
  }, [filters]);


   useEffect(() => {
    
    if (location.latitude===null && location.longitude===null && navigator.geolocation) {
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
  // const onCountryChange = (country) => {
  //   setSelectedCountry(country.target.value);
  // };

  const onCityChange = (city) => {
    setSelectedCity(city.target.value);
  };

  const role = JSON.parse(localStorage.getItem("userData"))?.role;

  return (
    <div className="px-5 py-5 bg-[#FBFBFB]">
      <div className="flex justify-center items-center mt-8">
        <img src="/assets/adv.svg" alt="profile" className="h-[150px] mr-3" />
        <h1 className="font-futura md:text-5xl text-lg font-bold">Courses</h1>
        <img src="/assets/judge.svg" alt="profile" className="h-[150px] ml-3" />
      </div>

      <div className="flex justify-between flex-wrap px-2 md:px-8 py-2 mb-1">
        <div
          className="flex items-center bg-[#fff] w-[250px] mb-1 md:mb-0 rounded-full p-2"
          style={{ outline: "1px solid gray" }}
        >
          <CiSearch className="mr-2" />
          <input
            type="search"
            className="outline text-sm"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)} // Update the input value
            placeholder="Search Course Name"
            style={{ outline: "none" }}
          />
        </div>
        <div className="flex justify-between gap-4">
          {role === "employer" && (
            <Link to="/add_new_course">
              <button className="bg-red-500 text-white py-1 px-2 rounded-full hover:bg-red-600 w-auto  md:w-[150px]  md:h-[45px]">
                {" + "} Add courses
              </button>
            </Link>
          )}

          <div
            className="flex items-center justify-center cursor-pointer bg-[#fff] w-[50px]  rounded-full px-2 py-1"
            style={{ outline: "1px solid gray" }}
            onClick={() => setShowFilters(true)}
          >
            <VscSettings />
          </div>
        </div>
      </div>

      {showFilters && (
        <>
          <div
            className={`relative gap-4 mb-2 flex flex-wrap   items-center  p-2 py-1 bg-slate-50 border rounded-lg transition-all duration-100 ease-in-out transform ${showFilters ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
          >
            <div className="flex justify-items-center bg-[#fff] mr-3 rounded-full h-[50px]">
              <select
                className="text-sm border border-gray-500 rounded-full p-1"
                value={selectedCategory} // Bind selected value to state
                onChange={handleCategoryChange} // Update state on change
              >
                <option value="">Select Category</option>
                {allCategories.map((category) => (
                  <option key={category.id} value={category.categoryName}>
                    {category.categoryName}
                  </option>
                ))}
              </select>
            </div>




            <div
              className="flex items-center bg-[#fff]  rounded-full"
            // style={{ outline: "1px solid gray", paddingLeft: "22px" }}
            >
              <select
                value={distanceRange}
                onChange={selectDistance}
                className="bg-[#c5363c] p-1 rounded-full text-white border-none focus:outline-none"
                style={{
                  cursor: "pointer",
                }}
              >
                <option disabled value="">Distance Range</option>
                {/* {ukCities?.map((item) => (
                  <option value={item}>{item}</option>
                ))} */}
                <option value={2}>{"2 km"}</option>
                <option value={5}>{"5 km"}</option>
                <option value={10}>{"10 km"}</option>
                

              </select>
            </div>

     

            <img
              onClick={() => {
                setShowFilters(false);
                setSelectedCategory("");
                setSelectedCity("")
              }}
              src="/assets/close.svg"
              alt="profile"
              className="cursor-pointer h-[30px] w-[30px]"
            />

            {/* </button> */}
          </div>
        </>
      )}
      <div className="flex justify-center">
        <h3
          className={`cursor-pointer bold text-[12px] md:text-lg mr-2 ${activeTab === "allCourses"
            ? "text-red-500 font-semibold"
            : "text-gray-700"
            }`}
          onClick={() => setActiveTab("allCourses")}
        >
          All Courses
        </h3>
        {/* <h3
          className={`cursor-pointer bold text-[12px] md:text-lg ml-2 ${
            activeTab === "featured"
              ? "text-red-500 font-semibold"
              : "text-gray-700"
          }`}
          onClick={() => setActiveTab("featured")}
        >
          Featured
        </h3> */}
      </div>
      <hr className="mb-2" />



      {
        loading ? <div className="flex items-center justify-center h-[100%]"><ClipLoader size={50} color="#4ade80" /></div> : <AllCourses
          setReload={setReload}
          courseData={courseData}
          paginate={paginate}
          currentPage={currentPage}
          totalpages={totalPages}
        // onCountryChange={onCountryChange} // Pass the handler
        // onCityChange={onCityChange}
        />
      }






    </div>
  );
};

export default Courses;
