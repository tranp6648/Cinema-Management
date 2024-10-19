import { useEffect, useState } from "react";
import Menu from "../Menu/Menu";
import Swal from 'sweetalert2';
import FooterHome from "../footer/FooterHome";
import './Detail.css'
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { format } from 'date-fns-tz';
import { GetActorMovie, getDetailMovie } from "../Services/MovieService";
import { AvgFeedback } from '../Services/FeedbackService'
import ReactQuill from "react-quill";
import { CreateFeedback, GetFeedback } from "../Services/FeedbackService";
import Pagination from 'react-paginate';
import 'react-paginate/theme/basic/react-paginate.css';
function Detail() {
    const navigate = useNavigate();
    const location = useLocation();
    const idRole = localStorage.getItem("Id");

    const [rating, setrating] = useState(0);
    const [hover, sethover] = useState(0);
    const [Feedback, setFeedback] = useState([]);
    const handleRating = (rate) => {
        setrating(rate)
    }
    const ID = location.state?.ID || '';
    const [avgRating, setavgRating] = useState(0)
    const IDAccount = location.state?.IDAccount || '';
    const [FromData, setFromData] = useState({
        Comment: ''
    })
    const handleCommentChange = (value) => {
        setFromData({
            ...FromData,
            Comment: value
        })
    }
    const handleFeedback = async (e) => {
        e.preventDefault();
        try {
            const response = await CreateFeedback({
                comment: FromData.Comment,
                ratingComment: rating,
                idMovie: ID,
                idAccount: idRole
            })
            if (response.result == true) {
                Swal.fire({
                    icon: 'success',
                    title: response.message,
                    showConfirmButton: false,
                    timer: 1500
                })
                setFromData({
                    Comment: ''
                })
                setrating(0)
            }
        } catch (error) {
            console.log(error)
        }
    }
    const fetchAvgfeedback = async () => {
        try {
            const response = await AvgFeedback(ID);
            console.log(response)
            setavgRating(response)
        } catch (error) {
            console.log(error)
        }
    }
    const fetchFeedback = async () => {
        try {
            const response = await GetFeedback(ID);
            if (response.length > 0) {
                setFeedback(response)
            }
        } catch (error) {
            console.log(error)
        }
    }
    const [Actor, setActor] = useState([]);
    const [time, settime] = useState([]);
    const [Detail, setDetail] = useState([]);
    const [id, setid] = useState("");
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axios.get("http://localhost:5231/api/DetailMovie/ShowMostMovie");
                setDetail(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchdata();
    }, [])
    useEffect(() => {
        const fetchdate = async () => {
            try {
                const response = await axios.get(`http://localhost:5231/api/ShowTime/Gettime/${id}`);
                settime(response.data)
                if (response.data.length > 0) {
                    setSelectedTime(response.data[0].time);
                }

            } catch (error) {
                console.log(error);
            }
        }
        fetchdate();
    }, [id])
    const formatMonth = (dateString) => {
        const dateObj = new Date(dateString);
        const options = { month: 'short' };
        return dateObj.toLocaleDateString('en-US', options);
    };
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await GetActorMovie(ID);
                setActor(response)

            } catch (error) {
                console.log(error);
            }
        }
        fetchdata();
        fetchFeedback();
        fetchAvgfeedback();
    }, [])
    const [popup, setpopup] = useState(false);
    const handlepoup = () => {
        setpopup(!popup);
    }
    const formatDay = (dateString) => {
        const dateObj = new Date(dateString);
        const options = { day: '2-digit' };
        return dateObj.toLocaleDateString('en-US', options);
    }
    const formatWeek = (dateString) => {
        const dateObj = new Date(dateString);
        const options = { weekday: 'short' };
        return dateObj.toLocaleDateString('en-US', options);
    }
    const [selectedTime, setSelectedTime] = useState(null);
    const [Info, setInfo] = useState([]);
    const [popupinfo, setpopupinfo] = useState(false);
    const Closepopupinfo = () => {
        setpopupinfo(!popupinfo)
        setid("");
    }
    const handlepopupinfo = async (id) => {


        setid(id)


        const response = await axios.get(`http://localhost:5231/api/ShowTime/Gettime/${id}`);
        settime(response.data);
        if (response.data.length <= 0) {
            Swal.fire({
                icon: 'error',
                title: 'This Movie not time',
                showConfirmButton: false,
                timer: 1500,
            });
        } else {
            setpopupinfo(!popupinfo)
            setSelectedTime(response.data[0].time);
        }

    }
    useEffect(() => {
        const fetchData = async () => {

            try {
                const response = await axios.get(`http://localhost:5231/api/ShowTime/GetInfo/${selectedTime}/${id}`);
                setInfo(response.data)
                console.log(selectedTime)

            } catch (error) {
                console.log(error);
            }
        };

        fetchData();

    }, [selectedTime, id]);
    const handleUpdate = async (ID, IDAccount, idTime) => {
        try {
            const response = await axios.post(`http://localhost:5231/api/CardSet/Addstatus/${ID}/${IDAccount}/${idTime}`);
            if (response.status == 200) {
                console.log("Response Data:", response.data);
                navigate(`/Cart/${ID}`, { state: { ID: ID, IDAccount: IDAccount, IDtime: idTime } });

            }
        } catch (error) {
            console.log(error)
        }
    }
    const popupContentStyle = {
        display: 'flex',
        animation: 'fadeDown 0.5s ease-out',
    };
    const closepopup = {
        display: 'none',
        animation: 'fadeUp 0.5s ease-out', // Specify the animation properties
    };
    const [DetailMovie, setDetailMovie] = useState([]);
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await getDetailMovie(ID);
                setDetailMovie(response);
                console.log(response)
            } catch (error) {
                console.log(error);
            }
        }
        fetchdata();
    }, [])
    const formatTime = (date) => {
        return format(new Date(date), 'h:mm a', { timeZone: 'UTC' });
    };
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 5; const offset = currentPage * itemsPerPage;
    const currentFeedbacks = Feedback.slice(offset, offset + itemsPerPage);


    const handlePageClick = (data) => {
        setCurrentPage(data.selected);
    };
    return (
        <div>
            <Menu />
            <div style={{ height: '296px', marginTop: '5px' }}>
                <div className="breadcrumb-area">
                    <div className="container">
                        <div className="breadcrumb-content">
                            <h2 className="font-bold" style={{ color: '#ffffff', textTransform: 'uppercase', textAlign: 'center', fontSize: '36px', marginBottom: '0', paddingBottom: '20px', fontFamily: '"Lato", sans-serif' }}>Detail Movie</h2>
                            <ul>
                                <li>
                                    <a href="" style={{ textDecoration: 'none' }}>Home</a>
                                </li>
                                <li className="active">Detail Movie</li>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
            <div className="row_site mt-10">
                <div className="container_site">
                    <div className="ova_movie_single">
                        <div className="top-content">

                            <div className="movie-heading">
                                <h1 className="movie-title">
                                    {DetailMovie.title}
                                </h1>
                                <div className="categories-and-time">
                                    <div className="movie-category">
                                        {DetailMovie?.categoryName?.nameCategory}
                                    </div>
                                    <div className="separator">/</div>
                                    <span className="running-time" style={{ color: '#737373' }}>
                                        {DetailMovie.duration} Mins
                                    </span>
                                </div>
                            </div>


                            <button className="btn btn-booking" onClick={() => handlepopupinfo(ID)}>
                                Get Ticket    </button>
                        </div>

                        <div className="movie-media has-trailer">
                            <div className="movie-gallery gallery_blur">
                                <a href="" className="gallery-fancybox">
                                    <img src={`http://localhost:5277/images/` + DetailMovie.picture} alt="" width="100" height="100" style={{ objectFit: 'cover' }} />

                                </a>
                            </div>
                            <div className="movie-featured-image">
                                <a href="" className="gallery-fancybox">
                                    <img src={`http://localhost:5277/images/` + DetailMovie.picture} alt="" width="100" height="100" style={{ objectFit: 'cover' }} />
                                </a>
                                <div className="btn-trailer-video-wrapper" onClick={() => handlepoup()}>
                                    <div className="btn-video btn-trailer-video">
                                        <i class="fas fa-play"></i>
                                    </div>
                                </div>
                                <span className="text-trailer">

                                    Watch the Trailer
                                    <i class="fa-solid fa-arrow-right"></i>
                                </span>
                            </div>
                        </div>



                        <ul className="info-list">

                            <li className="item item-0 mb-[11px]">
                                <h4 className="title">
                                    Director:
                                </h4>
                                <span className="value">
                                    {DetailMovie.director}                                    </span>
                            </li>



                            <li className="item item-0 mb-[11px]">
                                <h4 className="title">
                                    Preimier:
                                </h4>
                                <span className="value">
                                    {new Date(DetailMovie.releaseDate).toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}                            </span>
                            </li>




                            <li className="item item-3">
                                <h4 className="title">
                                    Writer:
                                </h4>
                                <span className="value">
                                    Aleesha Rose                                   </span>
                            </li>

                            <li className="item item-4">
                                <h4 className="title">
                                    Time:
                                </h4>
                                <span className="value">
                                    {DetailMovie.duration} Mins                                   </span>
                            </li>


                        </ul>
                        <div className="movie-cast">
                            <h2 className="movie-title-h2 cast-title">
                                Top Cast
                            </h2>
                            <div className="mb-movie-cast-list four_column">
                                {Actor.map((actor, index) => (
                                    <div className="movie-cast-item">

                                        <div className="cast-thumbnail">
                                            <img src={`http://localhost:5277/images/${actor.actor.image}`} alt="" />
                                        </div>
                                        <div className="cast-info">
                                            <h4 className="cast-name">{actor.actor.name}</h4>
                                            <p className="cast-description">
                                                {actor.role}             </p>
                                        </div>
                                    </div>
                                ))}

                            </div>
                        </div>
                        <div className="main-content">
                            <h2 className="movie-title-h2 story-title">
                                Story Line
                            </h2>

                            <p dangerouslySetInnerHTML={{ __html: DetailMovie.description }} />


                        </div>
                        <div className="movie-related">
                            <h2 className="movie-title-h2 related-title">
                                More Movies Like This
                            </h2>
                            <div className="mb-movie-list mb-movie-list-template1 four_column">

                                <div className="mb-movie-item item-template1">
                                    <a href="" onClick={() => navigate(`/Detail/${DetailMovie.id}`, { state: { ID: DetailMovie.id, IDAccount: IDAccount } })} style={{ textDecoration: 'none', backgroundColor: 'transparent', color: '#d96c2c' }}>
                                        <div className="movie-image">
                                            <img src={`http://localhost:5277/images/` + DetailMovie.picture} alt="" />
                                        </div>
                                    </a>
                                    <div className="movie-info">
                                        <div className="categories-and-time">
                                            <div className="movie-category">
                                                <a onClick={() => navigate(`/Detail/${DetailMovie.id}`, { state: { ID: DetailMovie.id, IDAccount: ID } })}>{DetailMovie?.categoryName?.nameCategory}</a>
                                            </div>
                                            <div className="separator">/</div>
                                            <span className="running-time">{DetailMovie.duration} mins</span>
                                        </div>
                                        <a onClick={() => navigate(`/Detail/${DetailMovie.id}`, { state: { ID: DetailMovie.id, IDAccount: ID } })}>
                                            <h3 className="movie-title font-bold">
                                                {DetailMovie.name}			</h3>
                                        </a>
                                        <button className="btn btn-booking" onClick={() => handlepopupinfo(DetailMovie.id)}>
                                            Get Ticket    </button>
                                    </div>
                                </div>


                            </div>
                        </div>
                        <div className="main-content">
                            {/* ... (Story Line section) ... */}

                            <div className="movie-feedback">
                                <h2 className="movie-title-h2 feedback-title">Feedback</h2>

                                <div className="feedback-summary">
                                    <div className="average-rating">
                                        <h3>Average Rating: {avgRating}/5</h3> {/* Display the average rating */}
                                        <div className="star-rating">
                                            {/* Display the star rating as icons or custom components */}
                                            <span>{'⭐'.repeat(avgRating)}</span> {/* Example static stars */}
                                        </div>
                                    </div>
                                </div>
                                <form onSubmit={handleFeedback}>
                                    <div className="rate-movie">
                                        <h4>Rate this movie:</h4>
                                        <div className="star-rating-input">
                                            {[...Array(5)].map((star, index) => {
                                                const ratingValue = index + 1;

                                                return (
                                                    <span
                                                        key={index}
                                                        className="star"
                                                        onClick={() => handleRating(ratingValue)}
                                                        onMouseEnter={() => sethover(ratingValue)}
                                                        onMouseLeave={() => sethover(rating)}
                                                        style={{
                                                            color: ratingValue <= (hover || rating) ? '#FFD700' : '#ccc',
                                                            cursor: 'pointer',
                                                            fontSize: '24px'
                                                        }}
                                                    >
                                                        &#9733;
                                                    </span>
                                                );
                                            })}
                                        </div>

                                    </div>

                                    <div className="comment-box">
                                        <h4>Leave your feedback:</h4>
                                        <ReactQuill
                                            theme="snow"
                                            value={FromData.Comment}
                                            onChange={handleCommentChange}
                                            placeholder='Write your comment here...'


                                        />
                                        <button className="submit-feedback">Submit Feedback</button> {/* Button to submit feedback */}
                                    </div>
                                </form>


                                <div className="feedback-list">
                                    <h4>Recent Feedback</h4>
                                    <ul>

                                        {Feedback.map((feed, index) => (
                                            <li>
                                                <div className="feedback-item">
                                                    <img src={`http://localhost:5277/Images/${feed.account.avatar}`} alt="Avatar of John Doe" className="user-avatar" /> {/* User Avatar */}
                                                    <div className="feedback-content">
                                                        <span className="username">{feed.account.username}</span>
                                                        <span className="user-rating">{'⭐'.repeat(feed.ratingComment)}</span>
                                                        <p className="user-comment" dangerouslySetInnerHTML={{ __html: feed.comment }}></p> {/* User's comment */}
                                                        <span className="feedback-date">{new Date(feed.feedback_Date).toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span> {/* Date of comment */}
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                        <Pagination
                                            previousLabel={'previous'}
                                            nextLabel={'next'}
                                            breakLabel={'...'}
                                            pageCount={Math.ceil(Feedback.length / itemsPerPage)}
                                            marginPagesDisplayed={2}
                                            pageRangeDisplayed={5}
                                            onPageChange={handlePageClick}
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
                                    </ul>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <FooterHome></FooterHome>
            <div id="mb_trailer_video_popup" style={popup ? { ...closepopup, ...popupContentStyle } : closepopup} className="mb_trailer_video_popup">


                <div className="modal-content2">
                    {popup && DetailMovie && (
                        <video width="1100" height="700" controls autoPlay >
                            <source src={`http://localhost:5277/videos/` + DetailMovie.trailer} type="video/mp4" />

                        </video>
                    )}



                </div>



                <div className="close">
                    <button style={{ position: 'absolute', top: '21px', color: 'white' }} onClick={() => handlepoup()}><i className="fa fa-close" style={{ fontSize: '41px', right: '108px' }}></i></button>
                </div>
            </div>
            <div id="mb_booking_popup" className="mb_booking_popup" style={popupinfo ? { ...closepopup, ...popupContentStyle } : closepopup}>
                <div className="mb-bp-container">
                    <div className="mb-bp-content">
                        <ul className="toggle-tabs mb-date-tabs">
                            {time.map((timemap, index) => (
                                <li className={`${selectedTime == timemap.time ? "current" : ''}`} onClick={() => setSelectedTime(prevTime => (prevTime === timemap.time ? null : timemap.time))}>
                                    <div className="day">
                                        <span className="D_m_day">
                                            <span className="D_m_day">
                                                {formatMonth(timemap.time)}
                                            </span>
                                            <span className="D_day">{formatWeek(timemap.time)}</span>
                                        </span>
                                        <div className="d_day">
                                            <strong>{formatDay(timemap.time)}</strong>
                                        </div>
                                    </div>

                                </li>
                            ))}
                            {/*                         
                            <li className="current">
                                <div className="day">
                                    <span className="D_m_day">
                                        <span className="D_m_day">
                                            03
                                        </span>
                                        <span className="D_day">Thu</span>
                                    </span>
                                    <div className="d_day">
                                        <strong>05</strong>
                                    </div>
                                </div>

                            </li>
                            <li >
                                <div className="day">
                                    <span className="D_m_day">
                                        <span className="D_m_day">
                                            03
                                        </span>
                                        <span className="D_day">Thu</span>
                                    </span>
                                    <div className="d_day">
                                        <strong>05</strong>
                                    </div>
                                </div>

                            </li>
                            <li >
                                <div className="day">
                                    <span className="D_m_day">
                                        <span className="D_m_day">
                                            03
                                        </span>
                                        <span className="D_day">Thu</span>
                                    </span>
                                    <div className="d_day">
                                        <strong>05</strong>
                                    </div>
                                </div>

                            </li>
                            <li >
                                <div className="day">
                                    <span className="D_m_day">
                                        <span className="D_m_day">
                                            03
                                        </span>
                                        <span className="D_day">Thu</span>
                                    </span>
                                    <div className="d_day">
                                        <strong>05</strong>
                                    </div>
                                </div>

                            </li>
                            <li >
                                <div className="day">
                                    <span className="D_m_day">
                                        <span className="D_m_day">
                                            03
                                        </span>
                                        <span className="D_day">Thu</span>
                                    </span>
                                    <div className="d_day">
                                        <strong>05</strong>
                                    </div>
                                </div>

                            </li>
                            <li >
                                <div className="day">
                                    <span className="D_m_day">
                                        <span className="D_m_day">
                                            03
                                        </span>
                                        <span className="D_day">Thu</span>
                                    </span>
                                    <div className="d_day">
                                        <strong>05</strong>
                                    </div>
                                </div>

                            </li>
                            <li >
                                <div className="day">
                                    <span className="D_m_day">
                                        <span className="D_m_day">
                                            03
                                        </span>
                                        <span className="D_day">Thu</span>
                                    </span>
                                    <div className="d_day">
                                        <strong>05</strong>
                                    </div>
                                </div>

                            </li>
                            <li >
                                <div className="day">
                                    <span className="D_m_day">
                                        <span className="D_m_day">
                                            03
                                        </span>
                                        <span className="D_day">Thu</span>
                                    </span>
                                    <div className="d_day">
                                        <strong>05</strong>
                                    </div>
                                </div>

                            </li>
                            <li >
                                <div className="day">
                                    <span className="D_m_day">
                                        <span className="D_m_day">
                                            03
                                        </span>
                                        <span className="D_day">Thu</span>
                                    </span>
                                    <div className="d_day">
                                        <strong>05</strong>
                                    </div>
                                </div>

                            </li>
                            <li >
                                <div className="day">
                                    <span className="D_m_day">
                                        <span className="D_m_day">
                                            03
                                        </span>
                                        <span className="D_day">Thu</span>
                                    </span>
                                    <div className="d_day">
                                        <strong>05</strong>
                                    </div>
                                </div>

                            </li>
                            <li >
                                <div className="day">
                                    <span className="D_m_day">
                                        <span className="D_m_day">
                                            03
                                        </span>
                                        <span className="D_day">Thu</span>
                                    </span>
                                    <div className="d_day">
                                        <strong>05</strong>
                                    </div>
                                </div>

                            </li>
                            <li >
                                <div className="day">
                                    <span className="D_m_day">
                                        <span className="D_m_day">
                                            03
                                        </span>
                                        <span className="D_day">Thu</span>
                                    </span>
                                    <div className="d_day">
                                        <strong>05</strong>
                                    </div>
                                </div>

                            </li>
                            <li >
                                <div className="day">
                                    <span className="D_m_day">
                                        <span className="D_m_day">
                                            03
                                        </span>
                                        <span className="D_day">Thu</span>
                                    </span>
                                    <div className="d_day">
                                        <strong>05</strong>
                                    </div>
                                </div>

                            </li>
                            <li >
                                <div className="day">
                                    <span className="D_m_day">
                                        <span className="D_m_day">
                                            03
                                        </span>
                                        <span className="D_day">Thu</span>
                                    </span>
                                    <div className="d_day">
                                        <strong>05</strong>
                                    </div>
                                </div>

                            </li> */}
                        </ul>
                        <dl className="collateral-tabs">
                            <dd className="tab-container current">
                                <div className="tab-content1 mb-showtimes">

                                    <div className="collateral-tabs">
                                        <dd className="tab-container current">
                                            <div className="tab-content1 mb-room-types">

                                                <dl className="collateral-tabs">
                                                    <dd className="tab-container current">
                                                        <div className="tab-content1 showtimes">
                                                            {Info.reduce((acc, info, index) => {
                                                                // Check if the current info.auth has already been rendered
                                                                const authRendered = acc.auths.includes(info.auth);
                                                                // If it hasn't been rendered, add it to the accumulator array
                                                                if (!authRendered) {
                                                                    acc.auths.push(info.auth);
                                                                    // Find all info entries with the same auth and accumulate their times
                                                                    const times = Info.filter(item => item.auth === info.auth).map(item => (
                                                                        <li key={item.id} className="item">
                                                                            <a onClick={() => `${IDAccount === '' ? navigate('/Account') : handleUpdate(item.id, IDAccount, item.idTime)}`}>
                                                                                <span>{formatTime(item.time)}</span>
                                                                            </a>
                                                                        </li>
                                                                    ));
                                                                    // Render the info.auth and its associated times
                                                                    acc.elements.push(
                                                                        <div key={index} className="mb-venue">
                                                                            <div className="venue-name mb-[11px]">
                                                                                <h3>{info.auth + " " + info.ditrict}</h3>
                                                                            </div>
                                                                            <div className="mb-room-name mb-[11px]  ">
                                                                                <h4>IMAX</h4>
                                                                            </div>
                                                                            <ul className="mb-tab-showtime">
                                                                                {times}
                                                                            </ul>
                                                                        </div>
                                                                    );
                                                                }
                                                                return acc;
                                                            }, { auths: [], elements: [] }).elements}
                                                        </div>
                                                    </dd>
                                                </dl>
                                            </div>
                                        </dd>
                                    </div>
                                </div>
                            </dd>
                        </dl>
                    </div>
                    <div className="mb-close" onClick={() => Closepopupinfo()}>X</div>
                </div>
            </div>
        </div>


    )
}
export default Detail;