# Paketera Fullstack Project

This is a full-stack web app developed for the Paketera Full-stack Entry Project.  
The project includes admin, customer, and supplier roles with basic order management features.

---
## Technologies

- Frontend: React (Vite), TailwindCSS
- Backend: Node.js, Express
- Database: PostgreSQL
- API: RESTful
- Auth: Simple username/password check (no JWT)

---
## Features

### Login
You can log in with the following test users:

| Username | Password | Role      |
|----------|----------|-----------|
| admin    | 111      | admin     |
| selen    | 111      | customer  |
| burak    | 111      | customer  |
| idil     | 111      | supplier  |
| şafak    | 111      | supplier  |

---
### Admin
- See all users (except admin)
- View all orders
- See which suppliers are interested
- Add new product types

### Customer
- View available product types
- Create orders
- View your own orders and supplier interest (names masked)

### Supplier
- See all orders
- Filter orders by product type
- Mark orders as interested or not interested

---
## Run the project locally

1. Clone the repo:
   ```bash
   git clone https://github.com/idiltkale/paketera-fullstack-project.git
   cd paketera-fullstack-project
Set up the backend:
cd backend
npm install
Create a .env file in the backend folder:
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=paketeraDatabase
Start backend:
node index.js
Set up and run the frontend:
cd ../frontend
npm install
npm run dev
Open http://localhost:5173 in your browser.
