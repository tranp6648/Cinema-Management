import { useEffect, useState } from "react";
import Menu from "../Menu/Menu";
import FooterHome from "../footer/FooterHome";
import '../AllMovies/AllMovies.css';
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { GetDetailActor } from "../Services/ActorService";
function DetailActor() {
    const navigate = useNavigate();
    const location = useLocation();
    const [Detail, setDetail] = useState([]);
    const [DetailProduct, setDetailProduct] = useState([]);
    const ID = location.state?.Id || '';
    const IDAccount = location.state?.IDAccount || '';


    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await GetDetailActor(ID);
       
                setDetail(response);

            } catch (error) {
                console.log(error);
            }
        }
        fetchdata();
    }, [])
    const [popup, setpopup] = useState(false);
    const handlepoup = () => {
        setpopup(!popup);
    }


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
                                    {Detail.name}
                                </h1>

                            </div>



                            <button className="btn btn-booking">
                                Get Ticket    </button>
                        </div>

                        <div className="movie-media has-trailer">
                            <div className="movie-gallery gallery_blur" style={{ maxWidth: '100%' }}>
                                <a href="" className="gallery-fancybox">

                                    <img src={`${Detail.image}`} alt="" width="100" height="100" style={{ objectFit: 'cover', height: '136vh' }} />



                                </a>
                            </div>

                        </div>



                        <ul className="info-list">

                            <li className="item item-0 mb-[11px]">
                                <h4 className="title">
                                    Nationally:
                                </h4>
                                <span className="value">
                                    {Detail.nationality}                                 </span>
                            </li>

                            <br />

                            <li className="item item-0 mb-[11px]">
                                <h4 className="title">
                                    Birthday
                                </h4>
                                <span className="value">
                                    {new Date(Detail.birthday).toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}                               </span>
                            </li>








                        </ul>

                        <div className="main-content">
                            <h2 className="movie-title-h2 story-title">
                                Story Line
                            </h2>

                            <p dangerouslySetInnerHTML={{ __html: Detail.bio }} />


                        </div>
                        <div className="movie-related">
                            <h2 className="movie-title-h2 related-title">
                                More Movies Like This
                            </h2>
                            <div className="mb-movie-list mb-movie-list-template1 four_column">
                                {Detail.movie && Array.isArray(Detail.movie) && Detail.movie.length > 0 ? (
                                    Detail.movie.map((detail, index) => (
                                        <div className="mb-movie-item item-template1" key={index}>
                                            <a href="" onClick={() => navigate(`/Detail/${detail.id}`, { state: { ID: detail.id } })}
                                                style={{ textDecoration: 'none', backgroundColor: 'transparent', color: '#d96c2c' }}>
                                                <div className="movie-image">
                                                    <img src={detail.picture} alt="" />
                                                </div>
                                            </a>
                                            <div className="movie-info">
                                                <div className="categories-and-time">
                                                    <div className="movie-category">
                                                        <a href="">{detail.categoryName.category}</a>
                                                    </div>
                                                    <div className="separator">/</div>
                                                    <span className="running-time">{detail.duration} mins</span>
                                                </div>
                                                <a href="">
                                                    <h3 className="movie-title font-bold">
                                                        {detail.title}
                                                    </h3>
                                                </a>
                                                <button className="btn btn-booking">
                                                    Get Ticket
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p>No movies available.</p> // Display this message or leave it empty
                                )}





                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <FooterHome></FooterHome>

        </div>


    )
}
export default DetailActor;