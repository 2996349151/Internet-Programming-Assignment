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
            result = connection.execute(text("SELECT * FROM Products"))
            products = result.fetchall()
            return products
        
    # Get Orders
    def get_orders(self):
        with self.engine.connect() as connection:
            result = connection.execute(text("SELECT * FROM Orders"))
            orders = result.fetchall()
            return orders
        
    # Get Users
    def get_users(self):
        with self.engine.connect() as connection:
            result = connection.execute(text("SELECT * FROM Users"))
            users = result.fetchall()
            return users