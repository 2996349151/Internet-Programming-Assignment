import { useState, useEffect, useContext } from 'react';
import { GlobalContext } from '../GlobalContext';
import { useNavigate } from 'react-router-dom';
import { Input, Button, Form, Modal, Select } from 'antd';
import { placeOrder, getProducts } from '../api/api';
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
  const [products, setProducts] = useState([]);
  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate();

  function handleOnFinish() {
    console.log('Delivery details:', deliveryDetails);
    handlePlaceOrder();
  }

  function handleOnFinishFailed() {
    console.log('Failed:', deliveryDetails);
  }

  function handleFormChange(_, allFields) {
    const isValid = allFields.every(
      (field) => field.errors.length === 0 && field.value !== undefined && field.value !== ''
    );
    setIsFormValid(isValid);
  }
  async function handlePlaceOrder() {
    const isAvailable = await checkAvailability();
    if (isAvailable === false) {
      navigate('/products');
      return;
    }

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

  async function checkAvailability() {
    const response = await fetchProducts();
    const fetchedProducts = response.data.products;
    console.log('Fetched products:', fetchedProducts);
    const unavailableProducts = [];
    cart.forEach((item) => {
      const product = fetchedProducts.find((product) => product.Product_id === item.Product_id);
      if (product && product.Unit < item.Quantity) {
        unavailableProducts.push({
          Product_id: item.Product_id,
          Product_name: item.Product_name,
          Available_Quantity: product.Unit,
          Required_Quantity: item.Quantity,
        });
      }
    });
    if (unavailableProducts.length > 0) {
      alert(
        'The following products are not available in the required quantity:\n' +
          unavailableProducts
            .map(
              (item) =>
                `Product ID: ${item.Product_id}, Product Name: ${item.Product_name}, Available Quantity: ${item.Available_Quantity}, Required Quantity: ${item.Required_Quantity}`
            )
            .join('\n')
      );
      return false;
    }
    return true;
  }

  // Get all products to check availability

  async function fetchProducts() {
    const response = await getProducts();
    setProducts(response.data.products);
    return response;
  }

  return (
    <div>
      <h1>Delivery Details</h1>
      <Button onClick={() => navigate('/products')}>Home</Button>
      <Form
        name="Delivery details"
        onFinish={handleOnFinish}
        onFinishFailed={handleOnFinishFailed}
        onFieldsChange={handleFormChange}
      >
        <Form.Item
          label="Mobile Number"
          name="Mobile_number"
          rules={[
            { required: true, message: 'Please input your mobile number!' },
            { pattern: /^04[0-9]{8}$/, message: 'Please enter a valid mobile number!' },
          ]}
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
          rules={[
            { required: true, message: 'Please input your recipient name!' },
            { pattern: /^[a-zA-Z\s]+$/, message: 'Name should only contain letters!' },
            { min: 2, message: 'Name should be at least 2 characters!' },
            { max: 50, message: 'Name should be at most 50 characters!' },
          ]}
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
          rules={[
            { required: true, message: 'Please input your recipient email!' },
            { type: 'email', message: 'Please enter a valid email!' },
          ]}
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
          rules={[
            { required: true, message: 'Please input your street!' },
            {
              pattern: /^[a-zA-Z0-9\s]+$/,
              message: 'Street should only contain letters and numbers!',
            },
            { min: 5, message: 'Street should be at least 5 characters!' },
            { max: 50, message: 'Street should be at most 50 characters!' },
          ]}
        >
          <Input
            value={deliveryDetails.Street}
            onChange={(e) => setDeliveryDetails({ ...deliveryDetails, Street: e.target.value })}
          />
        </Form.Item>
        <Form.Item
          label="City"
          name="City"
          rules={[
            { required: true, message: 'Please input your city!' },
            { pattern: /^[a-zA-Z\s]+$/, message: 'City should only contain letters!' },
            { min: 2, message: 'City should be at least 2 characters!' },
            { max: 30, message: 'City should be at most 30 characters!' },
          ]}
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
          <Select
            value={deliveryDetails.State}
            onChange={(value) => setDeliveryDetails({ ...deliveryDetails, State: value })}
            options={[
              { value: 'NSW', label: 'NSW' },
              { value: 'VIC', label: 'VIC' },
              { value: 'QLD', label: 'QLD' },
              { value: 'WA', label: 'WA' },
              { value: 'SA', label: 'SA' },
              { value: 'TAS', label: 'TAS' },
              { value: 'ACT', label: 'ACT' },
              { value: 'NT', label: 'NT' },
              { value: 'Others', label: 'Others' },
            ]}
          />
        </Form.Item>
        <Form.Item label={null}>
          <Button type="primary" htmlType="submit" disabled={!isFormValid}>
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
