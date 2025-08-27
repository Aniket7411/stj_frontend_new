import React from "react";

const JoinUsSection = ({data}) => {
  return (
    <section className="relative h-auto p-10 bg-black text-white">
      {/* Background Image */}
      <div className="absolute inset-0">
        <div style={{backgroundImage:'url(/assets/aboutUs(2).png)'}} ></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center items-start h-full px-6 md:px-12 lg:px-20">
        <h1 className="text-4xl md:text-6xl font-bold">{data?.title}</h1>
        {data?.status==='active' && <div dangerouslySetInnerHTML={{ __html: data?.content }} />}
      </div>
    </section>
  );
};

export default JoinUsSection;
