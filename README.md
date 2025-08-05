Paketera - Full-stack Software Engineer Entry Project
====================================================

Packaging Request and Supplier Notification System

---

Project Overview
----------------

This project is designed to evaluate basic front-end and back-end skills.
It consists of three main modules: Admin, Customer, and Supplier.

---

Modules and Features
--------------------

Admin Module
- View all customers and suppliers
- View all orders and interested suppliers
- View and add product types

Customer Module
- View product types
- Create orders with multiple product types and quantities
- View own orders and details
- See masked names of interested suppliers

Supplier Module
- Filter and list orders by product types
- View order details
- Mark interest or disinterest with ✅ / ❎ buttons

---

Technologies
------------

- Frontend: ReactJS (NextJS optional)
- CSS: Tailwind, Bootstrap, Material UI, etc.
- Backend: Node.js + Express (NestJS optional)
- Database: PostgreSQL (preferred) or JSON mock data
- API: REST
- Auth: Basic Auth with mock JSON login

---

Default Credentials (For Testing)
---------------------------------

Username | Password | Role
---------|----------|-------
admin    | 111      | admin
selen    | 111      | customer
burak    | 111      | customer
idil     | 111      | supplier
şafak    | 111      | supplier

---

Live Deployment Links
---------------------

Backend API: https://paketera-fullstack-project.onrender.com  
Frontend App: https://paketera-fullstack-project.vercel.app

---

Setup and Run Locally
---------------------

Backend

1. Create `.env` file in `/backend` with:

   DB_HOST=dpg-d28q648gjchc73bvs970-a.frankfurt-postgres.render.com  
   DB_PORT=5432  
   DB_NAME=paketera_database  
   DB_USER=paketera_database_user  
   DB_PASSWORD=your_password_here

2. Install dependencies and start server:

   cd backend  
   npm install  
   npm start

Frontend

1. Install dependencies and start dev server:

   cd frontend  
   npm install  
   npm run dev

---

Important Notes
---------------

- Frontend fetch URLs **must** point to the live backend URL, not `localhost`.  
- Backend `.env` must have **correct** DB credentials matching the Render PostgreSQL instance.  
- If you get errors like "`filter is not a function`", check if fetched data is an array.  
- Use the default credentials above for logging in and testing.


