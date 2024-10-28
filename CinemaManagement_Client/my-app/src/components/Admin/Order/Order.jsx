
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useLocation } from 'react-router-dom';
import Pagination from 'react-paginate';
import 'react-paginate/theme/basic/react-paginate.css';
import { GetOrderByAdmin, RejectOrder, SeatOrderReject, UpdateOrderStatus } from '../../Services/OrderService';
function Order() {

  const [searchTerm, setSearchtem] = useState('');
  const getTokenFromCookies = () => {
    return Cookies.get('token');
  };
  const token = getTokenFromCookies();
  const idRole = localStorage.getItem("Id");
  const [currentPage, setCurrentPage] = useState(0);
  const [perPage, setperPage] = useState(5);
  const [Picture, setPicture] = useState([]);
  const location = useLocation();
  const username = location.state?.username || 'Default Username';
  const ID = location.state?.ID || '';
  const navigate = useNavigate();
  const [Order, setOrder] = useState([]);
  const[seat,setseat]=useState([])
  const fetchData = async () => {
    try {
      const response = await GetOrderByAdmin(idRole, token)

      setOrder(response)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {

    fetchData();
  }, [])

  const handleUpdateOrder = async (id, email) => {
    try {
      const response = await UpdateOrderStatus(id, email, token);
      console.log(response)
      if (response.result == true) {
        Swal.fire({
          icon: 'success',
          title: response.message,
          showConfirmButton: false,
          timer: 1500
        })
        fetchData();
      }
    } catch (error) {
      console.log(error)
    }
  }

  const filterVoucher = Order.filter(voucher => (
    voucher.orderCode.toLowerCase().includes(searchTerm.toLowerCase())
  ))
  const indexOflastgen = (currentPage + 1) * perPage;
  const indexOfFirtgen = indexOflastgen - perPage;
  const currentGender = filterVoucher.slice(indexOfFirtgen, indexOflastgen)
  const handlePageclick = (data) => {
    setCurrentPage(data.selected);
  };
  const handleRejectOrder=async(id,idshowtime)=>{
    const response=await SeatOrderReject(id);
   
    const rejecorder=response.map(order=>{
      return{
        idseat:order.idseat,
        idshowtime:idshowtime
      }
    })
    const respon=await RejectOrder(id,{
      rejectOrders:rejecorder
    })
    if(respon==true){
      Swal.fire({
        icon: 'success',
        title: "Reject Success",
        showConfirmButton: false,
        timer: 1500
      })
      fetchData();
    }
  }
  return (
    <div>

      <div className="wrapper">




        <div className="content-wrapper">
          <section className="content-header">
            <h1>
              Order

            </h1>
            <ol className="breadcrumb">
              <li><a href="#"><i className="fa fa-dashboard"></i> Home</a></li>
              <li><a href="#">Order</a></li>
            </ol>
          </section>
          <section className="content">
            <div className="row">

              <div className="box">
                <div className="box-header">
                  <h3 className="box-title">list orders</h3>
                </div>
                <div className="flex items-center space-x-4 float-left flex-1 mb-2 ml-2">
                  <label for="search" className="text-gray-600">Search</label>

                  <input type="text" id="search" name="search" placeholder="Enter your search term" className="border border-gray-300 px-3 py-1 rounded-md focus:outline-none focus:border-blue-500" value={searchTerm} onChange={(e) => setSearchtem(e.target.value)} />

                </div>
                <div className="flex items-center space-x-4 float-right flex-1 mb-2 ml-2">
                  <label for="search" className="text-gray-600">Search</label>

                </div>
                <div className="box-body">
                  <table id="example1" className="table table-bordered table-striped">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Code orders</th>
                        <th>Customer</th>

                        <th>Day Order</th>
                        <th>Approved</th>
                        <th>refuse</th>
                        <th>Total Price</th>
                        <th>View</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentGender.map((order, index) => (
                        <tr>
                          <td>{index + 1}</td>
                          <td>{order.orderCode}</td>
                          <td>{order.account.fullName}</td>
                          <td>{new Date(order.orderDate).toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric' })}</td>
                          <td>
                            {order.status==2?"Đã thanh toán":  <button className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${order.status === 2 || order.status === 3 ? 'disabled-button' : ''}`} disabled={order.status === 2 || order.status === 3} onClick={() => handleUpdateOrder(order.id, order.account.email)}>Xác nhận thanh toán</button>}
                          
                          </td>
                          <td>
                            {order.status==3?"Chưa thanh toán": <button className={`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ${order.status === 2 || order.status === 3 ? 'disabled-button' : ''}`}
                              disabled={order.status === 2 || order.status === 3} onClick={() => handleRejectOrder(order.id,order.showTimeId                              )}>Chưa thanh toán</button>}
                           
                          </td>
                          <td>{order.totalPrice}</td>
                          <td><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => navigate(`/Admin/DetailOrder/${order.id}`, { state: { ID: order.id, totalprice: order.totalPrice } })}>Detail</button></td>
                        </tr>
                      ))}
                    </tbody>

                  </table>
                  <Pagination
                    previousLabel={'previous'}
                    nextLabel={'next'}
                    breakLabel={'...'}
                    pageCount={Math.ceil(filterVoucher.length / perPage)}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageclick}
                    containerClassName={'pagination'}
                    activeClassName={'active'}
                    previousClassName={'page-item'}
                    previousLinkClassName={'page-link'}
                    nextClassName={'page-item'}
                    nextLinkClassName={'page-link'}
                    breakClassName={'page-item'}
                    breakLinkClassName={'page-link'}
                    pageClassName={'page-item'}
                    pageLinkClassName={'page-link'}

                  />

                </div>
              </div>
              {/* Additional boxes go here */}
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
export default Order;