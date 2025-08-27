import React, { useContext, useEffect, useState } from "react";
import { CourseContext } from "../useContext2";
import axios from "axios";
import uploadImageOnCloudinary from "../../components/uploads/uploadImg";
import { HttpClient } from "../../server/client/http";
import { toast } from "react-toastify";

const ImageUpload = ({ label, imageUrl, onUpload, onRemove, acceptTypes }) => {
  const [loading, setLoading] = useState(false);

  const handleFileChange = async (e) => {
    setLoading(true);
    try {
      const url = await uploadImageOnCloudinary(e);
      onUpload(url);
      toast.success("Image uploaded successfully!");
    } catch (error) {
      toast.error("Failed to upload image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      {imageUrl ? (
        <div className="flex items-center flex-wrap gap-2">
          <img src={imageUrl} alt="Uploaded" className="border rounded-md p-2 mb-2" />
          <button
            onClick={onRemove}
            className="bg-[#c5263c] text-white px-3 w-auto py-1 rounded-md hover:bg-red-700"
          >
            Remove Image
          </button>
        </div>
      ) : (
        <div className="relative flex items-center justify-center border-2 border-dashed border-gray-400 rounded-md bg-white h-40">
          {loading ? (
            <p className="text-gray-500">Uploading...</p>
          ) : (
            <label
              htmlFor={`${label}-upload`}
              className="text-gray-500 flex flex-col items-center"
            >
              <img src="/assets/upload-icon.svg" alt="Upload" className="w-10 h-10 mb-2" />
              <span>
                Drop your image here or <span className="text-blue-500 underline">browse</span>
              </span>
            </label>
          )}
          <input
            id={`${label}-upload`}
            type="file"
            accept={acceptTypes}
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      )}
    </div>
  );
};

const EmployerCertificates = (props) => {
  const { employerDetails } = props;
  const [declaration, setDeclaration] = useState(false);
  const [errors, setErrors] = useState({});
  const [dlImage, setDLImage] = useState(null);
  const [utilityDocument, setUtilityDocument] = useState(null);

  const getEmployerDetails = async () => {
    try {
      const response = await HttpClient.get("/user/profile/");
      setUtilityDocument(response?.user?.profile?.uploads?.passportDLCertificate || null);
      setDLImage(response?.user?.profile?.uploads?.utilityBillsStatement || null);
    } catch (error) {
      console.error("Error fetching employer details:", error);
    }
  };

  useEffect(() => {
    getEmployerDetails();
  }, []);

  const handleSubmit = async () => {
    if (!declaration) {
      setErrors({ declaration: "You must declare that the information is legitimate." });
      return;
    }

    const formData = {
      passportDLCertificate: utilityDocument,
      utilityBillsStatement: dlImage,
      declaration,
    };

    try {
      await HttpClient.put("/user/profile/uploads", formData);
      toast.success("Updated successfully!", { onClose: () => window.location.reload() });
    } catch (error) {
      toast.error("An error occurred during submission.");
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <ImageUpload
        label="Upload Passport / Driving License (ID)"
        imageUrl={utilityDocument}
        onUpload={setUtilityDocument}
        onRemove={() => setUtilityDocument(null)}
        acceptTypes="image/png, image/jpeg, .pdf, .doc, .docx"
      />
      {/* <ImageUpload
        label="Utility Bill or Statement"
        imageUrl={dlImage}
        onUpload={setDLImage}
        onRemove={() => setDLImage(null)}
        acceptTypes="image/png, image/jpeg, .pdf, .doc, .docx"
      /> */}
      <div className="mb-6">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={declaration}
            onChange={(e) => setDeclaration(e.target.checked)}
            className="mr-2"
          />
          <span className="text-sm text-gray-700">
            I declare that all information provided is accurate.
          </span>
        </label>
        {errors.declaration && <p className="text-[#C5363C] mt-2">{errors.declaration}</p>}
      </div>
      <div className="flex justify-center">
        <button
          onClick={handleSubmit}
          className="bg-[#c5363c] text-white px-3 w-auto py-1 rounded-md hover:bg-blue-600"
        >
          Update Image
        </button>
      </div>
    </div>
  );
};

export default EmployerCertificates;
