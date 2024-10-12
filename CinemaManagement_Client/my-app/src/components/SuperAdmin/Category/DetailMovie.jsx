import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { GetCategory } from "../../Services/CategoryService";
import Cookies from 'js-cookie';
import Select from 'react-select'
import { GetActor } from "../../Services/ActorService";
import { UpdateMovie } from "../../Services/MovieService";
import Swal from "sweetalert2";
function DetailMovie() {
    const location = useLocation();
    const navigate = useNavigate();
    const Title = location.state?.Title || "Defaul Title";
    const ReleaseDate = location.state?.ReleaseDate || null;
    const [Categories, setCategories] = useState([]);
   
  
    const getTokenFromCookies = () => {
        return Cookies.get('token');
    };
    const token = getTokenFromCookies();
    const fetchdata = async () => {
        try {
            const response = await GetCategory(token);

            setCategories(response)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchdata();
     
    },[])
    const Duration = location.state?.Duration || '';
    const id=location.state?.id || '';
    const Director = location.state?.Director || 'Default Director';
    const Category = location.state?.Category || '';
    const Picture = location.state?.Picture || '';
    const trailer = location.state?.trailer || '';
    const Actor = location.state?.Actor || [];
    const [FromData, setFromData] = useState({
        Title: Title,
        ReleaseDate: ReleaseDate,
        Duration: Duration,
        Director: Director,
        Category: Category,
        Picture: Picture,
        PictureUpload:null,
     
        Actor: Actor,
        TrailerMovie:null
    })
    const handleUpdate=async(e)=>{
        e.preventDefault();
        try{
            const formData = new FormData();
           const response=await UpdateMovie(id,{
            title:FromData.Title,
            releaseDate:FromData.ReleaseDate,
            duration:FromData.Duration,
            director:FromData.Director,
            trailer:FromData.TrailerMovie,
            picture:FromData.PictureUpload,
            idCategory:SelectedCategories.value
           },token)
           if(response.result==true){
            Swal.fire({
                icon: 'success',
                title: response.message,
                showConfirmButton: false,
                timer: 1500
            })
              navigate(`/SuperAdmin/Category`)
           }

        }catch(error){
            console.log(error)
        }
    }
    const handletrailer = (e) => {
        const file = e.target.files[0];



        const reader = new FileReader();
        reader.onloadend = () => {
            setFromData({
                ...FromData,
                TrailerMovie: reader.result, 
                
            });
        };
        reader.readAsDataURL(file);
     

    };
    const handleFileChange=(e)=>{
        const file= e.target.files[0];
        if(file){
            const reader = new FileReader();
            reader.onloadend = () => {
                setFromData({
                    ...FromData,
                    PictureUpload: reader.result, 
                    Picture: reader.result 
                });
            };
            reader.readAsDataURL(file);
        }
    }
    const [SelectedCategories,setSelectedCategories]=useState(null)

  
    const handleReleaseDate=(date)=>{
        const formattedDate = date.toISOString().split('T')[0];
        setFromData({...FromData,ReleaseDate:formattedDate})
    }
    const handleCategoriesChange = (selectedOption) => {
        
        const selected = Categories
        .filter(category => selectedOption.value === category.id)
        .map(category => ({ value: category.id, label: category.name }))[0];
        setSelectedCategories(selected);
       
    };
    useEffect(() => {
        if (Categories.length > 0 && FromData.Category) {
            const selected = Categories
                .filter(category => FromData.Category.id === category.id)
                .map(category => ({ value: category.id, label: category.name }))[0]; // Get the first match for single-select
            setSelectedCategories(selected);
        }
    }, [Categories, FromData.Category]);
 
    return (

        <div>


            <div className="wrapper">






                <div className="content-wrapper">
                    <section className="content-header">
                        <h1>
                            Edit Movie

                        </h1>
                        <ol className="breadcrumb">
                            <li><a href="#"><i className="fa fa-dashboard"></i> Home</a></li>
                            <li><a href="#">Edit Movie</a></li>
                        </ol>
                    </section>
                    <section className="content">
                        <div className="row">
                            <div className="box box-primary" style={{ maxHeight: 'auto' }}>
                                <div className="box-header">
                                    <h3 className="box-title">Edit Movie</h3>
                                </div>
                                <form role="form" onSubmit={handleUpdate}>
                                    <div className="box-body">
                                        {/* Form fields go here */}
                                        <div className="form-group">
                                            <label >Title</label>
                                            <input className="form-control" value={FromData.Title} onChange={(e)=>setFromData({...FromData,Title:e.target.value})} id="exampleInputEmail1" placeholder="Enter Name Actor" />

                                        </div>
                                        <div className="form-group">
                                            <label >ReleaseDate</label>
                                            <br />
                                            <DatePicker name='Birthday' dateFormat="dd/MM/yyyy"
                                                className="form-control Date-picker1"
                                                selected={FromData.ReleaseDate ? new Date(FromData.ReleaseDate) : null}
                                                placeholderText="Enter Release Date"
                                                onChange={handleReleaseDate}
                                                minDate={new Date()}
                                                showYearDropdown
                                                scrollableYearDropdown
                                                yearDropdownItemNumber={100}
                                            />

                                        </div>
                                        <div className="form-group">
                                            <label >Duration</label>
                                            <input className="form-control" value={FromData.Duration} onChange={(e)=>setFromData({...FromData,Duration:e.target.value})} id="exampleInputEmail1" placeholder="Enter Name Actor" />

                                        </div>
                                        <div className="form-group">
                                            <label >Director</label>
                                            <input className="form-control" value={FromData.Director} onChange={(e)=>setFromData({...FromData,Director:e.target.value})} id="exampleInputEmail1" placeholder="Enter Name Actor" />

                                        </div>
                                        <div className="form-group">
                                            <label>Actor</label>
                                            <Select
                                                options={Categories.map(category => ({ value: category.id, label: category.name }))}
                                                onChange={handleCategoriesChange}
                                                value={SelectedCategories} 
                                           
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Picture</label>
                                            <input
                                                type="file"
                                                className="form-control"
                                                id='imageInput'
                                                onChange={(e)=>handleFileChange(e)}

                                            />
                                            {FromData.Picture && (
                                                <div className="image-preview">
                                                    <img src={`${FromData.Picture}`} alt="Selected" style={{ width: '200px', height: 'auto' }} />
                                                </div>
                                            )}
                                        </div>
                                        <div className="form-group">
                                            <label className='float-left'>Trailer</label>
                                            <br />
                                            <input
                                                type='file'
                                                className="form-control"
                                                accept="video/*"
                                                onChange={(e)=>handletrailer(e)}
                                                id="exampleInputEmail1"
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
export default DetailMovie;