import { useState, useContext } from 'react';
import { GlobalContext } from '../GlobalContext';
import { Table, Button } from 'antd';

function Cart() {
  const { cart, addToCart, removeFromCart, clearCart } = useContext(GlobalContext);

  const handleAddToCart = (Product_id) => {
    addToCart(Product_id);
  };

  const handleRemoveFromCart = (Product_id) => {
    removeFromCart(Product_id);
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
          {/* <Button onClick={() => handleAddToCart(Product_id)}>+</Button>
          <Button onClick={() => handleRemoveFromCart(Product_id)}>-</Button> */}
        </>
      ),
    },
  ];
  return (
    <div>
      <Table columns={TableColumns} dataSource={cart} />
      {/* <Button onClick={clearCart}>Clear Cart</Button> */}
      {/* <p>Total Price: {cart.reduce((total, item) => total + item.Price * item.Quantity, 0)}</p> */}
      <Button>Place a order</Button>
    </div>
  );
}

export default Cart;
