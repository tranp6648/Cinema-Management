
import { useEffect, useState } from 'react';
import { Form, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Pagination from 'react-paginate';
import '../admin.css';
import 'react-datepicker/dist/react-datepicker.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-paginate/theme/basic/react-paginate.css';
import Cookies from 'js-cookie';
import Select from "react-select"
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { AddCategoryMovie, DeleteCategory, GetCategory, UpdateCategory } from '../../Services/CategoryService';
import { CreateActor, DeleteActor, GetActor, GetActorNotIn, UpdateActor } from '../../Services/ActorService';
import { AddActorToMovie, CreateMovie, DeleteMovie, GetMovie } from '../../Services/MovieService';

function CAM() {

    const [SelectUpdateNation, setSelectUpdateNation] = useState(null);
    const [ActiveTab, setActiveTab] = useState('category');
    const [trailerUrl, settrailerUrl] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [SearchMovieTearm, SetSearchMovieTearm] = useState('');
    const handleOpenPopup = (Image) => {
        setShowPopup(true);
        settrailerUrl(Image)
    }
    const handleClosePopup = () => {
        setShowPopup(false);
        settrailerUrl(null);
    }
    const handleTabChange = (tabID) => {
        setActiveTab(tabID);
    }
    const AddActorMovie = async (e) => {
        e.preventDefault();
        try {
            const response = await AddActorToMovie({
                idMovie: FromDate.idAddActor,
                idActor: selectActor?.value,
                role: FromDate.Role
            })
            if (response.result == true) {
                Swal.fire({
                    icon: 'success',
                    title: response.message,
                    showConfirmButton: false,
                    timer: 1500
                })
                setSelectActor(null);
                FromDate.Role = '';
                const responseData = await GetActorNotIn(FromDate.idAddActor);

                setActorNotin(responseData);
                fetchMovie();


            }
        } catch (error) {
            console.log(error)
        }

    }

    const AddMovie = async (e) => {
        e.preventDefault();
        try {


            const response = await CreateMovie({
                title: FromDate.Title,
                description: FromDate.Description,
                releaseDate: FromDate.ReleaseDate,
                duration: FromDate.Duration,
                director: FromDate.Director,
                idCategory: SelectedCategory?.value,

                trailer: FromDate.TrailerMovie,
                picture: FromDate.ImageMovie
            }, token)
            if (response.result == true) {
                Swal.fire({
                    icon: 'success',
                    title: response.message,
                    showConfirmButton: false,
                    timer: 1500
                })
                FromDate.Title = '';
                FromDate.ReleaseDate = null;
                FromDate.Duration = '';
                FromDate.Director = '';
                FromDate.ImageMovie = null;
                FromDate.ImageMovieImageView = null;
                FromDate.TrailerMovie = null;

                setFromData({



                    Duration: '',


                })
                SetSelectedCategory(null)



                document.getElementById('imageInput').value = '';
                document.getElementById('trailer').value = '';
            }
        } catch (error) {
            console.log(error);
        }
    }
    const location = useLocation();
    const [currentPage, setCurrentPage] = useState(0);
    const [currentPageActor, setCurrentPageActor] = useState(0);
    const [currentPageMovie, setCurrentPageMovie] = useState(0);
    const [perPage, setperPage] = useState(5);
    const [searchTerm, setSearchtem] = useState('');
    const [searchActor, setSearchActor] = useState('');

    const navigate = useNavigate();
    const getTokenFromCookies = () => {
        return Cookies.get('token');
    };
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
    const token = getTokenFromCookies();
    const [IsClosingPopup, setIsClosingPopup] = useState(false);
    const [isPopupVisible, setPopupVisibility] = useState(false);
    const [isPopupAddActor, setisPopupAddActor] = useState(false);
    const [IsClosingActorPopup, setIsClosingActorPopup] = useState(false)
    const [Actor, setActor] = useState([]);
    const [isPopUpActorVisible, setIsPopupActorVisible] = useState(false);
    const [IsClosingActor, setIsClosingActor] = useState(false);

    const [Movie, setMovie] = useState([]);
    const [FromDate, setFromData] = useState({
        Name: '',
        idAddActor: '',
        id: "",
        UpdateName: '',
        Image: null,
        ImagePreview: null,
        NameActor: '',
        Birthday: null,
        Title: '',
        UpdateTitle: '',
        Description: '',
        ReleaseDate: null,
        Duration: '',
        Director: '',
        trailer: '',
        Picture: null,
        Bio: '',
        UpdateDirector: '',
        idMovie: '',
        UpdateImageMovie: null,
        UpdateDuration: '',
        UpdateReleaseDate: null,
        idActor: '',
        UpdateNameActor: '',
        UpdateBirthday: null,
        actorIds: [],
        UpdateImage: null,
        UpdateImageView: null,
        ImageMovie: null,
        TrailerMovie: null,
        ImageMovieImageView: null,
        UpdateTrailer: null,
        Role: ''

    })

    const handleDescriptionChange = (value) => {
        setFromData({
            ...FromDate,
            Bio: value
        })
    }
    const handleDesciptionMovie = (value) => {
        setFromData({
            ...FromDate,
            Description: value
        })
    }
    const handleReleaseDate = (date) => {
        const formattedDate = date.toISOString().split('T')[0];
        setFromData({ ...FromDate, ReleaseDate: formattedDate })
    }
    const handleDateChange = (date) => {
        const formattedDate = date.toISOString().split('T')[0];
        setFromData({ ...FromDate, Birthday: formattedDate })
    }
    const [ActorNotin, setActorNotin] = useState([])
    const [Category, setCategory] = useState([]);
    const fetActorNotin = async (id) => {
        try {
            const response = await GetActorNotIn(id);

            setActorNotin(response);

        } catch (error) {
            console.log(error)
        }
    }

    const handleAddActor = async (id) => {
        try {
            FromDate.idAddActor = id;
            await fetActorNotin(id);
            setisPopupAddActor(true)
        } catch (error) {
            console.log(error)
        }
    }
    const fetchActor = async () => {
        try {
            const response = await GetActor(token);
            if(response.length>0){
                setActor(response)
            }
            

        } catch (error) {
            console.log(error)
        }
    }
    const fetchdata = async () => {
        try {
            const response = await GetCategory(token);
            console.log(response)
            if(response.length>0){
                setCategory(response)
            }
            
        } catch (error) {
            console.log(error)
        }
    }
    const fetchMovie = async () => {
        try {
            const response = await GetMovie(token);
            if(response.length>0){
                setMovie(response)
            }
          

        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchdata();
        fetchActor();
        fetchMovie();
    }, [])
    const handleMovie = (id) => {
        const SelectMovie = Movie.find(movie => movie.id == id);

        if (SelectMovie) {
            FromDate.idMovie = id;
            FromDate.UpdateTitle = SelectMovie.title;
            FromDate.UpdateReleaseDate = SelectMovie.releaseDate;
            FromDate.UpdateDuration = SelectMovie.duration;
            FromDate.UpdateDirector = SelectMovie.director;
            FromDate.UpdateImageMovie = SelectMovie.picture;
            FromDate.actorIds = SelectMovie.actorROles.length > 0 ?
                SelectMovie.actorROles.map(mov => mov.id) : [];
            FromDate.UpdateTrailer = SelectMovie.trailer;

        }
        navigate(`/SuperAdmin/DetailMovie/${id}`, {
            state: {
                Title: FromDate.UpdateTitle, ReleaseDate: FromDate.UpdateReleaseDate, Duration: FromDate.UpdateDuration,
                Director: FromDate.UpdateDirector, Category: SelectMovie.categoryName, Picture: FromDate.UpdateImageMovie, trailer: FromDate.UpdateTrailer, Actor: FromDate.actorIds,
                id: FromDate.idMovie
            }
        })

    }
    const handleActor = (id) => {
        const SelectActor = Actor.find(actor => actor.id == id);
        if (SelectActor) {
            FromDate.idActor = id;
            FromDate.UpdateNameActor = SelectActor.name;
            FromDate.UpdateBirthday = SelectActor.birthday;
            FromDate.UpdateImageView = SelectActor.image;
            setSelectUpdateNation(SelectActor.nationality);
            console.log(SelectUpdateNation)
        }

        setIsPopupActorVisible(true)
    }
    const handleEditCategory = (id) => {
        const SelectCategory = Category.find(category => category.id == id);

        if (SelectCategory) {
            FromDate.id = id;
            FromDate.UpdateName = SelectCategory.name;



        }

        setPopupVisibility(true)
    }
    const handleCloseAddActor = () => {
        setIsClosingActorPopup(true);
        setTimeout(() => {

            setisPopupAddActor(false)
            setIsClosingActorPopup(false)
            FromDate.idAddActor = '';
        }, 500);
    }
    const handleClosePopupActor = () => {
        setIsClosingActor(true);
        setTimeout(() => {

            setIsPopupActorVisible(false)
            setIsClosingActor(false)
        }, 500);
    }
    const handleClosepopup = () => {
        setIsClosingPopup(true);
        setTimeout(() => {

            setPopupVisibility(false)
            setIsClosingPopup(false)
        }, 500);
    }
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await UpdateCategory(FromDate.id, {
                name: FromDate.UpdateName
            }, token);
            if (response.result == true) {
                Swal.fire({
                    icon: 'success',
                    title: response.message,
                    showConfirmButton: false,
                    timer: 1500
                })
                fetchdata();
                setPopupVisibility(false);
            }
        } catch (error) {
            console.log(error)
        }
    }

    const AddActor = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();

            formData.append("Name", FromDate.NameActor);
            formData.append("Nationality", selectedNation?.value);
            formData.append("Birthday", FromDate.Birthday)
            formData.append("Image", FromDate.Image);
            formData.append("Bio", FromDate.Bio)
            const response = await CreateActor(formData, token);
            if (response.result == true) {
                Swal.fire({
                    icon: 'success',
                    title: response.message,
                    showConfirmButton: false,
                    timer: 1500
                })
                setSelectedNation(null)
                FromDate.Birthday = null;
                FromDate.NameActor = '';
                setFromData({

                    Bio: ''
                })
                document.getElementById('imageInput').value = '';
            }
        } catch (error) {
            console.log(error)
        }

    }
    const AddSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await AddCategoryMovie({
                name: FromDate.Name
            }, token);

            if (response.result == true) {
                Swal.fire({
                    icon: 'success',
                    title: response.message,
                    showConfirmButton: false,
                    timer: 1500
                })
                setFromData({
                    Name: ''
                })
                fetchdata();
            } else {
                let errorMessages = '';
                for (const key in response.errors) {
                    if (response.errors.hasOwnProperty(key)) {
                        errorMessages += `<p >${response.errors[key]}</p>`
                    }
                }
                Swal.fire({
                    icon: 'error',
                    title: "Failed",
                    showConfirmButton: false,
                    timer: 1500,
                    html: errorMessages
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
    const RemoveMovie = async (id) => {
        try {
            const confirmation = await Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!',
            });
            if (confirmation.isConfirmed) {
                const response = await DeleteMovie(id, token);
                if (response.result == true) {
                    Swal.fire({
                        icon: 'success',
                        title: response.message,
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    fetchMovie();
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
    const RemoveActor = async (id) => {
        try {
            const confirmation = await Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!',
            });
            if (confirmation.isConfirmed) {
                const response = await DeleteActor(id, token);
                if (response.result == true) {
                    Swal.fire({
                        icon: 'success',
                        title: response.message,
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    fetchActor();
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
    const DeleteSubmit = async (Categoryid) => {
        try {
            const confirmation = await Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!',
            });
            if (confirmation.isConfirmed) {
                const response = await DeleteCategory(Categoryid, token);

                if (response == true) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Deletion successful',
                        showConfirmButton: false,
                        timer: 1500,
                    });
                }
                fetchdata();
            }
        } catch (error) {
            console.log(error.message);
            Swal.fire({
                icon: 'error',
                title: 'Failed to delete actor',
                showConfirmButton: false,
                timer: 1500,
            });
        }
    }
    const filterMovie = Movie.filter(filter =>
        filter.title.toLowerCase().includes(SearchMovieTearm.toLowerCase())
    )
    const filterCategory = Category.filter(filter =>
        filter.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    const filterActor = Actor.filter(filter =>
        filter.name.toLowerCase().includes(searchActor.toLowerCase())
    )
    const indexoflastActor = (currentPageActor + 1) * perPage;
    const indexofFirstActor = indexoflastActor - perPage;
    const currentActor = filterActor.slice(indexofFirstActor, indexoflastActor);
    const handlePageClickActor = (data) => {
        setCurrentPageActor(data.selected)
    }
    const indexOflastCategory = (currentPage + 1) * perPage;
    const indexofFirstCategory = indexOflastCategory - perPage;
    const currentCategory = filterCategory.slice(indexofFirstCategory, indexOflastCategory)
    const handlePageclick = (data) => {
        setCurrentPage(data.selected);
    };
    const indexoflastMovie = (currentPageMovie + 1) * perPage;
    const indexofFirstMovie = indexoflastMovie - perPage;
    const currentMovie = filterMovie.slice(indexofFirstMovie, indexoflastMovie);
    const handlePageClickMovieActor = (data) => {
        setCurrentPageMovie(data.selected);
    }
    const handleUpdateFileChange = (e) => {
        const file = e.target.files[0]; 
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFromData({
                    ...FromDate,
                    UpdateImage: file, // Store the file object for upload
                    UpdateImageView: reader.result // Store the base64 string for preview
                });
            };
            reader.readAsDataURL(file); // Convert the file to base64 string
        }
    };
    const [selectActor, setSelectActor] = useState(null);
    const handleSelectActor = (SelectActor) => {
        setSelectActor(SelectActor)
    }
    const handleupdateNationally = (seletedNation) => {
        setSelectUpdateNation(seletedNation)
    }
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFromData({
                    ...FromDate,
                    ImageMovie: reader.result,
                    ImageMovieImageView: reader.result
                });
            };
            reader.readAsDataURL(file);
        }
    }
    const handletrailer = (e) => {
        const file = e.target.files[0];



        const reader = new FileReader();
        reader.onloadend = () => {
            setFromData({
                ...FromDate,
                TrailerMovie: reader.result,
            });
        };
        reader.readAsDataURL(file);


    };
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFromData({
                    ...FromDate,
                    Image: file, // Store the file object for upload
                    ImagePreview: reader.result // Store the base64 string for preview
                });
            };
            reader.readAsDataURL(file);

        }
    }
    const today = new Date();
    const maxBirthdate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());

    const nationalityOptions = [
        { value: 'United States', label: 'United States' },
        { value: 'canada', label: 'Canada' },
        { value: 'United Kingdom', label: 'United Kingdom' },
        { value: 'france', label: 'France' },
        { value: 'germany', label: 'Germany' },
        { value: 'australia', label: 'Australia' },
        { value: 'japan', label: 'Japan' },
        { value: 'brazil', label: 'Brazil' },
        { value: 'india', label: 'India' },
        { value: 'china', label: 'China' },
        { value: 'russia', label: 'Russia' },
        { value: 'south-korea', label: 'South Korea' },
        { value: 'mexico', label: 'Mexico' },
        { value: 'south-africa', label: 'South Africa' },
        { value: 'Afghanistan', label: 'Afghanistan' },
        { value: 'Armenia', label: 'Armenia' },
        { value: 'Azerbaijan', label: 'Azerbaijan' },
        { value: 'Bahrain', label: 'Bahrain' },
        { value: 'Bangladesh', label: 'Bangladesh' },
        { value: 'Bhutan', label: 'Bhutan' },
        { value: 'Brunei', label: 'Brunei' },
        { value: 'Cambodia', label: 'Cambodia' },
        { value: 'China', label: 'China' },
        { value: 'Cyprus', label: 'Cyprus' },
        { value: 'Georgia', label: 'Georgia' },
        { value: 'India', label: 'India' },
        { value: 'Indonesia', label: 'Indonesia' },
        { value: 'Iran', label: 'Iran' },
        { value: 'Iraq', label: 'Iraq' },
        { value: 'Israel', label: 'Israel' },
        { value: 'Japan', label: 'Japan' },
        { value: 'Jordan', label: 'Jordan' },
        { value: 'Kazakhstan', label: 'Kazakhstan' },
        { value: 'Kuwait', label: 'Kuwait' },
        { value: 'Kyrgyzstan', label: 'Kyrgyzstan' },
        { value: 'Laos', label: 'Laos' },
        { value: 'Lebanon', label: 'Lebanon' },
        { value: 'Malaysia', label: 'Malaysia' },
        { value: 'Maldives', label: 'Maldives' },
        { value: 'Mongolia', label: 'Mongolia' },
        { value: 'Myanmar (Burma)', label: 'Myanmar (Burma)' },
        { value: 'Nepal', label: 'Nepal' },
        { value: 'North Korea', label: 'North Korea' },
        { value: 'Oman', label: 'Oman' },
        { value: 'Pakistan', label: 'Pakistan' },
        { value: 'Palestine', label: 'Palestine' },
        { value: 'Philippines', label: 'Philippines' },
        { value: 'Qatar', label: 'Qatar' },
        { value: 'Saudi Arabia', label: 'Saudi Arabia' },
        { value: 'Singapore', label: 'Singapore' },
        { value: 'South Korea', label: 'South Korea' },
        { value: 'Sri Lanka', label: 'Sri Lanka' },
        { value: 'Syria', label: 'Syria' },
        { value: 'Taiwan', label: 'Taiwan' },
        { value: 'Tajikistan', label: 'Tajikistan' },
        { value: 'Thailand', label: 'Thailand' },
        { value: 'Turkey', label: 'Turkey' },
        { value: 'Turkmenistan', label: 'Turkmenistan' },
        { value: 'United Arab Emirates', label: 'United Arab Emirates' },
        { value: 'Uzbekistan', label: 'Uzbekistan' },
        { value: 'Vietnam', label: 'Vietnam' },
        { value: 'Yemen', label: 'Yemen' },
        { value: 'Albania', label: 'Albania' },
        { value: 'Andorra', label: 'Andorra' },
        { value: 'Austria', label: 'Austria' },
        { value: 'Belarus', label: 'Belarus' },
        { value: 'Belgium', label: 'Belgium' },
        { value: 'Bosnia and Herzegovina', label: 'Bosnia and Herzegovina' },
        { value: 'Bulgaria', label: 'Bulgaria' },
        { value: 'Croatia', label: 'Croatia' },
        { value: 'Cyprus', label: 'Cyprus' },
        { value: 'Czech Republic', label: 'Czech Republic' },
        { value: 'Denmark', label: 'Denmark' },
        { value: 'Estonia', label: 'Estonia' },
        { value: 'Finland', label: 'Finland' },
        { value: 'France', label: 'France' },
        { value: 'Germany', label: 'Germany' },
        { value: 'Greece', label: 'Greece' },
        { value: 'Hungary', label: 'Hungary' },
        { value: 'Iceland', label: 'Iceland' },
        { value: 'Ireland', label: 'Ireland' },
        { value: 'Italy', label: 'Italy' },
        { value: 'Kosovo', label: 'Kosovo' },
        { value: 'Latvia', label: 'Latvia' },
        { value: 'Liechtenstein', label: 'Liechtenstein' },
        { value: 'Lithuania', label: 'Lithuania' },
        { value: 'Luxembourg', label: 'Luxembourg' },
        { value: 'Malta', label: 'Malta' },
        { value: 'Moldova', label: 'Moldova' },
        { value: 'Monaco', label: 'Monaco' },
        { value: 'Montenegro', label: 'Montenegro' },
        { value: 'Netherlands', label: 'Netherlands' },
        { value: 'North Macedonia', label: 'North Macedonia' },
        { value: 'Norway', label: 'Norway' },
        { value: 'Poland', label: 'Poland' },
        { value: 'Portugal', label: 'Portugal' },
        { value: 'Romania', label: 'Romania' },
        { value: 'Russia', label: 'Russia' },
        { value: 'San Marino', label: 'San Marino' },
        { value: 'Serbia', label: 'Serbia' },
        { value: 'Slovakia', label: 'Slovakia' },
        { value: 'Slovenia', label: 'Slovenia' },
        { value: 'Spain', label: 'Spain' },
        { value: 'Sweden', label: 'Sweden' },
        { value: 'Switzerland', label: 'Switzerland' },
        { value: 'Ukraine', label: 'Ukraine' },
        { value: 'United Kingdom', label: 'United Kingdom' },
        { value: 'Vatican City', label: 'Vatican City' },

    ];
    const [selectedNation, setSelectedNation] = useState(null);
    const [SelectedCategory, SetSelectedCategory] = useState(null);
    const handleSelectCategory = (SelectCategory) => {
        SetSelectedCategory(SelectCategory);
    }
    const handleupdateNation = (selectedNation) => {
        setSelectedNation(selectedNation);
    }
    const EditActor = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("Name", FromDate.UpdateNameActor);
            formData.append("Nationality", SelectUpdateNation?.value == null ? SelectUpdateNation : SelectUpdateNation?.value);
            formData.append("Image", FromDate.UpdateImage);
            formData.append("Birthday", FromDate.UpdateBirthday)

            const response = await UpdateActor(FromDate.idActor, formData, token);
            if (response.result == true) {
                Swal.fire({
                    icon: 'success',
                    title: response.message,
                    showConfirmButton: false,
                    timer: 1500,
                });
                fetchActor();
                setIsPopupActorVisible(false)
            }
        } catch (error) {
            console.log(error)
        }
    }
    const handleupdatedate = (date) => {
        const formattedDate = date.toISOString().split('T')[0];
        setFromData({ ...FromDate, UpdateBirthday: formattedDate });
    }

    const renderTabContent = () => {
        switch (ActiveTab) {
            case 'category':
                return (
                    <>
                        <div className="row">
                            <div className="box box-primary" style={{ maxHeight: 'auto' }}>
                                <div className="box-header">
                                    <h3 className="box-title">Category</h3>
                                </div>
                                <form onSubmit={AddSubmit}>
                                    <div className="box-body">
                                        {/* Form fields go here */}
                                        <div className="form-group">
                                            <label >Name</label>
                                            <input className="form-control" id="exampleInputEmail1" value={FromDate.Name} onChange={(e) => setFromData({ ...FromDate, Name: e.target.value })} placeholder="Enter Name " />

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
                                    <h3 className="box-title">List Category</h3>
                                </div>
                                <div className="flex items-center space-x-4 float-left flex-1 mb-2 ml-2">
                                    <label for="search" className="text-gray-600">Search</label>
                                    <input type="text" id="search" name="search" placeholder="Enter your search term" value={searchActor} onChange={(e) => setSearchActor(e.target.value)} className="border border-gray-300 px-3 py-1 rounded-md focus:outline-none focus:border-blue-500" />
                                </div>


                                <div className="box-body">
                                    <table id="example1" className="table table-bordered table-striped">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Name</th>
                                                <th>Edit</th>
                                                <th>Delete</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentCategory.map((category, index) => (
                                                <tr>
                                                    <td>{index + 1}</td>
                                                    <td>{category.name}</td>
                                                    <td><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleEditCategory(category.id)}>Edit</button></td>
                                                    <td><button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => DeleteSubmit(category.id)}>Remove</button></td>
                                                </tr>
                                            ))}

                                        </tbody>

                                    </table>
                                    <Pagination
                                        previousLabel={'previous'}
                                        nextLabel={'next'}
                                        breakLabel={'...'}
                                        pageCount={Math.ceil(filterCategory.length / perPage)}
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
                    </>
                )
            case 'actor':
                return (
                    <>
                        <div className="row">
                            <div className="box box-primary" style={{ maxHeight: 'auto' }}>
                                <div className="box-header">
                                    <h3 className="box-title">Actor</h3>
                                </div>
                                <form onSubmit={AddActor}>
                                    <div className="box-body">
                                        {/* Form fields go here */}
                                        <div className="form-group">
                                            <label >Name</label>
                                            <input className="form-control" id="exampleInputEmail1" value={FromDate.NameActor} onChange={(e) => setFromData({ ...FromDate, NameActor: e.target.value })} placeholder="Enter Name " />

                                        </div>
                                        <div className="form-group">
                                            <label >Nationally</label>
                                            <Select options={nationalityOptions.map(nation => ({ value: nation.value, label: nation.label }))}
                                                value={selectedNation} onChange={(selectedoption) => handleupdateNation(selectedoption)}
                                            />

                                        </div>
                                        <div className='form-group'>
                                            <label htmlFor="">Picture</label>
                                            <input
                                                type="file"
                                                className="form-control"
                                                id='imageInput'
                                                onChange={(e) => handleFileChange(e)}

                                            />
                                            {FromDate.ImagePreview && (
                                                <div className="image-preview">
                                                    <img src={FromDate.ImagePreview} alt="Selected" style={{ width: '200px', height: 'auto' }} />
                                                </div>
                                            )}
                                        </div>
                                        <div className="form-group">
                                            <label >Birthday</label>
                                            <br />
                                            <DatePicker name='Birthday' dateFormat="dd/MM/yyyy"
                                                className="form-control Date-picker1"
                                                selected={FromDate.Birthday ? new Date(FromDate.Birthday) : null}
                                                placeholderText="Enter Birthday"
                                                onChange={handleDateChange}
                                                maxDate={maxBirthdate}
                                                showYearDropdown
                                                scrollableYearDropdown
                                                yearDropdownItemNumber={100}
                                            />

                                        </div>
                                        <div className="form-group">
                                            <label >Bio</label>
                                            <br />
                                            <ReactQuill
                                                theme="snow"
                                                value={FromDate.Bio}
                                                onChange={handleDescriptionChange}
                                                placeholder='Enter Bio'


                                            />

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
                                    <h3 className="box-title">List Category</h3>
                                </div>
                                <div className="flex items-center space-x-4 float-left flex-1 mb-2 ml-2">
                                    <label for="search" className="text-gray-600">Search</label>
                                    <input type="text" id="search" name="search" placeholder="Enter your search term" value={searchActor} onChange={(e) => setSearchActor(e.target.value)} className="border border-gray-300 px-3 py-1 rounded-md focus:outline-none focus:border-blue-500" />
                                </div>


                                <div className="box-body">
                                    <table id="example1" className="table table-bordered table-striped">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Name</th>
                                                <th>Birthday</th>
                                                <th>Nationality</th>
                                                <th>Image</th>
                                                <th>Edit</th>
                                                <th>Delete</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentActor.map((actor, index) => (
                                                <tr>
                                                    <td>{index + 1}</td>
                                                    <td>{actor.name}</td>
                                                    <td>{new Date(actor.birthday).toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                                                    <td>{actor.nationality}</td>
                                                    <td><img src={`${actor.image}`} width="100" height="100" style={{ objectFit: 'cover' }} alt="" /></td>
                                                    <td><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleActor(actor.id)}>Edit</button></td>
                                                    <td><button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => RemoveActor(actor.id)}>Remove</button></td>
                                                </tr>
                                            ))}

                                        </tbody>

                                    </table>
                                    <Pagination
                                        previousLabel={'previous'}
                                        nextLabel={'next'}
                                        breakLabel={'...'}
                                        pageCount={Math.ceil(filterActor.length / perPage)}
                                        marginPagesDisplayed={2}
                                        pageRangeDisplayed={5}
                                        onPageChange={handlePageClickActor}
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
                    </>
                )
            case "Movie":
                return (
                    <>
                        <div className="row">
                            <div className="box box-primary" style={{ maxHeight: 'auto' }}>
                                <div className="box-header">
                                    <h3 className="box-title">Movie</h3>
                                </div>
                                <form onSubmit={AddMovie}>
                                    <div className="box-body">
                                        {/* Form fields go here */}
                                        <div className="form-group">
                                            <label >Title</label>
                                            <input className="form-control" id="exampleInputEmail1" value={FromDate.Title} onChange={(e) => setFromData({ ...FromDate, Title: e.target.value })} placeholder="Enter Name " />

                                        </div>
                                        <div className="form-group">
                                            <label >Description</label>
                                            <br />
                                            <ReactQuill
                                                theme="snow"
                                                value={FromDate.Description}
                                                onChange={handleDesciptionMovie}
                                                placeholder='Enter Bio'


                                            />

                                        </div>
                                        <div className="form-group">
                                            <label >ReleaseDate</label>
                                            <br />
                                            <DatePicker name='Birthday' dateFormat="dd/MM/yyyy"
                                                className="form-control Date-picker1"
                                                selected={FromDate.ReleaseDate ? new Date(FromDate.ReleaseDate) : null}
                                                placeholderText="Enter Birthday"
                                                onChange={handleReleaseDate}
                                                minDate={new Date()}
                                                showYearDropdown
                                                scrollableYearDropdown
                                                yearDropdownItemNumber={100}
                                            />

                                        </div>
                                        <div className='form-group'>
                                            <label >Duration</label>
                                            <input className="form-control" id="exampleInputEmail1" value={FromDate.Duration} onChange={(e) => setFromData({ ...FromDate, Duration: e.target.value })} placeholder="Enter Duration " />
                                        </div>
                                        <div className='form-group'>
                                            <label >Director</label>
                                            <input className="form-control" id="exampleInputEmail1" value={FromDate.Director} onChange={(e) => setFromData({ ...FromDate, Director: e.target.value })} placeholder="Enter Duration " />
                                        </div>
                                        <div className="form-group">
                                            <label >Category</label>
                                            <Select options={Category.map(nation => ({ value: nation.id, label: nation.name }))}
                                                value={SelectedCategory}
                                                onChange={(selectedoption) => handleSelectCategory(selectedoption)}
                                            />

                                        </div>
                                        <div className="form-group">
                                            <label >Picture</label>
                                            <input
                                                type="file"
                                                className="form-control"
                                                id='imageInput'
                                                onChange={(e) => handleImageChange(e)}

                                            />
                                            {FromDate.ImageMovieImageView && (
                                                <div className="image-preview">
                                                    <img src={FromDate.ImageMovieImageView} alt="Selected" style={{ width: '200px', height: 'auto' }} />
                                                </div>
                                            )}
                                        </div>
                                        <div className="form-group">
                                            <label >Trailer</label>
                                            <input
                                                type="file"
                                                className="form-control"
                                                id='trailer'
                                                onChange={(e) => handletrailer(e)}

                                            />

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
                                    <h3 className="box-title">List Movie</h3>
                                </div>
                                <div className="flex items-center space-x-4 float-left flex-1 mb-2 ml-2">
                                    <label for="search" className="text-gray-600">Search</label>
                                    <input type="text" id="search" name="search" placeholder="Enter your search term" value={SearchMovieTearm} onChange={(e) => SetSearchMovieTearm(e.target.value)} className="border border-gray-300 px-3 py-1 rounded-md focus:outline-none focus:border-blue-500" />
                                </div>


                                <div className="box-body">
                                    <table id="example1" className="table table-bordered table-striped">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Title</th>
                                                <th>Release Date</th>
                                                <th>Director</th>
                                                <th>Duration</th>
                                                <th>Image</th>
                                                <th>Category</th>
                                                <th>Video</th>
                                                <th>Actor</th>
                                                <th>Edit</th>
                                                <th>Delete</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {currentMovie.map((movie, index) => (
                                                <tr>
                                                    <td>{index + 1}</td>
                                                    <td>{movie.title}</td>
                                                    <td>{new Date(movie.releaseDate).toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                                                    <td>{movie.director}</td>
                                                    <td>{movie.duration} min</td>
                                                    <td><img src={`${movie.picture}`} width="100" height="100" style={{ objectFit: 'cover' }} /></td>
                                                    <td>{movie.categoryName.name}</td>
                                                    <td><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={(e) => handleOpenPopup(movie.trailer)}>Trailer</button></td>
                                                    <td>{movie.actorROles.length > 0 ? movie.actorROles.map(mov => mov.name).join(', ') : 'No role'}
                                                        <br />
                                                        <br />
                                                        <button
                                                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 ml-2 rounded" onClick={() => handleAddActor(movie.id)}
                                                        >
                                                            Add Actor
                                                        </button>
                                                    </td>

                                                    <td><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleMovie(movie.id)}>Edit</button></td>
                                                    <td><button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => RemoveMovie(movie.id)}>Remove</button></td>
                                                </tr>
                                            ))}
                                        </tbody>

                                    </table>
                                    <Pagination
                                        previousLabel={'previous'}
                                        nextLabel={'next'}
                                        breakLabel={'...'}
                                        pageCount={Math.ceil(filterMovie.length / perPage)}
                                        marginPagesDisplayed={2}
                                        pageRangeDisplayed={5}
                                        onPageChange={handlePageClickMovieActor}
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
                    </>
                )

        }
    }
    return (
        <div>


            <div className="wrapper">






                <div className="content-wrapper">
                    <section className="content-header">
                        <div className="tabs">
                            <button
                                className={`tab-button ${ActiveTab === 'category' ? 'active' : ''}`}
                                onClick={() => handleTabChange('category')}
                            >
                                Category
                            </button>
                            <button
                                className={`tab-button ${ActiveTab === 'actor' ? 'active' : ''}`}
                                onClick={() => handleTabChange('actor')}
                            >
                                Actor
                            </button>
                            <button
                                className={`tab-button ${ActiveTab === 'Movie' ? 'active' : ''}`}
                                onClick={() => handleTabChange('Movie')}
                            >
                                Movie
                            </button>
                        </div>
                        <ol className="breadcrumb">
                            <li><a href="#"><i className="fa fa-dashboard"></i> Home</a></li>
                            <li><a href="#">Actor</a></li>
                        </ol>
                    </section>
                    <section className="content">
                        {renderTabContent()}

                    </section>
                </div>

                <footer className="main-footer">
                    <div className="pull-right hidden-xs">
                        <b>Version</b> 2.0
                    </div>
                    <strong>Copyright &copy; 2014-2015 <a href="http://almsaeedstudio.com">Almsaeed Studio</a>.</strong> All rights reserved.
                </footer>
                {isPopupVisible && (
                    <div className="popup-container">

                        <div className="popup-content" style={IsClosingPopup ? { ...popupContentStyle, ...closingAnimation } : popupContentStyle}>
                            <div className='flex justify-end'>
                                <button onClick={handleClosepopup} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded float-right "><i className="fas fa-times"></i></button>
                            </div>

                            <div >

                                <h3 className="box-title">Edit Product</h3>
                            </div>
                            <form role="form" onSubmit={handleUpdate}>
                                <div className="box-body">
                                    {/* Form fields go here */}
                                    <div className="form-group">
                                        <label className='float-left'>Title</label>
                                        <input className="form-control " value={FromDate.UpdateName} onChange={(e) => setFromData({ ...FromDate, UpdateName: e.target.value })} id="exampleInputEmail1" placeholder="Enter Name Genre" />

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
                {isPopupAddActor && (
                    <div className="popup-container">

                        <div className="popup-content" style={IsClosingActorPopup ? { ...popupContentStyle, ...closingAnimation } : popupContentStyle}>
                            <div className='flex justify-end'>
                                <button onClick={handleCloseAddActor} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded float-right "><i className="fas fa-times"></i></button>
                            </div>

                            <div >

                                <h3 className="box-title">Add Actor</h3>
                            </div>
                            <form role="form" onSubmit={AddActorMovie}>
                                <div className="box-body">
                                    {/* Form fields go here */}



                                    <div className="form-group">
                                        <label className='float-left'>Actor</label>
                                        <br />
                                        <Select options={ActorNotin.map(nation => ({ value: nation.id, label: nation.name }))}
                                            isMulti={false}
                                            value={selectActor}
                                            onChange={(selectedoption) => handleSelectActor(selectedoption)}

                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className='float-left'>Role</label>
                                        <br />
                                        <input type="text" className='form-control' value={FromDate.Role} onChange={(e) => setFromData({ ...FromDate, Role: e.target.value })} />
                                        <br />

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
                {isPopUpActorVisible && (
                    <div className="popup-container">

                        <div className="popup-content" style={IsClosingActor ? { ...popupContentStyle, ...closingAnimation } : popupContentStyle}>
                            <div className='flex justify-end'>
                                <button onClick={handleClosePopupActor} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded float-right "><i className="fas fa-times"></i></button>
                            </div>

                            <div >

                                <h3 className="box-title">Edit Actor</h3>
                            </div>
                            <form role="form" onSubmit={EditActor}>
                                <div className="box-body">
                                    {/* Form fields go here */}
                                    <div className="form-group">
                                        <label className='float-left'>Name</label>
                                        <input className="form-control " value={FromDate.UpdateNameActor} onChange={(e) => setFromData({ ...FromDate, UpdateNameActor: e.target.value })} id="exampleInputEmail1" placeholder="Enter Name Genre" />

                                    </div>

                                    <div className="form-group">
                                        <label className='float-left'>Birthday</label>
                                        <br />
                                        <DatePicker name='Birthday' selected={FromDate.UpdateBirthday} dateFormat="dd/MM/yyyy"
                                            className="form-control picker-actor"
                                            placeholderText="Enter Birthday"
                                            onChange={handleupdatedate}
                                        // Cannot select a date before startDate

                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className='float-left'>Birthday</label>
                                        <br />
                                        <Select options={nationalityOptions.map(nation => ({ value: nation.value, label: nation.label }))}
                                            onChange={selectedOption => handleupdateNationally(selectedOption)}
                                            defaultvalue={SelectUpdateNation}
                                            placeholder={`${SelectUpdateNation}`}
                                            isOptionSelected={(option) => option.value === SelectUpdateNation}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className='float-left'>Image</label>
                                        <br />
                                        <input type="file" className='form-control' onChange={(e) => handleUpdateFileChange(e)} />
                                        <br />
                                        {FromDate.UpdateImageView && (
                                            <div className="image-preview">
                                                <img src={FromDate.UpdateImageView} alt="Selected" style={{ width: '200px', height: 'auto' }} />
                                            </div>
                                        )}
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

                {showPopup && (
                    <div className="popup-container fixed inset-0 z-50  bg-opacity-75 flex justify-center items-center" style={{ zIndex: '100000' }}>

                        <div className="flex justify-end absolute top-4 right-4">
                            <button
                                onClick={handleClosePopup}
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"

                            >
                                <i className="fas fa-times"></i>
                            </button>
                        </div>

                        <div className=" w-full h-full flex justify-center align-center absolute right-0" style={{ width: '90%', height: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'absolute', left: '146px' }}>
                            <video
                                className="w-full h-full "
                                src={`http://localhost:5277/videos/` + trailerUrl}
                                title="Trailer"
                                controls
                                autoPlay
                                muted
                                loop
                                style={{ width: '78%', height: '90%' }}
                                onPlay={(e) => e.target.muted = false}
                            >

                            </video>
                        </div>

                    </div>


                )}

            </div>


        </div>


    )
}
export default CAM;