import React, { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/User.jsx';
import styles from './Navbar.module.css';

function Navbar() {
  const { userName, setUserName, setUserToken } = useContext(UserContext);
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem('userToken');
    setUserToken(null);
    setUserName(null);
    navigate('/Login');
  };

  return (
    <>
    <div className="final">
    <nav className={`navbar navbar-expand-lg  bg-info`}>
      <div className="container">
        <Link className="navbar-brand"  to="/">
          APIOWSHOP
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/Products" className="nav-link">
                Products
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/Categories" className="nav-link">
                Categories
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav">
            {userName ? (
              <>
                <li className="nav-item">
                  <Link to="/" className="nav-link">
                    Welcome {userName}
                  </Link>
                </li>
                <li className="nav-item">
                  <button onClick={logOut} type="button" className="btn btn-danger">
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link to="/Login" className="nav-link">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/Register" className="nav-link">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
    
    </div>
    </>
  );
}

export default Navbar;
