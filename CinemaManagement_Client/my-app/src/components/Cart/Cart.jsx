import React, { useEffect, useRef, useState } from "react";
import './Cart.css';
import Swal from 'sweetalert2';
import Menu from "../Menu/Menu";
import ReactDOM from "react-dom";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

import FooterHome from "../footer/FooterHome";
import { GetSeat } from "../Services/ShowTimeService";
import { ShowComboItem } from "../Services/ComItemService";
import { CreateOrder } from "../Services/OrderService";

function Cart() {
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.state?.Id || '';

  const IDAccount = location.state?.IDAccount || '';
  const [total, settotal] = useState(0);
  
  const handleVNPaySuccess = async (Payment) => {
    try {
      const response = await fetch(`http://localhost:5231/api/Order/Add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          totalPrice: totalPrice.toFixed(0),
          idAccount: IDAccount,
          idseat: Info.map(item => item.id)
        }),
      });
      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: "Add  successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        const response = await axios.get(`http://localhost:5231/api/CardSet/ShowCard/${ID}/${IDAccount}/${IDtime}`);
        setSeat(response.data)
        const responsedata = await axios.get(`http://localhost:5231/api/CardSet/ShowInfoCard/${IDAccount}/${ID}/${IDtime}`);
        setInfo(responsedata.data)

        const calculatedTotalPrice = responsedata.data.reduce((acc, item) => acc + item.price, 0);
        setTotalPrice(calculatedTotalPrice);
      }
    } catch (error) {
      console.log(error);
    }

  };

  const handleVNPayError = (error) => {
    // Handle VNPay error
    console.error('VNPay payment error:', error);
  };

  const handlePaymentError = (error) => {
    // Handle payment error
    console.error('Payment error:', error);
  };
  const ID = location.state?.ID || '';
  const IDtime = location.state?.IDtime || '';
  const [seat, setSeat] = useState([]);
  const [Info, setInfo] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5231/api/CardSet/ShowInfoCard/${IDAccount}/${ID}/${IDtime}`);
        setInfo(response.data)
        console.log(response.data)
        const calculatedTotalPrice = response.data.reduce((acc, item) => acc + item.price, 0);

      } catch (error) {
        console.log(error)
      }
    }
    fetchData();
  }, [])
  const [seatDetail, setSeatDetail] = useState([]);
  const [combos, setCombos] = useState([
   
  ]);
  const fetchComboItem=async()=>{
    try{
      const response=await ShowComboItem();
      const seatWithStatus = response.map(seat => ({
        ...seat,
        Quantity: 0, // Assuming 0 means available by default; adjust as necessary
      }));
      setCombos(seatWithStatus)
    }catch(error){
      console.log(error)
    }
  }
  useEffect(() => {
    const fetchdata = async () => {
      try {

        const response = await GetSeat(id);
       
        if (response && response.seat && response.seat.length > 0) {
         

          setSeat(response); // Set the main seat data
          setSeatDetail(response.seat); // Set the detailed seat information
          console.log(response.seat)
        } else {
          console.log('No valid seat data found.');
          setSeatDetail([]); // Ensure seatDetail is always an array
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchdata();
    fetchComboItem();
  }, [])
  const Screen = () => {
    return (
      <div style={{
        backgroundColor: '#000',
        height: '50px',
        marginBottom: '20px',
        textAlign: 'center',
        color: '#fff',
        fontSize: '1.5em',
        lineHeight: '50px' // Center text vertically
      }}>
        Screen
      </div>
    );
  };
  const [hoveredSeat, setHoveredSeat] = useState(null);
  const [activeSeats, setActiveSeats] = useState([]);
  const [active, setActive] = useState(null);
  const rows = 8; // Specify the number of rows
  const columns = 9; // Specify the number of columns
  const [Copon, setCopon] = useState(false);
  const OpenCopen = () => {
    setCopon(!Copon)
  }
  const handleSeatHover = (seatdata) => {
    setHoveredSeat(seatdata);
  };
  const handleSeatLeave = () => {
    setHoveredSeat(null);
  };
  const [SelectedSeatNames, setSelectedSeatNames] = useState([]);
  const [SelectedSeatNameVip, setSelectedSeatNameVip] = useState([])
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [SeatCountNormal, setSeatCountNormal] = useState(0)
  const [SeatCountVip, setSeatCountVip] = useState(0);
  const [savedCombos, setSavedCombos] = useState([]);
  const idRole = localStorage.getItem("Id");
  const EmailCustomer = localStorage.getItem("Email");
  const handleCreateOrder=async(e)=>{
    e.preventDefault();

    try{

      const CreateComboOrder=savedCombos.map(seat=>{
       return{
        idCombo:seat.id,
        quantity:seat.quantity,
        price:seat.price
       }
      })
      const createOrderTicket = seatDetail
      .filter(seat => seat.status === 2)  // Filter seats with status 2
      .map(seat => {
        return {
          idSeat: seat.id,  
         
        
          price:seat.seatName.price.priceseat
        };
      });
      
     console.log(createOrderTicket)
      const response=await CreateOrder({
        totaPrice:totalPrice,
        idAccount:idRole,
        email:EmailCustomer,
        idShowtime:id,
        ticket:createOrderTicket,
        comboOrder:CreateComboOrder.length>0?CreateComboOrder:null
      })
   
      if(response.result!=null){
        Swal.fire({
          icon: 'success',
          title: response.message,
          showConfirmButton: false,
          timer: 1500
      })
      navigate("/Transfer", { state: { OrderCode:response.result} });
      }

    }catch(error){
      console.log(error)
    }
  }
  const handleDecreaseDetail = (seatid) => {
    const seatIndex = combos.findIndex((s) => s.id === seatid); // Find the combo by seatid
    const updatedSeatDetail = [...combos]; // Create a shallow copy of combos
  
    if (seatIndex !== -1 && updatedSeatDetail[seatIndex].Quantity > 0) {
      // Decrease the quantity of the selected combo by 1
      updatedSeatDetail[seatIndex].Quantity -= 1;
  
      // Update the total price by subtracting the combo's price
      setTotalPrice(totalPrice - updatedSeatDetail[seatIndex].price);
  
      // Create an updated combo object with id, name, and updated quantity
      const updatedCombo = {
        id: updatedSeatDetail[seatIndex].id,         // Save the combo id
        name: updatedSeatDetail[seatIndex].name,     // Save the combo name
        quantity: updatedSeatDetail[seatIndex].Quantity,
        price:updatedSeatDetail[seatIndex].price // Updated quantity
      };
  
      // Update the saved combos state
      setSavedCombos((prev) => {
        const existingComboIndex = prev.findIndex((c) => c.id === updatedCombo.id); // Find by id
  
        if (existingComboIndex !== -1) {
          const updatedSavedCombos = [...prev];
  
          if (updatedCombo.quantity === 0) {
            // If the quantity is 0, remove the combo from savedCombos
            return updatedSavedCombos.filter((c) => c.id !== updatedCombo.id); // Remove by id
          } else {
            // If it exists and quantity is not 0, update the quantity
            updatedSavedCombos[existingComboIndex].quantity = updatedCombo.quantity;
            return updatedSavedCombos;
          }
        }
  
        return prev; // Return previous state if combo is not found
      });
    }
  
    // Update the combos state with the updated details
    setCombos(updatedSeatDetail);
  };
  
  const handleCrease=(seatid)=>{
    const seatIndex = combos.findIndex((s) => s.id === seatid);
    const updatedSeatDetail = [...combos]; // Create a shallow copy of the combos array
  
    if (seatIndex !== -1) {
      updatedSeatDetail[seatIndex].Quantity += 1;
      setTotalPrice(totalPrice+updatedSeatDetail[seatIndex].price)
      const updatedCombo = {
        id:updatedSeatDetail[seatIndex].id,
        name: updatedSeatDetail[seatIndex].name,
        quantity: updatedSeatDetail[seatIndex].Quantity,
        price:updatedSeatDetail[seatIndex].price,
      };
      
      // Update the saved combos state
      setSavedCombos((prev) => {
        const existingComboIndex = prev.findIndex((c) => c.id === updatedCombo.id); // Check by id
  
        if (existingComboIndex !== -1) {
          // If the combo already exists in savedCombos, update its quantity
          const updatedSavedCombos = [...prev];
          updatedSavedCombos[existingComboIndex].quantity = updatedCombo.quantity;
          return updatedSavedCombos;
        } else {
          // If it's a new combo, add it to savedCombos
          return [...prev, updatedCombo];
        }
      });
    }
  
    // Update the combos state with the updated details
    setCombos(updatedSeatDetail);  
  }
  const handleUpdate = (seatId) => {
    // Find the index of the seat to be updated
    const seatIndex = seatDetail.findIndex((s) => s.id === seatId);

    // Clone the current seatDetail to maintain immutability
    const updatedSeatDetail = [...seatDetail];

    if (seatIndex !== -1) {
        const seat = updatedSeatDetail[seatIndex];

        // Kiểm tra xem số ghế đã chọn có đạt giới hạn 8 không
        if (seat.status !== 2 && selectedSeats.length >= 8) {
            alert("You can only select up to 8 seats.");
            
            return;
        }

        if (seat.status === 2) {
            // Nếu ghế đang ở trạng thái đã chọn, hủy chọn (đặt lại trạng thái 0)
            updatedSeatDetail[seatIndex].status = 0;
            setSelectedSeats((prevSelected) => prevSelected.filter((id) => id !== seatId));

            if (seat.categorySeat === 'VIP') {
                setSeatCountVip((prevCount) => prevCount - 1);
                setSelectedSeatNameVip((prevNames) => prevNames.filter((name) => name !== seat.seatName.name));
            } else {
                setSeatCountNormal((prevCount) => prevCount - 1);
                setSelectedSeatNames((prevNames) => prevNames.filter((name) => name !== seat.seatName.name));
            }
            // setTotalPrice(totalPrice - seat.price); // Cập nhật tổng giá nếu cần
        } else {
            // Ngược lại, chọn ghế (đặt trạng thái 2)
            updatedSeatDetail[seatIndex].status = 2;
            setSelectedSeats((prevSelected) => [...prevSelected, seatId]);

            setTotalPrice(totalPrice + seat.seatName.price.priceseat);

            if (seat.categorySeat === 'VIP') {
                setSeatCountVip((prevCount) => prevCount + 1);
                setSelectedSeatNameVip((prevNames) => [...prevNames, seat.seatName.name]);
            } else {
                setSeatCountNormal((prevCount) => prevCount + 1);
                setSelectedSeatNames((prevNames) => [...prevNames, seat.seatName.name]);
            }
        }

        // Update the seatDetail state
        setSeatDetail(updatedSeatDetail);
    }
};


  const [FormData, setFormData] = useState({
    ZipCode: '',
    Address: '',
    OrderNote: '',
    FullName: '',
    Phone: '',
    Email: '',
    check: ''
})
  const handleActive = (row, col) => {
    const seat = { row, col };

    // Check if the seat is already active
    const isActive = activeSeats.some((activeSeat) => (
      activeSeat.row === row && activeSeat.col === col
    ));

    // If it's active, remove it; otherwise, add it to the active seats
    setActiveSeats((prevActiveSeats) => (
      isActive
        ? prevActiveSeats.filter((activeSeat) => !(activeSeat.row === row && activeSeat.col === col))
        : [...prevActiveSeats, seat]
    ));
  };
 
  const renderCheckboxes = () => {
    const checkboxes = seatDetail.map((seatdata, index) => (
      <label key={index} aria-label={seatdata}
        onMouseEnter={() => handleSeatHover(seatdata)}
        onMouseLeave={handleSeatLeave} className="seat-label"
      >
        <input type="checkbox" placeholder={`${index}`} className={`${seatdata.status === 2 ? 'active unactive' : seatdata.categorySeat.category === 'VIP' ? 'active setlected' : 'unactive'}  ${seatdata.categorySeat.category === 'Normal' ? '' : 'unactive'} ${seatdata.status === 3 ? 'Selected':''}  `} disabled={seatdata.status==3} onClick={() => handleUpdate(seatdata.id)} value={seatdata.id} />
        <span className="seat-label-text">{seatdata.seatName.name}</span>
      </label>
    ));

    const result = [];
    for (let i = 0; i < checkboxes.length; i += 9) {
      result.push(
        <li key={i}>
          {checkboxes.slice(i, i + 9)}
        </li>
      );
    }

    return (
      <div style={{ position: 'relative', margin: '20px 0' }}>
        <Screen />
        <ol>{result}</ol>
      </div>
    );

  };
  const renderTabContent = () => {
    switch (activeTab) {
      case 1:
        return (
          <div className="elementor-column elementor-col-60 elementor-top-column">
            <div className="elementor-widget-wrap elementor-element-populated">
              <div className="elementor-widget elementor-widget-text-editor">
                <div className="elementor-widget-container">
                  <fieldset className="ui-cinema" style={{ fontSize: '26px' }}>
                    <ol>
                      {/* Ensure renderCheckboxes is not causing re-renders */}
                      {renderCheckboxes()}
                    </ol>
                  </fieldset>
                  <br />
                  <ul className="ui-color-key">
                    <li>Selected</li>
                    <li>VIP</li>
                    <li>Available</li>
                    <li>Unavailable</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );
        case 2:
          return (
            <div className="combo-selection" style={{ marginRight:'26vh' }}>
            <h2>Chọn Combo</h2>
            <div className="combo-container">
              {combos.map(combo => (
                <div key={combo.id} className="combo-item">
                  <div className="combo-info" style={{ display: 'flex', alignItems: 'center', gap: '10px' }} >
                    <img src={combo.banner} alt={combo.name} className="combo-image" width={50} height={50} style={{ height:'17vh' }} />
                   
                  </div>
                  <div>
                      <h3 style={{ color: 'black' }}>{combo.name}</h3>
                      <p style={{ margin: '0' }}>{combo.price.toLocaleString('vi-VN')} VNĐ</p>
                      <p>{combo.item.length>0 ?combo.item.map(com=>com.quantity+' '+com.nameItem).join('+'):''}</p>
                    </div>
                  <div className="combo-quantity" style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                    <button onClick={()=>handleDecreaseDetail(combo.id)}>-</button>
                    <span style={{ margin: '0 10px' }}>{combo.Quantity}</span>
                    <button onClick={()=>handleCrease(combo.id)}>+</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          );
       
      default:
        return null; // Handle other tabs or default case
    }
  };

  useEffect(() => {
    settotal(totalPrice.toFixed(0))
  }, [totalPrice])
  const [activeTab, setActiveTab] = useState(1);
  return (
    <div>
      <Menu></Menu>
      <div style={{ height: '296px', marginTop: '5px' }}>
        <div className="breadcrumb-area">
          <div className="container">
            <div className="breadcrumb-content">
              <h2 className="font-bold" style={{ color: '#ffffff', textTransform: 'uppercase', textAlign: 'center', fontSize: '36px', marginBottom: '0', paddingBottom: '20px', fontFamily: '"Lato", sans-serif' }}>Cart</h2>
              <ul>
                <li>
                  <a href="" style={{ textDecoration: 'none' }}>Home</a>
                </li>
                <li className="active">Cart</li>
              </ul>
            </div>
          </div>
        </div>

      </div>
      <div className="tab-navigation">

      </div>

      <div style={{ marginTop: '97px' }}>
      <ul className="tab-list">
  <li
    className={`tab-item ${activeTab === 1 ? 'active' : ''}`}
    onClick={() => setActiveTab(1)}
    style={{ color: activeTab === 1 ? 'white' : 'gray' }}
  >
       Chọn ghế
  </li>
  <li
    className={`tab-item ${activeTab === 2 ? 'active' : ''}`}
    onClick={() => setActiveTab(2)}
    style={{ color: activeTab === 2 ? 'white' : 'gray' }}
  >
 Chọn thức ăn
  </li>

</ul>

        <div className="elementor elementor-3729">
          <section className="elementor-section elementor-top-section elementor-section-boxed elementor-section-height-default">
            <div className="elementor-container elementor-column-gap-default" style={{ display: 'flex', justifyContent: 'space-between' }}>

              {/* Seat Selection Area */}
              {renderTabContent()}

              {/* Booking Information Area */}
              <div className="elementor-column elementor-col-40 elementor-top-column">
                <div className="cart-sidebar">
                  <div className="cart-info">
                    <div className="wp-cart-info mt-[54px]">
                      <div className="cart_title">
                        <h3 className="title">Booking Information</h3>
                      </div>

                      {/* Movie Image and Title */}
                      <div className="movie-info">
                        <img src={`http://localhost:5277/Images/${seat.imageMovie}`}
                          // Replace with the dynamic movie image URL
                          // Replace with the dynamic movie title
                          className="movie-poster"
                          style={{ width: '150px', borderRadius: '8px', marginBottom: '10px' }}
                        />
                        <h3 className="movie-title" style={{
                          fontSize: '18px',
                          marginBottom: '10px',
                          color: 'black',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          maxWidth: '200px'
                        }}>{seat.movie}</h3>
                        <div
                          className="theater-room"
                          style={{
                            fontSize: '20px',
                            color: '#555',
                            marginBottom: '8px',
                          }}
                        >
                          <b>{seat.cinema}</b>-Rạp {seat.screen}
                        </div>
                        <div
                          className="theater-room"
                          style={{
                            fontSize: '20px',
                            color: '#555',
                            marginBottom: '8px',
                          }}
                        >
                          Suất :<b>{seat.time}</b>-{seat.startDate}
                        </div>
                      </div>

                      <div className="content-cart-info">
                        <span className="placeholder" style={{ display: 'none' }}>Please Select Your Seat</span>
                        <div className="item-info " style={{ display: 'flex' }}>
                          <span style={{ fontSize: '20px', fontWeight: 'bold' }}>{SeatCountNormal > 0 ? SeatCountNormal + 'x Ghế đơn' : ''}</span>
                          <span style={{ fontSize: '20px' }}>{SelectedSeatNames.length > 0 ? 'Seat:' + SelectedSeatNames.join(', ') : ''}</span>
                        
                        </div>
                        <div className="item-info " style={{ display: 'flex' }}>
                          <span style={{ fontSize: '20px', fontWeight: 'bold' }}>{SeatCountVip > 0 ? SeatCountVip + 'x Ghế Vip' : ''}</span>
                          <span style={{ fontSize: '20px' }}>{SelectedSeatNameVip.length > 0 ? 'Seat:' + SelectedSeatNameVip.join(', ') : ''}</span>
                         
                        </div>
                        <div className="item-info " style={{ display: 'flex',flexDirection:'column' }}>
                        {savedCombos && savedCombos.length > 0 && savedCombos.map(save => (
                          <div>
 <span key={save.name} style={{ fontSize: '20px', marginRight: '10px' }}>
 {save.quantity}x {save.name}
  </span>
                          </div>
 
))}

                         
                        </div>

                      </div>
                    </div>
                
                    <div className="total-cart-info">
                      <span className="text">Total</span>
                      <span className="total-price">${total}</span>
                    </div>
                  </div>

                  {/* Buttons Section */}
                  <div className="cart-buttons" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                    <button className="btn-back" style={{ backgroundColor: '#fff', border: '1px solid #ff6600', color: '#ff6600', padding: '10px 30px', borderRadius: '5px', cursor: 'pointer' }} onClick={() => navigate('/back')}>
                      Quay lại
                    </button>
                    {activeTab == 2 ? (
                      <form onSubmit={handleCreateOrder}>
 <button
  type="submit"
    className="btn-continue"
    style={{
      backgroundColor: '#ff6600',
      border: 'none',
      color: '#fff',
      padding: '10px 30px',
      borderRadius: '5px',
      cursor: 'pointer',
    }}
   
  >
    Lưu

  </button>

                      </form>
 
) : (
  <>
  
  <button
  
    className="btn-continue"
    style={{
      backgroundColor: '#ff6600',
      border: 'none',
      color: '#fff',
      padding: '10px 30px',
      borderRadius: '5px',
      cursor: 'pointer',
    }}
   
  >
        Tiếp tục
  </button>


  </>
 
)}

                    
                  </div>


                </div>
              </div>


            </div>
          </section>
        </div>
        <FooterHome />
      </div>


    </div>
  )

}
export default Cart;