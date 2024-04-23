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
    const isValid = await validateData(); 
    if (isValid) {
      try {
        const { data } = await axios.patch('https://ecommerce-node4-five.vercel.app/auth/sendcode', 
          { email: user.email }
        );
        setUser({ email: '' });
        if (data) {
          toast('The message has been sent successfully');
          // Assuming you have a setUserToken function to set the token in context
        //  setUserToken(data.token); // Assuming token is returned in response
          navigate('/ForgotPasscode');
        } else {
          // Handle case where message is not 'success'
          toast.error('Server error: Message not sent');
        }
      } catch (error) {
        console.error('Error sending message:', error);
        toast.error('Error sending message. Please try again later.');
      } finally {
        setLoader(false);
      }
    }
  };

  const validateData= async()=>{
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
            <button type="submit" className="btn btn-primary" disabled={loader}>
          {loader ? 'Loading...' : 'SendCode'}
        </button>
          
          
            
          </form>
        </div>
      </div>
    </div>
    </>
  );
}

export default SendCode;
