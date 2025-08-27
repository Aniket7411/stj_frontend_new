import React, { createContext, useState, useEffect } from "react";
import { HttpClient } from "../server/client/http";

// Create the context
const ProfileContext = createContext();

// ProfileProvider component
export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null); // State to store profile data
  const [loading, setLoading] = useState(true); // State to track loading
  const [error, setError] = useState(null); // State to track errors

  useEffect(() => {
    // Fetch profile data
    const fetchProfile = async () => {
      try {
      const response = await HttpClient.get("/user/profile/");
      setProfile(response.user)

        setLoading(false); // Set loading to false
      } catch (err) {
        setError(err.message); // Set error message
        setLoading(false); // Set loading to false
      }
    };

    fetchProfile();
  }, []);

  return (
    <ProfileContext.Provider value={{ profile, loading, error }}>
      {children}
    </ProfileContext.Provider>
  );
};

// Export the context
export default ProfileContext;
