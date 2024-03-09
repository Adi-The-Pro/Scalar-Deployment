import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

export default function Navbar() {  
  return (
    <div className="navBar">
      {/* Logo */}
      <div className="logo">
        <Link to='/' className="brandStyle">
          <img src="./scaler2.png" alt="Scalar.logo" className="logo"/>
          <span>Hotels</span>
        </Link>
      </div>
      
      {/* RightNavbar */}
      <div className="navBarRight">
        <div className="BookNow">
          <Link to='/booking' className="Link">
            Book Now
          </Link>
        </div>

        <div className="ShowBooking">
        <Link to='/showbooking' className="Link">
            Show Bookings
          </Link>
        </div>
        
        <div className="EditBooking">
          <Link to='/editBooking' className="Link">
            Edit Bookings
          </Link>
        </div>
      </div>
    </div>
  );
};
