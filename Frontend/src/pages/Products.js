import React, { Children, use, useEffect, useState, useContext } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { data, Scripts, useNavigate } from 'react-router-dom';
import { Button, Table, Input, Space, Menu, Modal, message } from 'antd';
import { GlobalContext } from '../GlobalContext';
import { getProducts } from '../api/api';
import Login from '../components/Login';
import Cart from '../components/Shopping_cart';

function Products() {
  const [selected, Setselected] = useState('ALL');
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [allowAddToCart, setAllowAddToCart] = useState([]);
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const { authentification, cart, addToCart, logout, productImageUrl } = useContext(GlobalContext);

  const handleCategorySelect = (e) => {
    console.log('click ', e);
    Setselected(e.key);
    changeSelectedProducts(e.key);
  };

  const handleSeachBoxChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearchClick = (e) => {
    console.log('search', searchValue);
    const chosen = products.filter((product) =>
      product.Product_name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setSelectedProduct(chosen);
  };

  const handleLoginOpen = () => {
    setIsLoginModalOpen(true);
  };

  const handleLoginClose = () => {
    setIsLoginModalOpen(false);
  };

  const handleCartOpen = () => {
    setIsCartModalOpen(true);
  };
  const handleCartClose = () => {
    setIsCartModalOpen(false);
  };

  const changeSelectedProducts = (key) => {
    console.log('key', key);
    if (key === 'ALL') {
      setSelectedProduct(products);
    } else if (
      key === 'electronics' ||
      key === 'clothing' ||
      key === 'home_appliances' ||
      key === 'books' ||
      key === 'food'
    ) {
      const chosen = products.filter((product) => product.Category === key);
      console.log('chosen', chosen);
      setSelectedProduct(chosen);
    } else {
      const chosen = products.filter((product) => product.Sub_category === key);
      console.log('chosen', chosen);
      setSelectedProduct(chosen);
    }
  };

  const handleLogOut = () => {
    logout();
  };

  const handleAddToCart = (Product_id, Product_name, Price, Unit) => {
    if (authentification.isAuthenticated === false) {
      setIsLoginModalOpen(true);
      return;
    }
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].Product_id === Product_id) {
        if (cart[i].Quantity >= Unit) {
          messageApi.open({
            type: 'error',
            content: 'You have reached the maximum quantity for this product',
          });
          return;
        }
      }
    }
    addToCart(Product_id, Product_name, Price, Unit);
  };
  const CategoryMenu = [
    { label: 'All', key: 'ALL' },
    {
      label: 'Electronics',
      key: 'Electronics',
      children: [
        {
          label: 'All Electronics',
          key: 'electronics',
        },
        {
          label: 'Mobile',
          key: 'mobile',
        },
        {
          label: 'Laptop',
          key: 'laptop',
        },
        {
          label: 'TV',
          key: 'tv',
        },
      ],
    },
    {
      label: 'Clothing',
      key: 'Clothing',
      children: [
        {
          label: 'All Clothing',
          key: 'clothing',
        },
        {
          label: 'Shirt',
          key: 'shirt',
        },
        {
          label: 'Pants',
          key: 'pants',
        },
        {
          label: 'Hat',
          key: 'hat',
        },
      ],
    },
    {
      label: 'Home Appliances',
      key: 'Home_appliances',
      children: [
        {
          label: 'All Home Appliances',
          key: 'home_appliances',
        },
        {
          label: 'Kitcken Appliances',
          key: 'kitchen_appliances',
        },
        {
          label: 'Furniture',
          key: 'furniture',
        },
        {
          label: 'Desk',
          key: 'desk',
        },
        {
          label: 'Chair',
          key: 'chair',
        },
      ],
    },
    {
      label: 'Books',
      key: 'Books',
      children: [
        {
          label: 'All Books',
          key: 'books',
        },
        {
          label: 'Fiction',
          key: 'fiction',
        },
        {
          label: 'Non-Fiction',
          key: 'non_fiction',
        },
        {
          label: 'Educational',
          key: 'educational',
        },
      ],
    },
    {
      label: 'Food',
      key: 'Food',
      children: [
        { label: 'All food', key: 'food' },
        {
          label: 'beef',
          key: 'beef',
        },
        {
          label: 'apple',
          key: 'apple',
        },
        {
          label: 'banana',
          key: 'banana',
        },
      ],
    },
  ];

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
      title: 'Name',
      dataIndex: 'Product_name',
      key: 'Product_name',
    },
    {
      title: 'Price',
      dataIndex: 'Price',
      key: 'Price',
    },
    {
      title: 'In stock',
      render: (_, { Unit }) => (
        <>
          {Unit > 0 ? (
            <span style={{ color: 'green' }}>In stock</span>
          ) : (
            <span style={{ color: 'red' }}>Out of stock</span>
          )}
        </>
      ),
    },
    {
      title: 'Unit',
      dataIndex: 'Unit',
      key: 'Unit',
    },
    {
      title: 'Add to cart',
      render: (_, { Product_id, Product_name, Price, Unit }) => (
        <>
          <script>console.log(Product_id)</script>
          <Button
            disabled={!allowAddToCart[Product_id - 1]}
            onClick={() => handleAddToCart(Product_id, Product_name, Price, Unit)}
          >
            Add to Cart
          </Button>
        </>
      ),
    },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await getProducts();
      setProducts(response.data.products);
      setSelectedProduct(response.data.products);
      console.log('get products');
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const newAllowAddToCart = products.map((product) => product.Unit > 0);
    setAllowAddToCart(newAllowAddToCart);
  }, [products]);

  return (
    <div>
      {contextHolder}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
        }}
      >
        <Space.Compact style={{ width: '50%' }}>
          <Input
            placeholder="Input product name to search"
            allowClear
            onChange={handleSeachBoxChange}
          />
          <Button onClick={handleSearchClick}>
            <SearchOutlined />
          </Button>
        </Space.Compact>
        <div style={{ display: 'flex', gap: '10px' }}>
          <Button onClick={handleCartOpen} color="danger" variant="solid">
            My Cart
          </Button>
          {authentification.isAuthenticated ? (
            <>
              <Button onClick={() => navigate('/history')} type="primary">
                User order history
              </Button>
              <Button onClick={handleLogOut}>Logout</Button>
            </>
          ) : (
            <>
              <Button onClick={handleLoginOpen} type="primary">
                Login
              </Button>
              <Modal
                title="Login"
                open={isLoginModalOpen}
                onCancel={handleLoginClose}
                footer={null}
              >
                <Login />
              </Modal>
            </>
          )}
        </div>
      </div>

      <Menu
        onSelect={handleCategorySelect}
        selectedKeys={[selected]}
        defaultOpenKeys={['ALL']}
        mode="horizontal"
        items={CategoryMenu}
        style={{
          fontSize: '15px',
          fontWeight: 'bold',
          backgroundColor: '#f0f0f0',
        }}
      />

      <Table columns={TableColumns} dataSource={selectedProduct} tableLayout="auto" />
      <Modal
        open={isCartModalOpen}
        onCancel={handleCartClose}
        footer={null}
        width={1600}
        zIndex={1000}
      >
        <Cart />
      </Modal>
    </div>
  );
}

export default Products;
