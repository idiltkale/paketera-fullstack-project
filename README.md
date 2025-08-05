# Paketera Full-stack Project

This is a full-stack web application developed as part of the Paketera Junior Full-Stack Developer evaluation project. It allows users to log in as Admin, Customer, or Supplier and manage product orders and interests accordingly.

## 🚀 Technologies Used

### Frontend
- React (with Vite)
- Tailwind CSS
- React Hooks

### Backend
- Node.js
- Express.js
- PostgreSQL (deployed on Render)

### Deployment
- Frontend deployed on Vercel → [View Live](https://paketera-fullstack-project.vercel.app)
- Backend deployed on Render → [API Base URL](https://paketera-fullstack-project.onrender.com)

---

## 👤 User Roles

### Admin
- View all users (except admin)
- View all orders
- See which suppliers are interested in which orders
- Add new product types

### Customer
- View product types
- Create orders with one or more product types
- View their own orders and see interested suppliers (name-masked)

### Supplier
- Filter and view orders by product type
- Mark orders as "Interested ✅" or "Not Interested ❌"

---

## ⚙️ Local Development

### 1. Clone the Repository

```bash
git clone https://github.com/idiltkale/paketera-fullstack-project.git
cd paketera-fullstack-project
2. Setup Backend
cd backend
npm install
Create a .env file:
DATABASE_URL=postgresql://<your_postgres_credentials>
Then run:
node index.js
3. Setup Frontend
cd frontend
npm install
npm run dev
🧪 Default Test Users
Admin
Username: admin
Password: admin
Supplier
Username: selen
Password: 111
Customer
Username: idil
Password: 123
📂 Project Structure
paketera-fullstack-project/
├── backend/      # Node.js + Express API
├── frontend/     # React + Vite + Tailwind UI
└── README.md
✅ Features Completed
 CRUD operations for orders and product types
 Role-based UI for Admin, Supplier, and Customer
 Responsive and functional UI with Tailwind
 Live deployment with Vercel & Render
