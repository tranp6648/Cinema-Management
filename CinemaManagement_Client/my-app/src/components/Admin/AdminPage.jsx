import { useEffect, useState, useRef } from 'react';

import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

import './admin.css';
import Layout from '../LayoutAdmin/LayoutAdmin';


import axios from 'axios';
import { Bar, Pie } from 'react-chartjs-2';
import Chart from 'chart.js/auto'; // Import the Chart object from 'chart.js/auto'
import { CategoryScale, LinearScale, BarController, Title } from 'chart.js';
import { CountShowTime } from '../Services/ShowTimeService';
import { CountOrderAdmin, GetCoutOrderAdmin } from '../Services/OrderService';

function AdminPage() {
  const canvasRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const username = location.state?.username || 'Default Username';
  const [orderData, setOrderData] = useState([]);
  const ID = location.state?.ID || '';
  const [showDropdown, setShowDropdown] = useState(false);
  const [Movie, setMovie] = useState(null);
  const [Actor, setActor] = useState(null);
  const [User, setUser] = useState(null);
  const [Event, setEvent] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [CategoryMovie, setCategoryMovie] = useState(null);
  const [Genre, setGenre] = useState(null);
  const [Username, setUsername] = useState([]);
  const [Order, setOrder] = useState(null);
  const [showtime, setshowtime] = useState(null);
  const idRole = localStorage.getItem("Id");
  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };
  useEffect(() => {
    const fetchProductCount = async () => {
      try {
        const response = await CountOrderAdmin(idRole);
        setCategoryMovie(response);
      } catch (error) {
        console.error('Error fetching product count:', error);
      }
    };

    fetchProductCount();
  }, [])
  useEffect(() => {
    const fetchProductCount = async () => {
      try {
        const response = await axios.get('http://localhost:5231/api/Movie/Orderdesc');
        setUsername(response.data);
      } catch (error) {
        console.error('Error fetching product count:', error);
      }
    };

    fetchProductCount();
  }, [])
  useEffect(() => {
    const fetchProductCount = async () => {
      try {
        const response = await axios.get('http://localhost:5231/api/Movie/CountShowtime');
        setshowtime(response.data);
      } catch (error) {
        console.error('Error fetching product count:', error);
      }
    };

    fetchProductCount();
  }, [])
  useEffect(() => {
    const fetchProductCount = async () => {
      try {
        const response = await axios.get('http://localhost:5231/api/Movie/CountOrder');
        setOrder(response.data.result);
      } catch (error) {
        console.error('Error fetching product count:', error);
      }
    };

    fetchProductCount();
  }, [])
  useEffect(() => {
    const fetchProductCount = async () => {
      try {
        const response = await axios.get('http://localhost:5231/api/Movie/CountGenre');
        setGenre(response.data);
      } catch (error) {
        console.error('Error fetching product count:', error);
      }
    };

    fetchProductCount();
  }, [])
  useEffect(() => {
    const fetchProductCount = async () => {
      try {
        const response = await axios.get('http://localhost:5231/api/Movie/CountEvent');
        setEvent(response.data);
      } catch (error) {
        console.error('Error fetching product count:', error);
      }
    };

    fetchProductCount();
  }, [])
  useEffect(() => {
    const fetchProductCount = async () => {
      try {
        const response = await axios.get('http://localhost:5231/api/Movie/countUser');
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching product count:', error);
      }
    };

    fetchProductCount();
  }, [])
 
  useEffect(() => {
    const fetchProductCount = async () => {
      try {
        const response = await axios.get('http://localhost:5231/api/Movie/CountActor');
        setActor(response.data);
      } catch (error) {
        console.error('Error fetching product count:', error);
      }
    };

    fetchProductCount();
  }, [])
  useEffect(() => {
    const fetchProductCount = async () => {
      try {
        const response = await CountShowTime(idRole);
        setMovie(response);
      } catch (error) {
        console.error('Error fetching product count:', error);
      }
    };

    fetchProductCount();
  }, []);
  const chartDataProduct = {
    labels: ['ShowTime','Order'],
    datasets: [{
      data: [Movie, CategoryMovie, Actor, User],
      backgroundColor: [
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 206, 86, 0.6)',
        'rgba(75, 192, 192, 0.6)',
        // Add more colors if you have more categories
      ],
    }],
  };
  useEffect(() => {
    // Register required chart.js components
    Chart.register(CategoryScale, LinearScale, BarController, Title);
  }, []);

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const response = await GetCoutOrderAdmin(selectedMonth,idRole);
        setOrderData(response);

      } catch (error) {
        console.error('Error fetching order data', error);
      }
    };

    fetchOrderData();
  }, [selectedMonth]);

  const chartOptions = {
    scales: {
      x: {
        type: 'category', // Specify the scale type as 'category' for the x-axis
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  const generateChartData = () => {
    const daysInMonth = new Date(new Date().getFullYear(), selectedMonth, 0).getDate();
    const chartData = Array.from({ length: daysInMonth }, (_, index) => 0);

    orderData.forEach((orderCount) => {
      const orderDay = new Date(orderCount.orderDate).getDate();
      chartData[orderDay - 1] = orderCount.orderCount;
    });

    return chartData;
  };

  const chartData = {
    labels: Array.from({ length: new Date(new Date().getFullYear(), selectedMonth, 0).getDate() }, (_, index) => index + 1),
    datasets: [
      {
        label: 'Number of Unique Orders',
        data: generateChartData(),
        backgroundColor: 'rgba(75,192,192,0.6)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
      },
    ],
  };

  return (
   



      <div className="content-wrapper">

        <section className="content-header">
          <h1>
            Dashboard
            <small>Control panel</small>
          </h1>
          <ol className="breadcrumb">
            <li><a href="#"><i className="fa fa-dashboard"></i> Home</a></li>
            <li className="active">Dashboard</li>
          </ol>
        </section>


        <section className="content">

          

          <div className="row">

            <section className="col-lg-7 connectedSortable">


              <div className="box box-success">

                <div className="box-body chat" id="chat-box">



                  {/* Dropdown to select the month */}
                  <Bar data={chartData} options={chartOptions} />
                  <label>Select Month:</label>
                  <select id="selectMonth"
                    className="form-select" value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
                    {[...Array(12).keys()].map((month) => (
                      <option key={month + 1} value={month + 1}>
                        {month + 1}
                      </option>
                    ))}
                  </select>

                </div>
                <div className="box-footer">
                  <div className="input-group">
                    <input className="form-control" placeholder="Type message..." />
                    <div className="input-group-btn">
                      <button className="btn btn-success"><i className="fa fa-plus"></i></button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="box box-primary">
                <div className="box box-solid bg-light-blue-gradient">
                  <div className="box-header">

                    <div className="pull-right box-tools">
                      <button className="btn btn-primary btn-sm daterange pull-right" data-toggle="tooltip" title="Date range"><i className="fa fa-calendar"></i></button>
                      <button className="btn btn-primary btn-sm pull-right" data-widget='collapse' data-toggle="tooltip" title="Collapse" ><i className="fa fa-minus"></i></button>
                    </div>

                    <i className="fa fa-map-marker"></i>
                    <h3 className="box-title">
                      Visitors
                    </h3>
                  </div>
                </div>
                <div className="box-header">


                </div>
                <div className="box-body">

                </div>

              </div>

              <div className="box box-info">
                <div className="box-header">
                  <i className="fa fa-envelope"></i>
                  <h3 className="box-title">Quick Email</h3>

                  <div className="pull-right box-tools">
                    <button className="btn btn-info btn-sm" data-widget="remove" data-toggle="tooltip" title="Remove"><i className="fa fa-times"></i></button>
                  </div>
                </div>

                {/* Dropdown to select the month */}
                <label>Select Month:</label>

                <div className="box-footer clearfix">
                  <button className="pull-right btn btn-default" id="sendEmail">Send <i className="fa fa-arrow-circle-right"></i></button>
                </div>
              </div>

            </section>
            <section className="col-lg-5 connectedSortable">


              <div className="box box-solid bg-light-blue-gradient">
                <div className="box-header">

                  <div className="pull-right box-tools">
                    <button className="btn btn-primary btn-sm daterange pull-right" data-toggle="tooltip" title="Date range"><i className="fa fa-calendar"></i></button>
                    <button className="btn btn-primary btn-sm pull-right" data-widget='collapse' data-toggle="tooltip" title="Collapse" ><i className="fa fa-minus"></i></button>
                  </div>

                  <i className="fa fa-map-marker"></i>
                  <h3 className="box-title">
                    Visitors
                  </h3>
                </div>

                <div className="box-footer no-border">
                  <Pie data={chartDataProduct} />

                </div>
              </div>



            </section>
          </div>

        </section>
      
      <footer className="main-footer">
        <div className="pull-right hidden-xs">
          <b>Version</b> 2.0
        </div>
        <strong>Copyright &copy; 2014-2015 <a href="http://almsaeedstudio.com">Almsaeed Studio</a>.</strong> All rights reserved.
      </footer>
    </div>

  )
}
export default AdminPage;