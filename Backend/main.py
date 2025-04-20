from fastapi import FastAPI
from database import MYDB
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

# create FastAPI instance
app = FastAPI()

# Allow CORS for all origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# create database instance
DB = MYDB()


# check authentication
def check_Authentication(username, password):
    return DB.check_authentication(username, password)


@app.get("/")
def read_root():
    return {"Hello": "World"}


# Get all products
@app.get("/products")
def show_products():

    products = DB.get_products()
    products = [dict(row._mapping) for row in products]
    return {"products": products}


# Get products by category
@app.get("/products/category={category}")
def show_products_by_category(category):
    products = DB.get_products_by_category(category)
    products = [dict(row._mapping) for row in products]
    return {"products": products}


# Get products by sub_category
@app.get("/products/sub_category={sub_category}")
def show_products_by_sub_category(sub_category):
    products = DB.get_products_by_sub_category(sub_category)
    products = [dict(row._mapping) for row in products]
    return {"products": products}


# Get all orders
@app.get("/orders")
def show_orders():

    orders = DB.get_orders()
    orders = [dict(row._mapping) for row in orders]
    return {"orders": orders}


# Get all users
@app.get("/users/")
def show_users():

    users = DB.get_users()
    users = [dict(row._mapping) for row in users]
    return {"users": users}


# Get certain user history
class UserHistoryRequest(BaseModel):
    username: str
    password: str


@app.post("/history")
def show_user_history(user_history_request: UserHistoryRequest):
    if not check_Authentication(
        user_history_request.username, user_history_request.password
    ):
        return {"error": "Authentication failed"}

    user_id = DB.get_user_id(user_history_request.username)
    if user_id is None:
        return {"error": "User not found"}
    if user_id == 1:
        orders = DB.get_orders()
    else:
        orders = DB.show_order_history(user_id)

    orders = [dict(row._mapping) for row in orders]
    return {"orders": orders}


# Login
class LoginRequest(BaseModel):
    username: str
    password: str


@app.post("/login")
def login_user(login_request: LoginRequest):
    if DB.check_authentication(login_request.username, login_request.password):
        return {"code": 1, "message": "Login successful"}
    else:
        return {"code": 0, "message": "Invalid username or password"}


# Place the order using JSON payload
class OrderRequest(BaseModel):
    username: str
    password: str
    order_unit_list: list[int]
    cost_list: list[int]
    mobile_number: str
    recipient_name: str
    recipient_email: str
    street: str
    city: str
    state: str
    product_id_list: list[int]
    order_number: int


@app.post("/place_order")
def place_order(order: OrderRequest):
    if not check_Authentication(order.username, order.password):
        return {"error": "Authentication failed"}
    user_id = DB.get_user_id(order.username)
    if user_id is None:
        return {"error": "User not found"}
    DB.place_order(
        order.order_number,
        order.order_unit_list,
        order.cost_list,
        order.mobile_number,
        order.recipient_name,
        order.recipient_email,
        order.street,
        order.city,
        order.state,
        user_id,
        order.product_id_list,
    )
    return {"message": "Order placed successfully"}
