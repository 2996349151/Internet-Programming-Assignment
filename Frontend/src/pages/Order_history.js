import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Button, Collapse } from 'antd';
import { GlobalContext } from '../GlobalContext';
import { getOrderHistory } from '../api/api';
function OrderHistory() {
  const [history, setHistory] = useState([]);
  const [orderNumbers, setOrderNumbers] = useState([]);
  const navigate = useNavigate();
  const { authentification } = useContext(GlobalContext);
  const [groupedOrders, setGroupedOrders] = useState({});

  const TableColumns = [
    {
      title: 'Product_id',
      dataIndex: 'Product_id',
      key: 'Product_id',
    },
    {
      title: 'Order_unit',
      dataIndex: 'Order_unit',
      key: 'Order_unit',
    },
    {
      title: 'Cost',
      dataIndex: 'Cost',
      key: 'Cost',
    },
  ];

  // order number is not incremental, so we need to group the orders by order number
  function groupOrder() {
    const groupedOrders = {};
    const orderNumbersSet = new Set();
    history.forEach((order) => {
      const orderNumber = order.Order_number;
      if (!groupedOrders[orderNumber]) {
        groupedOrders[orderNumber] = [];
      }
      groupedOrders[orderNumber].push(order);
      orderNumbersSet.add(orderNumber);
    });
    setGroupedOrders(groupedOrders);
    setOrderNumbers(Array.from(orderNumbersSet));
    console.log('groupedOrders', groupedOrders);
    console.log('orderNumbers', orderNumbers);
  }

  function generateOneGroupedOrderTable(order_number) {
    return (
      <div>
        <Table columns={TableColumns} dataSource={groupedOrders[order_number]} />
        <h1>
          Total Cost:
          {groupedOrders[order_number].reduce((acc, order) => acc + order.Cost, 0)}
        </h1>
      </div>
    );
  }

  function generateAllGroupedOrderCollapse() {
    const items = [];
    orderNumbers.forEach((order_number) => {
      items.push({
        key: order_number,
        label: `Order number: ${order_number} 
            Mobile ${groupedOrders[order_number][0].Mobile_number} 
            Recipient: ${groupedOrders[order_number][0].Recipient_name} 
            Street: ${groupedOrders[order_number][0].Street} 
            City: ${groupedOrders[order_number][0].City} 
            State: ${groupedOrders[order_number][0].State} `,
        children: generateOneGroupedOrderTable(order_number),
      });
    });
    return items;
  }
  useEffect(() => {
    const fetchOrderHistory = async () => {
      const response = await getOrderHistory(authentification.username, authentification.password);
      setHistory(response.data.orders);
    };
    fetchOrderHistory();

    // Every order has a order number, so mltiple orders rows actually can belong to one order, now we need to group them
  }, []);

  useEffect(() => {
    groupOrder();
  }, [history]);

  return (
    <div>
      <Button onClick={() => navigate('/products')}>Back to home</Button>
      <Collapse items={generateAllGroupedOrderCollapse()} />
    </div>
  );
}
export default OrderHistory;
