import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import axios from 'axios';
import {  toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../../context/User';
import { object, string } from 'yup';

function SendCode() {

  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const navigate= useNavigate(); 

  const [errors, setErrors] = useState([]); 
  const [loader,setLoader] = useState(false); 


  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };


  const handleLogin = async (e) => {
    e.preventDefault();
    setLoader(true); 
  const validate= await validtaeData(); 
   console.log(validate); 
   if (await validtaeData()) {
    console.log(user);
    
    try {
      const { data } = await axios.post('https://ecommerce-node4-five.vercel.app/auth/sendcode', 
      {email: user.email});
      setUser(
       {
        email: '',
      
       }
 
      ) 
     

         if(data.message === 'success') {
          toast('the message has been sent successfully ')
        //  localStorage.setItem('userToken', data.token); 
          setUserToken(data.token);
           
          navigate('/');
         }
    } catch (error) {
      if (error.response.status === 400){
        console.log(error); 
        toast.error('plz make sure of your data', {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
       
      }
    }finally {
      setLoader(false);
    }
  }
  };

  const validtaeData= async()=>{
  const loginSchema= object ({
    email:string().email('please enter Valid email'),
  });
 try {
await loginSchema.validate(user,{abortEarly:false}); 
return true ; 

 } catch (error){
  console.log("validation error ", error.errors);
  setErrors(error.errors);
  setLoader(false);

  return false ;
 }
 
}

 
  return (
    <>
  
      <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input type="email" className="form-control" name="email" value={user.email} onChange={handleChange} />
            </div>
            <button type="submit" className="btn btn-primary" >
             send Code 
            </button> 
          
          
            
          </form>
        </div>
      </div>
    </div>
    </>
  );
}

export default SendCode;
