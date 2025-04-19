-- Active: 1744610764034@@127.0.0.1@3306@Shopping_websiteDB
DROP DATABASE IF EXISTS Shopping_websiteDB;
CREATE DATABASE Shopping_websiteDB;
USE Shopping_websiteDB;

CREATE TABLE Products (
    Product_id INT PRIMARY KEY AUTO_INCREMENT,
    Product_name VARCHAR(255) NOT NULL,
    Price INT NOT NULL,
    Unit INT NOT NULL,
    Category ENUM('electronics', 'clothing', 'home_appliances', 'books', 'food') NOT NULL,
    Sub_category ENUM('mobile', 'laptop', 'tv', 
                    'shirt', 'pants', 'hat', 
                    'kitchen_appliances', 'furniture', 'desk', 'chair', 
                    'fiction', 'non_fiction', 'educational', 
                    'beef', 'apple', 'banana') 
                    NOT NULL,

    CHECK (Price > 0),
    CHECK (Unit >= 0)
);

CREATE TABLE Users (
    User_id INT PRIMARY KEY AUTO_INCREMENT,
    User_name VARCHAR(255) NOT NULL,
    Email VARCHAR(255) NOT NULL UNIQUE,
    Password VARCHAR(255) NOT NULL,
    Role ENUM('admin', 'user') NOT NULL
);

CREATE TABLE Orders (
    Order_id INT PRIMARY KEY AUTO_INCREMENT,
    Order_number INT NOT NULL,
    Order_unit INT NOT NULL,
    Cost INT NOT NULL,
    Mobile_number VARCHAR(15) NOT NULL,
    Recipient_name VARCHAR(255) NOT NULL,
    Recipient_email VARCHAR(255) NOT NULL,
    Street VARCHAR(255) NOT NULL,
    City VARCHAR(255) NOT NULL,
    State VARCHAR(255) NOT NULL,
    User_id INT NOT NULL,
    Product_id INT NOT NULL,

    FOREIGN KEY (User_id) REFERENCES Users(User_id),
    FOREIGN KEY (Product_id) REFERENCES Products(Product_id),

    CHECK (Order_unit > 0),
    CHECK (Cost > 0)
);

-- Insert sample data into Products table
INSERT INTO Products (Product_name, Price, Unit, Category, Sub_category) VALUES
-- Electronics - Mobile
('iPhone 14', 1200, 50, 'electronics', 'mobile'),
('Samsung Galaxy S23', 1000, 0, 'electronics', 'mobile'), -- Out of stock
('Google Pixel 7', 900, 30, 'electronics', 'mobile'),
-- Electronics - Laptop
('MacBook Pro', 2500, 20, 'electronics', 'laptop'),
('Dell XPS 13', 2000, 25, 'electronics', 'laptop'),
('HP Spectre x360', 1800, 0, 'electronics', 'laptop'), -- Out of stock
-- Electronics - TV
('Samsung QLED TV', 1500, 10, 'electronics', 'tv'),
('LG OLED TV', 1400, 0, 'electronics', 'tv'), -- Out of stock
('Sony Bravia', 1300, 5, 'electronics', 'tv'),
-- Clothing - Shirt
('T-shirt', 20, 100, 'clothing', 'shirt'),
('Polo Shirt', 30, 0, 'clothing', 'shirt'), -- Out of stock
('Formal Shirt', 40, 50, 'clothing', 'shirt'),
-- Clothing - Pants
('Jeans', 50, 80, 'clothing', 'pants'),
('Chinos', 60, 0, 'clothing', 'pants'), -- Out of stock
('Formal Pants', 70, 40, 'clothing', 'pants'),
-- Clothing - Hat
('Baseball Cap', 15, 150, 'clothing', 'hat'),
('Beanie', 10, 0, 'clothing', 'hat'), -- Out of stock
('Fedora', 25, 60, 'clothing', 'hat'),
-- Food - Apple
('Red Apple', 2, 300, 'food', 'apple'),
('Green Apple', 3, 0, 'food', 'apple'), -- Out of stock
('Golden Apple', 4, 200, 'food', 'apple'),
-- Food - Banana
('Banana', 1, 400, 'food', 'banana'),
('Organic Banana', 2, 0, 'food', 'banana'), -- Out of stock
('Good Banana', 3, 200, 'food', 'banana');

INSERT INTO Users (User_name, Email, Password, Role) VALUES
-- Admins
('admin', 'admin@example.com', 'admin123', 'admin'),
-- Regular Users
('john_doe', 'john.doe@example.com', 'password123', 'user'),
('jane_smith', 'jane.smith@example.com', 'password456', 'user'),
('alice_brown', 'alice.brown@example.com', 'password789', 'user'),
('bob_white', 'bob.white@example.com', 'password101', 'user');

INSERT INTO Orders (Order_number, Order_unit, Cost, Mobile_number, Recipient_name, Recipient_email, Street, City, State, User_id, Product_id) VALUES
-- Order 1: John Doe orders multiple products
(1, 2, 2400, '0412345678', 'John Doe', 'john.doe@example.com', '123 King St', 'Sydney', 'NSW', 2, 1), 
(1, 1, 1000, '0412345678', 'John Doe', 'john.doe@example.com', '123 King St', 'Sydney', 'NSW', 2, 3), 
(1, 3, 60, '0412345678', 'John Doe', 'john.doe@example.com', '123 King St', 'Sydney', 'NSW', 2, 10),
-- Order 2: Jane Smith orders multiple products
(2, 1, 2500, '0423456789', 'Jane Smith', 'jane.smith@example.com', '456 Queen St', 'Melbourne', 'VIC', 3, 4), 
(2, 2, 40, '0423456789', 'Jane Smith', 'jane.smith@example.com', '456 Queen St', 'Melbourne', 'VIC', 3, 11), 
-- Order 3: Alice Brown orders multiple products
(3, 1, 800, '0434567890', 'Alice Brown', 'alice.brown@example.com', '789 George St', 'Brisbane', 'QLD', 4, 7), 
(3, 5, 75, '0434567890', 'Alice Brown', 'alice.brown@example.com', '789 George St', 'Brisbane', 'QLD', 4, 12),
-- Order 4: Bob White orders multiple products
(4, 1, 900, '0445678901', 'Bob White', 'bob.white@example.com', '321 Park St', 'Perth', 'WA', 5, 3), 
(4, 2, 100, '0445678901', 'Bob White', 'bob.white@example.com', '321 Park St', 'Perth', 'WA', 5, 8); 