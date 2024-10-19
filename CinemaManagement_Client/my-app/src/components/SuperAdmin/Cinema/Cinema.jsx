import React, { useEffect, useState } from "react";
import '../admin.css';
import './Cinema.css'
import Cookies from 'js-cookie'
import Select from 'react-select'
import DatePicker from "react-datepicker";
import { GetAccountAdmin, Register } from "../../Services/AccountService";
import 'react-datepicker/dist/react-datepicker.css';
import Swal from "sweetalert2";
import { CreateCinema, GetCinema, UpdateCinema } from "../../Services/CinemaService";
import { CreateScreen, GetDetailScreen } from "../../Services/ScreenService";
function Cinema() {
  const [districts, setDistricts] = useState([]);
  const [Admin, setAdmin] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [roomSeats, setRoomSeats] = useState([]);
  const [vipSeats, setVipSeats] = useState({});
  const [seatCounts, setSeatCounts] = useState({});
  const [selectedCinemaId, setSelectedCinemaId] = useState(null);
  const [setupRoomPopupVisible, setSetupRoomPopupVisible] = useState(false);
  const [isPopupVisible, setIsPopupVisibile] = useState(false);
  const [IsClosingVisible, setIsClosingVisible] = useState(false);
  const [roomDetails, setRoomDetails] = useState([]);
  const [IsAddPopup, setIsAddPopup] = useState(false);
  const [Cinema, setCinema] = useState([]);
  const [vipSeatsCountByRoom, setVipSeatsCountByRoom] = useState({});
  const getTokenFromCookies = () => {
    return Cookies.get('token');
  };
  const handleCloseSeuptRoom = () => {
    setSetupRoomPopupVisible(false);
    setQuantityRoom('');
    setRoomDetails([])
  }
  const token = getTokenFromCookies();
  const [selectedDistrict, SetselectedDistrcit] = useState(null);
  const [SelectedUpdateDistrict, SetSelectedUpdateDistrict] = useState(null)
  const [selectedAdmin, SetselectedAdmin] = useState(null);
  const [FromData, setFromData] = useState({
    ID: '',
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
  const [IsClosingPopup, setIsClosingPopup] = useState(false);
  const [quantityRoom, setQuantityRoom] = useState('');
  const generateSeats = (index, seatCount) => {

    if (!Number.isNaN(seatCount) && seatCount <= 80) {
      const newSeats = Array.from({ length: seatCount }, (_, i) => ` ${i + 1}`);
      setRoomSeats((prevSeats) => {
        const updatedSeats = [...prevSeats];
        updatedSeats[index] = newSeats;
        return updatedSeats;
      });


      setSeatCounts((prevCounts) => ({
        ...prevCounts,
        [index]: seatCount,
      }));
    }
  };
  const handleClosepopup = () => {
    setIsClosingPopup(true);
    setTimeout(() => {
      FormData.ID = "";
      FormData.UpdateName = "";
      FormData.UpdateLocation = "";
      FormData.UpdatePhone = "";
      setPopupVisibility(false);
      setIsClosingPopup(false);
    }, 500);
  };

  const vipCount = vipSeatsCountByRoom[`Room${activeTab}`] || 0;
  const standardCount = seatCounts[activeTab] - vipCount;

  const handleRoomNameChange = (index, name) => {

    const newRoomDetails = [...roomDetails];
    newRoomDetails[index].roomName = name;
    setRoomDetails(newRoomDetails);
  };
  const handleSeatCountChange = (index, seatCount) => {
    if (seatCount > 80) {
      // Show error if seat count exceeds 80
      Swal.fire({
        icon: "error",
        title: "Too many seats",
        text: "The seat count cannot exceed 80",
      });
      return;
    }

    const newRoomDetails = [...roomDetails];
    newRoomDetails[index].seatCount = seatCount;
    console.log(newRoomDetails[index].seatCount)
    setRoomDetails(newRoomDetails);
    generateSeats(index, seatCount);
  };
  useEffect(() => {
    const newRoomSeats = Array.from({ length: quantityRoom }, () => []);
    setRoomSeats(newRoomSeats);
  }, [quantityRoom]);
  useEffect(() => {
    setRoomDetails(Array.from({ length: quantityRoom }, (_, index) => roomDetails[index] || { seatCount: 0, roomName: '' }));
  }, [quantityRoom]);

  const renderSeats = (seats) => {
    const rows = [];
    for (let i = 0; i < seats.length; i += 10) {
      const currentRowSeats = seats.slice(i, i + 10);
      rows.push(
        <div key={`row-${i}`} className="seat-row">
          {currentRowSeats.map((seat, index) => {
            const seatNumber = i + index + 1;
            const seatKey = `Room${activeTab}Seat${seatNumber}`;
            const isVip = vipSeats[seatKey];
            const seatClass = `seat-inDetail ${isVip ? 'vip' : ''}`;
            return (
              <div
                key={`seat-${index}`}
                className={seatClass}
                onClick={() => toggleSeatVip(seatNumber)} // Update this function to handle VIP toggle
              >
                {seat}
              </div>
            );
          })}
        </div>
      );
    }
    return <div>{rows}</div>;
  };

  const toggleSeatVip = (seatNumber) => {
    setVipSeats(prevSeats => {
      const seatKey = `Room${activeTab}Seat${seatNumber}`;
      const newVipSeats = {
        ...prevSeats,
        [seatKey]: !prevSeats[seatKey],
      };


      const currentVipCount = vipSeatsCountByRoom[`Room${activeTab}`] || 0;
      setVipSeatsCountByRoom({
        ...vipSeatsCountByRoom,
        [`Room${activeTab}`]: newVipSeats[seatKey] ? currentVipCount + 1 : currentVipCount - 1,
      });

      return newVipSeats;
    });
  };

  const handleSelectUpdateDistrict = (selectedOption) => {
    SetSelectedUpdateDistrict(selectedOption)
    console.log(selectedOption)
  }
  const handleQuantityRoomChange = (e) => {
    let value = e.target.value;


    value = value.replace(/^0+/, '');
    console.log(value)

    const numericValue = parseInt(value, 10);

    if (isNaN(numericValue) || numericValue < 1 || numericValue > 10) {
      Swal.fire({
        icon: "error",
        title: "Invalid Quantity",
        text: "Please enter a number greater than 0 and less than 10",
      });
      setQuantityRoom('');
    } else {
      setQuantityRoom(numericValue);

    }
  };
  const handleOpenSetupRoom = () => {
    if (quantityRoom < 1 || quantityRoom > 10) {
      Swal.fire({
        icon: "error",
        title: "Invalid Quantity",
        text: "Please enter a number greater than 0 and less than 10",
      });
    } else {
      setSetupRoomPopupVisible(true);
      setPopupVisibility(false)
    }
  };
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
        console.log(FromData.id)
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
  const [isPopupVisibleSetup, setPopupVisibility] = useState(false);
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
  const popupContentStyle1 = {
    background: "#FDFCF0",

    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    animation: "flipleft 0.5s", // Default animation
  };
  const renderRoomSetupForm = (index) => {
    return (
      <div className="w-[200px]">
        <form onSubmit={(e) => e.preventDefault()}>
          <label className="inputSeat text-white" htmlFor={`seatCount-room${index}`}>
            Enter seat count for Room {index + 1}:
          </label>
          <br />
          <input
            type="number"
            placeholder="Quantity seats"
            value={roomDetails[index]?.seatCount || ''}
            onChange={(e) => handleSeatCountChange(index, parseInt(e.target.value, 10))}
            className="seat-count-input"
          />
        </form>
        <form onSubmit={(e) => e.preventDefault()}>
          <label className="inputSeat text-white" htmlFor={`roomName-room${index}`}>
            Enter name for Room {index + 1}:
          </label>
          <br />
          <input
            type="text"
            placeholder="Name room"
            value={roomDetails[index]?.roomName || ''}
            onChange={(e) => handleRoomNameChange(index, e.target.value)}
            className="room-name-input"
          />
        </form>
        <ul class="showcase mt-14">
          <li>
            <div class="seat-inDetail-icon"></div>
            <small>Standard {isNaN(standardCount) ? 0 : standardCount}</small>
          </li>
          <li>
            <div class="seat-inDetail1-icon"></div>
            <small>Vip  {vipCount}</small>
          </li>

        </ul>

      </div>
    );
  };

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
      if (response.length > 0) {
        setAdmin(response);
      }


    } catch (error) {
      console.log(error)
    }
  }
  const fetchCinema = async () => {
    try {
      const response = await GetCinema(token);
      if (response.length > 0) {
        setCinema(response);
      }


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
  // const existAuditorium = (cinemaId) => {
  //     return Auditorium.some(auditorium => auditorium.idCinema === cinemaId);
  //   }

  const [selectedAuditorium, setSelectedAuditorium] = useState(null);
  const handleTabClick = (index) => {
    setActiveTab(index);
  };
  const handleSave = async () => {
    const roomData = roomDetails.map((room, index) => {
      const seats = roomSeats[index].map((_, seatIndex) => {
        const seatKey = `Room${index}Seat${seatIndex}`;
        const isVip = vipSeats[`Room${index}Seat${seatIndex + 1}`];
        return {
          name: `${seatIndex + 1}`,
          type: isVip ? "2" : "1",
        };
      });

      return {
        name: room.roomName,
        cinemaID: selectedCinemaId,
        seats,
        totalSeats: seats.length,
      };
    });
    const payload = roomData;
    const bodyData = payload.map(room => ({
      idCinema: selectedCinemaId,
      Capacity: room.totalSeats,
      name: room.name,
      details: room.seats.map(seat => ({
        idCategorySeat: seat.type
      }))

    }));



    const formData = new FormData();
    formData.append("createSeat", JSON.stringify(bodyData));

    const response = await CreateScreen(bodyData);
    if (response.result == true) {
      Swal.fire({
        icon: 'success',
        title: response.message,
        showConfirmButton: false,
        timer: 1500
      })
      setPopupVisibility(false);
      setIsClosingPopup(false);

    }

    //   payload.forEach(room => {
    //     room.seats.forEach(seat => {
    //         console.log(seat.name); 
    //     });
    // });
    // console.log(selectedCinemaId)
  }

  const handleSetupClick = (cinemaIdFromButton) => {
    setSelectedCinemaId(cinemaIdFromButton); // Store the selected cinema ID
    const selectedCinema = Cinema.find(Movie => Movie.id === cinemaIdFromButton);
    if (selectedCinema) {
      setFromData({ ...FormData, ID: cinemaIdFromButton });
    }
    setActiveTab(0);
    setPopupVisibility(true);
  }
  const generateSeatLayout = () => {
    // Ensure selectedAuditorium and its seats are defined
    if (!selectedAuditorium || !selectedAuditorium.seatDetails) {
      return null; // Return nothing or a placeholder if there's no data
    }
  
    // Use the seats data directly from selectedAuditorium
    const seats = selectedAuditorium.seatDetails;
    const rows = [];
    let seatNumber = 1;
    // Assuming that seats are sorted in the order they should be displayed
    for (let i = 0; i < seats.length; i += 10) {
      const rowSeats = seats.slice(i, i + 10); // Get seats for the current row
      const rowSeatsJSX = rowSeats.map(seat => {
        const seatClass = seat.idcategoryscreen === 2 ? 'vip' : '';
        const currentSeatNumber = seatNumber++;
        return (
          <div key={seat.id} className={`seat-inDetail ${seatClass}`}>
           {currentSeatNumber}
          </div>
        );
      });
      rows.push(
        <div key={`row-${i}`} className="seat-row">
          {rowSeatsJSX}
        </div>
      );
    }
  
    return <div className="seats-layout">{rows}</div>;
  };
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
  const [isPopupDetailSeat, setPopupDetailSeat] = useState(false)
  const [DetailScreen, setDetailScreen] = useState([])
  const handleDetailCinema = async (id) => {
    try {
      const response = await GetDetailScreen(id);
      if (response.length > 0) {
        setDetailScreen(response)
        setSelectedAuditorium(response[0]);
     
      }
      setPopupDetailSeat(true);
    } catch (error) {
      console.log(error)
    }
  }
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
                        <th>setup</th>

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
                          <td>
                            <button
                              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                              onClick={() => handleSetupClick(cinema.id)}
                            >
                              Setup
                            </button>
                          </td>
                          <td>
                            <button
                              className="bg-yellow-300 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded"
                              onClick={() => handleDetailCinema(cinema.id)}
                            >
                              Details
                            </button>
                          </td>
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
      {setupRoomPopupVisible && (
        <div className="popup-container">
          <div
            className="popup-content1"
            style={
              IsClosingPopup
                ? { ...popupContentStyle1, ...closingAnimation }
                : popupContentStyle1
            }
          >
            <div className="flex justify-end">
              <button
                onClick={() => handleCloseSeuptRoom()}
                className="close-btn"
              >
                X
              </button>
            </div>

            <div className="tabs">
              {Array.from({ length: quantityRoom }).map((_, i) => (
                <button
                  key={i}
                  className={`tab-item ${i === activeTab ? "active" : ""}`}
                  onClick={() => handleTabClick(i)}
                >
                  Room {i + 1}
                </button>
              ))}
            </div>

            <div className="w-full border-[black] border-[1px]"></div>
            <div className="tab-content">
              {renderRoomSetupForm(activeTab)}

              <div className="room-seats-layout">
                <div className="screen1"></div>
                {roomSeats[activeTab] && renderSeats(roomSeats[activeTab])}
              </div>
            </div>

            {activeTab < quantityRoom - 1 ? (
              <button
                onClick={() => setActiveTab(activeTab + 1)}
                className="next-btn bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded float-right"
              >
                Next
              </button>
            ) : (
              <button

                className="save-btn bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded float-right"
                onClick={handleSave}
              >
                Save
              </button>
            )}
          </div>
        </div>
      )}
      {isPopupVisibleSetup && (
        <div className="popup-container ">
          <div
            className="popup-content"
            style={
              IsClosingPopup
                ? { ...popupContentStyle, ...closingAnimation }
                : popupContentStyle
            }
          >
            <div className="flex justify-end">
              <button
                onClick={handleClosepopup}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded float-right "
              >
                <i className="fas fa-times"></i>
              </button>
            </div>

            <div className="form-group">
              <label className="float-left">Select Room Quantity</label>
              <input
                type="number"
                value={quantityRoom}
                onChange={handleQuantityRoomChange}
                className="form-control"
              />
            </div>
            <div className="flex justify-center">
              <button
                onClick={handleOpenSetupRoom}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded float-right "
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      {isPopupDetailSeat && (
        <div className="popup-container">
          <div
            className="popup-content1"
            style={IsClosingPopup ? { ...popupContentStyle1, ...closingAnimation } : popupContentStyle1}
          >
            <div className="flex justify-end">
              <button onClick={() => setPopupDetailSeat(false)} className="close-btn">
                X
              </button>
            </div>
            <div className="tabs">
              {DetailScreen.map((auditorium) => (
                <button
                  key={auditorium.id}
                  onClick={() => setSelectedAuditorium(auditorium)}
                  className={`tab-item ${selectedAuditorium && selectedAuditorium.id === auditorium.id ? 'active' : ''}`}
                >
                  Room {auditorium.name}
                </button>
              ))}
            </div>
            <div className="w-full border-[black] border-[1px]"></div>

            {selectedAuditorium && (
              <div className="auditorium-container">
                <h3 className="auditorium-name">{selectedAuditorium.name}</h3>
                <div className="seats-info">
                  <p className="total-seats">
                    <span className="label">Total Seats:</span>
                    {selectedAuditorium.capacity}
                  </p>
                  <p className="vip-seats">
                    <span className="label">VIP Seats:</span>
                    {selectedAuditorium.totalVipSeat}
                  </p>
                  <p className="normal-seats">
                    <span className="label">Normal Seats:</span>
                    {selectedAuditorium.totalNormal}
                  </p>
                </div>
              </div>
            )}

            <div className="seats-layout  flex justify-center">
              {selectedAuditorium && generateSeatLayout()}
            </div>
            <div>
              <ul class="showcase1">
                <li>
                  <div class="seat-inDetail-icon"></div>
                  <small>Standard</small>
                </li>
                <li>
                  <div class="seat-inDetail1-icon"></div>
                  <small>Vip </small>
                </li>

              </ul>
            </div>
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