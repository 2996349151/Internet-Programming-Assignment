import { useState, useContext, useEffect } from 'react';
import { GlobalContext } from '../GlobalContext';
import { Table, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { getProducts } from '../api/api';

function Cart() {
  const { cart, addToCart, removeFromCart, deleteFromCart, clearCart, productImageUrl } =
    useContext(GlobalContext);
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const handleAddToCart = (Product_id) => {
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].Product_id === Product_id) {
        if (cart[i].Quantity >= cart[i].Unit) {
          messageApi.open({
            type: 'error',
            content: 'You have reached the maximum quantity for this product',
          });
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

  const handleDeleteFromCart = (Product_id) => {
    deleteFromCart(Product_id);
  };

  const handlePlaceOrder = () => {
    if (cart.length === 0) {
      messageApi.open({
        type: 'error',
        content: 'Please add products to cart before placing an order',
      });
      return;
    }
    navigate('/delivery');
  };
  const TableColumns = [
    {
      title: 'Image',
      render: (_, { Product_id }) => (
        <>
          <img
            src={`${productImageUrl[Product_id]}`}
            alt="product"
            style={{ width: '100px', height: '100px' }}
          />
        </>
      ),
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
      title: 'Unit',
      dataIndex: 'Danwei',
      key: 'Danwei',
    },
    {
      title: 'Operations',
      render: (_, { Product_id }) => (
        <div style={{ display: 'flex', gap: '10px' }}>
          <Button onClick={() => handleAddToCart(Product_id)}>+</Button>
          <Button onClick={() => handleRemoveFromCart(Product_id)}>-</Button>
          <Button onClick={() => handleDeleteFromCart(Product_id)} color="danger" variant="solid">
            Delete
          </Button>
        </div>
      ),
    },
  ];
  return (
    <div>
      {contextHolder}
      <h1>Shopping Cart</h1>
      <Table columns={TableColumns} dataSource={cart} />
      <div
        style={{
          margin: '20px',
          fontSize: '20px',
          fontWeight: 'bold',
        }}
      >
        Total Price: {cart.reduce((total, item) => total + item.Price * item.Quantity, 0)}
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginLeft: '20px',
          marginRight: '20px',
        }}
      >
        <Button onClick={clearCart} color="danger" variant="solid">
          Clear Cart
        </Button>
        <Button
          disabled={cart.length === 0}
          onClick={handlePlaceOrder}
          color="primary"
          variant="solid"
        >
          Place a order
        </Button>
      </div>
    </div>
  );
}

export default Cart;
