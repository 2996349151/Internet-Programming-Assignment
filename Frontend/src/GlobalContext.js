import React, { createContext, useContext, useState } from 'react';
import { getLogin } from './api/api';
export const GlobalContext = createContext();

// This file is used to create a global context for the application

export const GlobalProvider = ({ children }) => {
  // Authentification state
  const [authentification, setAuthentication] = useState({
    isAuthenticated: false,
    username: '',
    password: '',
  });

  // Cart state
  const [cart, setCart] = useState([]);

  // Function to login
  const login = async (username, password) => {
    const isLogin = await getLogin(username, password);
    if (isLogin == true) {
      setAuthentication({
        isAuthenticated: true,
        username: username,
        password: password,
      });
      return true;
    } else {
      return false;
    }
  };

  // Function to add one item to cart
  const addToCart = (Product_id, Product_name, Price, Unit, Danwei) => {
    const existingItem = cart.find((item) => item.Product_id === Product_id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.Product_id === Product_id ? { ...item, Quantity: item.Quantity + 1 } : item
        )
      );
    } else {
      setCart([...cart, { Product_id, Product_name, Price, Unit, Danwei, Quantity: 1 }]);
    }
  };

  // Function to remove one item from cart
  const removeFromCart = (Product_id) => {
    const existingItem = cart.find((item) => item.Product_id === Product_id);
    if (existingItem) {
      if (existingItem.Quantity > 1) {
        setCart(
          cart.map((item) =>
            item.Product_id === Product_id ? { ...item, Quantity: item.Quantity - 1 } : item
          )
        );
      } else {
        setCart(cart.filter((item) => item.Product_id !== Product_id));
      }
    }
  };

  // Function to delete one item from cart
  const deleteFromCart = (Product_id) => {
    setCart(cart.filter((item) => item.Product_id !== Product_id));
  };

  // Function to clear cart
  const clearCart = () => {
    setCart([]);
  };

  // Function to logout
  const logout = () => {
    setAuthentication({
      isAuthenticated: false,
      username: '',
      password: '',
    });
    clearCart();
  };

  // Table for Product_id and image url
  const [productImageUrl, setProductImageUrl] = useState({
    1: '/products/iphone_14.jpeg',
    2: '/products/samsung_galaxy_s23.jpeg',
    3: '/products/google_pixel_7.jpeg',
    4: '/products/macbook_pro.jpeg',
    5: '/products/dell_xps_13.jpeg',
    6: '/products/hp_spectre_x360.jpeg',
    7: '/products/samsung_qled_tv.jpeg',
    8: '/products/lg_oled_tv.jpeg',
    9: '/products/sony_bravia.jpeg',
    10: '/products/t_shirt.jpeg',
    11: '/products/polo_shirt.jpeg',
    12: '/products/formal_shirt.jpeg',
    13: '/products/jeans.jpeg',
    14: '/products/chinos.jpeg',
    15: '/products/formal_pants.jpeg',
    16: '/products/baseball_cap.jpeg',
    17: '/products/beanie.jpeg',
    18: '/products/fedora.jpeg',
    19: '/products/red_apple.jpeg',
    20: '/products/green_apple.jpeg',
    21: '/products/golden_apple.jpeg',
    22: '/products/banana.jpeg',
    23: '/products/organic_banana.jpeg',
    24: '/products/good_banana.jpeg',
  });
  return (
    <GlobalContext.Provider
      value={{
        authentification,
        login,
        cart,
        addToCart,
        removeFromCart,
        deleteFromCart,
        clearCart,
        logout,
        productImageUrl,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
