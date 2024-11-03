// src/components/main_page/Navbar.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import { doSignOut } from "../../firebase/auth";
import "../../css/navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { userLoggedIn } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    await doSignOut();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">HealthHero</div>

      <div className={`navbar-links ${isOpen ? "open" : ""}`}>
        <Link to="/home" onClick={() => setIsOpen(false)}>
          Home
        </Link>
        <Link to="/capture" onClick={() => setIsOpen(false)}>
          Capture
        </Link>
        {userLoggedIn ? (
          <Link to="/login" onClick={() => { handleLogout(); setIsOpen(false); }}>
            Logout
          </Link>
        ) : (
          <Link to="/login" onClick={() => setIsOpen(false)}>
            Login
          </Link>
        )}
      </div>

      <div className="navbar-toggle" onClick={toggleMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
    </nav>
  );
};

export default Navbar;
