import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const VerifyEmail = () => {
    const [status, setStatus] = useState({
        loading: true,
        message: "",
        success: false,
    });
    const navigate=useNavigate();

    // Get token from URL
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get("token");

    useEffect(() => {
        const verifyEmail = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_URL}/user/verify?token=${token}`
                );
                setStatus({
                    loading: false,
                    message: response.data.message,
                    success: response.data.success,
                });
                //navigate('/login');

            } catch (error) {
                setStatus({
                    loading: false,
                    message: error.response?.data?.message || "Something went wrong",
                    success: false,
                });
            }
        };

        if (token) verifyEmail();
    }, [token]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            {status.loading ? (
                <h2 className="text-2xl font-bold">Verifying your email...</h2>
            ) : (
                <div
                    className={`p-8 rounded-md shadow-lg ${
                        status.success ? "bg-green-100" : "bg-red-100"
                    }`}
                >
                    <h2
                        className={`text-2xl font-bold ${
                            status.success ? "text-green-800" : "text-red-800"
                        }`}
                    >
                        {status.message}
                    </h2>
                </div>
            )}
        </div>
    );
};

export default VerifyEmail;
