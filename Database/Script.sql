-- Active: 1744610764034@@127.0.0.1@3306
DROP DATABASE IF EXISTS Shopping_websiteDB;
CREATE DATABASE Shopping_websiteDB;
USE Shopping_websiteDB;

CREATE TABLE Products (
    Product_id INT PRIMARY KEY AUTO_INCREMENT,
    Product_name VARCHAR(255) NOT NULL,
    Price INT NOT NULL,
    Unit INT NOT NULL,

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

Insert into Products (Product_name, Price, Unit) values
('Apple', 5, 10000),
('Banana', 3, 10000),
('Orange', 4, 10000),
('Grapes', 6, 10000),
('Mango', 8, 10000);

Insert into Users (User_name, Email, Password, Role) values
('admin', 'admin@gmail.com', '123456', 'admin'),
('user1', 'uesr1@gmail.com', '654321', 'user');

Insert into Orders (Order_unit, Cost, Mobile_number, Recipient_name, Recipient_email, Street, City, State, User_id, Product_id) values
(2, 10, '1234567890', 'John Doe', 'johndoe@gmail.com', '123 Main St', 'New York', 'NY', 1, 1), -- 2 Apples
(3, 9, '0987654321', 'Jane Smith', 'janesmith@gmail.com', '456 Elm St', 'Los Angeles', 'CA', 2, 2), -- 3 Bananas
(1, 4, '1122334455', 'Alice Brown', 'alicebrown@gmail.com', '789 Pine St', 'Chicago', 'IL', 1, 3), -- 1 Orange
(5, 30, '2233445566', 'Bob White', 'bobwhite@gmail.com', '321 Oak St', 'Houston', 'TX', 2, 4), -- 5 Grapes
(4, 32, '3344556677', 'Charlie Black', 'charlieblack@gmail.com', '654 Maple St', 'Phoenix', 'AZ', 1, 5); -- 4 Mangoes