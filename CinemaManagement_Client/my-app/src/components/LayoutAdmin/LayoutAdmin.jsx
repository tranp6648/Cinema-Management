import { useNavigate } from 'react-router-dom';
import '../Admin/admin.css'
import React, { useEffect, useState } from 'react';
import { Logout } from '../Services/AccountService';
import Cookies from 'js-cookie'
function LayoutAdmin() {
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();
    const [username,setusername]=useState(null);
    const[Avatar,setAvatar]=useState(null);
    const handleDropdownToggle=()=>{
        setShowDropdown(!showDropdown);
       
    }
    useEffect(()=>{
        setusername(localStorage.getItem("username"))
        setAvatar(localStorage.getItem("Avatar"))
      
    })
    const handleLogout=async()=>{
        try{
            Cookies.remove("token");
             navigate("/Account")   
            
        }catch(error){
            console.log(error)
        }
    }
    return (
        <>
            <header className="main-header">

                <a href="index2.html" className="logo"><b>Admin</b>LTE</a>

                <nav className="navbar navbar-static-top" role="navigation">
                    <a href="#" className="sidebar-toggle" data-toggle="offcanvas" role="button">
                        <span className="sr-only">Toggle navigation</span>
                    </a>

                    {/* Logo */}
                    <a className="navbar-brand cursor-pointer" onClick={handleDropdownToggle}>
                        <img src={Avatar} className="user-image" alt="Logo" />
                        {/* You can also add text or other elements alongside the logo */}
                        {username}
                        &nbsp;
                        <i className="fa fa-chevron-circle-down"></i>
                    </a>
                    {showDropdown && (
                        <div className="dropdown">
                            <a href="#" onClick={handleLogout}>
                                <i className="fa fa-sign-out" aria-hidden="true"></i> Logout
                            </a>
                            <a onClick={() => navigate('/ProfileAdmin')}>
                                <i className="fa fa-user" aria-hidden="true"></i> Account
                            </a>

                            {/* Các mục khác của dropdown có thể được thêm vào đây */}
                        </div>
                    )}
                </nav>
            </header>

            <aside className="main-sidebar ">

                <section className="sidebar h-auto">

                    <div className="user-panel">
                        <div className="pull-left image">
                            <img src={Avatar} className="img-circle" alt="User Image" />
                        </div>
                        <div className="pull-left info">
                            <p className='text-white'>{username}</p>

                            <a href="#" className='text-white'><i className="fa fa-circle text-green-500"></i> Online</a>
                        </div>
                    </div>



                    <ul className="sidebar-menu">
                        <li className="header">MAIN NAVIGATION</li>
                        <li className="active treeview">
                            <a href="" onClick={() => navigate('/admin')}>
                                <i className="fa fa-dashboard" ></i> <span>Dashboard</span>
                            </a>

                        </li>
                     


                    </ul>
                </section>

            </aside>
        </>
    )
}
export default LayoutAdmin;