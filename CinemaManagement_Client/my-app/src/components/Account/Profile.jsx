import React, { useEffect, useState } from "react";
import LayoutAdmin from "../LayoutAdmin/LayoutAdmin";
import { ChangeProfile, ProfileAccount, UploadPhoto } from "../Services/AccountService";
import DatePicker from 'react-datepicker';
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
    const idRole = localStorage.getItem("Id");
    const role = localStorage.getItem("token");
    const handleUpdateProfile = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value })
    }
    const fetchdata = async () => {
        try {

            const response = await ProfileAccount(idRole, role);

            setUserData({
                FullName: response.fullName,
                UserName: response.username,
                Email: response.email,
                Phone: response.phone,
                Birthday: response.birthday,
                Avatar: response.avatar,
                AvatarImage: response.avatar
            })
            localStorage.setItem("username",response.username)
            localStorage.setItem("Avatar",response.avatar)
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
            }, role);
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
    const UpdateAvatar = async (e) => {
        e.preventDefault();
        try {

            const response = await UploadPhoto(idRole, userData.Avatar, role);
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

                const response = await ProfileAccount(idRole, role);

                setUserData({
                    FullName: response.fullName,
                    UserName: response.username,
                    Email: response.email,
                    Phone: response.phone,
                    Birthday: response.birthday,
                    Avatar: response.avatar,
                    AvatarImage: response.avatar
                })
                localStorage.setItem("username",response.username)
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

            // Update the userData state with the selected file
            setUserData((prevState) => ({
                ...prevState,
                Avatar: file // Cập nhật Avatar với file thực tế
            }));
        }
        console.log("Selected file:", userData.Avatar);
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
                                                <input className="form-control" value={userData.FullName} name="FullName" onChange={handleUpdateProfile} id="exampleInputEmail1" placeholder="Enter Full Name" />

                                            </div>
                                            <div className="form-group">
                                                <label >UserName</label>
                                                <input className="form-control" value={userData.UserName} name="UserName" onChange={handleUpdateProfile} id="exampleInputEmail1" placeholder="Enter Username" />

                                            </div>
                                            <div className="form-group">
                                                <label >Email</label>
                                                <input className="form-control" value={userData.Email} name="Email" onChange={handleUpdateProfile} id="exampleInputEmail1" placeholder="Enter Email" />

                                            </div>
                                            <div className="form-group">
                                                <label >Phone</label>
                                                <input className="form-control" value={userData.Phone} name="Phone" onChange={handleUpdateProfile} id="exampleInputEmail1" placeholder="Enter Phone" />

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