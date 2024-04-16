import React from 'react';
import styles from './Footer.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
function Footer() {
  return (
    <div className={styles.footerclass}>
    <footer className="bg-info py-5 mt-2">
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <h3>About Us</h3>
            <p>All products in one website , this is our great place you can buy all of your neeeds from our website Clothes ,electrical Devices mobiles ...etc we provide delivery services to all Locations  </p>
          </div>
          <div className="col-md-4">
            <h3>Contact Us</h3>
            <ul className="list-unstyled">
              <li>Email: Apiowshop@gmail.com</li>
              <li>Phone: +972566134887</li>
              <li>Address: Jenin, Palestine</li>
            </ul>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 text-center">
            <p>&copy; 2024 Your Website. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
    </div>
  );
}

export default Footer;
