import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import Swal from "sweetalert2";
import Cookies from 'js-cookie';
import Select from 'react-select';
import ReactQuill from 'react-quill';
import { CreateCategoryBlog, GetCategoryBlog } from "../../Services/CategoryBlogService";
import { AddBlog, GetBlog, UpdateBlog, UpdateStatus } from "../../Services/BlogService";
function Blog() {

    const getTokenFromCookies = () => {
        return Cookies.get('token');
    };
    const [selectedStatus, setSelectedStatus] = useState({});
    const idRole = localStorage.getItem("Id");
    const [FromData, setFromData] = useState({
        Name: '',
        Title: '',
        ContentBlog: '',
        Image: null,
        ImagePreview: null,
        UpdateImage: null,
        UpdateTitle: '',
        id: '',
        UpdateImageView: null
    })

    const handleStatusChange = async (selectedOption, blogId) => {

        const response = await UpdateStatus(blogId, {
            status: selectedOption.label == 'Hide' ? false : true
        })
        if (response == true) {
            fetchBlog()
        }

    };

    const [Blog, setBlog] = useState([]);
    const fetchBlog = async () => {
        try {
            const response = await GetBlog(token);
            setBlog(response);
        } catch (error) {
            console.log(error)
        }
    }
    const token = getTokenFromCookies();
    const [SelectedUpdateCategory, setSelectedUpdateCategory] = useState(null)
    const [CategoryBlog, setCategoryBlog] = useState([]);
    const [IsPopUpAddCategoryBlog, setIsPopUpAddCategoryBlog] = useState(false);
    const [IsEditPopup, setIsEditPoup] = useState(false);
    const [IsClosingEditPopup, setIsClosingEditPopup] = useState(false)
    const [SelectedCategoryBlog, SetSelectedCategoryBlog] = useState(null);
    const [IsClosingAddCategoryBlog, setIsClosingAddCategoryBlog] = useState(false);
    const handleSelectCategoryBlog = (SelectOption) => {
        SetSelectedCategoryBlog(SelectOption)

    }
    const handleSelectUpdateCategoryBlog=(SelectOption)=>{
        setSelectedUpdateCategory(SelectOption)
    }

    const fetchCategoryBlog = async () => {
        try {
            const response = await GetCategoryBlog();
            if (response.length > 0) {
                setCategoryBlog(response);
            }

        } catch (error) {
            console.log(error)
        }
    }
    const handleSubmit = async () => {
        try {
            const response = await CreateCategoryBlog({
                name: FromData.Name
            })
            if (response.result == true) {
                Swal.fire({
                    icon: 'success',
                    title: response.message,
                    showConfirmButton: false,
                    timer: 1500
                })
                setIsPopUpAddCategoryBlog(false);
                fetchCategoryBlog();
            }
        } catch (error) {
            console.log(error);
        }
    }
    const handleUpdateBlog=async(e)=>{
        e.preventDefault();
        try{
           
            const formData = new FormData();
            formData.append("Title",FromData.UpdateTitle);
            formData.append("Image",FromData.UpdateImageView);
            formData.append("idCategoryBlog",SelectedUpdateCategory?.label==undefined?SelectedUpdateCategory:SelectedUpdateCategory?.label)
            const response=await UpdateBlog(FromData.id,formData,token);
            if(response.result==true){
                Swal.fire({
                    icon: 'success',
                    title: response.message,
                    showConfirmButton: false,
                    timer: 1500
                })
                setIsEditPoup(false);
                fetchBlog();
            }
        }catch(error){
            console.log(error)
        }
    }
    const CreateBlog = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("Title", FromData.Title);
            formData.append("idCategoryBlog", SelectedCategoryBlog?.value);
            formData.append("ImageUrl", FromData.Image);
            formData.append("ContentBlog", FromData.ContentBlog);
            const response = await AddBlog(formData, token);
            if (response.result == true) {
                Swal.fire({
                    icon: 'success',
                    title: response.message,
                    showConfirmButton: false,
                    timer: 1500
                })
                setFromData({
                    Title: '',
                    ContentBlog: '',
                    Image: null,
                    ImagePreview: null
                })
                FromData.Title = '';
                FromData.Image = null;
                FromData.ImagePreview = null;
                SetSelectedCategoryBlog(null);
                document.getElementById('imageInput').value = '';
                fetchBlog();
            }
        } catch (error) {
            console.log(error)
        }
    }
    const optionsStatus = [
        { value: 1, label: 'Show' },
        { value: 2, label: 'Hide' }
    ];


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
    useEffect(() => {
        fetchCategoryBlog();
        fetchBlog();
    }, [])
    const handleDescriptionChange = (value) => {
        setFromData({
            ...FromData,
            ContentBlog: value
        })
    }
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFromData({
                    ...FromData,
                    Image: file, // Store the file object for upload
                    ImagePreview: reader.result // Store the base64 string for preview
                });
            };
            reader.readAsDataURL(file);

        }
    }
    const handleEdit = (Id) => {
        const SelectBlog = Blog.find(blog => blog.id == Id);
        if (SelectBlog) {
            FromData.id = Id;
            FromData.UpdateTitle = SelectBlog.title;
            FromData.UpdateImage =`http://localhost:5277/images/`+ SelectBlog.imageUrl;
            setSelectedUpdateCategory(SelectBlog.idCategoryBlog)
        }
        setIsEditPoup(true);
    }
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFromData({
                    ...FromData,
                    UpdateImageView: file,
                    UpdateImage: reader.result
                });
            };
            reader.readAsDataURL(file);
        }
    }
    const option = CategoryBlog.map(category => ({ value: category.id, label: category.name }))
    const today = new Date();
    const maxBirthdate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
    return (

        <div>
            <div className="wrapper">

                <div className="content-wrapper">
                    <section className="content-header">
                        <h1>
                            Blog

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
                                <form role="form" onSubmit={CreateBlog}>
                                    <div className="box-body">
                                        <div className="form-group">
                                            <label >Title</label>
                                            <input className="form-control" id="exampleInputEmail1" placeholder="Enter Title" value={FromData.Title} onChange={(e) => setFromData({ ...FromData, Title: e.target.value })} />
                                        </div>
                                        <div className="form-group">
                                            <label >Bio</label>
                                            <br />
                                            <ReactQuill
                                                theme="snow"
                                                value={FromData.ContentBlog}
                                                onChange={handleDescriptionChange}
                                                placeholder='Enter Bio'


                                            />

                                        </div>
                                        <div className='form-group'>
                                            <label htmlFor="">Banner</label>
                                            <input
                                                type="file"
                                                className="form-control"
                                                id='imageInput'
                                                onChange={(e) => handleFileChange(e)}

                                            />
                                            {FromData.ImagePreview && (
                                                <div className="image-preview">
                                                    <img src={FromData.ImagePreview} alt="Selected" style={{ width: '200px', height: 'auto' }} />
                                                </div>
                                            )}
                                        </div>
                                        <div className="form-group">
                                            <label >Category Blog</label>
                                            <Select options={CategoryBlog.map(category => ({ value: category.id, label: category.name }))}
                                                onChange={handleSelectCategoryBlog}
                                                value={SelectedCategoryBlog}
                                                className="custom-select"
                                            />
                                            <button
                                                type="button"
                                                className="btn btn-secondary"
                                                onClick={() => setIsPopUpAddCategoryBlog(!IsPopUpAddCategoryBlog)}
                                                style={{ marginTop: '10px' }}
                                            >
                                                Create Category Blog
                                            </button>
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
                                    <input type="text" id="search" name="search" placeholder="Enter your search term" className="border border-gray-300 px-3 py-1 rounded-md focus:outline-none focus:border-blue-500" />
                                </div>


                                <div className="box-body">
                                    <table id="example1" className="table table-bordered table-striped">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Title</th>
                                                <th>Created At</th>
                                            
                                                <th>Category Blog</th>
                                                <th>Image Blog</th>
                                                <th>Status</th>
                                                <th>Edit</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Blog.map((blog, index) => (
                                                <tr>
                                                    <td>{index + 1}</td>
                                                    <td>{blog.title}</td>
                                                    <td>{new Date(blog.createdAt).toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                                                  
                                                    <td>{blog.categoryBlog.name}</td>
                                                    <td><img src={`http://localhost:5277/Images/${blog.imageUrl}`} width="100" height="100" alt="" /></td>
                                                    <td> <Select
                                                        options={optionsStatus}
                                                        value={selectedStatus[blog.id] || optionsStatus.find(option => blog.status ? option.value === 1 : option.value === 2)}
                                                        onChange={(selectedOption) => handleStatusChange(selectedOption, blog.id)}
                                                        className="custom-select"
                                                    /></td>
                                                    <td><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleEdit(blog.id)}>Edit</button></td>
                                                </tr>
                                            ))}
                                        </tbody>

                                    </table>


                                </div>
                            </div>

                        </div>
                    </section>
                </div>




            </div>

            {IsPopUpAddCategoryBlog && (
                <div className="popup-container">

                    <div className="popup-content" style={IsClosingAddCategoryBlog ? { ...popupContentStyle, ...closingAnimation } : popupContentStyle}>
                        <div className='flex justify-end'>
                            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded float-right "><i className="fas fa-times"></i></button>
                        </div>

                        <div className="mt-[13px]">

                            <h3 className="box-title" style={{ color: '#000000', fontSize: '20px' }}>Create Category Blog</h3>
                        </div>
                        <form role="form" onSubmit={handleSubmit}>
                            <div className="box-body">
                                <div className="form-group">
                                    <label className='float-left'>Name</label>
                                    <input className="form-control " id="exampleInputEmail1" placeholder="Enter  Name" value={FromData.Name} onChange={(e) => setFromData({ ...FromData, Name: e.target.value })} />

                                </div>

                                <div className="box-footer">
                                    <button type="submit" className="btn btn-primary">
                                        save
                                    </button>
                                </div>

                            </div>


                        </form>


                    </div>
                </div>
            )}

            {IsEditPopup && (
                <div className="popup-container">

                    <div className="popup-content" style={IsClosingEditPopup ? { ...popupContentStyle, ...closingAnimation } : popupContentStyle}>
                        <div className='flex justify-end'>
                            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded float-right "><i className="fas fa-times"></i></button>
                        </div>

                        <div className="mt-[13px]">

                            <h3 className="box-title" style={{ color: '#000000', fontSize: '20px' }}>Edit Blog</h3>
                        </div>
                        <form role="form" onSubmit={handleUpdateBlog}>
                            <div className="box-body">
                                <div className="form-group">
                                    <label className='float-left'>Title</label>
                                    <input className="form-control " id="exampleInputEmail1" placeholder="Enter  Name" value={FromData.UpdateTitle} onChange={(e) => setFromData({ ...FromData, UpdateTitle: e.target.value })} />

                                </div>
                                <div className="form-group">
                                    <label className="float-left">Category Blog</label>
                                    <br />
                                    <Select options={option}
                                        onChange={handleSelectUpdateCategoryBlog}
                                        value={SelectedUpdateCategory?.label === undefined ? option.find(category => category.value === SelectedUpdateCategory)
                                            : option.find(category => category.value === SelectedUpdateCategory?.value)
                                        }
                                        className="custom-select"
                                    />

                                </div>
                                <div className="form-group">
                                    <label className="float-left">Banner</label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        id='imageInput'
                                        onChange={(e) => handleImageChange(e)}

                                    />
                                    {FromData.UpdateImage && (
                                        <div className="image-preview">
                                            <img src={ FromData.UpdateImage} alt="Selected" style={{ width: '200px', height: 'auto' }} />
                                        </div>
                                    )}
                                </div>


                                <div className="box-footer">
                                    <button type="submit" className="btn btn-primary">
                                        save
                                    </button>
                                </div>

                            </div>


                        </form>


                    </div>
                </div>
            )}
        </div>


    )
}
export default Blog;