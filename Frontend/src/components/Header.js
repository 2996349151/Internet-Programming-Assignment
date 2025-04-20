import React from 'react';
import { Link } from 'react-router-dom';
// Let the logo be centered in the header

function Header() {
  return (
    <header
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100px',
      }}
    >
      <Link to="/products">
        <img src="/logo.png" alt="Website Logo" />
      </Link>
    </header>
  );
}

export default Header;
