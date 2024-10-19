import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { GetAccountAdmin, Register } from "../../Services/AccountService";
import Swal from "sweetalert2";
import Select from 'react-select'
import Pagination from 'react-paginate';
import 'react-paginate/theme/basic/react-paginate.css';
import Cookies from 'js-cookie'
import { AddItemCombo, GetItem } from "../../Services/ItemService";
import { CreateCombo, GetComboItem, UpdateComboItem } from "../../Services/ComItemService";
function Combo() {

    const getTokenFromCookies = () => {
        return Cookies.get('token');
    };
    const [selectedItems, setSelectedItems] = useState([]);
    const [perPage, setperPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(0);
    const[IsPopUpEdit,setIsPopUpEdit]=useState(false);
    const[isClosingEdit,setIsClosingEdit]=useState(false)
    const [ComboItem, setComboItem] = useState([]);
    const fetchComboItem = async () => {
        try {
            const repsonse = await GetComboItem();
            setComboItem(repsonse);
        } catch (error) {
            console.log(error)
        }
    }
    const handleComboEdit=(id)=>{
        const SelectedCombo=ComboItem.find(combo=>combo.id==id);
        if(SelectedCombo){
            FromData.id=id;
            FromData.UpdateImagePreview=SelectedCombo.banner;
            FromData.UpdateNameFood=SelectedCombo.name;
            FromData.UpdatePriceFood=SelectedCombo.price;
        }
        setIsPopUpEdit(true)
    }
    useEffect(() => {
        fetchComboItem();
    })
    const [quantities, setQuantities] = useState({});
    const handleSelectChange = (selectedOptions) => {
        setSelectedItems(selectedOptions || []);
    };
    const handleSubmitCombo = async (e) => {
        e.preventDefault();
        const items = Object.entries(quantities).map(([idItem, quantity]) => ({
            idItem: parseInt(idItem), // Make sure to convert the key to an integer
            Quantity: quantity,
        }));

        const addCombo = {
            name: FromData.NameFood,
            price: FromData.priceFood,
            banner: FromData.ImagePreview,
            Items: items
        };
        const response = await CreateCombo(addCombo)
        if (response.result == true) {
            Swal.fire({
                icon: 'success',
                title: response.message,
                showConfirmButton: false,
                timer: 1500
            })
            setSelectedItems([]);
            setQuantities({});
            FromData.ImagePreview = null;
            FromData.priceFood = '';
            FromData.NameFood = '';
            fetchComboItem();
        }
    }

    const handleQuantityChange = (itemId, quantity) => {
        setQuantities({
            ...quantities,
            [itemId]: quantity,
        });
    };
    const [Item, setItem] = useState([]);
    const fetchItem = async () => {
        try {
            const response = await GetItem();
            console.log(response)
            if (response.length > 0) {
                setItem(response)
            }

        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchItem();
    }, [])
    const [selectedCategoryItem, SetSelectedCategoryItem] = useState(null);
    const handleSelectedCategoryItem = (Item) => {
        SetSelectedCategoryItem(Item);
    }
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
    const [FromData, setFromData] = useState({
        Name: '',
        Image: null,
        ImagePreview: null,
        NameFood: '',
        priceFood: '',
        id:'',
        UpdateNameFood:'',
        UpdatePriceFood:'',
        UpdateImagePreview:null,
        UpdateImage:null
    })
    const handleClosePopupComBoitem = () => {
        setIsClosingEdit(true);
        setTimeout(() => {
            FromData.UpdateImage=null;
            FromData.UpdateImagePreview=null;
            FromData.UpdateNameFood='';
            FromData.UpdatePriceFood=''
            setIsPopUpEdit(false)
            setIsClosingPopup(false)
        }, 500);
    }
    const handleUpdateComboItem=async(e)=>{
        e.preventDefault();
        const response=await UpdateComboItem(FromData.id,{
            name:FromData.UpdateNameFood,
            price:FromData.UpdatePriceFood,
            banner:FromData.UpdateImage
        })
        if(response.result==true){
            Swal.fire({
                icon: 'success',
                title: response.message,
                showConfirmButton: false,
                timer: 1500
            })
            fetchComboItem();
            setIsPopUpEdit(false)
            FromData.UpdateImage=null;
            FromData.UpdateImagePreview=null;
            FromData.UpdateNameFood='';
            FromData.UpdatePriceFood=''
        }
    }
    const handleCreateItem = async (e) => {
        e.preventDefault();
        const response = await AddItemCombo({
            name: FromData.Name,
            Category: selectedCategoryItem?.value
        })
        if (response.result == true) {
            Swal.fire({
                icon: 'success',
                title: response.message,
                showConfirmButton: false,
                timer: 1500
            })
            setAddItem(false);

        }
    }
    const [isClosingPopup, setIsClosingPopup] = useState(false)
    const options = [
        { label: 'Bắp', value: 'corn' },
        { label: 'Nước', value: 'Drink' },
        { label: 'Snack', value: 'Snack' }
    ]
    const token = getTokenFromCookies();
    const [AddItem, setAddItem] = useState(false);
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
    const handleFileUpdate = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFromData({
                    ...FromData,
                    UpdateImage: reader.file, // Store the file object for upload
                    UpdateImagePreview: reader.result // Store the base64 string for preview
                });
            };
            reader.readAsDataURL(file);

        }
    }
    const today = new Date();
    const maxBirthdate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
    const [searchCombo, setSearchCombo] = useState('');
    const filterCombo = ComboItem.filter(combo =>
        combo.name.toLowerCase().includes(searchCombo.toLowerCase())
    )
    const indexofFlastCombo = (currentPage + 1) * perPage;
    const indexofFirstCombo = indexofFlastCombo - perPage;
    const currentCombo = filterCombo.slice(indexofFirstCombo, indexofFlastCombo);
    const handlePageclick = (data) => {
        setCurrentPage(data.selected);
    };
    return (

        <div>


            <div className="wrapper">






                <div className="content-wrapper">
                    <section className="content-header">
                        <h1>
                            Combo Food

                        </h1>
                        <ol className="breadcrumb">
                            <li><a href="#"><i className="fa fa-dashboard"></i> Home</a></li>
                            <li><a href="#">Combo Food</a></li>
                        </ol>
                    </section>
                    <section className="content">
                        <div className="row">
                            <div className="box box-primary" style={{ maxHeight: 'auto' }}>

                                <div className="box-header">
                                    <h3 className="box-title">Create Combo Food</h3>
                                </div>
                                <form role="form" onSubmit={handleSubmitCombo}>
                                    <div className="box-body">
                                        <div className="form-group">
                                            <label htmlFor="">Name Combo Food</label>
                                            <input
                                                value={FromData.NameFood}
                                                onChange={(e) => setFromData({ ...FromData, NameFood: e.target.value })}
                                                className="form-control "
                                                type="text"
                                                placeholder="Name Combo Food"

                                            />

                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="">Price Combo Food</label>
                                            <input
                                                value={FromData.priceFood}
                                                onChange={(e) => setFromData({ ...FromData, priceFood: e.target.value })}
                                                className="form-control "
                                                type="number"
                                                placeholder="Quantity"
                                                min="1"
                                            />

                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="">Banner Combo</label>
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
                                            <label >Item</label>
                                            <Select
                                                options={Item.map(nation => ({ value: nation.id, label: nation.name }))}
                                                className="custom-select"
                                                isMulti
                                                onChange={handleSelectChange}
                                            />
                                            <button
                                                type="button"
                                                className="btn btn-secondary"
                                                onClick={() => setAddItem(!AddItem)}
                                                style={{ marginTop: '10px' }}
                                            >
                                                Create Item
                                            </button>
                                            {selectedItems.length > 0 && (
                                                <div>
                                                    {selectedItems.map((item) => (
                                                        <div className="form-group" key={item.value} style={{ marginTop: '10px' }}>
                                                            <label>{item.label}</label>
                                                            <input
                                                                className="form-control "
                                                                type="number"
                                                                placeholder="Quantity"
                                                                min="1"
                                                                value={quantities[item.value] || ''}
                                                                onChange={(e) => handleQuantityChange(item.value, e.target.value)}
                                                            />
                                                        </div>
                                                    ))}
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
                                    <input type="text" id="search" name="search" placeholder="Enter your search term" value={searchCombo} onChange={(e) => setSearchCombo(e.target.value)} className="border border-gray-300 px-3 py-1 rounded-md focus:outline-none focus:border-blue-500" />
                                </div>


                                <div className="box-body">
                                    <table id="example1" className="table table-bordered table-striped">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Name Combo</th>
                                                <th>Price</th>
                                                <th>Banner</th>
                                                <th>Item</th>
                                                <th>Edit</th>

                                            </tr>
                                        </thead>
                                        <tbody>

                                            {currentCombo.map((admin, index) => (
                                                <tr>
                                                    <td>{index + 1}</td>
                                                    <td>{admin.name}</td>
                                                    <td>${admin.price}</td>
                                                    <td><img src={`${admin.banner}`} width="100" height="100" alt="" /></td>

                                                    <td>{admin.item.length > 0 ? admin.item.map(mov => mov.nameItem).join(', ') : 'No Item'}

                                                    </td>
                                                    <td><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={()=>handleComboEdit(admin.id)}>Edit</button></td>

                                                </tr>
                                            ))}
                                        </tbody>

                                    </table>
                                    <Pagination
                                        previousLabel={'previous'}
                                        nextLabel={'next'}
                                        breakLabel={'...'}
                                        pageCount={Math.ceil(filterCombo.length / perPage)}
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




            </div>
            {AddItem && (
                <div className="popup-container">

                    <div className="popup-content" style={isClosingPopup ? { ...popupContentStyle, ...closingAnimation } : popupContentStyle}>
                        <div className='flex justify-end'>
                            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded float-right "><i className="fas fa-times"></i></button>
                        </div>

                        <div >

                            <h3 className="box-title">Create Item</h3>
                        </div>
                        <form role="form" onClick={handleCreateItem}>
                            <div className="box-body">
                                <div className="form-group">
                                    <label className='float-left'>Name</label>
                                    <input className="form-control " value={FromData.Name} onChange={(e) => setFromData({ ...FromData, Name: e.target.value })} id="exampleInputEmail1" placeholder="Enter Name Item" />

                                </div>
                                <div className="form-group">
                                    <label className='float-left'>Category Item</label>
                                    <br />
                                    <Select options={options}
                                        onChange={handleSelectedCategoryItem}
                                        className="custom-select"
                                    />

                                </div>






                            </div>

                            <div className="box-footer">
                                <button type="submit" className="btn btn-primary">
                                    save
                                </button>
                            </div>
                        </form>


                    </div>
                </div>
            )}
            {IsPopUpEdit && (
                <div className="popup-container">

                    <div className="popup-content" style={isClosingEdit ? { ...popupContentStyle, ...closingAnimation } : popupContentStyle}>
                        <div className='flex justify-end'>
                            <button onClick={handleClosePopupComBoitem} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded float-right "><i className="fas fa-times"></i></button>
                        </div>

                        <div >

                            <h3 className="box-title" style={{ color:'black' }}>Edit Combo</h3>
                        </div>
                        <form role="form" onSubmit={handleUpdateComboItem}>
                            <div className="box-body">
                                <div className="form-group">
                                    <label className='float-left'>Name</label>
                                    <input className="form-control " value={FromData.UpdateNameFood} onChange={(e) => setFromData({ ...FromData,UpdateNameFood: e.target.value })} id="exampleInputEmail1" placeholder="Enter Name Combo" />

                                </div>
                                <div className="form-group">
                                    <label className='float-left'>Price</label>
                                    <input className="form-control " value={FromData.UpdatePriceFood} onChange={(e) => setFromData({ ...FromData,UpdatePriceFood: e.target.value })} id="exampleInputEmail1" placeholder="Enter Name Combo" />

                                </div>
                             
                                <div className="form-group">
                                            <label htmlFor="" className="float-left">Banner Combo</label>
                                            <input
                                                type="file"
                                                className="form-control"
                                                id='imageInput'
                                                onChange={(e)=>handleFileUpdate(e)}
                                              
                                            />
                                            {FromData.UpdateImagePreview && (
                                                <div className="image-preview">
                                                    <img src={FromData.UpdateImagePreview} alt="Selected" style={{ width: '200px', height: 'auto' }} />
                                                </div>
                                            )}
                                        </div>





                            </div>

                            <div className="box-footer">
                                <button type="submit" className="btn btn-primary">
                                    save
                                </button>
                            </div>
                        </form>


                    </div>
                </div>
            )}


        </div>


    )
}
export default Combo;