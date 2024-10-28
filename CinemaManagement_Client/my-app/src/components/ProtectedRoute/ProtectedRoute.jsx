import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from 'js-cookie'
const ProtectedRoute=({Element:Component,RoleRequired})=>{
    const getTokenFromCookies = () => {
        return Cookies.get('token');
      };
      const token = getTokenFromCookies();
      console.log(token)
    const userRole=localStorage.getItem("role");
    console.log(RoleRequired)
    if(userRole!==RoleRequired || token==undefined){
        return <Navigate to="/Account" replace/>;
    }
    return <Component/>
}
export default ProtectedRoute;