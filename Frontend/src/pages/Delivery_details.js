import { useState, useEffect, useContext } from 'react';
import { GlobalContext } from '../GlobalContext';
import { useNavigate } from 'react-router-dom';
import { Input, Button, Form, Modal } from 'antd';
import { placeOrder } from '../api/api';
import OrderConfirmation from '../components/Order_confirmation';
function DeliveryDetails() {
  const [deliveryDetails, setDeliveryDetails] = useState({
    Mobile_number: '',
    Recipient_name: '',
    Recipient_email: '',
    Street: '',
    City: '',
    State: '',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { authentification, cart, clearCart } = useContext(GlobalContext);
  const [orderNumber, setOrderNumber] = useState(0);

  const navigate = useNavigate();

  function handleOnFinish() {
    console.log('Delivery details:', deliveryDetails);
    handlePlaceOrder();
  }

  function handleOnFinishFailed() {
    console.log('Failed:', deliveryDetails);
  }

  function handlePlaceOrder() {
    const order_unit_list = [];
    const cost_list = [];
    const product_id_list = [];
    cart.forEach((item) => {
      order_unit_list.push(item.Quantity);
      cost_list.push(item.Price);
      product_id_list.push(item.Product_id);
    });

    const order_number = Math.floor(Date.now() / 1000);
    setOrderNumber(order_number);
    const response = placeOrder(
      order_number,
      authentification.username,
      authentification.password,
      order_unit_list,
      cost_list,
      deliveryDetails.Mobile_number,
      deliveryDetails.Recipient_name,
      deliveryDetails.Recipient_email,
      deliveryDetails.Street,
      deliveryDetails.City,
      deliveryDetails.State,
      product_id_list
    );
    clearCart();
    handleModalOpen();
  }

  function handleModalOpen() {
    setIsModalOpen(true);
  }
  function handleModalClose() {
    setIsModalOpen(false);
    navigate('/products');
  }
  return (
    <div>
      <h1>Delivery Details</h1>
      <Button onClick={() => navigate('/products')}>Home</Button>
      <Form name="Delivery details" onFinish={handleOnFinish} onFinishFailed={handleOnFinishFailed}>
        <Form.Item
          label="Mobile Number"
          name="Mobile_number"
          rules={[{ required: true, message: 'Please input your mobile number!' }]}
        >
          <Input
            value={deliveryDetails.Mobile_number}
            onChange={(e) =>
              setDeliveryDetails({ ...deliveryDetails, Mobile_number: e.target.value })
            }
          />
        </Form.Item>
        <Form.Item
          label="Recipient Name"
          name="Recipient_name"
          rules={[{ required: true, message: 'Please input your recipient name!' }]}
        >
          <Input
            value={deliveryDetails.Recipient_name}
            onChange={(e) =>
              setDeliveryDetails({ ...deliveryDetails, Recipient_name: e.target.value })
            }
          />
        </Form.Item>
        <Form.Item
          label="Recipient Email"
          name="Recipient_email"
          rules={[{ required: true, message: 'Please input your recipient email!' }]}
        >
          <Input
            value={deliveryDetails.Recipient_email}
            onChange={(e) =>
              setDeliveryDetails({ ...deliveryDetails, Recipient_email: e.target.value })
            }
          />
        </Form.Item>
        <Form.Item
          label="Street"
          name="Street"
          rules={[{ required: true, message: 'Please input your street!' }]}
        >
          <Input
            value={deliveryDetails.Street}
            onChange={(e) => setDeliveryDetails({ ...deliveryDetails, Street: e.target.value })}
          />
        </Form.Item>
        <Form.Item
          label="City"
          name="City"
          rules={[{ required: true, message: 'Please input your city!' }]}
        >
          <Input
            value={deliveryDetails.City}
            onChange={(e) => setDeliveryDetails({ ...deliveryDetails, City: e.target.value })}
          />
        </Form.Item>
        <Form.Item
          label="State"
          name="State"
          rules={[{ required: true, message: 'Please input your state!' }]}
        >
          <Input
            value={deliveryDetails.State}
            onChange={(e) => setDeliveryDetails({ ...deliveryDetails, State: e.target.value })}
          />
        </Form.Item>
        <Form.Item label={null}>
          <Button type="primary" htmlType="submit">
            Confirm
          </Button>
        </Form.Item>
      </Form>
      <Modal
        title="Order Confirmation"
        open={isModalOpen}
        onCancel={handleModalClose}
        footer={null}
        okText="OK"
      >
        <>
          <OrderConfirmation order_number={orderNumber} />
        </>
      </Modal>
    </div>
  );
}

export default DeliveryDetails;
