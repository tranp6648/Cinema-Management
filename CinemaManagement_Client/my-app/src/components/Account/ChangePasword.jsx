import Menu from '../Menu/Menu';
import './Account.css';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import React, { useState } from 'react';
import { ChangePasswordService } from '../Services/AccountService';

function ChangePassword() {
  
  const location = useLocation();
  const navigate = useNavigate();
  const Email=location.state?.Email || 'Default Email';
  
  const [FormData, setFormData] = useState({
    NewPassword: '',
    ConfirmPassword: '',
    
  })


  const handleSubmitChangePassword=async(e)=>{
    e.preventDefault();
    
    try{
      const response=await ChangePasswordService({
        newPassword:FormData.NewPassword,
        confirmPassword:FormData.ConfirmPassword,
        email:Email
      })
      if(response.errors){
        let ErrorMessages='';
        for(const key in response.errors){
          if(response.errors.hasOwnProperty(key)){
          ErrorMessages+=`<p >${response.errors[key]}<br></p><br>`
          }
        }
        Swal.fire({
          icon: 'error',
          title: 'Failed',
          showConfirmButton: false,
          timer: 1500,
          html:ErrorMessages
        })  
      }else{
        Swal.fire({
          icon: 'success',
          title: 'Change Password success',
          showConfirmButton: false,
          timer: 1500,
        }).then(()=>{
          navigate("/Account")         
        })
      }
     
    }catch(error){
     console.log(error)
    
    }
  }
  return (
    <div >
     
      <Menu />
      <div style={{ height: '296px', marginTop: '5px' }}>
        <div className="breadcrumb-area">
          <div className="container">
            <div className="breadcrumb-content">
              <h2 className="font-bold" style={{ color: '#ffffff', textTransform: 'uppercase', textAlign: 'center', fontSize: '36px', marginBottom: '0', paddingBottom: '20px', fontFamily: '"Lato", sans-serif' }}>Account</h2>
              <ul>
                <li>
                  <a href="" style={{ textDecoration: 'none' }}>Home</a>
                </li>
                <li className="active">Account</li>
              </ul>
            </div>
          </div>
        </div>

      </div>


      <div className='row_site' style={{ paddingTop: '160px', fontWeight: '600' }}>
        <div className='container_site'>
          <div id='main-content' className='main'>
            <article id='post12' className='post-wrap post-12 page type-page status-publish hentry'>
              <div className='woocommerce'>
                <div className='woocommerce-notices-wrapper'>
                 
                  <div className='u-columns col2-set'>
                    <div className='u-column1 col-1' style={{ width: '48%' }}>
                      <h2>Change Password</h2>
                      <div className=" hiraola-tab_content">
                      
                        <div id="Register" className={`tab-pane active show `}>
                        <form onSubmit={handleSubmitChangePassword} className='woocommerce-form woocommerce-form-login login' >
              <p className='woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide'>
                <label htmlFor="" className='username'>
                  New Password&nbsp;
                  <span className='required'>*</span>
                </label>
                <input type="password" value={FormData.NewPassword} onChange={(e)=>setFormData({...FormData,NewPassword:e.target.value})}  name='NewPassword' className='woocommerce-Input woocommerce-Input--text input-text' />
              </p>
              <p className='woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide'>
                <label htmlFor="" className='username'>
                Confirm  Password&nbsp;
                  <span className='required'>*</span>
                </label>
                <input
                  type="password" value={FormData.ConfirmPassword} onChange={(e)=>setFormData({...FormData,ConfirmPassword:e.target.value})}  name='ConfirmPassword' 
                  className='woocommerce-Input woocommerce-Input--text input-text'
                />             </p>
              
              <button type="submit" className='woocommerce-button button woocommerce-form-login__submit' >Submit</button>
              
            </form>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
   
 
    </div>
  );
}

export default ChangePassword;
