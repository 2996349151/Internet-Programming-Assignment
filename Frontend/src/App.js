import react from 'react';
import { Routes, Route } from 'react-router-dom';
import { DatePicker } from 'antd';

// import components as follows
import Products from './pages/Products';
import OrderHistory from './pages/Order_history';
import DeliveryDetails from './pages/Delivery_details';
import Header from './components/Header';
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/products" element={<Products />} />
        <Route path="/history" element={<OrderHistory />} />
        <Route path="/delivery" element={<DeliveryDetails />} />
      </Routes>
    </>
  );
}

// Requirements

// The Website logo should appear on all pages of the website.

// Sreach box
// The search box should appear on all pages except the shopping cart, delivery details and order confirmation pages.
// The search box should show some hints when empty.
// User can use keywords about product names and/or descriptions (if applicable) to look up items from database.
// Search results should show as a grid view of items, with name, image, unit, price, (not) in stock and an “add to cart” button.

// Item categories should appear on all pages except the shopping cart, delivery details and order confirmation pages.
// Users can further expand the categories to see sub-categories.
// Users can click a category or sub-category to view a grid view of all items in the category or sub-category, where each item should show name, image, unit, price, (not) in stock and an “add to cart” button.
// The “add to cart" button is non-clickable if the item is unavailable (out of stock).
// User can click the “add to cart” button to add an item to the shopping cart if the item is available or in stock.
// Clicking the “add to cart" button again will increment the quantity of an item that is already in the cart by one.

// Shopping cart
// The shopping cart may appear as a pop-up window, a floating element, a designated area on the page, or a dedicated web page.
// It should be minimized/hidden by default – so users cannot see the items in it by default.
// User can click a button/icon to view or hide the content of the shopping cart.
// For each item in the shopping cart, users could view its name, image, unit price, and quantity added.
// The shopping cart should show the total price for the whole shopping cart.
// User can remove an item from the shopping cart.
// User can update the quantity of an item in the shopping cart.
// User can clear the shopping cart through just one click.
// User can retrieve the shopping cart within a short period of time using the same device.
// User cannot proceed to give delivery details if the shopping cart is empty.
// User can proceed to give delivery details by clicking a “place an order” button when the shopping cart is non-empty.

// Delivery details
// The page should show a form requesting user to provide recipient’s name, address, mobile number, and email address, all marked as required.
// The address section should allow user to input the street, city/suburb, and then select the Australian states and territories (NSW, VIC, QLD, WA, SA, TAS, ACT, NT, Others).
// The form’s inputs should be validated appropriately (e.g., an email address must follow certain formats).
// The user cannot place an order if the inputs are not validated successfully.
// The website should also re-check the availability (in stock or not) of all items in the order upon placing the order.
// If any item becomes unavailable or insufficient for the order, user will be notified of the reason and redirected to the shopping cart.
// Once validated, user can proceed to place the order (e.g., by clicking a “submit” button).

// Order confirmation
// If the order is placed successfully, quantities of items will be updated in the database.
// Also, the shopping cart will be cleared
// And user will receive a confirmation email enclosing the order details. You don’t have to actually send the email, but the page should pretend so and show order confirmation.

// Interactive features
// A category/sub-category should be highlighted or exhibit other visual efforts when the mouse is over or clicking it.
// An item should be highlighted or exhibit other visual efforts when the mouse is over it.
// The “add to cart” button shows differently (e.g., in grey cooler) when the corresponding item is not in stock (or unavailable).
// The “place an order” button shows differently (e.g., in grey colour) when the shopping cart is empty.
// The “submit” button shows differently (e.g., in grey colour) when the ordered items cannot by validated

export default App;
