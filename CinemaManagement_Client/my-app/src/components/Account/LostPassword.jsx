import React, { useEffect, useRef, useState } from "react";
import Menu from "../Menu/Menu";
import { CheckOTP, Forget } from "../Services/AccountService";
import '../Account/LostPassword.css';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
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

    const handleChange = (e, index) => {
        const value = e.target.value;

        if (/^[0-9]$/.test(value) || value === "") {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);


            if (value !== "" && index < 3) {
                inputRefs.current[index + 1].focus();
            }
        }
    };
    useEffect(() => {
        if (createdTime) {
            const currentTime = new Date();
            const createdDateTime = new Date(createdTime);
            const timeDiffInSeconds = Math.floor((currentTime - createdDateTime) / 1000);
            const remainingTime = 120 - timeDiffInSeconds;
            setTimeLeft(remainingTime > 0 ? remainingTime : 0);
        }
    }, [createdTime])
    useEffect(() => {
        let timer;
        if (timeleft > 0 && IsShowOtp) {
            timer = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);
        }
        return () => {
            clearInterval(timer);
        };
    }, [timeleft, IsShowOtp])
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && otp[index] === "" && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    }
    const handleInputChange = (e) => {
        setForgetPass({ ...ForgetPass, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (ForgetPass.Email == "") {
            Swal.fire({
                icon: 'error',
                title: 'Email is required',
                showConfirmButton: false,
                timer: 1500
            })
        } else {
            const currentTime = new Date();

            if (createdTime != null) {
                const createdDateTime = new Date(createdTime);
                const timeDifference = Math.floor((currentTime - createdDateTime) / 1000); // Difference in seconds
                console.log(timeDifference);
                console.log(createdTime);

                if (timeDifference > 120) {
                    // OTP has expired, request a new one
                    const responseData = await Forget(ForgetPass.Email);
                    if (responseData != null) {
                        setCreatedTime(responseData); // Set new created time
                        setIsShowOtp(true); // Show OTP input
                    } else {
                        console.error("Failed to retrieve new OTP");
                        // Handle error (e.g., show a message)
                    }
                } else {
                    // OTP is still valid, proceed to show the OTP input
                    setIsShowOtp(true);
                }
            } else {
                // First time generating OTP
                const response = await Forget(ForgetPass.Email);
                if (response != null) {
                    setCreatedTime(response); // Set created time from response
                    setIsShowOtp(true); // Show OTP input
                } else {
                    console.error("Failed to retrieve OTP");
                    // Handle error (e.g., show a message)
                }
            }
        }

    };

    const handleCheckOTP = async (e) => {
        e.preventDefault();
        const otpvalue = otp.join("");
        const response = await CheckOTP({
            otp: otpvalue,
            email: ForgetPass.Email
        })
        if (response) {
            setIsShowOtp(false)
            Swal.fire({
                icon: 'success',
                title: 'OTP is correct',
                showConfirmButton: false,
                timer: 1500
            }).then(() => {

                navigate("/ChangePassword", { state: { Email: ForgetPass.Email } })
            })
        }

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
                                <li className="active">Account -> forget-Password </li>
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
                                                <h2 className=" text-center" style={{ display: 'block' }}>Forget Password</h2>
                                                <div className=" hiraola-tab_content">
                                                    <div id="Login" className={`tab-pane active show`}>
                                                        <form onSubmit={handleSubmit} className='woocommerce-form woocommerce-form-login login' >
                                                            <p className='woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide'>
                                                                <label htmlFor="" className='username'>
                                                                    Email Address&nbsp;
                                                                    <span className='required'>*</span>
                                                                </label>
                                                                <input type="text" value={ForgetPass.Email} onChange={handleInputChange} name='Email' className='woocommerce-Input woocommerce-Input--text input-text' />
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
            {IsShowOtp && (
                <div className="otp-popup">
                    <div className="otp-popup-content relative">
                        <h3>Enter OTP</h3>
                        <form onSubmit={timeleft > 0 ? handleCheckOTP : handleSubmit}>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                {otp.map((digit, index) => (
                                    <input key={index} value={digit} maxLength={1} onChange={(e) => handleChange(e, index)} onKeyDown={(e) => handleKeyDown(e, index)}
                                        ref={(el) => (inputRefs.current[index] = el)} style={{
                                            width: '50px',
                                            height: '50px',
                                            textAlign: 'center',
                                            fontSize: '24px',
                                            border: '1px solid #ccc',
                                            borderRadius: '5px',
                                            outline: 'none'
                                        }} />
                                ))}
                            </div>
                            <p>{formatTime(timeleft)}</p>
                            <button type="submit" className="  ">{timeleft > 0 ? 'Check' : 'Send OTP'}</button>
                        </form>
                        <button onClick={() => setIsShowOtp(!IsShowOtp)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded float-right absolute  right-0" style={{ backgroundColor: 'red', top: '-10px' }}><i className="fas fa-times"></i></button>
                    </div>
                </div>
            )}

        </div>
    )
}
export default LostPassword;