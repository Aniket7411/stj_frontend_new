import React, { createContext, useEffect, useState } from "react";
import { HttpClient } from "../../server/client/http";
import { toast } from "react-toastify";

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
