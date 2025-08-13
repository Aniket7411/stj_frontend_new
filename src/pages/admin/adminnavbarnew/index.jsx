import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink, Navigate } from "react-router-dom";
import { CiDollar } from "react-icons/ci";
import { GrUserAdmin } from "react-icons/gr";
import { MdContactSupport, MdDashboard } from "react-icons/md";
import { PiNotepad } from "react-icons/pi";
// import AdminDashNew from "../admin/admindashnew";
// import AdminManagement from "../adminmangement";

import { HttpClient } from "../../../server/client/http";
import { toast } from "react-toastify";

const AdmindashboardNavBar = () => {
    const [dashboardData, setDashboardData] = useState(null);

    const navItems = [
        { name: "/Dashboard", path: "/", icon: <MdDashboard /> },
        { name: "/Admin Management", path: "/admin-management", icon: <GrUserAdmin /> },
        
        { name: "/Employer Management", path: "/employer-management", icon: <PiNotepad /> },
        // { name: "/Payment & Transactions", path: "/payments", icon: <CiDollar /> },
        { name: "/Support & Feedback", path: "/support", icon: <MdContactSupport /> },
    ];

    const getDashboardData = async () => {
        try {
            const response = await HttpClient.get("/admin/");
            setDashboardData(response.data);
        } catch (err) {
            toast.error("There is some error fetching data.");
        }
    };

    useEffect(() => {
        getDashboardData();
    }, []);

    const getName = localStorage.getItem("name");
    const parsedName = JSON.parse(getName); // Parse the JSON string into an object
    const name = parsedName?.role;

    return (
        <Router>
            <div className="flex flex-col md:flex-row">
                {/* Sidebar */}
                <div className="w-full md:w-[20%] p-4 bg-white">
                    <div className="flex flex-col items-center mb-6" style={{ paddingTop: "50px" }}>
                        <img
                            src="/assets/profilepic.png"
                            className="w-[45px] h-[45px] mr-2 rounded-full cursor-pointer transition-transform duration-200 hover:scale-110 hover:ring-2 hover:ring-blue-500"
                            alt="navprofile"
                        />
                        <h3 className="text-lg font-semibold mt-3">{name}</h3>
                    </div>
                    <hr className="mb-6" />
                    <div className="space-y-4">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.name}
                                to={item.path}
                                className={({ isActive }) =>
                                    `flex items-center gap-4 p-2 rounded-lg cursor-pointer transition-all duration-300 ${isActive ? "bg-gray-200 text-black font-bold" : "hover:bg-gray-200 hover:text-black"
                                    }`
                                }
                            >
                                {item.icon}
                                <p className="font-inter">{item.name}</p>
                            </NavLink>
                        ))}
                    </div>
                </div>
                {/* Main Content */}
                <div className="w-full md:w-[80%] p-4">
                    <Routes>
                        {/* <Route path="/" element={<AdminDashNew dashboardData={dashboardData} />} /> */}
                        {/* <Route path="/admin-management" element={<AdminManagement />} /> */}
                        {/* <Route path="/employer-management" element={<Employermanagement />} /> */}
                        {/* <Route path="/cms" element={<CMS />} /> */}
                        {/* <Route path="/payments" element={<PaymentHistory />} /> */}
                        <Route path="/support" element={<div>Support & Feedback Page</div>} />
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default AdmindashboardNavBar;
