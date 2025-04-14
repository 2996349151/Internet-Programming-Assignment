from fastapi import FastAPI
from database import MYDB
app = FastAPI()

# Test database command
DB = MYDB()
print(DB.get_products())
print(DB.get_orders())

