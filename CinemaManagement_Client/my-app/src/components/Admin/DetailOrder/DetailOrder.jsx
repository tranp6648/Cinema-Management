
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useLocation } from 'react-router-dom';
import Pagination from 'react-paginate';
import 'react-paginate/theme/basic/react-paginate.css';
import { GetAccountDetailOrder, GetComboSeatDetail, GetSeatDetailOrder } from '../../Services/OrderService';


function DetailOrder() {

    const [searchTerm, setSearchtem] = useState('');
    const [loading, setloading] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const getTokenFromCookies = () => {
        return Cookies.get('token');
    };
    const token = getTokenFromCookies();
    const [currentPage, setCurrentPage] = useState(0);
    const [perPage, setperPage] = useState(5);
    const [customer, setCustomer] = useState(null);
    const [Picture, setPicture] = useState([]);
    const location = useLocation();
    const [Acc, setAcc] = useState([]);
    const [shipprice, setshipprice] = useState([]);
    const username = location.state?.username || 'Default Username';
    const ID = location.state?.ID || '';
    const IDorder = location.state?.IDorder || '';
    const totalprice=location.state?.totalprice || 0;
    const [Combo,setCombo]=useState([])
    const [Movie,setMovie]=useState([]);
    const caculateTotalPrice = (quanlity, Price) => {
        return (quanlity * Price);
    }
    const [price,setprice]=useState(0);
    const fetchCombo=async()=>{
        try{
            const response=await GetComboSeatDetail(ID,token);
            console.log(response)
            setCombo(response);
        }catch(error){
            console.log(error)
        }
    }
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axios.get(`http://localhost:5231/api/Order/Voucherprice/${ID}`);
                setprice(response.data);
                
            } catch (error) {
                console.error("error fetching product", error)
            }
        }
        fetchdata();
    }, [price])
    
    const exportPdf = () => {
        const doc = new jsPDF();
    
        // Add header
        doc.setFont('Arial', 'bold');
        doc.setFontSize(14);
        doc.text('Fashion Infinity', 105, 10, { align: 'center' });
        doc.text('Order Summary', 105, 20, { align: 'center' });
        doc.line(20, 30, 190, 30);
    
        
        doc.setFont('Arial', 'bold');
        doc.setFontSize(12);
        doc.text('Information Customer', 20, 40);
    
        // Reset font for customer details
        doc.setFont('Arial', 'normal');
        doc.setFontSize(12);
   

        // Add customer information
        doc.text(`Customer Name: ${Acc ? Acc.fullName : ""}`, 20, 50);
        doc.text(`Email: ${Acc ? Acc.email : ""}`, 20, 60);
        doc.text(`Phone: ${Acc ? Acc.phone : ""}`, 20, 70); // Đổi y từ 80 thành 70
        doc.text(
            `Birthday: ${
                Acc
                    ? new Date(Acc.birthday).toLocaleString('en-GB', { 
                          day: 'numeric', 
                          month: 'short', 
                          year: 'numeric' 
                      })
                    : ""
            }`, 
            20, 80 // Sử dụng y là 80 cho dòng sinh nhật
        );
    
        let currentY = 90; // Adjust starting Y position based on customer info height
    
        // Add title for product details
        doc.setFont('Arial', 'bold');
        doc.setFontSize(12);
        doc.text('Detail Product', 20, currentY);
    
        // Reset font for product details
        doc.setFont('Arial', 'normal');
        doc.setFontSize(12);
    
        // Increment currentY to make space for the title
        currentY += 15;
    
        // Iterate through products and add to the PDF table
        seat.forEach((product, index) => {
            // Product Name
            const productNameLines = doc.splitTextToSize(`Name seat : ${product.name.nameseat}`, 160); // Adjust the width based on your needs
            productNameLines.forEach((line, lineIndex) => {
                doc.text(line, 20, currentY + lineIndex * 10);
            });
    
            // Quantity
         
    
            // Price
            doc.text(`Price: $${product.price}`, 20, currentY + productNameLines.length * 10 + 10);
    
            // Total
          
    
            currentY += productNameLines.length * 10 + 35; // Adjust spacing
        });
    
        // Add total prices
       
            doc.text(`Total pay: $${totalprice}`, 20, currentY  * 15);
        
    
        // Add ship price outside the table
        // if (shipprice.Price !== null && shipprice.Price !== undefined && shipprice.Price !== '') {
        //     doc.text(`Ship price: $${shipprice.Price}`, 20, currentY + uniqueTotalPrices.length * 15);
        // }
    
        // Save the PDF
        doc.save('order_summary.pdf');
    };
