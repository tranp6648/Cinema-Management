import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { Register } from "../../Services/AccountService";
import Swal from "sweetalert2";
function ManagerAdmin() {
    const [FromData, setFromData] = useState({
        FullName: '',
        Birthday:null,
        Username:'',
        Email:'',
        Phone:''
    })
    const handleBirthday = (date) => {
        const formattedDate = date.toISOString().split('T')[0];
        setFromData({ ...FromData, Birthday: formattedDate });
    }
    const handleCreateCinema=async(e)=>{
        e.preventDefault();
        try{
            const response=await Register({
                fullName:FromData.FullName,
                email:FromData.Email,
                phone:FromData.Phone,
                birthday:FromData.Birthday,
                username:FromData.Username,
                accountType:1
            })
            if(response.result==true){
                Swal.fire({
                    icon: 'success',
                    title: response.message,
                    showConfirmButton: false,
                    timer: 1500
                })
              setFromData({
                FullName: '',
                Birthday:null,
                Username:'',
                Email:'',
                Phone:''
              })
            }
        }catch(error){
            console.log(error)
        }
    }
    const today = new Date();
    const maxBirthdate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
    return (

        <div>


            <div className="wrapper">






                <div className="content-wrapper">
                    <section className="content-header">
                        <h1>
                            Account Admin

                        </h1>
                        <ol className="breadcrumb">
                            <li><a href="#"><i className="fa fa-dashboard"></i> Home</a></li>
                            <li><a href="#">Manager Admin</a></li>
                        </ol>
                    </section>
                    <section className="content">
                        <div className="row">
                            <div className="box box-primary" style={{ maxHeight: 'auto' }}>

                                <div className="box-header">
                                    <h3 className="box-title">Create Account Admin</h3>
                                </div>
                                <form role="form" onSubmit={handleCreateCinema}>
                                    <div className="box-body">
                                        <div className="form-group">
                                            <label >Full Name</label>
                                            <input className="form-control" value={FromData.FullName} onChange={(e) => setFromData({ ...FromData, FullName: e.target.value })} id="exampleInputEmail1" placeholder="Enter Full Name" />

                                        </div>
                                        <div className="form-group">
                                            <label >User Name</label>
                                            <input className="form-control" value={FromData.Username} onChange={(e)=>setFromData({...FromData,Username:e.target.value})} id="exampleInputEmail1" placeholder="Enter Full Name" />

                                        </div>
                                        <div className="form-group">
                                            <label >Email</label>
                                            <input className="form-control"value={FromData.Email} onChange={(e)=>setFromData({...FromData,Email:e.target.value})} id="exampleInputEmail1" placeholder="Enter Full Name" />

                                        </div>
                                        <div className="form-group">
                                            <label >Phone</label>
                                            <input className="form-control" id="exampleInputEmail1" value={FromData.Phone} onChange={(e)=>setFromData({...FromData,Phone:e.target.value})} placeholder="Enter Full Name" />

                                        </div>
                                        <div className="form-group">
                                            <label >Birthday</label>
                                            <br />
                                            <DatePicker name='Birthday'  dateFormat="dd/MM/yyyy"
                                              className="form-control Date-pick"
                                                placeholderText="Enter Birthday"
                                                maxDate={maxBirthdate}
                                                selected={FromData.Birthday}
                                                showYearDropdown
                                                scrollableYearDropdown
                                                yearDropdownItemNumber={100}
                                                onChange={handleBirthday}
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
                    </section>
                </div>




            </div>



        </div>


    )
}
export default ManagerAdmin;