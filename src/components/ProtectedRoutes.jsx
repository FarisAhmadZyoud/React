import React from 'react'
import { useNavigate } from 'react-router-dom';
import {Navigate} from 'react-router-dom'

export default function ProtectedRoutes({children}) {
    const token= localStorage.getItem('userToken'); 
  if (!token) {
return <Navigate to='/Login' replace/>
  }
  return children; 

}
