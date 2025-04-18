import React, { createContext, useContext, useState } from 'react';
import { getLogin } from './api/api';
export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [authentification, setAuthentication] = useState({
    isAuthenticated: false,
    username: '',
    password: '',
  });

  const [cart, setCart] = useState([]);

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

  const addToCart = (Product_id, Product_name, Price) => {
    const existingItem = cart.find((item) => item.Product_id === Product_id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.Product_id === Product_id ? { ...item, Unit: item.Quantity + 1 } : item
        )
      );
    } else {
      setCart([...cart, { Product_id, Product_name, Price, Quantity: 1 }]);
    }
  };

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

  const clearCart = () => {
    setCart([]);
  };

  const logout = () => {
    setAuthentication({
      isAuthenticated: true,
      username: '',
      password: '',
    });
    clearCart();
  };

  return (
    <GlobalContext.Provider
      value={{
        authentification,
        login,
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        logout,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
