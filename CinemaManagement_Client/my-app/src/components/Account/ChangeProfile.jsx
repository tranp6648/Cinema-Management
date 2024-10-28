import React, { useEffect, useRef, useState } from "react";
import Menu from "../Menu/Menu";
import { ChangeProfileUser, CheckOTP, Forget, ProfileAccount } from "../Services/AccountService";
import '../Account/LostPassword.css';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie'
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
function LostPassword() {
    const [ForgetPass, setForgetPass] = useState({
        Email: ''
    });
    const [IsShowOtp, setIsShowOtp] = useState(false);
    const navigate = useNavigate();
    const [timeleft, setTimeLeft] = useState(120);
    const [otp, setOtp] = useState(["", "", "", ""]);
    const [createdTime, setCreatedTime] = useState(null);
    const inputRefs = useRef([]);



    const [userData, setUserData] = useState({
        AvatarImage: null,
        Phone: "",
        Birthday: null,
        Avatar: null,
        Email: "",
        UserName: "",
        FullName: "",
        Avatar: null,
        Password: ''
    })
    const getTokenFromCookies = () => {
        return Cookies.get('token');
    };
    const idRole = localStorage.getItem("Id");
    const token = getTokenFromCookies();
    const handleUpdateProfile = (e) => {

        setUserData({ ...userData, [e.target.name]: e.target.value })
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
    useEffect(() => {
        fetchdata();
    }, [])
    const UpdateProfile = async (e) => {
        e.preventDefault();
        if(userData.UserName=='' || userData.Email=='' || userData.Phone=='' || userData.FullName=='' || userData.Birthday==null || userData.Password==''){
            Swal.fire({
                icon: 'error',
                title: 'Please complete all information',
                showConfirmButton: false,
                timer: 1500
            })

        }
        try {
            const response = await ChangeProfileUser(idRole, {
                username: userData.UserName,
                email: userData.Email,
                phone: userData.Phone,
                fullName: userData.FullName,
                birthday: userData.Birthday,
                password:userData.Password
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
               
            }
        } catch (error) {
            console.log(error)
        }
    }
    const handleDateChange = (date) => {
        const formattedDate = date.toISOString().split('T')[0];
        setUserData({ ...userData, Birthday: formattedDate })
    }
    return (
        <div>
            <Menu />
            <div style={{ height: '296px', marginTop: '5px' }}>
                <div className="breadcrumb-area">
                    <div className="container">
                        <div className="breadcrumb-content">
                            <h2 className="font-bold" style={{ color: '#ffffff', textTransform: 'uppercase', textAlign: 'center', fontSize: '36px', marginBottom: '0', paddingBottom: '20px', fontFamily: '"Lato", sans-serif' }}>Account</h2>
                            <ul>
                                <li>
                                    <a href="" style={{ textDecoration: 'none' }}>Home</a>
                                </li>
                                <li className="active">Account -> Change Profile </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className='row_site' style={{ paddingTop: '160px', fontWeight: '600' }}>
                    <div className='container_site'>
                        <div id='main-content' className='main'>
                            <article id='post12' className='post-wrap post-12 page type-page status-publish hentry'>
                                <div className='woocommerce'>
                                    <div className='woocommerce-notices-wrapper'>

                                        <div className='u-columns col2-set'>
                                            <div className='u-column1 col-1' style={{ width: '48%' }}>
                                                <h2 className=" text-center" style={{ display: 'block', color: 'black', fontWeight: 'bold' }}>Change Profile</h2>
                                                <div className=" hiraola-tab_content">
                                                    <div id="Login" className={`tab-pane active show`}>
                                                        <form onSubmit={UpdateProfile} className='woocommerce-form woocommerce-form-login login' >
                                                            <p className='woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide'>
                                                                <label htmlFor="" className='username'>
                                                                    Email Address&nbsp;
                                                                    <span className='required'>*</span>
                                                                </label>
                                                                <input type="text" value={userData.Email} name='Email' onChange={handleUpdateProfile} className='woocommerce-Input woocommerce-Input--text input-text' />
                                                            </p>
                                                            <p className='woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide'>
                                                                <label htmlFor="" className='username'>
                                                                    Full Name&nbsp;
                                                                    <span className='required'>*</span>
                                                                </label>
                                                                <input type="text" value={userData.FullName} name='FullName' onChange={handleUpdateProfile} className='woocommerce-Input woocommerce-Input--text input-text' />
                                                            </p>
                                                            <p className='woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide'>
                                                                <label htmlFor="" className='username'>
                                                                    User Name&nbsp;
                                                                    <span className='required'>*</span>
                                                                </label>
                                                                <input type="text" name='UserName' value={userData.UserName} onChange={handleUpdateProfile} className='woocommerce-Input woocommerce-Input--text input-text' />
                                                            </p>
                                                            <p className='woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide'>
                                                                <label htmlFor="" className='username'>
                                                                    Phone&nbsp;
                                                                    <span className='required'>*</span>
                                                                </label>
                                                                <input type="text" name='Phone' value={userData.Phone} onChange={handleUpdateProfile} className='woocommerce-Input woocommerce-Input--text input-text' />
                                                            </p>
                                                            <p className='woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide'>
                                                                <label htmlFor="" className='username'>
                                                                    Password&nbsp;
                                                                    <span className='required'>*</span>
                                                                </label>
                                                                <input type="password" name='Password' value={userData.Password}  onChange={handleUpdateProfile} className='woocommerce-Input woocommerce-Input--text input-text' />
                                                            </p>
                                                            <p className='woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide'>
                                                                <label htmlFor="" className='username'>
                                                                    Birthday&nbsp;
                                                                    <span className='required'>*</span>
                                                                </label>
                                                                <DatePicker selected={userData.Birthday ? new Date(userData.Birthday).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]} onChange={handleDateChange} style={{ display: 'block' }} name='Birthday' dateFormat="dd/MM/yyyy"

                                                                    className="form-control "
                                                                    placeholderText="Enter Birthday"
                                                                // Cannot select a date before startDate
                                                                />


                                                            </p>
                                                            <button type="submit" className='woocommerce-button button woocommerce-form-login__submit' >Send</button>

                                                        </form>
                                                    </div>

                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}
export default LostPassword;