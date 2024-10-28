import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import Swal from "sweetalert2";
import Cookies from 'js-cookie';
import Select from 'react-select';
import ReactQuill from 'react-quill';
import { addMinutes as addMinutesOriginal } from 'date-fns';
import { CreateCategoryBlog, GetCategoryBlog } from "../../Services/CategoryBlogService";
import { AddBlog, GetBlog, UpdateBlog, UpdateStatus } from "../../Services/BlogService";
import { GetMovie, GetMovieStatus } from "../../Services/MovieService";
import 'react-datepicker/dist/react-datepicker.css';
import { GetScreenAdmin, ViewScreen } from "../../Services/ScreenService";
import { format, addMinutes } from 'date-fns-tz';
import Pagination from 'react-paginate';
import { CreateShowTime, GetShowTime, UpdateShowTime } from "../../Services/ShowTimeService";
function ShowTime() {

    const getTokenFromCookies = () => {
        return Cookies.get('token');
    };
    const [searchTerm, setSearchtem] = useState('');
    const [IsClosingPopup, setIsClosingPopup] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState({});
    const idRole = localStorage.getItem("Id");
    const [FromData, setFromData] = useState({
        Name: '',
        Title: '',
        ContentBlog: '',
        Image: null,
        ImagePreview: null,
        duration: '',
        UpdateImage: null,
        UpdateTitle: '',
        id: '',
        UpdateImageView: null
    })
   
    const [ShowTime, setshowtime] = useState([])
    const FetchShowtime = async () => {
        try {
            const response = await GetShowTime(idRole);
            if (response.length > 0) {
                setshowtime(response)
            }
        } catch (error) {
            console.log(error)
        }
    }
    const fetchScreen = async () => {
        try {
            const response = await GetScreenAdmin(idRole, token);

            if (response.length > 0) {
                setScreen(response)
            }

        } catch (error) {
            console.log(error)
        }
    }
    const [Movie, setMovie] = useState([]);
    const [SelectedUpdateMovie, SetSelectedUpdateMovie] = useState(null)
    const fetchMovie = async () => {
        try {
            const response = await GetMovieStatus();

            if (response.length > 0) {
                setMovie(response)
            }

        } catch (error) {
            console.log(error)
        }
    }

    const token = getTokenFromCookies();
   
    useEffect(() => {
        fetchScreen();
        fetchMovie();
        FetchShowtime();
        
    }, [])
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
    const [UpdateDate, setUpdatedate] = useState(null);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [isPopupVisible, setPopupVisibility] = useState(false);
    const handleChange = (selectedOption) => {
        setSelectedMovie(selectedOption);
        console.log("Selected movie:", selectedOption);
    };
    const[seat,setseat]=useState([])
   
   
    const handleEditClick = (MovieID) => {
        const selectedMovie = ShowTime.find(Movie => Movie.id == MovieID)
        if (selectedMovie) {
            FormData.id = selectedMovie.id;
            FormData.duration = selectedMovie.duration;

            setUpdatedate(new Date(selectedMovie.startDate))
        }
        setPopupVisibility(true)

    }
    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        const formattedDate = format(UpdateDate, 'yyyy-MM-dd HH:mm:ss', { timeZone: 'Asia/Ho_Chi_Minh' });
        const newDate = addMinutesOriginal(UpdateDate, FormData.duration);
        const formattedDate1 = format(newDate, 'yyyy-MM-dd HH:mm:ss', { timeZone: 'Asia/Ho_Chi_Minh' });
        console.log(formattedDate1);
        try {
            const response = await UpdateShowTime(FormData.id, {
                startDate: new Date(formattedDate),
                endDate: new Date(formattedDate1)
            })
            if (response.result == true) {
                Swal.fire({
                    icon: 'success',
                    title: response.message,
                    showConfirmButton: false,
                    timer: 1500
                })
                setPopupVisibility(false)
                FormData.id = '';
                setUpdatedate(null)
                FetchShowtime();
            }
        } catch (error) {
            console.log(error)
        }

    }
    const [selectedDate, setSelectedDate] = useState(null);
    const [SelectedScreen, SetSelectedScreen] = useState(null);
    const handleSelectScreen = async (SelectScree) => {
       
        const response = await ViewScreen(SelectScree.value);
      
        setseat(response)
        SetSelectedScreen(SelectScree)
    }
    const today = new Date();
    const maxBirthdate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
    const [Screen, setScreen] = useState([]);

    const options = Movie.map(movie => ({
        value: movie.id,
        label: (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <img
                    src={movie.picture}
                    alt={movie.title}
                    style={{ width: '100px', height: '100px', marginRight: '10px' }}
                />
                {movie.title}
            </div>
        ),
        duration: movie.duration

    }));
    const handleClosepopup = () => {
        setIsClosingPopup(true);
        setTimeout(() => {
            FormData.id = '';
            setUpdatedate(null)

            setPopupVisibility(false)
            setIsClosingPopup(false)
        }, 500);
    }
    const CategorySeat = [
        { value: 1, label: 'Normal' },
        { value: 2, label: 'Vip' }
    ]
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [prices, setPrices] = useState({}); // Stores the price for each category


    const handleCategoryChange = (selectedOption) => {
        setSelectedCategory(selectedOption);
    };


    const handlePriceChange = (e) => {
        const price = e.target.value;
        setPrices((prevPrices) => ({
            ...prevPrices,
            [selectedCategory.value]: price,
        }));
    };
    const [SelectedMovie, SetSelectedMovie] = useState(null);
    const handleSelectedMovie = async (SelectedMovie) => {
        SetSelectedMovie(SelectedMovie)
    }
    const handleAddShowTime = async (e) => {
        e.preventDefault();
        
        const vipPrice = prices[1]; // Assuming prices object uses category ids as keys
        const regularPrice = prices[2];

        if (vipPrice === undefined || regularPrice === undefined) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Both VIP (1) and Regular (2) categories must have prices defined.',
                confirmButtonText: 'OK',
            });
            return; 
        }
        if (seat.length <= 0 || seat==null) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Please select at least one seat before proceeding.',
                confirmButtonText: 'OK',
            });
            return; // Stop execution if no seats are selected
        }
        if(SelectedMovie==null || selectedDate==null||SelectedScreen==null){
            Swal.fire({
                icon: 'error',
                title: 'Please complete all information',
                showConfirmButton: false,
                timer: 1500
            })
        }
        try {
          
            const seatdetail=seat.map((seats,index)=>{
                return {
                    idScreen:seats.id,
                    
                  };
            })
          
            const priceData = Object.entries(prices).map(([categorySeatid, price]) => ({
                categorySeatid,
                price: parseFloat(price),
            }));
            const newDate = addMinutesOriginal(selectedDate, SelectedMovie?.duration);
            const formattedDate = format(selectedDate, 'yyyy-MM-dd HH:mm:ss', { timeZone: 'Asia/Ho_Chi_Minh' });
            const formattedDate1 = format(newDate, 'yyyy-MM-dd HH:mm:ss', { timeZone: 'Asia/Ho_Chi_Minh' });
            const response = await CreateShowTime({
                idMovie: SelectedMovie?.value,
                startDate: new Date(formattedDate),
                endDate: new Date(formattedDate1),
                idscreen: SelectedScreen?.value,
                idAccountCreate: idRole,
                seats: priceData,
                seatsById:seatdetail
            })
            if (response.result == true) {
                Swal.fire({
                    icon: 'success',
                    title: response.message,
                    showConfirmButton: false,
                    timer: 1500
                })
                SetSelectedMovie(null)
                setSelectedDate(null);
                SetSelectedScreen(null)
                setSelectedCategory(null)
                setseat([])
            }

        } catch (error) {
            console.log(error)
        }




    }
    const [currentPage, setCurrentPage] = useState(0);
    const [perPage, setperPage] = useState(5);
    const filteredGender = ShowTime.filter(gen =>

        gen.movie.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const indexOflastgen = (currentPage + 1) * perPage;
    const indexOfFirtgen = indexOflastgen - perPage;
    const currentGender = filteredGender.slice(indexOfFirtgen, indexOflastgen)
    const handlePageclick = (data) => {
        setCurrentPage(data.selected);
    };
   

    // Tính ngày hiện tại cộng thêm 3 ngày
    const minSelectableDate = new Date();
    minSelectableDate.setDate(minSelectableDate.getDate() + 3);
    return (

        <div>
            <div className="wrapper">

                <div className="content-wrapper">
                    <section className="content-header">
                        <h1>
                            ShowTime

                        </h1>
                        <ol className="breadcrumb">
                            <li><a href="#"><i className="fa fa-dashboard"></i> Home</a></li>
                            <li><a href="#">Manager Blog</a></li>
                        </ol>
                    </section>
                    <section className="content">
                        <div className="row">
                            <div className="box box-primary" style={{ maxHeight: 'auto' }}>

                                <div className="box-header">
                                    <h3 className="box-title">Create Blog</h3>
                                </div>
                                <form role="form" onSubmit={handleAddShowTime}>
                                    <div className="box-body">

                                        <div className="form-group" style={{ position: 'relative', zIndex: 1000 }}>
                                            <label >Screen</label>
                                            <Select
                                            value={SelectedScreen}
                                                options={Screen.map(screen => ({ value: screen.id, label: screen.name }))}
                                                onChange={handleSelectScreen}
                                                className="custom-select"
                                               
                                            // Use the custom option component
                                            />


                                        </div>

                                        <div className="form-group" style={{ position: 'relative', zIndex: 200 }}>
                                            <label >Time</label>
                                            <br />
                                            <DatePicker
                                                selected={selectedDate}
                                                onChange={(date) => setSelectedDate(date)}
                                                showTimeSelect
                                                timeFormat="HH:mm"
                                                timeIntervals={15}
                                                minDate={minSelectableDate}
                                                dateFormat="yyyy-MM-dd HH:mm"
                                                className="form-control Time-Freetime"
                                                placeholderText="Select Release Date and Time"
                                            />

                                        </div>
                                        <div className="form-group" style={{ position: 'relative', zIndex: 100 }}>
                                            <label >Movie</label>
                                            <Select
                                            value={SelectedMovie}
                                                options={options}
                                                onChange={handleSelectedMovie}
                                                className="custom-select"
                                            // Use the custom option component
                                            />


                                        </div>
                                        <div className="form-group" style={{ position: 'relative', zIndex: 50 }}>
                                            <label htmlFor="">Price Seat</label>
                                            <Select options={CategorySeat}
                                                onChange={handleCategoryChange}
                                                value={selectedCategory}
                                            />
                                            {selectedCategory && (
                                                <div>
                                                    <label htmlFor="price">Price for {selectedCategory.label}</label>
                                                    <input
                                                        type="number"
                                                        id="price"
                                                        className="form-control"
                                                        value={prices[selectedCategory.value] || ''}
                                                        onChange={handlePriceChange}
                                                        placeholder="Enter price"
                                                    />
                                                </div>
                                            )}
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
                                    <h3 className="box-title">List Admin</h3>
                                </div>
                                <div className="flex items-center space-x-4 float-left flex-1 mb-2 ml-2">
                                    <label for="search" className="text-gray-600">Search</label>
                                    <input type="text" id="search" name="search" placeholder="Enter your search term" value={searchTerm} onChange={(e) => setSearchtem(e.target.value)} className="border border-gray-300 px-3 py-1 rounded-md focus:outline-none focus:border-blue-500" />
                                </div>


                                <div className="box-body">
                                    <table id="example1" className="table table-bordered table-striped">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Movie</th>
                                                <th>Start Date</th>
                                                <th>End Date</th>

                                                <th>Screen</th>
                                                <th>Price Seat</th>

                                                <th>Edit</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentGender.map((showtime, index) => (
                                                <tr>
                                                    <td>{index + 1}</td>
                                                    <td>{showtime.movie}</td>
                                                    <td>{new Date(showtime.startDate).toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric' })}</td>
                                                    <td>{new Date(showtime.endDate).toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric' })}</td>
                                                    <td>{showtime.screen}</td>
                                                    <td>{showtime.categoryPriceScreen.length > 0 ? showtime.categoryPriceScreen.map(mov => mov.name + ":" + mov.price + "$").join(', ') : 'No role'}


                                                    </td>
                                                    <td><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleEditClick(showtime.id)}>Edit</button></td>
                                                </tr>
                                            ))}
                                        </tbody>

                                    </table>
                                    <Pagination
                                        previousLabel={'previous'}
                                        nextLabel={'next'}
                                        breakLabel={'...'}
                                        pageCount={Math.ceil(filteredGender.length / perPage)}
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

                        </div>
                    </section>
                </div>


                {isPopupVisible && (
                    <div className="popup-container">

                        <div className="popup-content" style={IsClosingPopup ? { ...popupContentStyle, ...closingAnimation } : popupContentStyle}>
                            <div className='flex justify-end'>
                                <button onClick={handleClosepopup} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded float-right "><i className="fas fa-times"></i></button>
                            </div>

                            <div >

                                <h3 className="box-title text-black">Edit ShowTime</h3>
                            </div>
                            <form role="form" onSubmit={handleUpdateSubmit}>
                                <div className="box-body" >
                                    {/* Form fields go here */}

                                    <div className="form-group">
                                        <label className="float-left">Time</label>
                                        <br />
                                        <DatePicker
                                            selected={new Date(UpdateDate)}
                                            onChange={(date) => setUpdatedate(date)}
                                            showTimeSelect
                                            timeFormat="HH:mm"
                                            minDate={minSelectableDate}
                                            timeIntervals={15}
                                            dateFormat="yyyy-MM-dd HH:mm"
                                            className="form-control"
                                            placeholderText="Select Release Date and Time"
                                        />

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


        </div>


    )
}
export default ShowTime;