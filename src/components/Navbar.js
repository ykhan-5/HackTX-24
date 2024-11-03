// Navbar.js
import React, { useState } from "react";
import "../css/navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">HealthHero</div>

      <div className={`navbar-links ${isOpen ? "open" : ""}`}>
        <a href="#home" onClick={() => setIsOpen(false)}>
          Login
        </a>
        <a href="#capture" onClick={() => setIsOpen(false)}>
          Home
        </a>
        <a href="#services" onClick={() => setIsOpen(false)}>
          Capture
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
