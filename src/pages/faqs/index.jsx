import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";


const faqs = [
  {
    question: "How do I register?",
    answer:
      "It's quick and easy and takes 2 minutes. Simply click the 'Join' tab and choose a Username and enter your email address and you will automatically be sent an access password to your email. Use this with your Username and you will be able to start using the website. If you do not receive the email in just a few minutes, please check your spam folder as some email addresses may mistake the automated emails as junk.",
  },
  {
    question: "Is my personal information secure?",
    answer: "Yes, your information is secure. We prioritize user privacy.",
  },
  {
    question: "Who can see the information I enter when I register?",
    answer: "Only authorized personnel can access your registration details.",
  },
  {
    question: "Do I have to pay any commissions from my work?",
    answer: "No, there are no commissions charged for your work.",
  },
  {
    question: "How do I get paid?",
    answer: "Payments are processed directly to your account based on your preferences.",
  },
  {
    question: "How do I change my Email and Password?",
    answer: "You can update your email and password from your account settings.",
  },
  {
    question: "How can I update my profile?",
    answer: "You can update your profile details under the 'Profile' section in settings.",
  },
  {
    question: "How can I control which emails I receive alerts for?",
    answer: "If you go to your contact preferences under ‘Edit Your Profile’, you can choose which job and in which area you’d like to receive alerts  for and then click ‘Save changes’",
  },
  {
    question: "The jobs you email me arenâ£™t what Iâ£™m looking for, how can I update them?",
    answer: "If you are on a desktop, you can update your email alerts by clicking on your name in the top right hand corner of any page when you’re signed in and selecting ‘Saved searches & email alerts’. If you are on a tablet or mobile click on the side menu in the top left corner and select ‘Saved searches & email alerts. From the saved searches page, click ‘Edit’ on any saved search you wish to edit.",
  },
  {
    question: "I canâ£™t sign in. Whatâ£™s wrong?",
    answer: "I canâ£™t sign in. Whatâ£™s wrong?To sign in, you need to be registered with securethatjob.com.If you can’t remember your password, select ‘Forgotten your password’. You will be asked to enter the email associated with your account and we will send you an email containing a link to reset your password. In case you clicked ‘Forgotten your password’ and were redirected to our registration form, you do not currently have an account with us.",
  },
  {
    question: "How can I deactivate my securethatjob.com account?",
    answer: "If you no longer want to receive emails from us and want to stop contractors from being able to view your profile on securethatjob.com, you can deactivate your account.  In order to do this, please go to your account settings and select ‘Deactivate my account’. Your profile and personal preferences will be saved. To reactivate your account, use your email address and password to log in.If you would like us to permanently delete your account, please contact securethatjob.com and select ‘Delete account’. Please note: your profile, account details will be permanently deleted, so if you decide to come back to securethatjob.com in the future you’ll need to re-register and create a new profile. If you would prefer to keep your account, but not to receive emails or allow contractors to view your profile temporaly, please deactivate your account or change your contact preferences.",
  },
  {
    question: "How do I Get Started? (Searching for Jobs)",
    answer: "If you know what you’re looking for, our simple keyword search is the best place to start. Simply enter a job title, skill or qualification and a location in the ‘Find a job’ search panel, located at each page on the website and click on the “search jobs” button.If you’re not sure what you’re looking for, you may prefer to explore opportunities. You can view our jobs via location under ‘All Locations’ or by each job professional field under ‘All Job Categories’If you have a securethatjob.com account, you can view jobs recommended to you, within your preferred industry sectors, on your homepage. Simply sign in to securethatjob.com and visit the homepage.",
  },
  {
    question: "What happens after I apply for a job on securethatjob.com",
    answer: "Once you’ve applied for a role, you’ll be directed to a page confirming that your application has been sent to the service contractor. You’ll also receive an email from us confirming that your application has been sent. to the employer or recruitment consultant who is handling the vacancy.",
  },
  {
    question: "How can I make my search results more relevant?",
    answer: "Once you’ve run a search on securethatjob.com, you might find there are too many jobs to review every one. In this instance, you can use the advanced search filters on the left hand side of the page to narrow down your results.Changing one of the criteria on the left hand side of the page will automatically update the search. To start again and run a different search, you can use the ‘Find a job’ panel at the top of the page.",
  },
  {
    question: "How can I make the most of keyword searching?",
    answer: "Keyword searching finds words and phrases contained within a job’s title and description. To run a more detailed keyword search, you can use the following rule to build your search this means that all words or phrases must be in the job title or description, e.g. dog handler, cyber secuity",
  },
  
  {
    question: "What are SERVICES and how do I create them",
    answer: "Once you create your MAIN PROFILE then you are able to create a SERVICE. A SERVICE is a profile for the job skills you can perform. You can explain in detail what specialist job role you can provide. You can have as many SERVICES as you need. So for example, if you are a DOOR SUPERVISOR and can also be a CCTV OPERATOR you would have –",
  },
  {
    question: "How do I get my SIA Badge?",
    answer: "https://www.sia.homeoffice.gov.uk",
  },
  {
    question: "What do I do if my licence is lost, stolen or damaged?",
    answer: "You must report it to the SIA https://www.sia.homeoffice.gov.uk. If your licence has been stolen you should report the theft to the police, obtain a crime reference number from them and forward the police report to the SIA with a signed covering letter. If your licence has been lost you should write in explaining the circumstances of the loss – your letter must be signed. If your licence has been damaged you should return the licence to us with a signed covering letter.",
  },
];

const FaqSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const filteredFaqs = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className=" mx-auto  p-10">
      {/* Responsive Header and Search Bar */}
      <div className="flex flex-col mt-5 lg:flex-row lg:justify-between lg:items-center mb-6 space-y-4 lg:space-y-0">
        <h2 className="text-2xl font-bold text-gray-800">
          Frequently Asked Questions
        </h2>
        <div className="relative w-full lg:w-1/2">
          <input
            type="text"
            placeholder="Search here your question..."
            className="w-full p-2 pl-4 pr-12 rounded-full border border-gray-300 shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="absolute right-3 w-[30px] h-[30px] top-1/2 transform -translate-y-1/2 bg-[#C5363C] rounded-full p-2 text-white hover:bg-red-600 focus:outline-none">
          <CiSearch />

          </button>
        </div>

      </div>

      {/* FAQ Items */}
      <div className="space-y-4">
        {filteredFaqs.map((faq, index) => (
          <div
            key={index}
            className={`border p-2 shadow-md rounded-md ${activeIndex === index ? "bg-gray-100 shadow-md" : "bg-white"
              }`}
          >
            <button
              className={`w-full text-left text-md font-medium ${activeIndex === index ? "text-red-600" : "text-gray-800"
                } flex justify-between items-center`}
              onClick={() => toggleFAQ(index)}
            >
              {faq.question}
              <span
                className={`ml-2 transform ${activeIndex === index ? "rotate-180" : "rotate-0"
                  } transition-transform`}
              >
                ▼
              </span>
            </button>
            {activeIndex === index && (
              <p className="mt-2 text-gray-700">{faq.answer}</p>
            )}
          </div>
        ))}
        {filteredFaqs.length === 0 && (
          <p className="text-gray-500">No FAQs match your search query.</p>
        )}
      </div>
    </div>
  );
};

export default FaqSection;
