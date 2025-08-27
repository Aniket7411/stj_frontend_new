import React, { useEffect, useState } from "react";
import { HttpClient } from "../../server/client/http";
import ClipLoader from "react-spinners/ClipLoader";
import ReactModal from "react-modal";
import { toast } from "react-toastify";



const Bankdashboard = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);


    const [bankDetails, setBankDetails] = useState()
    const [detailsAvailable, setDetailsAvailable] = useState(false)
    const [editDetails, setEditDetails] = useState()
    const [formData, setFormData] = useState({
        name: "",
        bankName: "",
        accountNumber: "",
        sortCode: "",
        IBAN: "",
        swiftCode: "",
    });
    const [editModalOpen, setEditModal] = useState()
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState({});
    const [formError, setFormError] = useState("");

    // Modal toggle handlers
    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => {
        setIsModalOpen(false);
        resetForm();
    };

    // Reset form data
    const resetForm = () => {
        setFormData({
            name: "",
            bankName: "",
            accountNumber: "",
            sortCode: "",
            IBAN: "",
            swiftCode: "",
        });
        setError({});
        setFormError("");
    };



    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditDetails((prev) => ({ ...prev, [name]: value }));
    };

    // Handle form submission
    const changeDetails = async () => {

        console.log(editDetails)
        try {
            const response = await HttpClient.put(`/bank/bank-details/${userId}`, editDetails);
            console.log("Update Success:", response?.data);
            setEditModal(false); // Close modal on success
            getBankDetails()
        } catch (error) {
            console.error("Error updating details:", error);
            setEditDetails(false)
        }
    };

    const userId = JSON.parse(localStorage.getItem("userData")).userId

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };


    console.log("editDetails", editDetails)

    // Validate the form fields
    const validateForm = () => {
        const errors = {};
        const accountNumberRegex = /^[0-9]{8}$/; // UK account numbers are 8 digits
        const sortCodeRegex = /^[0-9]{6}$/; // UK sort codes are 6 digits
        const ibanRegex = /^[A-Z]{2}[0-9]{2}[A-Z0-9]{1,30}$/; // General IBAN format
        const swiftCodeRegex = /^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/; // General SWIFT/BIC code format

        if (!formData.name.trim()) errors.name = "Name is required.";
        if (!formData.bankName.trim()) errors.bankName = "Bank Name is required.";
        // if (!accountNumberRegex.test(formData?.accountNumber)) {
        //     errors.accountNumber = "Account Number must be exactly 8 digits.";
        // }
        if (!sortCodeRegex.test(formData.sortCode)) {
            errors.sortCode = "Sort Code must be exactly 6 digits.";
        }
        // if (!ibanRegex.test(formData.IBAN)) {
        //     errors.IBAN = "Invalid IBAN format.";
        // }
        // if (!swiftCodeRegex.test(formData.swiftCode)) {
        //     errors.swiftCode = "Invalid SWIFT/BIC Code format.";
        // }

        setError(errors);
        return Object.keys(errors).length === 0; // Return true if no errors
    };

    // Submit form data
    const handleSubmit = async () => {
        if (!validateForm()) {
            setFormError("Please correct the errors before submitting.");
            return;
        }

        setIsLoading(true);
        setFormError("");

        try {
            const payload = {
                accountNumber: formData?.accountNumber,
                sortCode: formData?.sortCode,
                IBAN: formData?.IBAN,
                swiftCode: formData?.swiftCode,
                name: formData?.name,
                bankName: formData?.bankName
            };

            const response = await HttpClient.post("/bank/bank-details", payload);

            console.log("Bank details saved successfully:", response?.data);
            getBankDetails()

            // Reset the form and close modal on success
            handleCloseModal();
        } catch (err) {
            setFormError(
                err.response?.data?.message ||
                "An error occurred while saving bank details."
            );
        } finally {
            setIsLoading(false);
        }
    };

    const getBankDetails = async () => {
        setIsLoading(true)
        const response = await HttpClient.get(`/bank/bank-details/${userId}`)
        console.log("responsebankdetails", response?.message)
        if (response?.message === "Bank details retrieved successfully") {
            setDetailsAvailable(true)
        }

        setEditDetails(response?.data)

        setBankDetails(response?.data)
        setIsLoading(false)
    }


    useEffect(() => {
        getBankDetails()
    }, [])


    const deleteBankDetails = async () => {
        try {
            const response = await HttpClient.delete(`/bank/bank-details/${userId}`)
            toast.success(response?.message);
            setDetailsAvailable(false)

            getBankDetails()

        } catch (error) {
            toast.error(error?.message)
        }
    }

    return (
        <>

            {
                isLoading ? <div className="h-screen flex justify-center items-center">
                    <ClipLoader size={50} color="#4ade80" />
                </div> :
                    <>
                        <div className="flex flex-col bg-gray-100 p-8">
                            <div className="flex-grow flex flex-wrap justify-center gap-6">
                                {
                                    detailsAvailable ? <div className="flex flex-col bg-white rounded-lg p-6 shadow-lg w-full sm:w-auto md:w-[45%] lg:w-[30%]">
                                        <h1 className="text-lg font-semibold text-gray-800 mb-2">Bank Details</h1>
                                        <strong className="text-gray-700">Name: {bankDetails?.name || "N/A"}</strong>

                                        <strong className="text-gray-700">Bank Name: {bankDetails?.bankName || "N/A"}</strong>
                                        <strong className="text-gray-700">Account Number: {bankDetails?.accountNumber || "N/A"}</strong>
                                        <strong className="text-gray-700">Swift Code: {bankDetails?.swiftCode || "N/A"}</strong>
                                        <strong className="text-gray-700">Sort Code: {bankDetails?.sortCode || "N/A"}</strong>
                                        <strong className="text-gray-700">IBAN Number: {bankDetails?.IBAN || "N/A"}</strong>

                                        <div className="flex  justify-between mt-3">

                                            <button onClick={() => setEditModal(true)} className="text-[#fff] rounded-md bg-[#c5363c]">Edit Details</button>
                                            <button onClick={deleteBankDetails} className="text-[#fff] rounded-md bg-[#c5363c]">Delete details</button>

                                        </div>

                                    </div>


                                        : <> {!isModalOpen &&
                                            <div className="flex flex-col items-start bg-[white] rounded-lg p-6 shadow-lg w-full sm:w-auto md:w-[45%] lg:w-[30%]">
                                                <h2 className="text-xl font-semibold text-[#c5363c]">Bank</h2>
                                                <p className="text-gray-600 mt-2">Not Included</p>
                                                <button
                                                    onClick={handleOpenModal}
                                                    className="mt-4 bg-[#c5363c] text-white px-4 py-2 rounded shadow hover:bg-[#a42c2e] transition"
                                                >
                                                    Add Details
                                                </button>
                                            </div>}</>


                                }






                                {/* Modal */}
                                {isModalOpen && (
                                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                                        <h2 className="text-2xl font-semibold text-[#c5363c] ">Add Bank Details</h2>
                                        {formError && <p className="text-red-500 mb-4">{formError}</p>}
                                        <form className="space-y-2">
                                            <div>
                                                <label htmlFor="name" className="block text-gray-700 font-medium mb-1">Name</label>
                                                <input
                                                    id="name"
                                                    name="name"
                                                    type="text"
                                                    value={formData?.name}
                                                    onChange={handleInputChange}
                                                    className="w-full px-2 py-1 border rounded-lg focus:outline-none focus:ring focus:ring-[#c5363c]"
                                                    placeholder="Enter your name"
                                                />
                                                {error.name && <p className="text-red-500 text-sm">{error?.name}</p>}
                                            </div>
                                            <div>
                                                <label htmlFor="bankName" className="block text-gray-700 font-medium mb-1">Bank Name</label>
                                                <input
                                                    id="bankName"
                                                    name="bankName"
                                                    type="text"
                                                    value={formData.bankName}
                                                    onChange={handleInputChange}
                                                    className="w-full px-2 py-1 border rounded-lg focus:outline-none focus:ring focus:ring-[#c5363c]"
                                                    placeholder="Enter bank name"
                                                />
                                                {error.bankName && <p className="text-red-500 text-sm">{error.bankName}</p>}
                                            </div>
                                            <div>
                                                <label htmlFor="accountNumber" className="block text-gray-700 font-medium mb-1">Account Number</label>
                                                <input
                                                    id="accountNumber"
                                                    name="accountNumber"
                                                    type="number"
                                                    value={formData.accountNumber}
                                                    onChange={handleInputChange}
                                                    className="w-full px-2 py-1 border rounded-lg focus:outline-none focus:ring focus:ring-[#c5363c]"
                                                    placeholder="Enter account number"
                                                />
                                                {error.accountNumber && <p className="text-red-500 text-sm">{error.accountNumber}</p>}
                                            </div>
                                            <div>
                                                <label htmlFor="sortCode" className="block text-gray-700 font-medium mb-1">Sort Code</label>
                                                <input
                                                    id="sortCode"
                                                    name="sortCode"
                                                    type="text"
                                                    value={formData.sortCode}
                                                    onChange={handleInputChange}
                                                    className="w-full px-2 py-1 border rounded-lg focus:outline-none focus:ring focus:ring-[#c5363c]"
                                                    placeholder="Enter sort code"
                                                />
                                                {error.sortCode && <p className="text-red-500 text-sm">{error.sortCode}</p>}
                                            </div>
                                            <div>
                                                <label htmlFor="IBAN" className="block text-gray-700 font-medium mb-1">IBAN</label>
                                                <input
                                                    id="IBAN"
                                                    name="IBAN"
                                                    type="text"
                                                    value={formData.IBAN}
                                                    onChange={handleInputChange}
                                                    className="w-full px-2 py-1 border rounded-lg focus:outline-none focus:ring focus:ring-[#c5363c]"
                                                    placeholder="Enter IBAN"
                                                />
                                                {error.IBAN && <p className="text-red-500 text-sm">{error.IBAN}</p>}
                                            </div>
                                            <div>
                                                <label htmlFor="swiftCode" className="block text-gray-700 font-medium mb-1">SWIFT Code</label>
                                                <input
                                                    id="swiftCode"
                                                    name="swiftCode"
                                                    type="text"
                                                    value={formData.swiftCode}
                                                    onChange={handleInputChange}
                                                    className="w-full px-2 py-1 border rounded-lg focus:outline-none focus:ring focus:ring-[#c5363c]"
                                                    placeholder="Enter SWIFT code"
                                                />
                                                {error.swiftCode && <p className="text-red-500 text-sm">{error.swiftCode}</p>}
                                            </div>
                                        </form>
                                        <div className="flex justify-end gap-4 mt-6">
                                            <button
                                                onClick={handleCloseModal}
                                                className="bg-gray-300 text-gray-700 px-4 py-2 rounded shadow hover:bg-gray-400"
                                                disabled={isLoading}
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                onClick={handleSubmit}
                                                className="bg-[#c5363c] text-white px-4 py-2 rounded shadow hover:bg-[#a42c2e]"
                                                disabled={isLoading}
                                            >
                                                {isLoading ? "Saving..." : "Save"}
                                            </button>
                                        </div>
                                    </div>

                                )}
                            </div>

                        </div>
                        <ReactModal
                            isOpen={editModalOpen}
                            onRequestClose={() => setEditModal(false)}
                            className="bg-white rounded-lg shadow-lg p-6 w-96 mx-auto mt-20 relative"
                            overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                            ariaHideApp={false}
                        >

                            <div className="flex justify-between items-center">

                                <h2 className="text-xl  font-bold">Edit Details</h2>

                                <button className="text-[#fff] bg-[black]" onClick={() => setEditModal(false)}>Close</button>

                            </div>


                            <div className="space-y-3">

                                <label className="block">
                                    Bank Name:
                                    <input
                                        type="text"
                                        name="bankName"
                                        value={editDetails?.bankName || ""}
                                        onChange={handleChange}
                                        className="w-full border p-2 rounded"
                                    />
                                </label>

                                <label className="block">
                                    Account Number:
                                    <input
                                        type="text"
                                        name="accountNumber"
                                        value={editDetails?.accountNumber || ""}
                                        onChange={handleChange}
                                        className="w-full border p-2 rounded"
                                    />
                                </label>

                                <label className="block">
                                    Sort Code:
                                    <input
                                        type="text"
                                        name="sortCode"
                                        value={editDetails?.sortCode || ""}
                                        onChange={handleChange}
                                        className="w-full border p-2 rounded"
                                    />
                                </label>

                                <label className="block">
                                    Swift Code:
                                    <input
                                        type="text"
                                        name="swiftCode"
                                        value={editDetails?.swiftCode || ""}
                                        onChange={handleChange}
                                        className="w-full border p-2 rounded"
                                    />
                                </label>

                                <label className="block">
                                    IBAN No.:
                                    <input
                                        type="text"
                                        name="IBAN"
                                        value={editDetails?.IBAN || ""}
                                        onChange={handleChange}
                                        className="w-full border p-2 rounded"
                                    />
                                </label>


                            </div>

                            <button
                                onClick={changeDetails}
                                className="mt-4 bg-[#c5363c] text-white px-2 py-1 py-1 rounded w-full hover:bg-[#c5363c]"
                            >
                                Save Changes
                            </button>
                        </ReactModal>
                    </>
            }



        </>
    );
};

export default Bankdashboard;
