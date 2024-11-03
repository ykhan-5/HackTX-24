// Navbar.js
import React, { useState } from "react";
import "../css/navbar.css";

const Navbar = ({ setCurrentPage }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleNavClick = (page) => {
    setCurrentPage(page);
    setIsOpen(false); // Close the menu after clicking
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">HealthHero</div>

      <div className={`navbar-links ${isOpen ? "open" : ""}`}>
        <a href="#home" onClick={() => handleNavClick("home")}>
          Home
        </a>
        <a href="#capture" onClick={() => handleNavClick("capture")}>
          Capture
        </a>
        <a href="#services" onClick={() => handleNavClick("services")}>
          Services
        </a>
        <a href="#contact" onClick={() => handleNavClick("contact")}>
          Contact
        </a>
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
