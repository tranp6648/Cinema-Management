import React, { useEffect, useState } from "react";
import LayoutAdmin from "../LayoutAdmin/LayoutAdmin";
import { ChangeProfile, ProfileAccount, UploadPhoto } from "../Services/AccountService";
import DatePicker from 'react-datepicker';
import Cookies from 'js-cookie'
import Swal from "sweetalert2";
function Profile() {
    const [userData, setUserData] = useState({
        AvatarImage: null,
        Phone: "",
        Birthday: null,
        Avatar: null,
        Email: "",
        UserName: "",
        FullName: "",
        Avatar: null,
    })
    const getTokenFromCookies = () => {
        return Cookies.get('token'); 
    };
    const idRole = localStorage.getItem("Id");
    const token = getTokenFromCookies();
    const handleUpdateProfile = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value })
    }
    const [errors, setErrors] = useState({});
    const validateInput = (fieldName, value) => {
        const newErrors = { ...errors };
        if (fieldName === 'Username') {
            newErrors[fieldName] = value.trim() === '' ? 'Username is required' : '';
        }else if(fieldName==='FullName'){
            newErrors[fieldName] = value.trim() === '' ? 'FullName is required' : '';
        }else if(fieldName==='Email'){
            newErrors[fieldName]=value.trim()===''?'Email is required':'';
        }else if(fieldName==='Phone'){
            newErrors[fieldName]=value.trim()===''?'Phone is required':'';
        }
        setErrors(newErrors)
    }
    const fetchdata = async () => {
        try {

            const response = await ProfileAccount(idRole, token);

            setUserData({
                FullName: response.fullName,
                UserName: response.username,
                Email: response.email,
                Phone: response.phone,
                Birthday: response.birthday,
                Avatar: response.avatar,
                AvatarImage: response.avatar
            })
            localStorage.setItem("username", response.username)
            localStorage.setItem("Avatar", response.avatar)
        } catch (error) {
            console.log(error)
        }
    }
    const UpdateProfile = async (e) => {
        e.preventDefault();
        try {
            const response = await ChangeProfile(idRole, {
                username: userData.UserName,
                email: userData.Email,
                phone: userData.Phone,
                fullName: userData.FullName,
                birthday: userData.Birthday
            }, token);
            if (response.result == true) {
                Swal.fire({
                    icon: 'success',
                    title: response.message,
                    showConfirmButton: false,
                    timer: 1500
                })
                fetchdata();
            } else {
                let errorMessages = '';
                for (const key in response.errors) {
                    if (response.errors.hasOwnProperty(key)) {
                        errorMessages += `<p >${response.errors[key]}</p>`
                    }
                }
                Swal.fire({
                    icon: 'error',
                    title: "Failed",
                    showConfirmButton: false,
                    timer: 1500,
                    html: errorMessages
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
    const UpdateAvatar = async (e) => {
        e.preventDefault();
        try {

            const response = await UploadPhoto(idRole, userData.Avatar, token);
            if (response.result == true) {
                Swal.fire({
                    icon: 'success',
                    title: response.message,
                    showConfirmButton: false,
                    timer: 1500
                })
                fetchdata();
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const fetchdata = async () => {
            try {

                const response = await ProfileAccount(idRole, token);

                setUserData({
                    FullName: response.fullName,
                    UserName: response.username,
                    Email: response.email,
                    Phone: response.phone,
                    Birthday: response.birthday,
                    Avatar: response.avatar,
                    AvatarImage: response.avatar
                })
                localStorage.setItem("username", response.username)
                console.log(localStorage.getItem("username"))
            } catch (error) {
                console.log(error)
            }
        }
        fetchdata();
    }, [])

    const handleDateChange = (date) => {
        const formattedDate = date.toISOString().split('T')[0];
        setUserData({ ...userData, Birthday: formattedDate })
    }
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const render = new FileReader();
            render.onloadend = () => {
                setUserData((prevState) => ({
                    ...prevState,
                    AvatarImage: render.result
                }));
            };
            render.readAsDataURL(file);


            setUserData((prevState) => ({
                ...prevState,
                Avatar: file // Cập nhật Avatar với file thực tế
            }));
        }

    };
    const isValidDate = (dateString) => {
        const regexDate = /^\d{4}-\d{2}-\d{2}$/;
    
        if (!regexDate.test(dateString)) {
          return false;
        }
    
        const dateParts = dateString.split('-');
        const year = parseInt(dateParts[0]);
        const month = parseInt(dateParts[1]) - 1; 
        const day = parseInt(dateParts[2]);
    
        const dateObject = new Date(year, month, day);
    
        return (
          dateObject.getFullYear() === year &&
          dateObject.getMonth() === month &&
          dateObject.getDate() === day
        );
      };
    return (
        <div>


            <div className="wrapper">



                <LayoutAdmin />

                <div className="content-wrapper">
                    <section className="content-header">
                        <h1>
                            Account

                        </h1>
                        <ol className="breadcrumb">
                            <li><a href="#"><i className="fa fa-dashboard"></i> Home</a></li>
                            <li><a href="#">Account</a></li>
                        </ol>
                    </section>
                    <section className="content">
                        <div className="row">
                            <div className="col-md-3">
                                <div className="box box-primary" style={{ maxHeight: '542px' }}>
                                    <div className="box-header">
                                        <h3 className="box-title">Avatar</h3>
                                    </div>
                                    <form onSubmit={UpdateAvatar}>
                                        <div className="box-body">
                                            <div className="image-container">
                                                <img src={userData.AvatarImage} onClick={() => document.getElementById('fileInput').click()} style={{ cursor: 'pointer' }} alt="" className="profile-image" />
                                                <input type="file" id="fileInput" style={{ display: 'none' }} accept="image/*" onChange={handleFileChange} />
                                            </div>
                                        </div>
                                        <div className="box-footer">
                                            <button type="submit" className="btn btn-primary">
                                                save
                                            </button>
                                        </div>
                                    </form>

                                </div>

                            </div>
                            <div className="col-md-9">
                                <div className="box box-primary" style={{ maxHeight: '542px' }}>
                                    <div className="box-header">
                                        <h3 className="box-title">Account</h3>
                                    </div>
                                    <form role="form" onSubmit={UpdateProfile} >
                                        <div className="box-body">
                                            {/* Form fields go here */}
                                            <div className="form-group">
                                                <label >Full Name</label>
                                                <input className="form-control" value={userData.FullName} name="FullName" onBlur={()=>validateInput('FullName',userData.FullName)} onChange={handleUpdateProfile} id="exampleInputEmail1" placeholder="Enter Full Name" />
                                                {errors.FullName && (
                                                    <p className="text-red-500 text-sm italic">{errors.FullName}</p>
                                                )}                                            
                                                </div>
                                            <div className="form-group">
                                                <label >UserName</label>
                                                <input className="form-control" value={userData.UserName} onBlur={() => validateInput('Username', userData.UserName)} name="UserName" onChange={handleUpdateProfile} id="exampleInputEmail1" placeholder="Enter Username" />
                                                {errors.Username && (
                                                    <p className="text-red-500 text-sm italic">{errors.Username}</p>
                                                )}
                                            </div>
                                            <div className="form-group">
                                                <label >Email</label>
                                                <input className="form-control" value={userData.Email} name="Email" onBlur={()=>validateInput('Email',userData.Email)} onChange={handleUpdateProfile} id="exampleInputEmail1" placeholder="Enter Email" />
                                                {errors.Email && (
                                                    <p className="text-red-500 text-sm italic">{errors.Email}</p>
                                                )}
                                            </div>
                                            <div className="form-group">
                                                <label >Phone</label>
                                                <input className="form-control" value={userData.Phone} name="Phone" onBlur={()=>validateInput('Phone',userData.Phone)} onChange={handleUpdateProfile} id="exampleInputEmail1" placeholder="Enter Phone" />
                                                {errors.Phone && (
                                                    <p className="text-red-500 text-sm italic">{errors.Phone}</p>
                                                )}
                                            </div>
                                            <div className="form-group">
                                                <label >Birthday</label>
                                                <br />

                                                <DatePicker selected={userData.Birthday ? new Date(userData.Birthday).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]} onChange={handleDateChange} style={{ display: 'block' }} name='Birthday' dateFormat="dd/MM/yyyy"

                                                    className="form-control Date-picker"
                                                    placeholderText="Enter Birthday"
                                                // Cannot select a date before startDate
                                                />

                                            </div>


                                        </div>

                                        <div className="box-footer">
                                            <button type="submit" className="btn btn-primary">
                                                Submit
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                    </section>
                </div>

                <footer className="main-footer">
                    <div className="pull-right hidden-xs">
                        <b>Version</b> 2.0
                    </div>
                    <strong>Copyright &copy; 2014-2015 <a href="http://almsaeedstudio.com">Almsaeed Studio</a>.</strong> All rights reserved.
                </footer>

            </div>
        </div>
    )
}
export default Profile;