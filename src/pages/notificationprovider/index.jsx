import React, { createContext, useEffect, useState } from "react";
import { HttpClient } from "../../server/client/http";
import { toast } from "react-toastify";
import { isLoggedIn } from "../../server/user";

export const NotificationContext = createContext({
  notifications: [], // Default value for notifications
  getNotifications: () => { }, // Default function placeholder
});

const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0)
  const [unreadNotification, setUnreadNotification] = useState(0)
  const [notificationCountToShow, setNotificationCountToShow] = useState(0)

  const getNotifications = async () => {
    // Only fetch notifications if user is logged in
    if (!isLoggedIn()) {
      console.log("User not logged in, skipping notification fetch");
      return;
    }

    try {
      // debugger
      const response = await HttpClient.get("/notification/");
      console.log("notificationsnotificationssss", response?.data?.notifications);


      const countNewNotification = response?.data?.filter((note) => note.isRead === false)



      console.log("countNewNotificationffff", countNewNotification.length)
      if (countNewNotification?.length !== 0) {
        setNotificationCountToShow(countNewNotification?.length)
      }

      console.log("countNewNotificationffffn", notificationCountToShow)
      setNotificationCount(countNewNotification?.length)

      setNotifications(response?.data || []); // Fallback to empty array


    } catch (err) {
      if (err.response && err.response.status === 400) {
      } else if (err.request) {
        console.log("No response from server. Please check your network.");
      } else {
        console.log(err?.message)
      }
    }
  };

  useEffect(() => {
    getNotifications();
  }, []);

  // Listen for storage changes to detect login/logout
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'accessToken') {
        if (e.newValue) {
          // User logged in, fetch notifications
          getNotifications();
        } else {
          // User logged out, clear notifications
          setNotifications([]);
          setNotificationCount(0);
          setNotificationCountToShow(0);
          setUnreadNotification(0);
        }
      }
    };

    // Listen for storage events (when user logs in/out in another tab)
    window.addEventListener('storage', handleStorageChange);

    // Also listen for custom login/logout events
    const handleLogin = () => getNotifications();
    const handleLogout = () => {
      setNotifications([]);
      setNotificationCount(0);
      setNotificationCountToShow(0);
      setUnreadNotification(0);
    };

    window.addEventListener('userLogin', handleLogin);
    window.addEventListener('userLogout', handleLogout);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('userLogin', handleLogin);
      window.removeEventListener('userLogout', handleLogout);
    };
  }, []);

  return (
    <NotificationContext.Provider
      value={{
        notifications: notifications || [], // Ensure notifications is always an array
        getNotifications,
        notificationCount,
        setNotificationCount,
        unreadNotification,
        setUnreadNotification,
        notificationCountToShow,
        setNotificationCountToShow
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
