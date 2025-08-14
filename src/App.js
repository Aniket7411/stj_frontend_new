import "./App.css";
import {
  BrowserRouter,
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "../src/Redux/store";
import ProtectedRoute from "../src/Redux/ProtectedRoute";
import Layout from "./components/layout/layout";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Confirm from "./pages/confirmed";
import Findcandidate from "./pages/findcandidate";
import CourseListing from "./pages/courselisting";
import FaqSection from "./pages/faqs";
import Favourite from "./pages/favourite";
import Notification from "./pages/notification";
import Profile from "./pages/profile";
import Newjob from "./pages/Newjob";
import Homepage from "./pages/Homepage";
import FindJobs from "./pages/FindJobs";
import SingleScreen from "./pages/SingleScreen/SingleScreen";
import Requests from "./pages/requested";
import TermsPage from "./pages/termsofservice";
import ScrollToTop from "./pages/scrolltop";
import AddJobDetails4 from "./pages/Jobtimings";
import Cards from "./pages/cards";
import Card2 from "./pages/card2";
import TrialCards from "./pages/trialcards";
import CourseForm from "./pages/courseform";
import Courses from "./pages/courses";
import VerifyEmail from "./pages/Signup/verifyEmail";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddJobDetails34 from "./pages/jobdetails3";
import { CourseProvider } from "./pages/useContext2";
import Publish from "./pages/publish";
import Userprofile from "./pages/userdetails";
import OfferedProposal from "./pages/offeredproposal";
import JobProvider from "./pages/jobcontext";
import CourseDescription from "./pages/coursedescription";
// import CandidateInfo from "./pages/candidateinfo/candidateinfo";employerprofile
// import Admindashbord from "./pages/admindashbored";
import CreatedJobs from "./pages/createdjobs";
import EmployerProfile from "./pages/employerprofile";
import EmployerInfo from "./pages/employerinfo";
import Jobapplying from "./pages/jobapply";
import NotFound from "./pages/NotFound";
import LoginOrSignup from "./pages/LoginOrSignup";
//

import { useEffect } from "react";
import Employerscourses from "./pages/admin/postedemployercourses";
import EmployersJobs from "./pages/admin/postedemployersjob";
// import PostedJobdescription from "./pages/admin/postedjobdescription";
import ContactUs from "./pages/contactUs";
import AboutUs from "./pages/aboutus";
import AddJobDetailsStep from "./pages/Companydetails/index";
import EnterCompanyDetails from "./pages/AddJobdetails/index";
import EnterJobDetails from "./pages/AddJobdetails/index";
import AddJobDetailsStep2 from "./pages/AddJobdetails/index";

import MyCourse from "./pages/courses/mycourses";
import SavedJobs from "./pages/FindJobs/savedjobs";
import JobDescriptionDetails from "./pages/candidatejd";
import PaymentForm from "./components/payment/payment";
import AdminPanelnNavbar from "./pages/admin/adminpanel";
import Admindashboard from "./pages/admindashbored";
import AdminManagement from "./pages/adminmangement";
import Employermanagement from "./pages/admin/employermanagement";
import SubscriptionConfiguration from "./pages/admin/subscription_configuration";
import CMS from "./pages/cms";
import JobCategory from "./pages/admin/jobcategory";
import AddNewCourse from "./pages/newcourse";
import CourseCategory from "./pages/admin/coursecategory";
import ResetPassword from "./pages/resetpassword";
import CmsPage from "./pages/cmsDetailed";
import UserprofileDetails from "./pages/userprofiledetails";
import CertificateEditor from "./pages/testing/testing";
import CompletedJobs from "./pages/completedjob";
import { ProfileProvider } from "./profilecontext";
import InvitedJobs from "./pages/invitedjob";
import BuyCoursePage from "./pages/coursebuyingpage";
import NotificationProvider from "./pages/notificationprovider";
import MapSearch from "./components/mapsearch";
import MySubscribers from "./pages/MySubscribers/MySubscribers";
import CourseTable from "./pages/admin/courses";
import Approved from "./pages/approvedJobs";
import SupportAndFeedback from "./pages/admin/supportandfeedback";
import SavedCourses from "./pages/savedcourses";

function App() {
  const commonRouter = [
    {
      path: "/",
      element: (
        <Layout>
          <Homepage />
        </Layout>
      ),
    },
       {
      path: "/jobdescription/:id",
      element: (
        <Layout>
          <JobDescriptionDetails />
        </Layout>
      ),
    },
    {
      path: "/completed_jobs",
      element: (
        <Layout>
          <CompletedJobs />
        </Layout>
      ),
    },


    {
      path: "/testing",
      element: (

        <CertificateEditor />

      ),
    },
    {
      path: "/verifyEmail",
      element: (
        <Layout>
          <VerifyEmail />
        </Layout>
      ),
    },
    {
      path: "/login",
      element: (
        <Layout>
          <Login />
        </Layout>
      ),
    },
    {
      path: "/courses",
      element: (
        <Layout>
          <Courses />
        </Layout>
      ),
    },
    //  {
    //   path: "/my-courses",
    //   element: (
    //     <Layout>
    //       <MyCourses />
    //     </Layout>
    //   ),
    // },
    {
      path: "/coursedescription/:id",
      element: (
        <Layout>
          <CourseDescription />
        </Layout>
      ),
    },

    {
      path: "/signup",
      element: (
        <Layout>
          <Signup />
        </Layout>
      ),
    },
    {
      path: "/resetPassword/:id",
      element: (
        <Layout>
          <ResetPassword />
        </Layout>
      ),
    },
    {
      path: "/faqs",
      element: (
        <Layout>
          <FaqSection />
        </Layout>
      ),
    },
    {
      path: "/termsofservice",
      element: (
        <Layout>
          <TermsPage />
        </Layout>
      ),
    },
    {
      path: "/contact-us",
      element: (
        <Layout>
          <ContactUs />
        </Layout>
      ),
    },
    {
      path: "/about-us",
      element: (
        <Layout>
          <AboutUs />
        </Layout>
      ),
    },
    {
      path: "/findjobs",
      element: (
        <Layout>
          <FindJobs />
        </Layout>
      ),
    },
    {
      path: "/mapsearch",
      element: (
        
          <MapSearch/>
        
      ),
    },

    {
      path: "/payment",
      element: (
        <Layout>
          <PaymentForm />
        </Layout>
      ),
    },
    // {
    //   path: "/Login-first",
    //   element: (
    //     <Layout>
    //       <LoginOrSignup />
    //     </Layout>
    //   ),
    // },


  ];
  const AdminRouter = [
    {
      path: "postedcourses/:id",
      element: (
        <Layout>
          <Employerscourses />
        </Layout>
      ),
    },

    {
      path: "/admin-dashboard",
      element: (
        <Layout>
          <Admindashboard />
        </Layout>
      ),
    },
    {
      path: "/admin-management",
      element: (
        <Layout>
          <AdminManagement />
        </Layout>
      ),
    },
    {
      path: "/job-categories",
      element: (
        <Layout>
          <JobCategory />
        </Layout>
      ),
    },
     {
      path: "/support-feedback",
      element: (
        <Layout>
          <SupportAndFeedback />
        </Layout>
      ),
    },
    {
      path: "/course-categories",
      element: (
        <Layout>
          <CourseCategory />
        </Layout>
      ),
    },
     {
      path: "/course-categories",
      element: (
        <Layout>
          <CourseCategory />
        </Layout>
      ),
    },
     {
      path: "/courses-admin/:id",
      element: (
        <Layout>
          <CourseTable />
        </Layout>
      ),
    },
    {
      path: "/employer-management",
      element: (
        <Layout>
          <Employermanagement />
        </Layout>
      ),
    },
      {
      path: "/jobdescription/:id",
      element: (
        <Layout>
          <JobDescriptionDetails />
        </Layout>
      ),
    },
    {
      path: "/cms-management",
      element: (
        <Layout>
          <CMS />
        </Layout>
      ),
    },
    {
      path: "/cms-page",
      element: (
        <Layout>
          <CmsPage />
        </Layout>
      ),
    },
    {
      path: "/subscription-configuration",
      element: (
        <Layout>
          <SubscriptionConfiguration />
        </Layout>
      ),
    },



    {
      path: "postedjobs/:id",
      element: (
        <Layout>
          <EmployersJobs />
        </Layout>
      ),
    },
    {
      path: "/jobdescription/:id",
      element: (
        <Layout>
          <JobDescriptionDetails />
        </Layout>
      ),
    },


    // {
    //   path: "postedjobdescription",
    //   element: (
    //     <Layout>
    //       <PostedJobdescription />
    //     </Layout>
    //   ),
    // },
  ];

  const employerRouter = [
    // {
    //   path: "/profile",
    //   element: (
    //     <Layout>
    //       <Profile />
    //     </Layout>
    //   ),
    // },
    // <Route
    //             path="/jobrequirements "
    //             element={
    //               <Layout>
    //                 <AddJobDetails34 />
    //               </Layout>
    //             }
    //           />

    {
      path: "/employerprofile",
      element: (
        <Layout>
          <EmployerProfile />
        </Layout>
      ),
    },
    {
      path: "/employerinfo",
      element: (
        <Layout>
          <EmployerInfo />
        </Layout>
      ),
    },
    {
      path: "/jobrequirements",
      element: (
        <Layout>
          <AddJobDetails34 />
        </Layout>
      ),
    },
    {
      path: "/publishjob",
      element: (
        <Layout>
          <Publish />
        </Layout>
      ),
    },
    {
      path: "/jobtimings",
      element: (
        <Layout>
          <AddJobDetails4 />
        </Layout>
      ),
    },
    {
      path: "/findcandidate",
      element: (
        <Layout>
          <Findcandidate />
        </Layout>
      ),
    },

    {
      path: "/userprofile/:userId/:category",
      element: (
        <Layout>
          <UserprofileDetails />
        </Layout>
      ),
    },
    {
      path: "/addnewcourseForm",
      element: (
        <Layout>
          <CourseForm />
        </Layout>
      ),
    },
    {
      path: "/add_new_course",
      element: (
        <Layout>
          <AddNewCourse />
        </Layout>
      ),
    },
    {
      path: "/notifications",
      element: (
        <Layout>
          <CourseForm />
        </Layout>
      ),
    },
    {
      path: "/confirm",
      element: (
        <Layout>
          <Confirm />
        </Layout>
      ),
    },
    {
      path: "/requests",
      element: (
        <Layout>
          <Requests />
        </Layout>
      ),
    },
    {
      path: "/createdjob/:id",
      element: (
        <Layout>
          <CreatedJobs />
        </Layout>
      ),
    },
    {
      path: "/entercompanydetails",
      element: (
        <Layout>
          <AddJobDetailsStep />
        </Layout>
      ),
    },
    {
      path: "/enterjobdetails",
      element: (
        <Layout>
          <AddJobDetailsStep2 />
        </Layout>
      ),
    },

    {
      path: "/findjobs",
      element: (
        <Layout>
          <FindJobs />
        </Layout>
      ),
    },
    // {
    //   path: "/coursedescription",
    //   element: (
    //     <Layout>
    //       <CourseDescription />
    //     </Layout>
    //   ),
    // },

    {
      path: "/jobdescription/:id",
      element: (
        <Layout>
          <JobDescriptionDetails />
        </Layout>
      ),
    },

    {
      path: "/favorite",
      element: (
        <Layout>
          <Favourite />
        </Layout>
      ),
    },

     {
      path: "/my-courses",
      element: (
        <Layout>
          <MyCourse />
        </Layout>
      ),
    },

    {
      path: "/my-subscribers/:id",
      element: (
        <Layout>
          <MySubscribers />
        </Layout>
      ),
    },
    
  ];

  const employeeRouter = [
    // {
    //   path: "/jobrequirements ",
    //   element: (
    //     <Layout>
    //       <AddJobDetails34 />
    //     </Layout>
    //   ),
    // },
    // {
    //   path: "/mycourses",
    //   element: (
    //     <Layout>
    //       <MyCourse />
    //     </Layout>
    //   ),
    // },
    {
      path: "/buying_course",
      element: (
        <Layout>
          <BuyCoursePage />
        </Layout>
      ),
    },
    {
      path: "/saved_courses",
      element: (
        <Layout>
          <SavedCourses />
        </Layout>
      ),
    },
    {
      path: "/userprofile",
      element: (
        <Layout>
          <Userprofile />
        </Layout>
      ),
    },
    {
      path: "/invited_jobs",
      element: (
        <Layout>
          <InvitedJobs />
        </Layout>
      ),
    },

     {
      path: "/approvedjobs/:id",
      element: (
        <Layout>
          <Approved />
        </Layout>
      ),
    },
    ////
    {
      path: "/applyingjob/:id",
      element: (
        <Layout>
          <Jobapplying />
        </Layout>
      ),
    },
    //   {
    //   path:"/coursedescription",
    //   element:
    //   (
    //     <Layout>
    //       <CourseDescription />
    //     </Layout>
    //   )
    // },
    // {
    //   path: "/courses",
    //   element: (
    //     <Layout>
    //       <Courses />
    //     </Layout>
    //   ),
    // },
    {
      path: "/jobdescription/:id",
      element: (
        <Layout>
          <JobDescriptionDetails />
          {/* <NewJobDescriptionPage /> */}
        </Layout>
      ),
    },

    {
      path: "/findjobs",
      element: (
        <Layout>
          <FindJobs />
        </Layout>
      ),
    },
    {
      path: "/savedjobs",
      element: (
        <Layout>
          <SavedJobs />
        </Layout>
      ),
    },
  ];

  const adminRole = "admin";
  const employerRole = "employer";
  const employeeRole = "employee";

  // const roleRoutes = {
  //   Admin: AdminRouter,
  //   Employer: employerRouter,
  //   Employee: employeeRouter,
  // };
  //pushing again

  const router = createBrowserRouter([
    ...(adminRole === JSON.parse(localStorage.getItem("USER_INFO"))?.role
      ? AdminRouter
      : []),
    ...(employerRole === JSON.parse(localStorage.getItem("USER_INFO"))?.role
      ? employerRouter
      : []),
    ...(employeeRole === JSON.parse(localStorage.getItem("USER_INFO"))?.role
      ? employeeRouter
      : []),
    ...commonRouter,
    { path: "*", element: <NotFound /> }, // Catch-all route for undefined paths
  ]);

  return (
    <>
      {/* <BrowserRouter>
        <JobProvider>
          <CourseProvider>
            <Routes>
              
              <Route
                path="/"
                element={
                  <Layout>
                    <Homepage />
                  </Layout>
                }
              />
              <Route
                path="/aniket"
                element={
                  <Layout>
                    <AddJobDetails34 />
                  </Layout>
                }
              />
              <Route
                path="/singlescreen"
                element={
                  <Layout>
                    <SingleScreen />
                  </Layout>
                }
              />
              <Route
                path="/signup"
                element={
                  <Layout>
                    <Signup />
                  </Layout>
                }
              />
              <Route
                path="/verifyEmail"
                element={
                  <Layout>
                    <VerifyEmail />
                  </Layout>
                }
              />
              <Route
                path="/login"
                element={
                  <Layout>
                    <Login />
                  </Layout>
                }
              />
              <Route
                path="/faqs"
                element={
                  <Layout>
                    <FaqSection />
                  </Layout>
                }
              />
              <Route
                path="/findcandidate"
                element={
                  <Layout>
                    <Findcandidate />
                  </Layout>
                }
              />
              <Route
                path="/coursecategory"
                element={
                  <Layout>
                    <CourseCategory />
                  </Layout>
                }
              />
              <Route
                path="/notification"
                element={
                  <Layout>
                    <Notification />
                  </Layout>
                }
              />
              <Route
                path="/profile"
                element={
                  <Layout>
                    <Profile />
                  </Layout>
                }
              />
              <Route
                path="/findjobs"
                element={
                  <Layout>
                    <FindJobs />
                  </Layout>
                }
              />
              <Route
                path="/termsofservice"
                element={
                  <Layout>
                    <TermsPage />
                  </Layout>
                }
              />

              <Route
                path="/ani"
                element={
                  <Layout>
                    <Card2 />
                  </Layout>
                }
              />

              <Route
                path="/admindasbored"
                element={
                  <Layout>
                    <AdmindashboardNavBar />
                  </Layout>
                }
              />

              <Route
                path="/createdjob"
                element={
                  <Layout>
                    <CreatedJobs />
                  </Layout>
                }
              />

              <Route
                path="/requests"
                element={
                  <Layout>
                    <Requests />
                  </Layout>
                }
              />
              <Route
                path="/confirm"
                element={
                  <Layout>
                    <Confirm />
                  </Layout>
                }
              />
              <Route
                path="/favorite"
                element={
                  <Layout>
                    <Favourite />
                  </Layout>
                }
              />
              <Route
                path="/companydetails"
                element={
                  <Layout>
                    <Newjob />
                  </Layout>
                }
              />
              // hi
              <Route
                path="/course-listing"
                element={
                  <Layout>
                    <CourseListing />
                  </Layout>
                }
              />
              
              <Route
                path="/entercompanydetails"
                element={
                  <Layout>
                    <AddJobDetailsStep />
                  </Layout>
                }
              />
              <Route
                path="/enterjobdetails"
                element={
                  <Layout>
                    <AddJobDetailsStep2 />
                  </Layout>
                }
              />
              <Route
                path="/jobrequirements "
                element={
                  <Layout>
                    <AddJobDetails34 />
                  </Layout>
                }
              />

              <Route
                path="/offeredproposal"
                element={
                  <Layout>
                    <OfferedProposal />
                  </Layout>
                }
              />

              <Route
                path="/employerjobdescription/:id"
                element={
                  <Layout>
                    <JobDescription/>
                  </Layout>
                }
              />

              <Route
                path="/Candidatejobdescription/:id"
                element={
                  <Layout>
                    <CandidateJobDescription />
                  </Layout>
                }
              />

              <Route
                path="/applyingjob/:id"
                element={
                  <Layout>
                    <Jobapplying />
                  </Layout>
                }
              />
              <Route
                path="/jobtimings"
                element={
                  <Layout>
                    <AddJobDetails4 />
                  </Layout>
                }
              />
              <Route
                path="/publishjob"
                element={
                  <Layout>
                    <Publish />
                  </Layout>
                }
              />

              <Route
                path="/cards"
                element={
                  <Layout>
                    <Cards />
                  </Layout>
                }
              />
              <Route path="/trials" element={<TrialCards />} />
              <Route
                path="/employerprofile"
                element={
                  <Layout>
                    {" "}
                    <EmployerProfile />
                  </Layout>
                }
              />
              <Route
                path="/employerinfo"
                element={
                  <Layout>
                    {" "}
                    <EmployerInfo />
                  </Layout>
                }
              />
              <Route
                path="/addnewcourseForm"
                element={
                  <Layout>
                    <CourseForm />
                  </Layout>
                }
              />
              <Route
                path="/courses"
                element={
                  <Layout>
                    <Courses />
                  </Layout>
                }
              />

              <Route
                path="/coursedescription"
                element={
                  <Layout>
                    <CourseDescription />
                  </Layout>
                }
              />

              <Route
                path="/userprofile"
                element={
                  <Layout>
                    <Userprofile />
                  </Layout>
                }
              />
            </Routes>
          </CourseProvider>
        </JobProvider>
      </BrowserRouter>
      <ToastContainer /> */}
      <ProfileProvider>
        <NotificationProvider>
          <CourseProvider>
            <JobProvider>
              <RouterProvider router={router} />
            </JobProvider>
          </CourseProvider>
        </NotificationProvider>
      </ProfileProvider>
      <ToastContainer />
    </>
  );
}

export default App;
