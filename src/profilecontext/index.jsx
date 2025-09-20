import React, { createContext, useState, useEffect } from "react";
import { HttpClient } from "../server/client/http";
import { isLoggedIn } from "../server/user";

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
      // Only fetch profile if user is logged in
      if (!isLoggedIn()) {
        console.log("User not logged in, skipping profile fetch");
        setLoading(false);
        return;
      }

      try {
        const response = await HttpClient.get("/user/profile/");
        setProfile(response.user);
        setLoading(false); // Set loading to false
      } catch (err) {
        setError(err.message); // Set error message
        setLoading(false); // Set loading to false
      }
    };

    fetchProfile();
  }, []);

  // Listen for login/logout events to refresh profile
  useEffect(() => {
    const handleLogin = async () => {
      if (isLoggedIn()) {
        try {
          const response = await HttpClient.get("/user/profile/");
          setProfile(response.user);
          setError(null);
        } catch (err) {
          setError(err.message);
        }
      }
    };

    const handleLogout = () => {
      setProfile(null);
      setError(null);
    };

    // Listen for custom login/logout events
    window.addEventListener('userLogin', handleLogin);
    window.addEventListener('userLogout', handleLogout);

    // Listen for storage changes (cross-tab)
    const handleStorageChange = (e) => {
      if (e.key === 'accessToken') {
        if (e.newValue) {
          handleLogin();
        } else {
          handleLogout();
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('userLogin', handleLogin);
      window.removeEventListener('userLogout', handleLogout);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <ProfileContext.Provider value={{ profile, loading, error }}>
      {children}
    </ProfileContext.Provider>
  );
};

// Export the context
export default ProfileContext;
