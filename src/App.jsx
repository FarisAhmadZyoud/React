import { useState } from 'react'
import { useEffect } from 'react' 
import axios from 'axios'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Loader from './components/Loader'
import Root from './root/Root'
import Home from './pages/home/components/Home'
import Register from './pages/register/components/Register'
import Login from './pages/login/components/Login'
import Categories from './pages/categories/components/Categories'
import CategoryProducts from './pages/categories/components/CategoryProducts'
import Products from './pages/products/components/Products'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoutes from './components/ProtectedRoutes'
import UnAuth from './components/UnAuth'
import UserContextProvider from './context/User'
import SendCode from './pages/login/components/SendCode'
import ForgotPasscode from './pages/login/components/ForgotPasscode'
import {
  createBrowserRouter,
  Route,
  RouterProvider,
} from "react-router-dom";


import "./index.css";
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Notfound from './components/Notfound'

function App() {
  const [userName, setUserName] = useState('tariq'); 
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "/",
          element: <Home/>,
        },
    {
      path: "/Categories",
      element: <Categories/>,
    },
    {
      path: "/SendCode",
      element: <SendCode/>,
    },
    {
      path: "/ForgotPasscode",
      element: <ForgotPasscode/>,
    },
    {
      path: "/Categories/:id",
      element: <CategoryProducts/>,
    },
    {
      path: "/Products",
      element: 
      <ProtectedRoutes>
      <Products />
      </ProtectedRoutes> 
      ,
    },
    {
      path: "/Login",
      element: 
  
      <UnAuth>
      <Login/>
      </UnAuth>
    

      ,
    },
  
    {
      path: "/Register",
      element: 
      <UnAuth>
      <Register/>
      </UnAuth>,
    },
  
    {
      path: "*",
      element: <Notfound/>,
    },
      ]
  }]);

  return (
    <>
       <UserContextProvider> 
    <RouterProvider router={router} />
    </UserContextProvider> 

    <ToastContainer />
    </>
  )
}

export default App
