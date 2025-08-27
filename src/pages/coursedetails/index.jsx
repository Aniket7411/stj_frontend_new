const CourseDetails = () => {
  return (
    <form className="courseForm">
      {/* Course Title */}
      <div className="flex justify-between mt-3 flex-wrap items-center">
        <p className="text-sm font-bold mb-3">
          Course Title<span className="text-[red] ml-1 font-bold">*</span>
        </p>
        <input
          type="text"
          placeholder="Enter Course Title"
          required
          className="rounded-lg text-sm p-2 lg:w-[40%] w-[100%] shadow-lg"
          style={{ outline: "1px solid gray" }}
        />
      </div>
      <hr className="border-gray-300 mt-4 mb-4" />

       <div className="flex justify-between mt-3 flex-wrap items-center">
        <p className="text-sm font-bold mb-3">
          Course Instructor<span className="text-[red] ml-1 font-bold">*</span>
        </p>
        <input
          type="text"
          placeholder="Enter Course Instructor"
          required
          className="rounded-lg text-sm p-2 lg:w-[40%] w-[100%] shadow-lg"
          style={{ outline: "1px solid gray" }}
        />
      </div>
      <hr className="border-gray-300 mt-4 mb-4" />

      {/* Course Body */}
      <div className="flex justify-between mt-3 flex-wrap items-center">
        <p className="text-sm font-bold mb-3">
          Recognised Course Body
          <span className="text-[red] ml-1 font-bold">*</span>
        </p>
        <textarea
          className="lg:w-[40%] w-[100%] border border-gray-300 rounded-md p-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          rows="3"
          placeholder="Enter your course body"
          required
        />
      </div>
      <hr className="border-gray-300 mt-4 mb-4" />

      {/* Start Date */}
      <div className="flex justify-between mt-3 flex-wrap items-center">
        <p className="text-sm font-bold mb-3">
          Course Start Date
          <span className="text-[red] ml-1 font-bold">*</span>
        </p>
        <div className="lg:w-[40%] w-[100%]">
          <div>
            <label className="font-bold">Start Date</label>
            <div className="flex space-x-2 items-center">
              <span className="text-gray-600 font-medium">Start date:</span>
              <select className="border border-gray-300 rounded px-2 py-1">
                {/* Replace with your dynamic days */}
                <option>01</option>
                <option>02</option>
                {/* Add more days */}
              </select>
              <select className="border border-gray-300 rounded px-2 py-1">
                <option>Month</option>
                {/* Add more months */}
              </select>
              <select className="border border-gray-300 rounded px-2 py-1">
                {/* Replace with your dynamic years */}
                <option>2025</option>
                <option>2026</option>
                {/* Add more years */}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* End Date */}
      <div className="flex justify-between mt-3 flex-wrap items-center">
        <p className="text-sm font-bold mb-3">
          Course End Date<span className="text-[red] ml-1 font-bold">*</span>
        </p>
        <div className="lg:w-[40%] w-[100%]">
          <div>
            <label className="font-bold">End Date</label>
            <div className="flex space-x-2 items-center">
              <span className="text-gray-600 font-medium">End date:</span>
              <select className="border border-gray-300 rounded px-2 py-1">
                {/* Replace with your dynamic days */}
                <option>01</option>
                <option>02</option>
                {/* Add more days */}
              </select>
              <select className="border border-gray-300 rounded px-2 py-1">
                {/* Replace with your dynamic months */}
                <option>Month</option>
                {/* Add more months */}
              </select>
              <select className="border border-gray-300 rounded px-2 py-1">
                {/* Replace with your dynamic years */}
                <option>2025</option>
                <option>2026</option>
                {/* Add more years */}
              </select>
            </div>
          </div>
        </div>
      </div>

      <hr className="border-gray-300 mt-4 mb-4" />

      {/* Start Time */}
      <div className="flex justify-between mt-3 flex-wrap items-center">
        <p className="text-sm font-bold mb-3">
          Course Start Time
          <span className="text-[red] ml-1 font-bold">*</span>
        </p>
        <div className="lg:w-[40%] w-[100%]">
          <div>
            <label className="font-bold">Start Time</label>
            <div className="flex space-x-2 items-center">
              <span className="text-gray-600 font-medium">Start time:</span>
              <select className="border border-gray-300 rounded px-2 py-1">
                {/* Replace with your dynamic hours */}
                <option>01</option>
                <option>02</option>
                {/* Add more hours */}
              </select>
              <select className="border border-gray-300 rounded px-2 py-1">
                {/* Replace with your dynamic minutes */}
                <option>00</option>
                <option>30</option>
                {/* Add more minutes */}
              </select>
              <select className="border border-gray-300 rounded px-2 py-1">
                <option>AM</option>
                <option>PM</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* End Time */}
      <div className="flex justify-between mt-3 flex-wrap items-center">
        <p className="text-sm font-bold mb-3">
          Course End Time<span className="text-[red] ml-1 font-bold">*</span>
        </p>
        <div className="lg:w-[40%] w-[100%]">
          <div>
            <label className="font-bold">End Time</label>
            <div className="flex space-x-2 items-center">
              <span className="text-gray-600 font-medium">End time:</span>
              <select className="border border-gray-300 rounded px-2 py-1">
                {/* Replace with your dynamic hours */}
                <option>01</option>
                <option>02</option>
                {/* Add more hours */}
              </select>
              <select className="border border-gray-300 rounded px-2 py-1">
                {/* Replace with your dynamic minutes */}
                <option>00</option>
                <option>30</option>
                {/* Add more minutes */}
              </select>
              <select className="border border-gray-300 rounded px-2 py-1">
                <option>AM</option>
                <option>PM</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <hr className="border-gray-300 mt-4 mb-4" />

      {/* Category */}
      <div className="flex justify-between mt-3 flex-wrap items-center">
        <p className="text-sm font-bold mb-3">
          Category<span className="text-[red] ml-1 font-bold">*</span>
        </p>
        <select className="rounded-lg text-sm p-2 lg:w-[40%] w-[100%] shadow-lg" style={{ outline: "1px solid gray" }}>
          <option value="" disabled>
            Select Course Category
          </option>
          <option value="webDevelopment">Web Development</option>
          <option value="dataScience">Data Science</option>
          <option value="graphicDesign">Graphic Design</option>
          <option value="digitalMarketing">Digital Marketing</option>
        </select>
      </div>
      <hr className="border-gray-300 mt-4 mb-4" />

      {/* Amount */}
      <div className="flex justify-between mt-3 flex-wrap items-center">
        <p className="text-sm font-bold mb-3">
          Amount<span className="text-[red] ml-1 font-bold">*</span>
        </p>
        <input
          type="number"
          required
          placeholder="Enter Course Amount"
          className="rounded-lg text-sm p-2 lg:w-[40%] w-[100%] shadow-lg"
          style={{ outline: "1px solid gray" }}
        />
      </div>
      <hr className="border-gray-300 mt-4 mb-4" />

      {/* Enrollment Limit */}
      <div className="flex justify-between mt-3 flex-wrap items-center">
        <p className="text-sm font-bold mb-3">
          Enrollment Limit<span className="text-[red] ml-1 font-bold">*</span>
        </p>
        <input
          type="number"
          placeholder="Enter Enrollment Limit"
          className="rounded-lg text-sm p-2 lg:w-[40%] w-[100%] shadow-lg"
          style={{ outline: "1px solid gray" }}
          required
        />
      </div>
      <hr className="border-gray-300 mt-4 mb-4" />

      {/* Duration */}
      <div className="flex justify-between mt-3 flex-wrap items-center">
        <p className="text-sm font-bold mb-3">
          Duration (In days)
          <span className="text-[red] ml-1 font-bold">*</span>
        </p>
        <input
          type="number"
          required
          placeholder="Enter Course Duration"
          className="rounded-lg text-sm p-2 lg:w-[40%] w-[100%] shadow-lg"
          style={{ outline: "1px solid gray" }}
        />
      </div>
      <hr className="border-gray-300 mt-4 mb-4" />

      {/* Address */}
      <div className="flex justify-between flex-wrap gap-4">
        <p className="text-sm font-bold flex items-center">
          Address <span className="text-red-500 ml-1">*</span>
        </p>
        <div className="w-full lg:w-[35%]">
          <textarea
            className="w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            rows="3"
            placeholder="Enter your address"
            required
          ></textarea>
          <div className="flex-col justify-between lg:flex-row">
            <div>
              <p className="text-sm font-bold flex items-center">
                Postcode <span className="text-red-500 ml-1">*</span>
              </p>
              <input
                type="text"
                className="rounded-lg mt-1 px-2 py-1"
                style={{
                  outline: "1px solid gray",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-center mt-4">
        <button className="mr-2 text-[#D3555A] rounded-lg shadow-md" style={{ outline: "1px solid #D3555A" }}>
          Cancel
        </button>

        <button type="submit" className="bg-[#D3555A] w-[120px] text-white rounded-lg shadow-md ">
          Save & Continue
        </button>
      </div>
    </form>
  );
};

export default CourseDetails;
