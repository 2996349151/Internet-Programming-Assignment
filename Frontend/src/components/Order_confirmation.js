import { useContext } from 'react';
import { GlobalContext } from '../GlobalContext';

function OrderConfirmation({ order_number }) {
  return (
    <div>
      <img
        src="./congratulations.png"
        alt="congratulations"
        style={{ width: '500px', height: '300px' }}
      />
      <p>Your order has been placed, and your order number is {order_number}</p>
      <p>We will send you a email to confirm your order</p>
    </div>
  );
}

export default OrderConfirmation;
