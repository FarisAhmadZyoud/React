import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import axios from 'axios';
import {  toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import { object, string } from 'yup';

function Register() {
  const [user, setUser] = useState({
    userName: '',
    email: '',
    password: '',
    image: null, // Initialize image as null
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

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    setUser({
      ...user,
      [name]: files[0], // Store the selected file object
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoader(true); 
  const validate= await validtaeData(); 
   console.log(validate); 
   if (await validtaeData()) {
    console.log(user);
    const formData = new FormData(); // Create FormData object to send files
    formData.append('image', user.image); // Append image file to FormData
    formData.append('userName', user.userName);
    formData.append('email', user.email);
    formData.append('password', user.password);

    try {
      const { data } = await axios.post('https://ecommerce-node4.vercel.app/auth/signup', formData);
         if(data.message === 'success') {
          toast('Your account has been registered successfully')
          navigate('/Login');
         }
    } catch (error) {
      console.log("why this error occurred");
      console.log(error);
      if (error.response.status === 409){
        toast.error('email alraedy exists', {
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
  const userSchema= object ({
    userName:string().min(5).max(20).required(),
    email:string().email('please enter Valid email'),
    password:string().min(8).max(16).required(),
    image:string().required(),
  });
 try {
await userSchema.validate(user,{abortEarly:false}); 
return true ; 

 } catch (error){
  console.log("validation error ", error.errors);
  setErrors(error.errors);
  setLoader(false);

  return false ;
 }
 
}

 
  return (
 
       <div className="container mt-4">
      <form onSubmit={handleRegister}>
      <div className="col-md-8">
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input type="text" className="form-control" name="userName" value={user.userName} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" name="email" value={user.email} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="password" className="form-control" name="password" value={user.password} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Image</label>
          <input type="file" className="form-control" name="image" onChange={handleImageChange} />
        </div>
        {errors.map((error, index) => (
          <div key={index} className="alert alert-danger" role="alert">
            {error}
          </div>
        ))}
        <button type="submit" className="btn btn-primary" disabled={loader}>
          {loader ? 'Loading...' : 'Register'}
        </button>
        </div>
      </form>
    </div>
    
  );
}

export default Register;
