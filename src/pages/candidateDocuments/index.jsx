import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import uploadImageOnCloudinary from "../../components/uploads/uploadImg";
import { HttpClient } from "../../server/client/http";
import { ClipLoader } from "react-spinners";
import { FiUpload, FiX, FiEye, FiFile } from "react-icons/fi";
import { toast } from "react-toastify";

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
        { key: "educationalCertificate", label: "Educational Certificate" },
        { key: "drivingLicense", label: "Driving License" },
        { key: "skillCertificate", label: "Skill Certificate" },
        { key: "bankDetails", label: "Bank Details" }
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
            if (response.success) {
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
            toast.error("Failed to load documents");
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
                <ClipLoader size={50} color="#4ade80" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            {/* Document Viewer Modal */}
            {viewDocument.visible && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-4xl w-full max-h-screen overflow-auto">
                        <div className="flex justify-between items-center p-4 border-b">
                            <h3 className="text-lg font-medium capitalize">
                                {viewDocument.type.replace(/([A-Z])/g, ' $1').trim()}
                            </h3>
                            <button
                                onClick={() => setViewDocument({ visible: false, url: null, type: null })}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <FiX size={24} />
                            </button>
                        </div>
                        <div className="p-4">
                            <img
                                src={viewDocument.url}
                                alt="Document"
                                className="w-full h-auto max-h-[80vh] object-contain"
                            />
                        </div>
                    </div>
                </div>
            )}

            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Document Upload</h1>
                    <p className="mt-2 text-gray-600">
                        Upload and manage your important documents
                    </p>
                </div>

                <form onSubmit={handleSave} className="bg-white shadow rounded-lg p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {documentTypes.map(({ key, label }) => (
                            <div key={key} className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    {label}
                                </label>

                                <div className="flex items-center space-x-4">
                                    <label className="flex-1">
                                        <div className="flex flex-col items-center justify-center px-4 py-6 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg hover:bg-gray-100 cursor-pointer transition">
                                            <FiUpload className="w-8 h-8 text-gray-400 mb-2" />
                                            <span className="text-sm text-gray-500">
                                                {loading[key] ? 'Uploading...' : 'Click to upload'}
                                            </span>
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
  <div className="relative group">
    {/* Document Thumbnail Container */}
    <div
      className="w-28 h-28 flex items-center justify-center bg-gray-50 rounded-lg overflow-hidden border-2 border-gray-200 cursor-pointer transition-all duration-200 hover:border-indigo-400 hover:shadow-md"
      onClick={() => openDocumentViewer(previews[key], key)}
    >
      {/* File Icon or Image Preview */}
      {previews[key] === 'file' ? (
        <div className="flex flex-col items-center p-3 space-y-2">
          <FiFile className="w-9 h-9 text-indigo-500" />
          <span className="text-xs font-medium text-gray-600 truncate max-w-[80px]">
            {label.split(' ')[0]}
          </span>
        </div>
      ) : (
        <img
          src={previews[key]}
          alt={`${label} preview`}
          className="object-cover w-full h-full transition-all duration-300 group-hover:scale-[1.03]"
        />
      )}
    </div>

    {/* Remove Button (X) */}
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        removeImage(key);
      }}
      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 transition-all duration-200 hover:bg-red-600 shadow-lg hover:scale-110"
      aria-label={`Remove ${label}`}
    >
      <FiX size={14} className="stroke-[3]" />
    </button>

    {/* View Overlay */}
    <div className="absolute inset-0 flex items-center justify-center p-2.5 rounded-lg">
      <div className="relative w-full h-full">
        {/* Semi-transparent overlay */}
        <div 
          className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 rounded-[6px]"
          aria-hidden="true"
        />
        
        {/* Eye icon */}
        <button
          type="button"
          onClick={() => openDocumentViewer(previews[key], key)}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          aria-label={`View ${label}`}
        >
          <div className="bg-white/95 p-2.5 rounded-full shadow-md transition-transform duration-300 hover:scale-110 hover:shadow-lg">
            <FiEye className="text-indigo-600" size={20} />
          </div>
        </button>
      </div>
    </div>

    {/* Document Type Label */}
    <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-white px-3 py-1 rounded-full border border-gray-200 shadow-sm">
      <span className="text-xs font-semibold text-gray-700 capitalize tracking-wide">
        {key.replace(/([A-Z])/g, ' $1').trim().split(' ')[0]}
      </span>
    </div>
  </div>
)}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 flex justify-end">
                        <button
                            type="submit"
                            disabled={loading.form}
                            className="px-6 py-1 w-auto bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 transition"
                        >
                            {loading.form ? 'Saving...' : 'Save Documents'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UploadDocuments;