import React from "react";
import { Navigate } from "react-router-dom";
const ProtectedRoute=({Element:Component,RoleRequired})=>{
    const userRole=localStorage.getItem("role");
    console.log(RoleRequired)
    if(userRole!==RoleRequired){
        return <Navigate to="/Account" replace/>;
    }
    return <Component/>
}
export default ProtectedRoute;