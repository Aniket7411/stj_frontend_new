import React, { useState } from 'react';

function TermsPage() {
  const [selectedSection, setSelectedSection] = useState("terms");

  const navItems = [
    { id: "terms", label: "Terms of Service" },
    { id: "privacy", label: "Privacy Policy" },
  ];

  const content = {
    terms: {
      title: "Terms of Service",
      sections: [
        {
          title: "1. Information about us",
          content: "We operate the website www.securethatjob.com (site). We are Elite Guarding (UK) Ltd, a company registered in England and Wales under company number 08945787 with our registered office at 483 Green Lanes, Palmers Green, London, N13 4BS.",
        },
        {
          title: "2. Applying for Membership and Membership Renewals",
          content: "You need to register with us as a member (Member) in order to participate in the Services. A Member can be a Security Guard Service provider and/or equipment installator (a person or organisation offering security based services such as Close Protection, Door Supervision, CCTV operator or installer etc or a Company or Individual seeking security assistance from a Security Provider). Security Personnel can advertise their services via our platform and Employers/Clients can search our platform to find a local Security Provider.",
        },
        {
          title: "3. Our Status",
          content: "We act as an online advertising and networking platform for Client and Security Service Providers. When you enter into a contract for the supply of services and/or any goods with a Client or a Security Service Provider advertised on our site, the contract will be between the Client and the Security Service Provider.",
        },
        {
          title: "4. Consumer Rights",
          content: "If you are a Client and you are a “consumer” (as that term is defined in the Consumer Contracts (Information, Cancellation and Additional Charges) Regulations 2013 (“the Regulations”), you normally have a legal right (pursuant to regulations 29 and 30 of the Regulations) to cancel a contract (without giving any reason) for the purchase of goods and/or services by no later than the end of 14 calendar days from the day of the conclusion of the contract. However, by clicking the “Subscibe” or “Pay Now” button in the Premium membership sign-up process, you give us your express consent that we may begin the supply of the Services (which, for the avoidance of any doubt, are to be treated as “digital content” as defined in the Regulations) before the end of that 14 calendar day cancellation period (i.e. from when we have sent the Membership Confirmation email to you) and you acknowledge that you have lost your legal right to cancel the contract between you and International New Media Limited pursuant to regulations 29 and 30 of the Regulations.",
        },
        {
          title: "5. Accessing our Site",
          content: "Access to our site is permitted on a temporary basis and we reserve the right to withdraw or amend the service we provide on our site without notice (see below). We will not be liable if for any reason our site is unavailable at any time or for any period.",
        },
        {
          title: "6. Data Protection and Privacy Policy",
          content: "You warrant that you shall comply with the requirements of the Data Protection Act 1998 and any other relevant legal requirements in respect of data protection.",
        },
        {
          title: "7. Intellectual Property Rights",
          content: "We are the owner or the licensee of all intellectual property rights in our site, and in the material published on it. Those works are protected by copyright laws and treaties around the world. All such rights are reserved.",
        },
        {
          title: "8. Reliance on Information Posted",
          content: "Commentary and other materials posted on our site are for guidance purposes only. We therefore disclaim all liability and responsibility arising from any reliance placed on such materials by any visitor to our site, or by anyone who may be informed of any of its contents. You must make all appropriate investigations before entering into an engagement with a Client or Security Service Provider.",
        },
        {
          title: "9. Our Liability",
          content: "(a) all conditions, warranties and other terms which might otherwise be implied by statute, common law or the law of equity.(b) any liability for any direct, indirect or consequential loss or damage incurred by any user in connection with the Services, our site or in connection with the use, inability to use, or results of the use of our site, any websites linked to it and any materials posted on it, including, without limitation any liability for loss of income or revenue; loss of business; loss of profits or contracts; loss of anticipated savings; loss of data; loss of goodwill; wasted management or office time; and for any other loss or damage of any kind, however arising and whether caused by tort (including negligence), breach of contract or otherwise, even if foreseeable.",
        },
        {
          title: "10. Uploading Material to Our Site",
          content: "Whenever you make use of a feature that allows you to upload material to our site, or to make contact with other users of our site, you must comply with the acceptable use policy set out in clauses 10 to 12 inclusive. You warrant that any such contributions (Contributions) do comply with that policy, and you indemnify us for any breach of that warranty.",
        },
      ],
    },
    privacy: {
      title: "Privacy Policy",
      sections: [
        {
          title: "1. Our Privacy Commitment",
          content: "We are committed to protecting your personal data and privacy. This policy explains how we collect, use, store, and protect your information when you visit our website or use our services.",
        },
        {
          title: "2. Data Collection",
          content: "We collect personal data when you create an account, use our services, or interact with our website. This may include your name, contact information, and payment details.",
        },
        {
          title: "3. Your Rights",
          content: "You have the right to access, correct, or delete your personal data. You can also withdraw consent for data processing at any time by contacting us directly.",
        },
      ],
    },
  };

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Background Image with Opacity */}
      <div
        style={{
          backgroundImage: "url('/assets/imagebg.png')",
        }}
      ></div>

      {/* Content Card with Flexbox and Shadow */}
      <div className="flex flex-col md:flex-row  bg-[#fff] rounded-lg p-5 overflow-hidden mx-2 md:mx-2 mt-[50px] md:mt-12 shadow-lg">
        {/* Left Section: Scrollable List */}
        <div className="px-5 flex flex-col w-full md:w-1/3">
          <div className="border rounded-lg border-[#D9D9D9] p-4 max-h-[500px] overflow-y-auto">
            <ul className=" font-poppins font-medium text-lg md:text-lg text-[#787878]">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    className={`w-full rounded-lg ${
                      selectedSection === item.id ? "bg-[#D3555A] py-1 text-white" : "py-1 text-[#787878]"
                    }`}
                    onClick={() => setSelectedSection(item.id)}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Section: Content */}
        <div className="ml-0 md:ml-5 w-full md:w-2/3 p-4 h-screen overflow-auto" style={{
          outline:"1px solid gray"
        }} >
          <p className="font-inter mb-2 font-medium text-lg md:text-xl  text-[#D3555A]">
            Terms of service
            <span className="ml-1">/</span>
            <span className="ml-1 font-inter font-medium text-lg md:text-xl  text-[#000000]">
              Privacy policy
            </span>
          </p>
          <h1 className=" font-inter font-semibold text-2xl text-center md:text-3xl my-3">
            {content[selectedSection]?.title}
          </h1>

          {content[selectedSection]?.sections.map((section, index) => (
            <div key={index}>
              <h2 className="font-poppins font-semibold text-lg md:text-xl leading-[36px]">
                {section.title}
              </h2>
              <p className="font-poppins font-normal text-sm md:text-md leading-[30px]">
                {section.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TermsPage;
