import React, { createContext, useState } from 'react';

// Create a Context for Profile Details
const ProfileContext = createContext();

// Profile Provider Component
const ProfileProvider = ({ children }) => {
  // State to manage profile data
  const [profile, setProfile] = useState({
    personalInformation: {},
    generalInfo: {},
    uploads: {},
  });


  

  // Function to update specific sections of the profile
  const updateProfileDetails = (section, data) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      [section]: data,
    }));
  };

  console.log(profile); // Optional: To see the profile state in console

  return (
    <ProfileContext.Provider value={{ profile, updateProfileDetails }}>
      {children}
    </ProfileContext.Provider>
  );
};

export { ProfileContext, ProfileProvider };
