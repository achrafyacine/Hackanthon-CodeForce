//import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faInfoCircle, faEnvelope, faUser, faDashboard } from '@fortawesome/free-solid-svg-icons';
import './Sidebar.css';
import logo from '../images/ss.png';
import React, { useState } from 'react';

const Sidebar = () => {
  const [selectedItem, setSelectedItem] = useState('');
  const handleItemClick = (itemName) => {
    setSelectedItem(itemName);
  };
  
  return (
    <div className="sidebar">
      <div className="sidebar-logo">
      <img src={logo} alt="Logo" className="sidebar-logo-img" />
      </div>
      <div className="sidebar-menu">
        <Link to="/"
          className={`sidebar-item ${selectedItem === 'home' ? 'active' : ''}`}
          onClick={() => handleItemClick('home')}>
          <FontAwesomeIcon icon={faHome} className="sidebar-icon" />
          Accueil
        </Link>
        
        <Link to="/Dashboard"
          className={`sidebar-item ${selectedItem === 'dashboard' ? 'active' : ''}`}
          onClick={() => handleItemClick('dashboard')}>
          <FontAwesomeIcon icon={faDashboard} className="sidebar-icon" />
          Dashboard
        </Link>
        
        <Link to="/users"
          className={`sidebar-item ${selectedItem === 'users' ? 'active' : ''}`}
          onClick={() => handleItemClick('users')}>
          <FontAwesomeIcon icon={faUser} className="sidebar-icon" />
          Utilisateurs
        </Link>

        <Link to="/contact"
          className={`sidebar-item ${selectedItem === 'contact' ? 'active' : ''}`}
          onClick={() => handleItemClick('contact')}>
          <FontAwesomeIcon icon={faEnvelope} className="sidebar-icon" />
          Contact
        </Link>

        <Link to="/about"
          className={`sidebar-item ${selectedItem === 'about' ? 'active' : ''}`}
          onClick={() => handleItemClick('about')}>
          <FontAwesomeIcon icon={faInfoCircle} className="sidebar-icon" />
          À Propos
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
