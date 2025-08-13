import React from "react";

const Section1 = ({data}) => {
  return (
    <section className="flex flex-col lg:flex-row items-center gap-8 px-6 md:px-12 lg:px-20 py-12">


      {/* Right Section: Content */}
      <div className="w-full  flex flex-col gap-6">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">About us</h2>
          {data?.status==='active' && <div dangerouslySetInnerHTML={{ __html: data?.content }} />}
        </div>

  
      </div>
    </section>
  );
};

export default Section1;
