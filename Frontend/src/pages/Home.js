import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getProducts } from '../api/api';
function JumpToAbout() {
  const navigate = useNavigate();
  navigate('/about');
}

// This file is used to test and instructions
function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        setProducts(response.data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);
  return (
    <div>
      <h1>Test jump</h1>
      <Link to="/about">Go to About Page</Link>
      <button onClick={JumpToAbout}>Go to About Page (Button)</button>
      <br />
      <h1>getProducts</h1>
      <ul>
        {products.map((product) => (
          <li key={product.Product_id}>
            <h2>{product.Product_name}</h2>
            <p>Price: {product.Price}</p>
            <p>Unit: {products.Unit}</p>
            <p>Category: {product.Category}</p>
            <p>Subcategory: {product.Sub_category}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
