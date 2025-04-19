import { useContext } from 'react';
import { GlobalContext } from '../GlobalContext';

function OrderConfirmation({ order_number }) {
  return (
    <div>
      <h1>Congratulations ! </h1>
      <h2>Your order has been placed, and your order number is {order_number}</h2>
      <h2>We will send you a email to confirm your order</h2>
    </div>
  );
}

export default OrderConfirmation;
