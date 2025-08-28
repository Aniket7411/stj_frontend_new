import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import uploadImageOnCloudinary from "../../components/uploads/uploadImg";
import { HttpClient } from "../../server/client/http";
import { ClipLoader } from "react-spinners";
import { FiUpload, FiX, FiEye, FiFile, FiCheckCircle } from "react-icons/fi";
import { toast } from "react-toastify";
import { MdDelete } from "react-icons/md";

const UploadDocuments = () => {
    const [formData, setFormData] = useState({
        educationalCertificate: null,
        drivingLicense: null,
        skillCertificate: null,
        bankDetails: null,
    });

    const [previews, setPreviews] = useState({
        educationalCertificate: null,
        drivingLicense: null,
        skillCertificate: null,
        bankDetails: null,
    });

    const [loading, setLoading] = useState({
        educationalCertificate: false,
        drivingLicense: false,
        skillCertificate: false,
        bankDetails: false,
        form: false
    });

    const [isLoading, setIsLoading] = useState(false);
    const [viewDocument, setViewDocument] = useState({
        visible: false,
        url: null,
        type: null
    });

    const documentTypes = [
        { key: "educationalCertificate", label: "Educational Certificate", description: "Upload your degree or educational certificates" },
        { key: "drivingLicense", label: "Driving License", description: "Upload both sides of your driving license" },
        { key: "skillCertificate", label: "Skill Certificate", description: "Upload any skill certifications you have" },
        { key: "bankDetails", label: "Bank Details", description: "Upload a copy of your bank statement or check" }
    ];

    const getImageUrl = useCallback(async (e, type) => {
        if (!e.target.files[0]) return;

        setLoading(prev => ({ ...prev, [type]: true }));
        try {
            const url = await uploadImageOnCloudinary(e);

            setFormData(prev => ({ ...prev, [type]: url }));

            // Create preview for images, show file icon for PDFs
            const file = e.target.files[0];
            if (file.type.includes('image')) {
                setPreviews(prev => ({ ...prev, [type]: URL.createObjectURL(file) }));
            } else {
                setPreviews(prev => ({ ...prev, [type]: 'file' }));
            }

            toast.success(`${documentTypes.find(d => d.key === type).label} uploaded successfully`);
        } catch (error) {
            console.error("Upload failed:", error);
            toast.error(`Failed to upload ${documentTypes.find(d => d.key === type).label}`);
        } finally {
            setLoading(prev => ({ ...prev, [type]: false }));
        }
    }, []);

    const removeImage = (type) => {
        setFormData(prev => ({ ...prev, [type]: null }));
        setPreviews(prev => ({ ...prev, [type]: null }));
        toast.info(`${documentTypes.find(d => d.key === type).label} removed`);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setLoading(prev => ({ ...prev, form: true }));

        try {
            const response = await HttpClient.put("/user/profile/uploads", formData);
            if (response.success) {
                toast.success("Documents updated successfully");
                getUploadedData();
            } else {
                throw new Error(response.message || "Update failed");
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error(error.message || "Failed to update documents");
        } finally {
            setLoading(prev => ({ ...prev, form: false }));
        }
    };

    const getUploadedData = async () => {
        setIsLoading(true);
        try {
            const response = await HttpClient.get("/user/profile/uploads");
            if (response?.success) {
                const updatedFormData = {};
                const updatedPreviews = {};

                documentTypes.forEach(({ key }) => {
                    updatedFormData[key] = response.data[key] || null;
                    updatedPreviews[key] = response.data[key] ?
                        (response.data[key].includes('image') ? response.data[key] : 'file') :
                        null;
                });

                setFormData(updatedFormData);
                setPreviews(updatedPreviews);
            }
        } catch (err) {
            console.error("Error:", err);
        } finally {
            setIsLoading(false);
        }
    };

    const openDocumentViewer = (url, type) => {
        if (!url) return;

        if (url === 'file') {
            // Handle PDF or other non-image documents
            window.open(formData[type], '_blank');
        } else {
            setViewDocument({
                visible: true,
                url: url,
                type: type
            });
        }
    };

    useEffect(() => {
        getUploadedData();
    }, []);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-center">
                    <ClipLoader size={50} color="#4f46e5" />
                    <p className="mt-4 text-gray-600">Loading your documents...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
            {/* Document Viewer Modal */}
            {viewDocument.visible && (
                <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl max-w-4xl w-full max-h-screen overflow-auto shadow-2xl">
                        <div className="flex justify-between items-center p-5 border-b border-gray-200">
                            <h3 className="text-xl font-semibold text-gray-800 capitalize">
                                {viewDocument.type.replace(/([A-Z])/g, ' $1').trim()}
                            </h3>
                            <button
                                onClick={() => setViewDocument({ visible: false, url: null, type: null })}
                                className="text-gray-500 hover:text-gray-700 transition-colors duration-200 rounded-full p-1 hover:bg-gray-100"
                            >
                                <FiX size={26} />
                            </button>
                        </div>
                        <div className="p-5 flex justify-center bg-gray-900">
                            <img
                                src={viewDocument.url}
                                alt="Document"
                                className="max-w-full max-h-[70vh] object-contain"
                            />
                        </div>
                    </div>
                </div>
            )}

            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold text-gray-900 mb-3">Document Upload</h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Upload and manage your important documents. All files are securely stored and encrypted.
                    </p>
                </div>

                <form onSubmit={handleSave} className="bg-white shadow-xl rounded-2xl overflow-hidden">
                    <div className="p-7 border-b border-gray-100">
                        <h2 className="text-2xl font-semibold text-gray-800">Your Documents</h2>
                        <p className="text-gray-500 mt-1">Please upload the required documents below</p>
                    </div>

                    <div className="p-7">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {documentTypes.map(({ key, label, description }) => (
                                <div key={key} className="bg-gray-50 rounded-xl p-5 transition-all duration-200 hover:shadow-md">
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <label className="block text-lg font-medium text-gray-800 mb-1">
                                                {label}
                                            </label>
                                            <p className="text-sm text-gray-500">{description}</p>
                                        </div>
                                        {formData[key] && (
                                            <div className="flex-shrink-0 ml-3">
                                                <FiCheckCircle className="w-6 h-6 text-green-500" />
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-5">
                                        <label className="w-full sm:w-auto flex-1">
                                            <div className={`flex flex-col items-center justify-center px-4 py-7 bg-white border-2 border-dashed rounded-xl hover:border-indigo-400 cursor-pointer transition-all duration-200 ${loading[key] ? 'opacity-70' : 'hover:bg-indigo-50'}`}>
                                                {loading[key] ? (
                                                    <div className="flex flex-col items-center">
                                                        <ClipLoader size={24} color="#4f46e5" />
                                                        <span className="text-sm text-gray-500 mt-2">Uploading...</span>
                                                    </div>
                                                ) : (
                                                    <>
                                                        <FiUpload className="w-10 h-10 text-indigo-500 mb-3" />
                                                        <span className="text-sm font-medium text-gray-600 text-center">
                                                            Click to upload
                                                        </span>
                                                        <span className="text-xs text-gray-400 mt-1">
                                                            PNG, JPG, PDF up to 10MB
                                                        </span>
                                                    </>
                                                )}
                                                <input
                                                    type="file"
                                                    accept="image/*,application/pdf"
                                                    className="hidden"
                                                    onChange={(e) => getImageUrl(e, key)}
                                                    disabled={loading[key]}
                                                />
                                            </div>
                                        </label>

                                        {previews[key] && (
                                            <div className="relative group flex-shrink-0">
                                                {/* Document Thumbnail Container */}
                                                <div
                                                    className="w-32 h-32 flex items-center justify-center bg-white rounded-lg overflow-hidden border-2 border-gray-200 cursor-pointer transition-all duration-200 hover:border-indigo-500 hover:shadow-lg"
                                                    onClick={() => openDocumentViewer(previews[key], key)}
                                                >
                                                    {/* File Icon or Image Preview */}
                                                    {previews[key] === 'file' ? (
                                                        <div className="flex flex-col items-center p-3 space-y-2">
                                                            <FiFile className="w-12 h-12 text-indigo-500" />
                                                            <span className="text-xs font-medium text-gray-600 truncate max-w-[90px]">
                                                                PDF Document
                                                            </span>
                                                        </div>
                                                    ) : (
                                                        <img
                                                            src={previews[key]}
                                                            alt={`${label} preview`}
                                                            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                                                        />
                                                    )}
                                                </div>

                                                {/* Remove Button - Replaced with MdDelete */}
                                                <button
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        removeImage(key);
                                                    }}
                                                    className="absolute -top-7 -right-1 bg-red-500 text-white rounded-full  hover:bg-red-600 transition-colors duration-200 shadow-md"
                                                    aria-label={`Remove ${label}`}
                                                >
                                                    {/* <MdDelete size={16} /> */}
                                                    Remove
                                                </button>

                                                {/* View Overlay */}
                                                <div className="absolute inset-0 flex items-center justify-center rounded-lg">
                                                    <div className="relative w-full h-full">
                                                        {/* Semi-transparent overlay */}
                                                        <div
                                                            className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 rounded-lg"
                                                            aria-hidden="true"
                                                        />

                                                        {/* Eye icon */}
                                                        <button
                                                            type="button"
                                                            onClick={() => openDocumentViewer(previews[key], key)}
                                                            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                                            aria-label={`View ${label}`}
                                                        >
                                                            <div className="bg-white/95 p-3 rounded-full shadow-md transition-transform duration-300 hover:scale-110 hover:shadow-lg">
                                                                <FiEye className="text-indigo-600" size={22} />
                                                            </div>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-10 pt-6 border-t border-gray-100 flex flex-col sm:flex-row justify-end space-y-4 sm:space-y-0 sm:space-x-4">
                            <button
                            
                            style={{
                                outline:"2px solid #c5363c"
                            }}
                                type="button"
                                className="px-3 py-2 bg-white border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200 font-medium"
                                onClick={() => window.history.back()}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading.form}
                                className="px-3 py-2 bg-[#c5363c] text-white rounded-xl hover:bg-[#c5363C] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium flex items-center justify-center min-w-[160px]"
                            >
                                {loading.form ? (
                                    <>
                                        <ClipLoader size={18} color="#ffffff" className="mr-2" />
                                        Saving...
                                    </>
                                ) : (
                                    'Save Documents'
                                )}
                            </button>
                        </div>
                    </div>
                </form>

                <div className="mt-8 text-center text-sm text-gray-500">
                    <p>Your documents are securely stored and encrypted. We respect your privacy.</p>
                </div>
            </div>
        </div>
    );
};

export default UploadDocuments;