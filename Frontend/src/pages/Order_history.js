import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Button, Collapse } from 'antd';
import { GlobalContext } from '../GlobalContext';
import { getOrderHistory, getProducts } from '../api/api';
function OrderHistory() {
  const [history, setHistory] = useState([]);
  const [orderNumbers, setOrderNumbers] = useState([]);
  const navigate = useNavigate();
  const { authentification } = useContext(GlobalContext);
  const [groupedOrders, setGroupedOrders] = useState({});
  const [products, setProducts] = useState([]);

  const TableColumns = [
    {
      title: 'Product_id',
      dataIndex: 'Product_id',
      key: 'Product_id',
    },
    {
      title: 'Product_name',
      render(_, { Product_id }) {
        const product = products.find((product) => product.Product_id === Product_id);
        return <span>{product ? product.Product_name : 'Unknown'}</span>;
      },
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
        <h3 style={{ marginTop: '0px', marginBottom: '0px' }}>
          Total Cost:
          {groupedOrders[order_number].reduce(
            (acc, order) => acc + order.Cost * order.Order_unit,
            0
          )}
        </h3>
      </div>
    );
  }

  function generateAllGroupedOrderCollapse() {
    const items = [];
    orderNumbers.forEach((order_number) => {
      items.push({
        key: order_number,
        label: `Order number: ${order_number} --
            Mobile ${groupedOrders[order_number][0].Mobile_number} --
            Recipient: ${groupedOrders[order_number][0].Recipient_name} --
            Street: ${groupedOrders[order_number][0].Street} --
            City: ${groupedOrders[order_number][0].City} --
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

    const fetchProducts = async () => {
      const response = await getProducts();
      setProducts(response.data.products);
    };
    fetchProducts();
    fetchOrderHistory();

    // Every order has a order number, so mltiple orders rows actually can belong to one order, now we need to group them
  }, []);

  useEffect(() => {
    groupOrder();
  }, [history]);

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'right',
          marginTop: '20px',
          marginBottom: '20px',
          margin: '20px',
        }}
      >
        <Button onClick={() => navigate('/products')}>Back to home</Button>
      </div>
      <Collapse items={generateAllGroupedOrderCollapse()} style={{ margin: '20px' }} />
    </div>
  );
}
export default OrderHistory;
