import { Routes, Route } from 'react-router-dom';

// import pages as follows
import Products from './pages/Products';
import OrderHistory from './pages/Order_history';
import DeliveryDetails from './pages/Delivery_details';
import Header from './components/Header';
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/products" element={<Products />} />
        <Route path="/history" element={<OrderHistory />} />
        <Route path="/delivery" element={<DeliveryDetails />} />
      </Routes>
    </>
  );
}

export default App;
