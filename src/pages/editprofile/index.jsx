import { FaRegEdit } from "react-icons/fa";
import { CiTextAlignJustify } from "react-icons/ci";
import { FaPeopleGroup } from "react-icons/fa6";
import { useState, useContext } from "react";
import { ProfileContext } from "../useContext3";
import axios from "axios";

const EditProfile = () => {
    // State management for the fields
    const [Height, setHeight] = useState("");
    const [build, setBuild] = useState("");
    const [spokenLanguage, setSpokenLanguage] = useState("English");
    const [utrNumber, setUtr] = useState("");
    const [imparity, setImparity] = useState("");
    const [healthIssue, setHealthIssue] = useState("");
    const [travelDistance, setTravelDistance] = useState("");
    const [militaryBackground, setMilitaryBackground] = useState(false);
    const [ukLiecence, setUkLiecence] = useState(false);
    const [paratraining, setParatraining] = useState(false);
    const [siaBadge, setSiaBadge] = useState(false);
    const [visibletatoo, setVisibleTatoo] = useState(false);
    const [firstaid, setFirstAId] = useState(false);
    const [workPermit, setWorkPermit] = useState(true);
    const [submitDocument, setSubmitDocument] = useState("drivingLicence");
    const [utilityBills, setUtilityBills] = useState(false);
    const [Bio, setBio] = useState("");
    const [cscs,setCscs] = useState(false)
    const [visiblePiercing, setVisiblePiercing] = useState(false)
    const [abroadTrave, setAbroadTrave] = useState(false)



    const [experience, setExperience] = useState([]); // Store the list of experiences
  const [newExperience, setNewExperience] = useState({
    title: '',
    company: '',
    website: '',
    location: '',
    employment: '',
    startDate: '',
    endDate: '',
    description: '',
    currentlyWorkHere: false,
  });

  // Handle change for any input field
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewExperience((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle checkbox change for currently working here
  const handleCheckboxChange = (e) => {
    setNewExperience((prevState) => ({
      ...prevState,
      currentlyWorkHere: e.target.checked,
    }));
  };

  // Add new experience to the list
  const handleAddExperience = () => {
    setExperience((prevState) => [...prevState, newExperience]);
    setNewExperience({
      title: '',
      company: '',
      website: '',
      location: '',
      employment: '',
      startDate: '',
      endDate: '',
      description: '',
      currentlyWorkHere: false,
    });
  };

  // Remove an experience entry
  const handleRemoveExperience = (index) => {
    const updatedExperience = experience.filter((_, i) => i !== index);
    setExperience(updatedExperience);
  };
    

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            Height,
            build,
            spokenLanguage,
            utrNumber,
            imparity,
            healthIssue,
            travelDistance,
            militaryBackground,
            ukLiecence,
            paratraining,
            siaBadge,
            visibletatoo,
            firstaid,
            workPermit,
            submitDocument,
            utilityBills,
            Bio,
            cscs,
            visiblePiercing,
            experience,
            abroadTrave
        };
        console.log("Form Data Submitted: ", formData);

      
          try {
              // Make sure userId is correctly defined, e.g., get from localStorage or context
              const userId = localStorage.getItem("userId");
            
              // Axios PUT request with correctly formatted URL
              const response = await axios.put(`https://stj-backend.onrender.com/api/user/profile/general/${userId}`, formData);
            
              // Log the response data for debugging
              console.log("Response Data:", response.data);
            
            
            } catch (error) {
              console.error("Error submitting profile details:", error);
            
              // Alert the user about the error
              alert("Failed to submit profile details. Please try again.");
            }
    
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex flex-wrap justify-between">
                {/* Height */}
                <div className="w-[100%] lg:w-[35%]">
                    <label className="font-bold">Height :</label>
                    <div>
                        <div className="flex items-center rounded-lg m-2 p-1" style={{ outline: "1px solid gray" }}>
                            <input
                                type="text"
                                value={Height}
                                onChange={(e) => setHeight(e.target.value)}
                                placeholder="N/A (In CM)"
                                className="w-[100%] outline-none"
                            />
                            <FaRegEdit />
                        </div>
                    </div>
                </div>

                {/* Build */}
                <div className="w-[100%] lg:w-[35%]">
                    <label className="font-bold">Build :</label>
                    <div>
                        <div className="flex items-center rounded-lg m-2 p-1" style={{ outline: "1px solid gray" }}>
                            <input
                                type="text"
                                value={build}
                                onChange={(e) => setBuild(e.target.value)}
                                placeholder="N/A"
                                className="w-[100%] outline-none"
                            />
                            <FaRegEdit />
                        </div>
                    </div>
                </div>
            </div>

            <hr className="border-gray-300 mt-3 mb-3" />

            <div className="flex flex-wrap justify-between">
                {/* Language Spoken */}
                <div className="w-[100%] lg:w-[35%]">
                    <label className="font-bold">Language Spoken :</label>
                    <div>
                        <div className="flex items-center justify-between rounded-lg m-2 p-1" style={{ outline: "1px solid gray" }}>
                            <select className="p-1" onChange={(e) => setSpokenLanguage(e.target.value)} value={spokenLanguage}>
                                <option value="english">English</option>
                                <option value="Other">Other</option>
                            </select>
                            <FaRegEdit />
                        </div>
                    </div>
                </div>

                {/* UTR Number */}
                <div className="w-[100%] lg:w-[35%]">
                    <label className="font-bold">UTR Number :</label>
                    <div>
                        <div className="flex items-center rounded-lg m-2 p-1" style={{ outline: "1px solid gray" }}>
                            <input
                                type="text"
                                value={utrNumber}
                                onChange={(e) => setUtr(e.target.value)}
                                placeholder="0"
                                className="w-[100%] outline-none"
                            />
                            <FaRegEdit />
                        </div>
                    </div>
                </div>
            </div>

            <hr className="border-gray-300 mt-3 mb-3" />

            <div className="flex flex-wrap justify-between">
                {/* Ailments */}
                <div className="w-[100%] lg:w-[35%]">
                    <label className="font-bold">Any Ailments that could impair your ability to work? :</label>
                    <div>
                        <div className="flex items-center justify-between rounded-lg m-2 p-1" style={{ outline: "1px solid gray" }}>
                            <input
                                type="text"
                                value={imparity}
                                onChange={(e) => setImparity(e.target.value)}
                                placeholder="N/A"
                                className="w-[100%] outline-none"
                            />
                            <FaRegEdit />
                        </div>
                    </div>
                </div>

                {/* Health Issues */}
                <div className="w-[100%] lg:w-[35%]">
                    <label className="font-bold">Any Health Issues? :</label>
                    <div>
                        <div className="flex items-center rounded-lg m-2 p-1" style={{ outline: "1px solid gray" }}>
                            <input
                                type="text"
                                value={healthIssue}
                                onChange={(e) => setHealthIssue(e.target.value)}
                                placeholder="N/A"
                                className="w-[100%] outline-none"
                            />
                            <FaRegEdit />
                        </div>
                    </div>
                </div>
            </div>

            <hr className="border-gray-300 mt-3 mb-3" />

            <div className="flex flex-wrap justify-between">
                {/* Travel Distance */}
                <div className="w-[100%] lg:w-[35%]">
                    <label className="font-bold">How far are you willing to travel? :</label>
                    <div>
                        <div className="flex items-center justify-between rounded-lg m-2 p-1" style={{ outline: "1px solid gray" }}>
                            <input
                                type="number"
                                value={travelDistance}
                                onChange={(e) => setTravelDistance(e.target.value)}
                                placeholder="0"
                                className="w-[100%] outline-none"
                            />
                            <FaRegEdit />
                        </div>
                    </div>
                </div>

                {/* Military Background */}
                <div className="w-[100%] lg:w-[35%]">
                    <label className="font-bold">Military Background :</label>
                    <div>
                        <div className="flex items-center rounded-lg m-2 p-1">
                            <input
                                type="radio"
                                onChange={() => setMilitaryBackground((prev) => !prev)}
                                className="mr-2"
                                name="military"
                            />
                            <label className="mr-5">Yes</label>
                            <input
                                type="radio"
                                onChange={() => setMilitaryBackground((prev) => !prev)}
                                className="mr-2"
                                name="military"
                            />
                            <label>No</label>
                        </div>
                    </div>
                </div>
            </div>

            <hr className="border-gray-300 mt-3 mb-3" />

            <div className="flex flex-wrap justify-between">
                {/* SIA */}
                <div className="w-[100%] lg:w-[35%]">
                    <label className="font-bold">Do you have an SIA Badge? :</label>
                    <div>
                        <div className="flex items-center rounded-lg m-2 p-1">
                            <input
                                type="radio"
                                onChange={() => setSiaBadge((prev) => !prev)}
                                className="mr-2"
                                name="SIA"
                            />
                            <label className="mr-5">Yes</label>
                            <input
                                type="radio"
                                onChange={() => setSiaBadge((prev) => !prev)}
                                className="mr-2"
                                name="SIA"
                            />
                            <label>No</label>
                        </div>
                    </div>
                </div>

                {/* Do you drive? : */}
                <div className="w-[100%] lg:w-[35%]">
                    <label className="font-bold">Do you hold full UK Driving License? :</label>
                    <div>
                        <div className="flex items-center rounded-lg m-2 p-1">
                            <input
                                type="radio"
                                onChange={() => setUkLiecence((prev) => !prev)}
                                className="mr-2"
                                name="military"
                            />
                            <label className="mr-5">Yes</label>
                            <input
                                type="radio"
                                onChange={() => setUkLiecence((prev) => !prev)}
                                className="mr-2"
                                name="military"
                            />
                            <label>No</label>
                        </div>
                    </div>
                </div>
            </div>

            <hr className="border-gray-300 mt-3 mb-3" />

            <div className="flex flex-wrap justify-between">
                {/* SIA */}
                <div className="w-[100%] lg:w-[35%]">
                    <label className="font-bold">Paramedic training? :</label>
                    <div>
                        <div className="flex items-center rounded-lg m-2 p-1">
                            <input
                                type="radio"
                                onChange={() => setParatraining((prev) => !prev)}
                                className="mr-2"
                                name="Paramedic"
                            />
                            <label className="mr-5">Yes</label>
                            <input
                                type="radio"
                                onChange={() => setParatraining((prev) => !prev)}
                                className="mr-2"
                                name="Paramedic"
                            />
                            <label>No</label>
                        </div>
                    </div>
                </div>

                {/* Do you drive? : */}
                <div className="w-[100%] lg:w-[35%]">
                    <label className="font-bold">Do you hold full UK Driving Licence? :</label>
                    <div>
                        <div className="flex items-center rounded-lg m-2 p-1">
                            <input
                                type="radio"
                                onChange={() => setUkLiecence((prev) => !prev)}
                                className="mr-2"
                                name="liecence"
                            />
                            <label className="mr-5">Yes</label>
                            <input
                                type="radio"
                                onChange={() => setUkLiecence((prev) => !prev)}
                                className="mr-2"
                                name="liecence"
                            />
                            <label>No</label>
                        </div>
                    </div>
                </div>
            </div>           

            <hr className="border-gray-300 mt-3 mb-3" />


            <div className="flex flex-wrap justify-between">
                {/* First aid? :  */}
                <div className="w-[100%] lg:w-[35%]">
                    <label className="font-bold">First aid? : </label>
                    <div>
                        <div className="flex items-center rounded-lg m-2 p-1">
                            <input
                                type="radio"
                                onChange={() => setFirstAId((prev) => !prev)}
                                className="mr-2"
                                name="aid"
                            />
                            <label className="mr-5">Yes</label>
                            <input
                                type="radio"
                                onChange={() => setFirstAId((prev) => !prev)}
                                className="mr-2"
                                name="aid"
                            />
                            <label>No</label>
                        </div>
                    </div>
                </div>

                {/* Visible Tattoos? : : */}
                <div className="w-[100%] lg:w-[35%]">
                    <label className="font-bold">Visible Tattoos? :</label>
                    <div>
                        <div className="flex items-center rounded-lg m-2 p-1">
                            <input
                                type="radio"
                                onChange={() => setVisibleTatoo((prev) => !prev)}
                                className="mr-2"
                                name="Tattoos"
                            />
                            <label className="mr-5">Yes</label>
                            <input
                                type="radio"
                                onChange={() => setVisibleTatoo((prev) => !prev)}
                                className="mr-2"
                                name="Tattoos"
                            />
                            <label>No</label>
                        </div>
                    </div>
                </div>
            </div> 

            <hr className="border-gray-300 mt-3 mb-3" />

            <div className="flex flex-wrap justify-between">
                {/* Passport/Driving License : */}
                <div className="w-[100%] lg:w-[35%]">
                    <label className="font-bold">Passport/Driving License :</label>
                    <div>
                        <div className="flex items-center rounded-lg m-2 p-1">
                            <input
                                type="radio"
                                onChange={() => setSubmitDocument((prev) => !prev)}
                                className="mr-2"
                                name="pd"
                            />
                            <label className="mr-5">Yes</label>
                            <input
                                type="radio"
                                onChange={() => setSubmitDocument((prev) => !prev)}
                                className="mr-2"
                                name="pd"
                            />
                            <label>No</label>
                        </div>
                    </div>
                </div>

                {/* Utility Bill : : */}
                <div className="w-[100%] lg:w-[35%]">
                    <label className="font-bold">Utility Bill or Statement less than 3 months old with current address :</label>
                    <div>
                        <div className="flex items-center rounded-lg m-2 p-1">
                            <input
                                type="radio"
                                onChange={() => setUtilityBills((prev) => !prev)}
                                className="mr-2"
                                name="UtilityBill"
                            />
                            <label className="mr-5">Yes</label>
                            <input
                                type="radio"
                                onChange={() => setUtilityBills((prev) => !prev)}
                                className="mr-2"
                                name="UtilityBill"
                            />
                            <label>No</label>
                        </div>
                    </div>
                </div>
            </div> 

            <hr className="border-gray-300 mt-3 mb-3" />


            <div className="flex flex-wrap justify-between">
                {/* UK work permit :*/}
                <div className="w-[100%] lg:w-[35%]">
                    <label className="font-bold">UK work permit :</label>
                    <div>
                        <div className="flex items-center rounded-lg m-2 p-1">
                            <input
                                type="radio"
                                onChange={() => setWorkPermit((prev) => !prev)}
                                className="mr-2"
                                name="work-permit"
                            />
                            <label className="mr-5">Yes</label>
                            <input
                                type="radio"
                                onChange={() => setWorkPermit((prev) => !prev)}
                                className="mr-2"
                                name="work-permit"
                            />
                            <label>No</label>
                        </div>
                    </div>
                </div>     


                  {/* Do you have CSCS card : :*/}
                <div className="w-[100%] lg:w-[35%]">
                    <label className="font-bold">Do you have CSCS card? :</label>
                    <div>
                        <div className="flex items-center rounded-lg m-2 p-1">
                            <input
                                type="radio"
                                onChange={() => setCscs((prev) => !prev)}
                                className="mr-2"
                                name="CSCS"
                            />
                            <label className="mr-5">Yes</label>
                            <input
                                type="radio"
                                onChange={() => setCscs((prev) => !prev)}
                                className="mr-2"
                                name="CSCS"
                            />
                            <label>No</label>
                        </div>
                    </div>
                </div>      
            </div> 


            <div className="flex flex-wrap justify-between">
                {/* Visible Piercings? : :*/}
                <div className="w-[100%] lg:w-[35%]">
                    <label className="font-bold">Visible Piercings? :</label>
                    <div>
                        <div className="flex items-center rounded-lg m-2 p-1">
                            <input
                                type="radio"
                                onChange={() => setVisiblePiercing((prev) => !prev)}
                                className="mr-2"
                                name="Piercings"
                            />
                            <label className="mr-5">Yes</label>
                            <input
                                type="radio"
                                onChange={() => setVisiblePiercing((prev) => !prev)}
                                className="mr-2"
                                name="Piercings"
                            />
                            <label>No</label>
                        </div>
                    </div>
                </div>     


                  {/* Willing to travel abroad? :*/}
                <div className="w-[100%] lg:w-[35%]">
                    <label className="font-bold">Willing to travel abroad? :</label>
                    <div>
                        <div className="flex items-center rounded-lg m-2 p-1">
                            <input
                                type="radio"
                                onChange={() => setAbroadTrave((prev) => !prev)}
                                className="mr-2"
                                name="abroad"
                            />
                            <label className="mr-5">Yes</label>
                            <input
                                type="radio"
                                onChange={() => setAbroadTrave((prev) => !prev)}
                                className="mr-2"
                                name="abroad"
                            />
                            <label>No</label>
                        </div>
                    </div>
                </div>      
            </div> 

            <div className="flex flex-wrap items-start justify-between">
                {/* Bio Section */}
                <div className="w-[100%] lg:w-[35%]">
                    <label className="font-bold block mb-2">Bio</label>
                    <textarea
                        value={Bio} // Bind textarea value to the state
                        onChange={(e) => setBio(e.target.value)} // Update state on change
                        placeholder="Share a brief bio about yourself"
                        className="w-full p-2 rounded border outline-none mt-2"
                        style={{ border: "1px solid gray", minHeight: "100px" }} // Optional style
                    />
                </div>
            </div>

            <div>
      {/* Experience Form */}
      <label className="font-bold">Experience:</label>

      <div className="flex justify-between flex-wrap">
        <div className="md:w-[40%] w-[100%]">
          <label>Title <span className="text-[#D3555A]">*</span></label>
          <div className="rounded-sm" style={{ outline: "1px solid gray" }}>
            <input
              type="text"
              name="title"
              className="px-2 py-1 outline-none w-[100%]"
              value={newExperience.title}
              onChange={handleChange}
              placeholder="Enter the title"
            />
          </div>
        </div>

        <div className="md:w-[30%] w-[100%]">
          <label>Company <span className="text-[#D3555A]">*</span></label>
          <div className="rounded-sm" style={{ outline: "1px solid gray" }}>
            <input
              type="text"
              name="company"
              className="px-2 py-1 outline-none w-[100%]"
              value={newExperience.company}
              onChange={handleChange}
              placeholder="Enter the Company"
            />
          </div>
        </div>

        <div className="md:w-[20%] w-[100%]">
          <label>Website <span className="text-[#D3555A]">*</span></label>
          <div className="rounded-sm" style={{ outline: "1px solid gray" }}>
            <input
              type="text"
              name="website"
              className="px-2 py-1 outline-none w-[100%]"
              value={newExperience.website}
              onChange={handleChange}
              placeholder="Enter the Website"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-between flex-wrap">
        <div className="md:w-[20%] w-[100%]">
          <label>Location <span className="text-[#D3555A]">*</span></label>
          <div className="rounded-sm" style={{ outline: "1px solid gray" }}>
            <input
              type="text"
              name="location"
              className="px-2 py-1 outline-none w-[100%]"
              value={newExperience.location}
              onChange={handleChange}
              placeholder="Enter the location"
            />
          </div>
        </div>

        <div className="md:w-[20%] w-[100%]">
          <label>Employment <span className="text-[#D3555A]">*</span></label>
          <div className="rounded-sm" style={{ outline: "1px solid gray" }}>
            <input
              type="text"
              name="employment"
              className="px-2 py-1 outline-none w-[100%]"
              value={newExperience.employment}
              onChange={handleChange}
              placeholder="Enter employment type"
            />
          </div>
        </div>

        <div className="md:w-[20%] w-[100%]">
          <label>Start date <span className="text-[#D3555A]">*</span></label>
          <div className="rounded-sm" style={{ outline: "1px solid gray" }}>
            <input
              type="date"
              name="startDate"
              className="px-2 py-1 outline-none w-[100%]"
              value={newExperience.startDate}
              onChange={handleChange}
              placeholder="Enter the start date"
            />
          </div>
        </div>

        <div className="md:w-[20%] w-[100%]">
          <label>End date <span className="text-[#D3555A]">*</span></label>
          <div className="rounded-sm" style={{ outline: "1px solid gray" }}>
            <input
              type="date"
              name="endDate"
              className="px-2 py-1 outline-none w-[100%]"
              value={newExperience.endDate}
              onChange={handleChange}
              placeholder="Enter the end date"
            />
          </div>
        </div>
      </div>

      <div className="w-[100%]">
        <label className="font-bold block mt-2">Description</label>
        <textarea
          name="description"
          value={newExperience.description}
          onChange={handleChange}
          placeholder="Share a brief description about this experience"
          className="w-full p-2 rounded border outline-none mt-2"
          style={{ border: "1px solid gray", minHeight: "100px" }}
        />
      </div>

      <input
        type="checkbox"
        className="mr-3"
        checked={newExperience.currentlyWorkHere}
        onChange={handleCheckboxChange}
        id="work"
      />
      <label htmlFor="work">I currently work here</label>

      <div className="flex flex-wrap mt-4">
        <button
          className="bg-[#D3555A] mb-2 rounded-md mr-2 w-[160px] text-[#fff]"
          onClick={handleAddExperience}
        >
          Save experience
        </button>
        <button className="text-[#000] rounded-md w-[160px]" style={{ outline: "1px solid #000" }}>
          Add More Experience
        </button>
      </div>

      <div className="mt-6">
        {/* Map through the experience list and show each item */}
        {experience.map((exp, index) => (
          <div key={index} className="mb-4 p-4 border border-gray-300 rounded">
            <h3 className="font-bold">{exp.title} - {exp.company}</h3>
            <p><strong>Location:</strong> {exp.location}</p>
            <p><strong>Employment:</strong> {exp.employment}</p>
            <p><strong>Start Date:</strong> {exp.startDate}</p>
            <p><strong>End Date:</strong> {exp.endDate}</p>
            <p><strong>Description:</strong> {exp.description}</p>
            <button
              className="text-red-500 mt-2"
              onClick={() => handleRemoveExperience(index)}
            >
              Remove Experience
            </button>
          </div>
        ))}
      </div>
    </div>

            

            


            


            {/* Submit Button */}
            <div className="text-left mt-3">
                <button
                    type="submit"
                    className="w-[120px] px-3 py-1 mr-3 rounded-lg"
                    style={{ backgroundColor: "#D3555A", color: "#fff" }}
                >
                    Save
                </button>
            </div>
        </form>
    );
};

export default EditProfile;
