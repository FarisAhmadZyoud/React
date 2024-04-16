import React from 'react'
import { Navigate } from 'react-router-dom';
export default function UnAuth({children}) {
    const token = localStorage.getItem('userToken'); 
    if (token) {
      return <Navigate to = '/' replace />
    }
  return children ; 
}
