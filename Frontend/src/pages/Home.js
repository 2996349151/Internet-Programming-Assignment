import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function JumpToAbout() {
  const navigate = useNavigate();
  navigate('/about');
}
function Home() {
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <p>This is the home page of our application.</p>
      <Link to="/about">Go to About Page</Link>
      <button onClick={JumpToAbout}>Go to About Page (Button)</button>
    </div>
  );
}

export default Home;
