import { useState, useContext } from 'react';
import { GlobalContext } from '../GlobalContext';
import { Table, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const { cart, addToCart, removeFromCart, clearCart } = useContext(GlobalContext);
  const navigate = useNavigate();
  const handleAddToCart = (Product_id) => {
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].Product_id === Product_id) {
        if (cart[i].Quantity >= cart[i].Unit) {
          alert('You have reached the maximum quantity for this product');
          return;
        }
        break;
      }
    }
    addToCart(Product_id);
  };

  const handleRemoveFromCart = (Product_id) => {
    removeFromCart(Product_id);
  };

  const handlePlaceOrder = () => {
    if (cart.length === 0) {
      alert('Your cart is empty');
      return;
    }
    navigate('/delivery');
  };
  const TableColumns = [
    {
      title: 'Image',
    },
    {
      title: 'Product Name',
      dataIndex: 'Product_name',
      key: 'Product_name',
    },
    {
      title: 'Unit price',
      dataIndex: 'Price',
      key: 'Price',
    },
    {
      title: 'Quantity',
      dataIndex: 'Quantity',
      key: 'Quantity',
    },
    {
      title: '',
      render: (_, { Product_id }) => (
        <>
          <Button onClick={() => handleAddToCart(Product_id)}>+</Button>
          <Button onClick={() => handleRemoveFromCart(Product_id)}>-</Button>
        </>
      ),
    },
  ];
  return (
    <div>
      <Table columns={TableColumns} dataSource={cart} />
      <Button onClick={clearCart}>Clear Cart</Button>
      <p>Total Price: {cart.reduce((total, item) => total + item.Price * item.Quantity, 0)}</p>
      <Button onClick={handlePlaceOrder}>Place a order</Button>
    </div>
  );
}

export default Cart;
