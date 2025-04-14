from fastapi import FastAPI
from database import MYDB

app = FastAPI()


# Test database command
DB = MYDB()

def check_Authentication(username, password):
    return DB.check_authentication(username, password)


@app.get("/")
def read_root():
    return {"Hello": "World"}

# Get products
@app.get("/products")
def show_products():
    
    products = DB.get_products()
    products = [dict(row._mapping) for row in products]
    return {"products": products}

# Get orders
@app.get("/orders")
def show_orders():
    
    orders = DB.get_orders()
    orders = [dict(row._mapping) for row in orders]
    return {"orders": orders}

# Get users
@app.get("/users/")
def show_users():
    
    users = DB.get_users()
    users = [dict(row._mapping) for row in users]
    return {"users": users}

#Get user history
@app.get("/user_history/username={user_name}&password={password}")
def get_user_history(user_name, password):
    if not check_Authentication(user_name, password):
        return {"error": "Authentication failed"}
    
    user_id = DB.get_user_id(user_name)
    if user_id is None:
        return {"error": "User not found"}
    orders = DB.show_order_history(user_id)
    orders = [dict(row._mapping) for row in orders]
    return {"orders": orders}

# Register
@app.get("/register/username={username}&email={email}&password={password}")
def register_user(username: str, email: str, password: str):
    if DB.register_user(username, email, password):
        return {"message": "User registered successfully"}
    else:
        return {"error": "Email already exists"}
    
# Place order
@app.get("/place_order/username={username}" \
        "&password={password}" \
        "&order_unit_list={order_unit_list}" \
        "&cost_list={cost_list}" \
        "&mobile_number={mobile_number}" \
        "&recipient_name={recipient_name}" \
        "&recipient_email={recipient_email}" \
        "&street={street}" \
        "&city={city}" \
        "&state={state}" \
        "&user_id={user_id}" \
        "&product_id_list={product_id_list}")
def place_order(username,
                password, 
                order_unit_list,
                cost_list,
                mobile_number,
                recipient_name,
                recipient_email,
                street,
                city,
                state,
                product_id_list):
    if not check_Authentication(username, password):
        return {"error": "Authentication failed"}
    
    order_unit_list = order_unit_list.split(",")
    order_unit_list = [int(i) for i in order_unit_list]
    cost_list = cost_list.split(",")
    cost_list = [float(i) for i in cost_list]
    product_id_list = product_id_list.split(",")
    product_id_list = [int(i) for i in product_id_list]
    user_id = DB.get_user_id(username)

    DB.place_order(order_unit_list, cost_list, mobile_number, recipient_name, recipient_email, street, city, state, user_id, product_id_list)
    return {"message": "Order placed successfully"}
