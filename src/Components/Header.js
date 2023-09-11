import React from 'react';
import "./headerstyle.css"; 

function Header() {
  return (
    <header className="header">

      <div className="top-row">

        <div className="logo">
          <img src="./images/logo.png" alt="Logo" />
        </div>
        <div className="title">
          <h1>ART GALLERY</h1>
        </div>
        
      </div>

      <div className="header-image">
        <img src="./images/headerimage.png" alt="Header" />
      </div>

    </header>
  );
}

export default Header;