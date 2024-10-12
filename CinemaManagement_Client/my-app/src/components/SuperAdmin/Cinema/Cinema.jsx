import React, { useEffect, useState } from "react";
import '../admin.css';
import Cookies from 'js-cookie'
import Select from 'react-select'
import { GetAccountAdmin } from "../../Services/AccountService";
function Cinema() {
    const [districts, setDistricts] = useState([]);
    const[Admin,setAdmin]=useState([]);
    const[IsAddPopup,setIsAddPopup]=useState(false);
    const[isClosingPopup,setisClosingPopup]=useState(false);
    const popupContentStyle = {
        background: 'white',
        padding: '20px',
        maxWidth: '400px',
        textAlign: 'center',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        animation: 'flipleft 0.5s', // Default animation
    };
    const closingAnimation = {
        animation: 'flipright 0.5s',
    };
    const handleAddAccount=()=>{
        setIsAddPopup(true);
    }
    const handleCloseAddAccount = () => {
        setisClosingPopup(true);
        setTimeout(() => {

            setIsAddPopup(false)
            setisClosingPopup(false)
          
        }, 500);
    }
    const getTokenFromCookies = () => {
        return Cookies.get('token');
    };
    const token = getTokenFromCookies();
    const fetchAdmin=async()=>{
        try{
            const response = await GetAccountAdmin(token);
            console.log(response)
            if (Array.isArray(response)) {
                setAdmin(response);
            } else {
                console.error("Dữ liệu không phải là mảng:", response);
            }
        }catch(error){
            console.log(error)
        }
    }
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await fetch('/districts.json');
                const data = await response.json();
                setDistricts(data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchAdmin();
        fetchdata();
        
    }, [])
    return (

        <div>


            <div className="wrapper">






                <div className="content-wrapper">
                    <section className="content-header">
                        <h1>
                            Cinema

                        </h1>
                        <ol className="breadcrumb">
                            <li><a href="#"><i className="fa fa-dashboard"></i> Home</a></li>
                            <li><a href="#">Cinema</a></li>
                        </ol>
                    </section>
                    <section className="content">
                        <div className="row">
                            <div className="box box-primary" style={{ maxHeight: 'auto' }}>

                                <div className="box-header">
                                    <h3 className="box-title">Create Cinema</h3>
                                </div>
                                <form role="form" >
                                    <div className="box-body">

                                        <div className="form-group">
                                            <label >District</label>
                                            <Select options={districts.map(nation => ({ value: nation.id, label: nation.name }))}
                                                className="custom-select"
                                            />

                                        </div>
                                        <div className="form-group">
                                            <label >Account</label>
                                            <Select options={Admin.map(nation => ({ value: nation.id, label: nation.username }))}
                                                className="custom-select"
                                            />
                                            <button
                                                type="button"
                                                className="btn btn-secondary"
                                               onClick={handleAddAccount}
                                                style={{ marginTop: '10px' }} 
                                            >
                                                Create Admin
                                            </button>
                                        </div>
                                        <div className="form-group">
                                            <label >Name</label>
                                            <input className="form-control" id="exampleInputEmail1" placeholder="Enter Name " />

                                        </div>
                                        <div className="form-group">
                                            <label >Address</label>
                                            <input className="form-control" id="exampleInputEmail1" placeholder="Enter Name " />

                                        </div>
                                        <div className="form-group">
                                            <label >Phone Number</label>
                                            <input className="form-control" id="exampleInputEmail1" placeholder="Enter Name " />

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
                    </section>
                </div>




            </div>
            {IsAddPopup && (
                    <div className="popup-container">

                        <div className="popup-content" style={isClosingPopup ? { ...popupContentStyle, ...closingAnimation } : popupContentStyle}>
                            <div className='flex justify-end'>
                                <button onClick={handleCloseAddAccount} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded float-right "><i className="fas fa-times"></i></button>
                            </div>

                            <div >

                                <h3 className="box-title">Create Admin</h3>
                            </div>
                            <form role="form" >
                                <div className="box-body">
                                   
                                    <div className="form-group">
                                        <label className='float-left'>Name</label>
                                        <input className="form-control "  id="exampleInputEmail1" placeholder="Enter Name Genre" />

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
                )}


        </div>


    )
}
export default Cinema;