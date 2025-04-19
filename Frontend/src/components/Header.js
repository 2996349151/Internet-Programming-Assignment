import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header
      style={{ display: 'flex', alignItems: 'center', padding: '10px', backgroundColor: '#f8f9fa' }}
    >
      <Link to="/products">
        <img src="/logo.png" alt="Website Logo" style={{ height: '80px' }} />
      </Link>
    </header>
  );
}

export default Header;
