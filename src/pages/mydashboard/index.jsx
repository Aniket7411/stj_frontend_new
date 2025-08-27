import React from "react";

const MyDashboard = () => {
  return (
    <div
      className="p-6 rounded-lg min-h-screen"
      style={{
        outline: "1px solid gray",
      }}
    >
      <h1 className="text-xl font-bold mb-4">My Dashboard</h1>

      {/* Job Stats */}
      <section className="flex flex-wrap gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow  flex-1 min-w-[220px]" 
        style={{
            outline:"1px solid gray"
        }}>
          <p className="font-semibold">Job Invites</p>
          <h2 className="text-2xl font-bold">23</h2>
          <p className="text-green-500">+25%</p>
        </div>
        <div className="bg-white p-4 rounded shadow flex-1 min-w-[220px]" style={{
            outline:"1px solid gray"
        }}>
          <p className="font-semibold">Active Jobs</p>
          <h2 className="text-2xl font-bold">0</h2>
        </div>
        <div className="bg-white p-4 rounded shadow flex-1 min-w-[220px]"style={{
            outline:"1px solid gray"
        }}>
          <p className="font-semibold">Completed Jobs</p>
          <h2 className="text-2xl font-bold">5</h2>
        </div>
        <div className="bg-white p-4 rounded shadow flex-1 min-w-[220px]"style={{
            outline:"1px solid gray"
        }}>
          <p className="font-semibold">Jobs Created</p>
          <h2 className="text-2xl font-bold">24</h2>
        </div>
      </section>

      {/* Profile Stats / Referral */}
      <section className="flex flex-wrap gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow flex-1 flex items-center justify-between min-w-[300px]">
          <div>
            <p className="font-semibold">Referral Code</p>
            <h2 className="text-2xl font-bold">H5T26IL</h2>
            <p className="text-sm text-gray-500">
              Share referral code with your friends and get free discount vouchers.
            </p>
          </div>
        </div>
        <div className="bg-white p-4 rounded shadow flex-1 min-w-[300px] flex flex-col items-center">
          <p className="font-semibold">Profile Completed</p>
          <div className="relative w-24 h-24 mt-2">
            <svg className="w-full h-full" viewBox="0 0 36 36">
              <path
                className="text-gray-300 stroke-current"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                strokeWidth="2"
                strokeDasharray="100, 100"
              ></path>
              <path
                className="text-blue-500 stroke-current"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                strokeWidth="2"
                strokeDasharray="75, 100"
              ></path>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-xl font-bold">
              75%
            </div>
          </div>
          <a href="www.google.com" className="text-blue-500 text-sm mt-2">
            Edit Profile
          </a>
        </div>
      </section>

      {/* Bids */}
      <section className="flex flex-wrap gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow flex-1 text-center min-w-[200px]">
          <p className="font-semibold">Ongoing Bids</p>
          <h2 className="text-2xl font-bold">0</h2>
        </div>
        <div className="bg-white p-4 rounded shadow flex-1 text-center min-w-[200px]">
          <p className="font-semibold">Lost Bids</p>
          <h2 className="text-2xl font-bold">0</h2>
        </div>
        <div className="bg-white p-4 rounded shadow flex-1 text-center min-w-[200px]">
          <p className="font-semibold">Winning Bids</p>
          <h2 className="text-2xl font-bold">0</h2>
        </div>
      </section>

      {/* Bank */}
      <section className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-lg font-bold mb-4">Bank</h2>
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <p className="text-gray-500">Pending Payments</p>
            <h2 className="text-xl font-bold">£0.00</h2>
          </div>
          <div className="flex-1 min-w-[200px]">
            <p className="text-gray-500">Paid This Month</p>
            <h2 className="text-xl font-bold">£0.00</h2>
          </div>
          <div className="flex-1 min-w-[200px]">
            <p className="text-gray-500">Total Pay</p>
            <h2 className="text-xl font-bold">£0.00</h2>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MyDashboard;
