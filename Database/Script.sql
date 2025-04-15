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
    CHECK (Unit > 0)
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
('iPhone 14', 1200, 50, 'electronics', 'mobile'),
('Samsung Galaxy S23', 1000, 40, 'electronics', 'mobile'),
('Google Pixel 7', 900, 30, 'electronics', 'mobile'),
('MacBook Pro', 2500, 20, 'electronics', 'laptop'),
('Dell XPS 13', 2000, 25, 'electronics', 'laptop'),
('Samsung TV', 800, 15, 'electronics', 'tv'),
('T-shirt', 20, 100, 'clothing', 'shirt'),
('Jeans', 50, 80, 'clothing', 'pants'),
('Baseball Cap', 15, 150, 'clothing', 'hat'),
('Apple', 2, 300, 'food', 'apple'),
('Banana', 1, 400, 'food', 'banana'),
('Orange', 3, 200, 'food', 'banana');

-- Insert sample data into Users table
INSERT INTO Users (User_name, Email, Password, Role) VALUES
('admin', 'admin@example.com', 'admin123', 'admin'),
('john_doe', 'john.doe@example.com', 'password123', 'user'),
('jane_smith', 'jane.smith@example.com', 'password456', 'user'),
('alice_brown', 'alice.brown@example.com', 'password789', 'user'),
('bob_white', 'bob.white@example.com', 'password101', 'user');

-- Insert sample data into Orders table
-- Order 1: John Doe orders multiple products
INSERT INTO Orders (Order_number, Order_unit, Cost, Mobile_number, Recipient_name, Recipient_email, Street, City, State, User_id, Product_id) VALUES
(1, 2, 2400, '0412345678', 'John Doe', 'john.doe@example.com', '123 King St', 'Sydney', 'NSW', 2, 1), 
(1, 1, 1000, '0412345678', 'John Doe', 'john.doe@example.com', '123 King St', 'Sydney', 'NSW', 2, 2), 
(1, 3, 60, '0412345678', 'John Doe', 'john.doe@example.com', '123 King St', 'Sydney', 'NSW', 2, 10), 
(2, 1, 2500, '0423456789', 'Jane Smith', 'jane.smith@example.com', '456 Queen St', 'Melbourne', 'VIC', 3, 4), 
(2, 2, 40, '0423456789', 'Jane Smith', 'jane.smith@example.com', '456 Queen St', 'Melbourne', 'VIC', 3, 11), 
(3, 1, 800, '0434567890', 'Alice Brown', 'alice.brown@example.com', '789 George St', 'Brisbane', 'QLD', 4, 6), 
(3, 5, 75, '0434567890', 'Alice Brown', 'alice.brown@example.com', '789 George St', 'Brisbane', 'QLD', 4, 12); 