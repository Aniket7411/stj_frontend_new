import React from "react";

const BuyCoursePage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            {/* Header Section */}
            <div className="w-full max-w-3xl bg-white mt-8 md:mt-2 shadow-lg rounded-lg p-6">
                <h1 className="text-3xl font-bold text-[#c5363c] text-center">Buy Your Course</h1>
                <p className="text-gray-600 text-center mt-2">
                    Complete the process below to proceed with purchasing the course.
                </p>
            </div>

            {/* Course Details Section */}
            <div className="flex flex-col md:flex-row w-full max-w-3xl bg-white shadow-lg rounded-lg mt-6">
                <div className="flex-1 p-6">
                    <h2 className="text-2xl font-semibold text-gray-700">Course Details</h2>
                    <ul className="mt-4 space-y-2 text-gray-600">
                        <li>📚 <strong>Course Name:</strong> React Mastery</li>
                        <li>⏳ <strong>Duration:</strong> 8 weeks</li>
                        <li>💼 <strong>Instructor:</strong> John Doe</li>
                        <li>🎓 <strong>Price:</strong> $199</li>
                    </ul>
                </div>
                <div className="flex-1 p-6 border-t md:border-t-0 md:border-l">
                    <h2 className="text-2xl font-semibold text-gray-700">Payment Status</h2>
                    <p className="mt-4 text-gray-600">
                        Payment method integration is <strong className="text-red-500">pending</strong>. For now, you can proceed with the next steps, but payment functionality is not yet enabled.
                    </p>
                </div>
                


            </div>
                <button onClick={() => alert('Note: Payment functionality will be available soon.')}
                className="bg-[#c5363c] mb-2 mt-4 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#c5363c] focus:ring-opacity-50 text-[#fff]">Proceed</button>
</div>


           
    );
};

export default BuyCoursePage;
