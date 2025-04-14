from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker, declarative_base

# Get the orders
class MYDB:
    def __init__(self):
        self.DATABASE_URL = "mysql+pymysql://root@localhost:3306/Shopping_websiteDB"
        self.engine = create_engine(self.DATABASE_URL)
    
    # Get Products
    def get_products(self):
        with self.engine.connect() as connection:
            products = connection.execute(text("SELECT * FROM Products")).fetchall()
            return products
        
    # Get Orders
    def get_orders(self):
        with self.engine.connect() as connection:
            orders = connection.execute(text("SELECT * FROM Orders")).fetchall()
            return orders
        
    # Get Users
    def get_users(self):
        with self.engine.connect() as connection:
            users = connection.execute(text("SELECT * FROM Users")).fetchall()
            return users
    
    # Get User_id
    def get_user_id(self, user_name):
        with self.engine.connect() as connection:
            user_id = connection.execute(text("SELECT User_id FROM Users WHERE User_name = :username"), 
                                        {"username": user_name}).fetchone()
            if user_id is None:
                return None
            return user_id[0]
        
    # Get Prodcut_id
    def get_product_id(self, product_name):
        with self.engine.connect() as connection:
            product_id = connection.execute(text("SELECT Product_id FROM Products WHERE Product_name = :product_name"), 
                                        {"product_name": product_name}).fetchone()
            if product_id is None:
                return None
            return product_id[0]
        
    # Check Authentication
    def check_authentication(self, username, password):
        with self.engine.connect() as connection:
            user = connection.execute(text("SELECT * FROM Users WHERE User_name = :username AND Password = :password"), 
                                    {"username": username, "password": password}).fetchone()
            if user is None:
                return False
            return True
    
    # Register User
    def register_user(self, username, email, password):
        with self.engine.connect() as connection:
            users_email = connection.execute(text("SELECT Email FROM Users ")).fetchall()
            for user in users_email:
                if user[0] == email:
                    return False
            connection.execute(text("INSERT INTO Users (User_name, Email, Password) VALUES (:username, :email, :password)"), 
                               {"username": username, "email": email, "password": password}
            )
            return True

    # Show order History
    def show_order_history(self, user_id):
        with self.engine.connect() as connection:
            orders = connection.execute(text("SELECT * FROM Orders WHERE User_id = :user_id"), {"user_id": user_id}).fetchall()
            return orders

    # Plase Orders
    def place_order(self, order_unit_list, cost_list, mobile_number, recipient_name, recipient_email, street, city, state, user_id, product_id_list):
        with self.engine.connect() as connection:
            for i in range(len(order_unit_list)):
                connection.execute(text("INSERT INTO Orders (Order_unit, Cost, Mobile_number, Recipient_name, Recipient_email, Street, City, State, User_id, Product_id) " \
                                        "VALUES (:order_unit, :cost, :mobile_number, :recipient_name, :recipient_email, :street, :city, :state, :user_id, :product_id)"), 
                                    {"order_unit": order_unit_list[i], "cost": cost_list[i], "mobile_number": mobile_number, "recipient_name": recipient_name,
                                    "recipient_email": recipient_email, "street": street, "city": city, "state": state,"user_id": user_id,"product_id": product_id_list[i]}
                )
                
                # Update product unit
                connection.execute(text("UPDATE Products SET Product_unit = Prpduct_unit - :order_unit WHERE Product_id = :product_id"), 
                                    {"order_unit": order_unit_list[i], "product_id": product_id_list[i]}
                )
