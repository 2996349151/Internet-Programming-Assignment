# Internet-Programming-Assignment

## Database run
```Bash
# Start server
brew services start mysql

# Stop server
brew services stop mysql

# Log into server
mysql -u root

# Check status
mysqladmin -u root -p status
```

## Frontend run
```Bash
cd frontend
npm start
```

## Backend run
```Bash
cd Backend
source venv/bin/activate
npm install requirements.txt
fastapi dev main.py
```