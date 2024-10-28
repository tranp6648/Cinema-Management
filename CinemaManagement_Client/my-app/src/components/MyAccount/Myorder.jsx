import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from 'react-router-dom';


import './Myorder.css';
import Swal from 'sweetalert2';

import 'slick-carousel/slick/slick.css';

import MenuHomepage from "../Menu/Menu";
import FooterHome from "../footer/FooterHome";
import axios from "axios";
import { ProfileAccount } from "../Services/AccountService";
import { HistoryOrder } from "../Services/OrderService";
function Myorder() {
    const location = useLocation();
    const [singleproduct, setsingleproduct] = useState(false);
    const [Listview, setListView] = useState(false);
    const [orderData, setorderData] = useState([]);
    const [waitorder, setwaitorder] = useState([]);
    const [delivery, setdelivery] = useState([]);
    const [deliveried, setdeliveried] = useState([]);
    const username = location.state?.username || 'Default Username';
    const [ActiveTab, setActiveTab] = useState('All');

    const navigate = useNavigate();
    const idRole = localStorage.getItem("Id");



    const [Information, setInformation] = useState([]);
    useEffect(() => {

        const fetchdata = async () => {
            try {
                const response = await ProfileAccount(idRole);
                setInformation(response);

            } catch (error) {
                console.log(error);
            }
        }
        fetchdata();
    }, [])
    useEffect(() => {
        const fetchdata = async () => {
            try {

                const response = await HistoryOrder(idRole);
                console.log(response)
                setorderData(response)
            } catch (error) {
                console.log(error)
            }
        }
        fetchdata();
    }, [])
    const handlePrint = () => {
        window.print();
    };
    function printProductDetails(product) {
        const ticketContent = `
        <p class="ticket-title">${product.title}</p>
        <p class="ticket-info">Seat name: ${product.seatname.length > 0
                ? 'Seat ' + product.seatname.map(item => {
                    const groupedSeats = item.seat.reduce((acc, seat) => {
                        const category = seat.categoryseat;
                        if (!acc[category]) {
                            acc[category] = [];
                        }
                        acc[category].push(seat.nameseat);
                        return acc;
                    }, {});

                    // Chuyển đổi các ghế theo loại thành chuỗi dạng "VIP: A1, B1 | Normal: C1, C2"
                    return Object.entries(groupedSeats)
                        .map(([category, seats]) => `${category}: ${seats.join(', ')}`)
                        .join(' | ');
                }).join(', ')
                : 'No seat assigned'}</p>
        <p class="ticket-info">Total Price: $${product.totalprice}</p>
     
        <p class="ticket-info">Time: ${new Date(product.time).toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric' })}</p>
    `;
        const printWindow = window.open('', '_blank');
        printWindow.document.open();
        printWindow.document.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Print Ticket</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                }
                .ticket-details {
                    border: 1px solid #ccc;
                    padding: 20px;
                    margin-bottom: 20px;
                }
                .ticket-title {
                    font-size: 20px;
                    font-weight: bold;
                    margin-bottom: 10px;
                }
                .ticket-info {
                    margin-bottom: 5px;
                }
            </style>
        </head>
        <body>
            <div class="ticket-details">
                ${ticketContent}
            </div>
        </body>
        </html>
    `);
        printWindow.document.close();
        printWindow.print();
    }
    const filteredData = ActiveTab === 'All'
        ? orderData
        : orderData.filter(product =>
            ActiveTab === 'Chưa duyệt' ? product.status === 1
                : product.status === 2);

    return (

        <div>

            <MenuHomepage />
            <div className="breadcrumb-area">
                <div className="container">
                    <div className="breadcrumb-content">
                        <h2 className="font-bold" style={{ color: '#ffffff', textTransform: 'uppercase', textAlign: 'center', fontSize: '36px', marginBottom: '0', paddingBottom: '20px', fontFamily: '"Lato", sans-serif' }}>My Order</h2>
                        <ul>
                            <li>
                                <a href="" style={{ textDecoration: 'none' }}>Home</a>
                            </li>
                            <li className="active">My Order</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="hiraola-product-tab_area-2 sp-product-tab_area">
                <div className="container">
                    <div className="row">
                        <div className="col-6">

                            <h2 style={{ color: 'black', fontSize: '30px' }}>User Information</h2>

                            <div className="user-info">
                                <p><strong>Full Name:</strong>{Information.username}</p>
                                <p><strong>Email:</strong>{Information.email} </p>

                                <p><strong>Phone:{Information.phone}</strong></p>
                            </div>





                        </div>
                        <div className="col-lg-6">

                            <div className="sp-product-tab_nav">
                                <div className="product-tab">
                                    <ul className="nav product-menu">
                                        {['All', 'Chưa duyệt', 'Đã duyệt'].map((tab) => (
                                            <li key={tab} className="product-menu-item">
                                                <a
                                                    id={`tab-${tab}`}
                                                    onClick={() => setActiveTab(tab)}
                                                    style={{
                                                        color: ActiveTab === tab ? "#cda557" : '#595959',
                                                        cursor: 'pointer',
                                                        fontFamily: '"Lato", sans-serif',
                                                        fontSize: '16px',
                                                        fontWeight: 'bold',
                                                        padding: '10px 20px',
                                                        borderBottom: ActiveTab === tab ? '2px solid #cda557' : 'none',
                                                        textDecoration: 'none',
                                                    }}
                                                >
                                                    {tab}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>

                                </div>

                                <div className="tab-content1 hiraola-tab_content" style={{ marginTop:'15px' }}>
                                    <div id={ActiveTab} className={`tab-pane active show`}>
                                        {filteredData.map((product, index) => (
                                            <div key={index} className="product-item">
                                                <div className="product-image">
                                                    <img src={`http://localhost:5277/Images/${product.image}`
                                                    } alt={product.name} />
                                                </div>

                                                <div className="product-details">
                                                    <p className="product-name cursor-pointer" >{product.title}</p>
                                                    <p className="product-quantity">Seat name:  {product.seatname.length > 0
                                                        ? 'Seat ' + product.seatname.map(item => {
                                                            const groupedSeats = item.seat.reduce((acc, seat) => {
                                                                const category = seat.categoryseat;
                                                                if (!acc[category]) {
                                                                    acc[category] = [];
                                                                }
                                                                acc[category].push(seat.nameseat);
                                                                return acc;
                                                            }, {});

                                                            // Chuyển đổi các ghế theo loại thành chuỗi dạng "VIP: A1, B1 | Normal: C1, C2"
                                                            return Object.entries(groupedSeats)
                                                                .map(([category, seats]) => `${category}: ${seats.join(', ')}`)
                                                                .join(' | ');
                                                        }).join(', ')
                                                        : 'No seat assigned'}</p>
                                                    <p className="product-price">Total Price: ${product.totalprice
                                                    }</p>


                                                    <p className="product-price">Time: {new Date(product.time).toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric' })}</p>

                                                    <p className="order-status">

                                                    </p>
                                                    <button className="print-ticket" onClick={() => printProductDetails(product)}>Print Ticket</button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>


                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>



            <FooterHome />


        </div>



    )
}
export default Myorder;