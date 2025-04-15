import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
function JumpToAbout() {
  const navigate = useNavigate();
  navigate('/about');
}

// This file is used to test and instructions
function Home() {
  return (
    <div>
      <h1>Test jump</h1>
      <Link to="/about">Go to About Page</Link>
      <button onClick={JumpToAbout}>Go to About Page (Button)</button>
      <br />
    </div>
  );
}

export default Home;
