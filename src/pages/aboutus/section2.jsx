import React from "react";

const VisionSection = ({data,data2}) => {
  return (
    <section className="px-6 md:px-12 lg:px-20 py-12 space-y-12">
      {/* Quote Section */}
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="text-center md:text-left md:w-2/3">
          <p className="text-2xl md:text-3xl font-semibold italic text-gray-800">
            “Our purpose finds meaning only when we empower careers and
            strengthen industries with trust and excellence.”
          </p>
          <p className="mt-4 text-lg font-medium text-gray-600">Director name, Director</p>
        </div>
        <div className="w-full md:w-1/3">
          <div className="w-full h-48 bg-gray-200 rounded-lg">
            <img
              className="w-full h-full object-cover rounded-lg"
              src="/assets/vision -1.png" // Replace with the actual image path
              alt="Director"
            />
          </div>
        </div>
      </div>

      {/* Vision Section */}
      <div className="flex flex-col lg:flex-row items-center gap-8">
        <div className="grid grid-cols-2 gap-4 lg:w-1/2">
          <div className="w-full h-48 bg-gray-200 rounded-lg">
            <img
              className="w-full h-full object-cover rounded-lg"
              src="/assets/vision -1.png" // Replace with the actual image path
              alt="Vision 1"
            />
          </div>
          <div className="w-full h-48 bg-gray-200 rounded-lg">
            <img
              className="w-full h-full object-cover rounded-lg"
              src="/assets/vision -2.png" // Replace with the actual image path
              alt="Vision 2"
            />
          </div>
          <div className="w-full h-48 bg-gray-200 rounded-lg">
            <img
              className="w-full h-full object-cover rounded-lg"
              src="/assets/vision -3.png" // Replace with the actual image path
              alt="Vision 3"
            />
          </div>
          <div className="w-full h-48 bg-gray-200 rounded-lg">
            <img
              className="w-full h-full object-cover rounded-lg"
              src="/assets/vision -4.png" // Replace with the actual image path
              alt="Vision 4"
            />
          </div>
        </div>
        <div className="lg:w-1/2">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">{data?.title}</h2>
          {data?.status==='active' && <div dangerouslySetInnerHTML={{ __html: data?.content }} />}
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="flex flex-col lg:flex-row items-center gap-8">
        <div className="lg:w-1/2">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">{data2?.title}</h2>
          {data2?.status==='active' && <div dangerouslySetInnerHTML={{ __html: data2?.content }} />}
        </div>
        <div className="grid grid-cols-2 gap-4 lg:w-1/2">
          <div className="w-full h-48 bg-gray-200 rounded-lg">
            <img
              className="w-full h-full object-cover rounded-lg"
              src="/assets/vision -1.png" // Replace with the actual image path
              alt="Choose Us 1"
            />
          </div>
          <div className="w-full h-48 bg-gray-200 rounded-lg">
            <img
              className="w-full h-full object-cover rounded-lg"
              src="/assets/vision -2.png" // Replace with the actual image path
              alt="Choose Us 2"
            />
          </div>
          <div className="w-full h-48 bg-gray-200 rounded-lg">
            <img
              className="w-full h-full object-cover rounded-lg"
              src="/assets/vision -3.png" // Replace with the actual image path
              alt="Choose Us 3"
            />
          </div>
          <div className="w-full h-48 bg-gray-200 rounded-lg">
            <img
              className="w-full h-full object-cover rounded-lg"
              src="/assets/vision -4.png" // Replace with the actual image path
              alt="Choose Us 4"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionSection;
