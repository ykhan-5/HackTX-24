// src/components/main_page/Navbar.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../css/navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
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
        <Link to="#services" onClick={() => setIsOpen(false)}>
          Services
        </Link>
        <Link to="#contact" onClick={() => setIsOpen(false)}>
          Contact
        </Link>
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
