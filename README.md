# Garments Order & Production Tracker System

<!-- [![License](https://img.shields.io/badge/License-MIT-green)]()
[![Status](https://img.shields.io/badge/Status-Completed-blue)]()
[![Frontend](https://img.shields.io/badge/Frontend-React-brightgreen)]()
[![Backend](https://img.shields.io/badge/Backend-Node.js-orange)]() -->

---

## 🌐 Live Demo
**Live Site:** http://localhost:5173/

---

## 🔹 About The Project
The **Garments Order & Production Tracker System** is a modern web application for small and medium garment factories.  
It simplifies managing:

- Buyer orders  
- Production workflow (Cutting → Sewing → Finishing → QC → Delivery)  
- Inventory and timely delivery  

Supports **Admin, Manager, and Buyer** roles with role-based dashboards, product management, and order tracking.

---

## ⭐ Key Features
### Authentication & User Management
- Email/Password login & registration using Firebase/JWT  
- Role-based access (Admin, Manager, Buyer)  
- Admin can suspend users and provide feedback  

### Products & Orders
- View products with images, descriptions, price, and stock  
- Product details page with order form & payment options  
- Managers can add, update, or delete products  
- Admins can manage all products and approve homepage visibility  

### Dashboard & Tracking
- Admin: Manage users, products, and orders  
- Manager: Approve/reject orders, track production stages  
- Buyer: Place orders, track order progress  
- Step-by-step timeline for production & delivery  

### UI/UX & Responsiveness
- Modern, responsive design for all devices  
- Dark/Light theme toggle  
- Smooth animations with Framer Motion  
- Toast/SweetAlert notifications for all actions  
- Loading spinners during API calls  

---

## 🛠 Technologies Used

**Frontend:** React.js, Tailwind CSS, React Router, Framer Motion, React Hook Form, Axios  
**Backend:** Node.js, Express.js, MongoDB, Mongoose, JWT/Firebase Auth  
**Deployment:** Vercel / Netlify (Frontend), Render / Railway / Heroku (Backend)  

---

## ⚡ Installation

### Server
```bash
git clone YOUR_SERVER_REPO_LINK
cd server
npm install
# Create a .env file:
# MONGO_URI=your_mongodb_connection_string
# JWT_SECRET=your_jwt_secret
# FIREBASE_API_KEY=your_firebase_api_key
npm start
Client
bash
Copy code
git clone YOUR_CLIENT_REPO_LINK
cd client
npm install
# Create a .env file:
# REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
# REACT_APP_BACKEND_URL=your_backend_url
npm start
🧑‍💻 Test Credentials
Role	Email	Password
Admin	admin@example.com	Admin@123
Manager	manager@example.com	Manager@123
Buyer	user@example.com	User@123

📂 Repository Links
Server: Server Repo Link

Client: Client Repo Link

🎨 UI & Design Resources
Modern and professional layout inspired by e-commerce & production dashboards

Hero banner, “How it Works” steps, customer feedback carousel

Grid layout for products with equal card sizes

Fully responsive and mobile-friendly

Resources:

UI Inspiration

Free Images & Assets

Theme Inspiration