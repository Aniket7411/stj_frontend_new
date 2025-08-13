// import React from 'react';
// import { useSelector } from 'react-redux';
// import { Navigate } from 'react-router-dom';

// const ProtectedRoute = ({ children, allowedRoles }) => {
//   const role = useSelector((state) => state.role.role);

// //   console.log(allowedRoles, "alwdroles");
//   console.log(role, "role");

  

//   if (!role) {
//     return <Navigate to="/login" />;
//   }

//   if (!allowedRoles.includes(role)) {
//     return <Navigate to="/" />; // Redirect to homepage for unauthorized access
//   }

//   return children;
// };

// export default ProtectedRoute;