const [seat,setseat]=useState([])
const fetchSeatDetail=async()=>{
    try{
        const response=await GetSeatDetailOrder(ID,token);
        setseat(response);
    }catch(error){
        console.log(error);
    }
}
useEffect(() => {
    const fetchdata = async () => {
        try {
            const response = await axios.get(`http://localhost:5231/api/Order/SeatMovie/${ID}`);
            setseat(response.data);
            const calculatedTotalPrice = response.data.reduce((acc, item) => acc + item.price, 0);
            setTotalPrice(calculatedTotalPrice);
        } catch (error) {
            console.error("error fetching product", error)
        }
    }
    fetchdata();
    fetchSeatDetail();
    fetchCombo();
}, [])
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await GetAccountDetailOrder(ID,token)
                
                setAcc(response);
            } catch (error) {
                console.error("error fetching product", error)
            }
        }
        fetchdata();
    }, [])
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axios.get(`http://localhost:5231/api/Order/ViewCard/${ID}`);
                setMovie(response.data);
                console.log(response.data)
            } catch (error) {
                console.error("error fetching customer", error)
            }
        }
        fetchdata();
    }, [])
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/detailCustomer/${IDorder}`);
                setCustomer(response.data);
            } catch (error) {
                console.error("error fetching customer", error)
            }
        }
        fetchdata();
    }, [IDorder])


    const navigate = useNavigate();

    // const uniqueTotalPrices = [...new Set(Product.map((card) => card.TotalPrice))];

    return (
        <div>
            {loading && (
                <div
                    className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center z-[9000]">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary-600"></div>
                </div>
            )}
            <div className="wrapper">



                <div className="content-wrapper">
                    <section className="content-header">
                        <h1>
                            Order

                        </h1>
                        <ol className="breadcrumb">
                            <li><a href="#"><i className="fa fa-dashboard"></i> Home</a></li>
                            <li><a href="#">Category</a></li>
                        </ol>
                    </section>
                    <section className="content">
                        <div className="row">

                            <div className="box">
                                <div className="box-header">
                                    <h3 className="box-title">Customer information</h3>
                                </div>


                                <div className="box-body">
                                    <table id="example1" className="table table-bordered table-striped">
                                        <thead>
                                            <tr>
                                                <th>Email</th>
                                                <th>FullName</th>
                                                <th>Date</th>
                                                <th>Phone</th>
                                                
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{Acc ? Acc.email: ""}</td>
                                                <td>{Acc ? Acc.fullName : ""}</td>
                                                <td>{Acc ? new Date(Acc.birthday).toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric' }) : ""}</td>
                                                <td>{Acc ? Acc.phone : ""}</td>
                                              


                                            </tr>
                                        </tbody>

                                    </table>


                                </div>
                            </div>
                            <div className="box">
                                <div className="box-header">
                                    <h3 className="box-title">List order details</h3>
                                </div>


                                <div className="box-body">
                                    <h2 style={{color:'black'}}>{Movie ? Movie.movie : ""}</h2>
                                    <table id="example1" className="table table-bordered table-striped">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Seat Name</th>
                                                <th>Category seat</th>
                                                <th>Price</th>
                                               

                                            </tr>
                                        </thead>
                                        <tbody>
                                            {seat.map((product, index) => (
                                                <tr>

                                                    <td>{index + 1}</td>
                                                    <td>Seat {product.name.nameseat}</td>
                                                    <td>{product.name.categorySeat}</td>
                                                    <td>${product.price}</td>
                                                 


                                                </tr>
                                            ))}
                                            {/* {shipprice.Price !== null && shipprice.Price !== undefined && shipprice.Price !== "" && (
                                                <tr>
                                                    <td>Ship price: {shipprice.Price}</td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                </tr>

                                            )} */}
                                           
                                            <tr>
                                                
                                                    <td>Total pay:${totalprice}</td>

                                                

                                                <td><button style={{
                                                padding: '10px 20px',
                                                fontSize: '16px',
                                                fontWeight: 'bold',
                                                backgroundColor: '#3498db',
                                                color: '#ffffff',
                                                border: 'none',
                                                borderRadius: '5px',
                                                cursor: 'pointer',
                                            }} onClick={exportPdf}>Export PDF</button></td>
                                            </tr>
                                      
                                        </tbody>

                                    </table>
                                    {Combo.length>0&&(
 <table id="example1" className="table table-bordered table-striped">
 <thead>
     <tr>
         <th>#</th>
         <th>Combo</th>
       
         <th>Price</th>
        

     </tr>
 </thead>
 <tbody>
     {Combo.map((product, index) => (
         <tr>

             <td>{index + 1}</td>
             <td>Seat {product.name.comboname}</td>
             <td>{product.name.categorySeat}</td>
             <td>${product.price}</td>
          


         </tr>
     ))}
  
    
    

 </tbody>

</table>
                                    )}
                                   


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
export default DetailOrder;