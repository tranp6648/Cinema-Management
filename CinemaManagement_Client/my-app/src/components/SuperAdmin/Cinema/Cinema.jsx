import React, { useEffect, useState } from "react";
import '../admin.css';
import Cookies from 'js-cookie'
import Select from 'react-select'
import DatePicker from "react-datepicker";
import { GetAccountAdmin, Register } from "../../Services/AccountService";
import 'react-datepicker/dist/react-datepicker.css';
import Swal from "sweetalert2";
import { CreateCinema, GetCinema, UpdateCinema } from "../../Services/CinemaService";
function Cinema() {
    const [districts, setDistricts] = useState([]);
    const [Admin, setAdmin] = useState([]);
    const [isPopupVisible, setIsPopupVisibile] = useState(false);
    const [IsClosingVisible, setIsClosingVisible] = useState(false);

    const [IsAddPopup, setIsAddPopup] = useState(false);
    const [Cinema, setCinema] = useState([]);
    const getTokenFromCookies = () => {
        return Cookies.get('token');
    };
    const token = getTokenFromCookies();
    const [selectedDistrict, SetselectedDistrcit] = useState(null);
    const [SelectedUpdateDistrict, SetSelectedUpdateDistrict] = useState(null)
    const [selectedAdmin, SetselectedAdmin] = useState(null);
    const [FromData, setFromData] = useState({
        UserName: '',
        FullName: '',
        Email: '',
        Name: '',
        Phone: '',
        Birthday: null,
        Address: '',
        PhoneNumber: '',
        UpdateName: '',
        id: '',
        UpdateAddress: '',
        UpdatePhoneNumber: ''

    })
    const [SeletedUpdateAdmin, SetSelectedUpdateAdmin] = useState(null);
    const handleSelectUpdateDistrict = (selectedOption) => {
        SetSelectedUpdateDistrict(selectedOption)
        console.log(selectedOption)
    }
    const handleSelectUpdateAdmin = (selectedOption) => {
        SetSelectedUpdateAdmin(selectedOption);
    }
    const handleSelectAdmin = (selectedOption) => {
        SetselectedAdmin(selectedOption)
    }
    const handleUpdateNameChange = (e) => {
        const updatedName = e.target.value.split(' - ')[0];
        setFromData({
            UpdateName: updatedName
        })
    }
    const handleNameChange = (e) => {

        const updatedName = e.target.value.split(' - ')[0];
        setFromData({
            Name: updatedName
        })
    };
    const handleDistrictChange = (selectedOption) => {
        SetselectedDistrcit(selectedOption);
    };
    let combinedName = `${FromData.Name}${selectedDistrict ? ' - ' + selectedDistrict.label : ''}`;
    let CombineUpdateName = `${FromData.UpdateName}${SelectedUpdateDistrict?.label ? ' - ' + SelectedUpdateDistrict.label : ' - ' + SelectedUpdateDistrict}`;

    const handleEditCinema = (Id) => {
        const SelectedCinema = Cinema.find(cinema => cinema.id == Id);

        if (SelectedCinema) {
            const Name = SelectedCinema.name.split(' - ')[0];
            FromData.UpdateName = Name;
            FromData.id = Id;
            SetSelectedUpdateAdmin(SelectedCinema.manager.idManager);
            SetSelectedUpdateDistrict(SelectedCinema.district);
            FromData.UpdateAddress = SelectedCinema.address;
            FromData.UpdatePhoneNumber = SelectedCinema.phoneNumber;
        }

        setIsPopupVisibile(true)
    }

    const SubmitAddCinema = async (e) => {
        e.preventDefault();
        try {

            const response = await CreateCinema({
                district: selectedDistrict?.label,
                idManager: selectedAdmin?.value,
                name: combinedName,
                address: FromData.Address,
                phoneNumber: FromData.PhoneNumber
            }, token)
            if (response.result == true) {
                Swal.fire({
                    icon: 'success',
                    title: response.message,
                    showConfirmButton: false,
                    timer: 1500
                })
                SetselectedDistrcit(null);
                SetselectedAdmin(null);
                combinedName = '';
                FromData.Address = '';
                FromData.PhoneNumber = ''
            }
        } catch (error) {
            console.log(error)
        }
    }
    const SubmitUpdateCinema = async (e) => {
        e.preventDefault();
        try {
            if (FromData.UpdateName == '') {
                Swal.fire({
                    icon: 'error',
                    title: 'Name is Required',
                    showConfirmButton: false,
                    timer: 1500
                })
            } else {
                const response = await UpdateCinema(FromData.id, {
                    district: SelectedUpdateDistrict?.label == undefined ? SelectedUpdateDistrict : SelectedUpdateDistrict?.label,
                    idManager: SeletedUpdateAdmin?.value == undefined ? SeletedUpdateAdmin : SeletedUpdateAdmin?.value,
                    name: CombineUpdateName,
                    address: FromData.UpdateAddress,
                    phoneNumber: FromData.UpdatePhoneNumber
                }, token)
                if (response.result == true) {
                    Swal.fire({
                        icon: 'success',
                        title: response.message,
                        showConfirmButton: false,
                        timer: 1500
                    })
                    setIsPopupVisibile(false);

                }
            }
        } catch (error) {
            console.log(error)
        }
    }
    const SubmitAddAccount = async (e) => {
        e.preventDefault();
        try {
            const response = await Register({
                fullName: FromData.FullName,
                email: FromData.Email,
                phone: FromData.Phone,
                birthday: FromData.Birthday,
                username: FromData.UserName,
                accountType: 1
            })
            if (response.result == true) {
                Swal.fire({
                    icon: 'success',
                    title: response.message,
                    showConfirmButton: false,
                    timer: 1500
                })
                setIsAddPopup(false)
                setFromData({
                    UserName: '',
                    FullName: '',
                    Email: '',
                    Phone: '',
                    Birthday: null
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
    const handleBirthday = (date) => {
        const formattedDate = date.toISOString().split('T')[0];
        setFromData({ ...FromData, Birthday: formattedDate });
    }
    const [isClosingPopup, setisClosingPopup] = useState(false);
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
    const handleAddAccount = () => {
        setIsAddPopup(true);
    }
    const handleCloseAddAccount = () => {
        setisClosingPopup(true);
        setTimeout(() => {

            setIsAddPopup(false)
            setisClosingPopup(false)

        }, 500);
    }

    const fetchAdmin = async () => {
        try {
            const response = await GetAccountAdmin(token);

            setAdmin(response);

        } catch (error) {
            console.log(error)
        }
    }
    const fetchCinema = async () => {
        try {
            const response = await GetCinema(token);
            console.log(response)
            setCinema(response);
        } catch (error) {
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
        fetchCinema();

    }, [])

    const today = new Date();
    const maxBirthdate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
    const options = districts.map(district => ({
        value: district.id,
        label: district.name,
    }));
    const optionAccount = Admin.map(admin => ({
        value: admin.id,
        label: admin.username
    }))

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
                                <form role="form" onSubmit={SubmitAddCinema}>
                                    <div className="box-body">
                                        <div className="form-group">
                                            <label >Account</label>
                                            <Select options={Admin.map(nation => ({ value: nation.id, label: nation.username }))}
                                                onChange={handleSelectAdmin}
                                                value={selectedAdmin}
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
                                            <label >District</label>
                                            <Select options={districts.map(nation => ({ value: nation.id, label: nation.name }))}
                                                onChange={handleDistrictChange}
                                            />

                                        </div>

                                        <div className="form-group">
                                            <label >Name</label>
                                            <input className="form-control" id="exampleInputEmail1" placeholder="Enter Name " value={combinedName} onChange={handleNameChange} />

                                        </div>
                                        <div className="form-group">
                                            <label >Address</label>
                                            <input className="form-control" value={FromData.Address} onChange={(e) => setFromData({ ...FromData, Address: e.target.value })} id="exampleInputEmail1" placeholder="Enter Name " />

                                        </div>
                                        <div className="form-group">
                                            <label >Phone Number</label>
                                            <input className="form-control" id="exampleInputEmail1" value={FromData.PhoneNumber} onChange={(e) => setFromData({ ...FromData, PhoneNumber: e.target.value })} placeholder="Enter Name " />

                                        </div>




                                    </div>

                                    <div className="box-footer">
                                        <button type="submit" className="btn btn-primary">
                                            Submit
                                        </button>
                                    </div>
                                </form>
                            </div>
                            <div className="box">
                                <div className="box-header">
                                    <h3 className="box-title">List Cinema</h3>
                                </div>
                                <div className="flex items-center space-x-4 float-left flex-1 mb-2 ml-2">
                                    <label for="search" className="text-gray-600">Search</label>
                                    <input type="text" id="search" name="search" placeholder="Enter your search term" className="border border-gray-300 px-3 py-1 rounded-md focus:outline-none focus:border-blue-500" />
                                </div>


                                <div className="box-body">
                                    <table id="example1" className="table table-bordered table-striped">
                                        <thead>
                                            <tr>
                                                <th>Operating status</th>
                                                <th>#</th>
                                                <th>Name</th>
                                                <th>District</th>
                                                <th>Address</th>
                                                <th>Phone Number</th>
                                                <th>Manager</th>
                                                <th>Edit</th>
                                                {Cinema.status == true && (
                                                    <th>Closed</th>
                                                )}

                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Cinema.map((cinema, index) => (
                                                <tr>
                                                    <td>

                                                        {cinema.status ? (
                                                            <span className="text-green-500">🟢 Open</span>
                                                        ) : (
                                                            <span className="text-red-500">🔴 Closed</span>
                                                        )}
                                                    </td>
                                                    <td>{index + 1}</td>
                                                    <td>{cinema.name}</td>
                                                    <td>{cinema.district}</td>
                                                    <td>{cinema.address}</td>
                                                    <td>{cinema.phoneNumber}</td>
                                                    <td>{cinema.manager.managerAdmin}</td>
                                                    <td><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleEditCinema(cinema.id)}>Edit</button></td>
                                                    {Cinema.status == true && (
                                                        <td><button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" >Closed</button></td>
                                                    )}

                                                </tr>
                                            ))}
                                        </tbody>

                                    </table>


                                </div>
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
                        <form role="form" onSubmit={SubmitAddAccount}>
                            <div className="box-body">

                                <div className="form-group">
                                    <label className='float-left'>FullName</label>
                                    <input className="form-control " value={FromData.FullName} onChange={(e) => setFromData({ ...FromData, FullName: e.target.value })} id="exampleInputEmail1" placeholder="Enter Full Name" />

                                </div>
                                <div className="form-group">
                                    <label className='float-left'>Email</label>
                                    <input className="form-control " value={FromData.Email} onChange={(e) => setFromData({ ...FromData, Email: e.target.value })} id="exampleInputEmail1" placeholder="Enter Email" />

                                </div>
                                <div className="form-group">
                                    <label className='float-left'>User Name</label>
                                    <input className="form-control " value={FromData.UserName} onChange={(e) => setFromData({ ...FromData, UserName: e.target.value })} id="exampleInputEmail1" placeholder="Enter User Name" />

                                </div>
                                <div className="form-group">
                                    <label className='float-left'>Birthday</label>
                                    <br />
                                    <DatePicker name='Birthday' selected={FromData.Birthday} dateFormat="dd/MM/yyyy"
                                        className="form-control AddPicker"
                                        placeholderText="Enter Birthday"
                                        onChange={handleBirthday}
                                        maxDate={maxBirthdate}
                                        showYearDropdown
                                        scrollableYearDropdown
                                        yearDropdownItemNumber={100}

                                    />
                                </div>
                                <div className="form-group">
                                    <label className='float-left'>Phone</label>
                                    <input className="form-control " value={FromData.Phone} onChange={(e) => setFromData({ ...FromData, Phone: e.target.value })} id="exampleInputEmail1" placeholder="Enter Phone" />

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

            {isPopupVisible && (
                <div className="popup-container">

                    <div className="popup-content" style={IsClosingVisible ? { ...popupContentStyle, ...closingAnimation } : popupContentStyle}>
                        <div className='flex justify-end'>
                            <button onClick={handleCloseAddAccount} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded float-right "><i className="fas fa-times"></i></button>
                        </div>

                        <div >

                            <h3 className="box-title">Edit Cinema</h3>
                        </div>
                        <form role="form" onSubmit={SubmitUpdateCinema}>
                            <div className="box-body">
                                <div className="form-group">
                                    <label className="float-left">Account</label>
                                    <br />
                                    <Select options={optionAccount}
                                        value={SeletedUpdateAdmin?.value === undefined
                                            ? optionAccount.find(Admin => Admin.value === SeletedUpdateAdmin)
                                            : optionAccount.find(Admin => Admin.value === SeletedUpdateAdmin?.value)
                                        }
                                        onChange={handleSelectUpdateAdmin}
                                        className="custom-select"
                                    />

                                </div>
                                <div className="form-group">
                                    <label className="float-left">District</label>
                                    <br />
                                    <Select options={options}
                                        value={
                                            SelectedUpdateDistrict?.label === undefined
                                                ? options.find(district => district.label === SelectedUpdateDistrict)
                                                : options.find(district => district.label === SelectedUpdateDistrict?.label)
                                        }
                                        onChange={handleSelectUpdateDistrict}

                                    />

                                </div>
                                <div className="form-group">
                                    <label className="float-left">Name</label>
                                    <input className="form-control" id="exampleInputEmail1" placeholder="Enter Name" value={CombineUpdateName} onChange={handleUpdateNameChange} />

                                </div>
                                <div className="form-group">
                                    <label className="float-left">Address</label>
                                    <input className="form-control" id="exampleInputEmail1" placeholder="Enter Address" value={FromData.UpdateAddress} onChange={(e) => setFromData({ ...FromData, UpdateAddress: e.target.value })} />

                                </div>
                                <div className="form-group">
                                    <label className="float-left">Phone Number</label>
                                    <input className="form-control" id="exampleInputEmail1" placeholder="Enter Phone Number" value={FromData.UpdatePhoneNumber} onChange={(e) => setFromData({ ...FromData, UpdatePhoneNumber: e.target.value })} />

                                </div>





                            </div>

                            <div className="box-footer">
                                <button type="submit" className="btn btn-primary">
                                    Update
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