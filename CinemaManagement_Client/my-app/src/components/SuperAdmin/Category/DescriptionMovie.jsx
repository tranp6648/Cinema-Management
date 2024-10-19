import { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

import Swal from "sweetalert2";
import { getDetailMovie, UpdateDescription } from "../../Services/MovieService";
import ReactQuill from "react-quill";
function DesciptionMovie() {
    const location = useLocation();
    const navigate = useNavigate();
    const Id = location.state?.Id || "";
    const [FromData, setFromData] = useState('');
    const fetchData = async () => {
        try {
            const response = await getDetailMovie(Id);
           setFromData(response.description);
        } catch (error) {
            console.log(error);
        }
    };
    
    useEffect(() => {
        if (Id) {
            fetchData();
        }    
    }, [Id]);
  const handleDescriptionChange = (value) => {
        setFromData(value)
    }
    const getTokenFromCookies = () => {
        return Cookies.get('token');
    };
    const token = getTokenFromCookies();
    const handleDescription=async(e)=>{
        e.preventDefault();
        try{
            const response=await UpdateDescription(Id,{
                description:FromData
            })
            if(response.result==true){
                Swal.fire({
                    icon: 'success',
                    title: response.message,
                    showConfirmButton: false,
                    timer: 1500
                })
                fetchData();
            }
        }catch(error){
            console.log(error)
        }
    }

    return (

        <div>


            <div className="wrapper">






                <div className="content-wrapper">
                    <section className="content-header">
                        <h1>
                            Description Movie

                        </h1>
                        <ol className="breadcrumb">
                            <li><a href="#"><i className="fa fa-dashboard"></i> Home</a></li>
                            <li><a href="#">Desciption</a></li>
                        </ol>
                    </section>
                    <section className="content">
                        <div className="row">
                            <div className="box box-primary" style={{ maxHeight: 'auto' }}>
                                <div className="box-header">
                                    <h3 className="box-title" style={{ color: 'black' }}>Description</h3>
                                </div>
                                <form role="form" onSubmit={handleDescription}>
                                    <div className="box-body">
                                        {/* Form fields go here */}
                                        <div className="form-group">
                                            <label >Title</label>
                                            <ReactQuill
                                                theme="snow"
                                                value={FromData}
                                                onChange={handleDescriptionChange}
                                                placeholder='Enter Description'


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
export default DesciptionMovie;