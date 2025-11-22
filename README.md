⭐ Healthcare Portal – Full-Stack MERN Application

A complete Healthcare Management Portal built using the MERN stack with Role-Based Access Control (RBAC).
This system allows Patients and Healthcare Providers to access separate dashboards, manage medical data, track compliance, and securely communicate.

📌 Table of Contents

Overview

Features

Tech Stack

Project Architecture

Folder Structure

Installation Guide

Environment Variables

API Documentation

Authentication Flow

Role-Based Access Control

Screenshots

Future Improvements

License

📖 Overview

This is a full-stack healthcare platform where:

Patients can register, login, update profiles, and view their health compliance data.

Healthcare Providers can log in to their separate dashboard, view assigned patients, and monitor compliance statuses.

The system includes JWT authentication, secure password hashing, and full role-based access control.

This project is designed for hackathons, real-world healthcare platforms, and interview portfolio projects.

🎯 Features
👤 Patient Features

Register & Login

Unique JWT-based authentication

Patient Dashboard

View personal data

Track health compliance

Update profile

Logout

🩺 Healthcare Provider Features

Provider login

Provider dashboard

View list of all assigned patients

Check compliance status

Secure access using RBAC (providers only)

🔐 Security Features

Bcrypt password hashing

JWT authentication

Role-based access

Protected APIs

Error handling

Middleware-based token verification

🧰 Tech Stack
Frontend

React.js

React Router

Axios

Context API / LocalStorage

Tailwind CSS / CSS Modules

Backend

Node.js

Express.js

JWT

Bcrypt

Express Validator

Database

MongoDB

Mongoose ORM

Tools

Nodemon

Postman

Git + GitHub

Vercel / Netlify (Frontend)

Render / Railway (Backend)

🏗 Project Architecture
Frontend (React)
       ↕ Axios
Backend (Express + Node.js)
       ↕ Mongoose
Database (MongoDB)


JWT used for secure communication

Middleware handles authentication & authorization

Providers have restricted routes using RBAC

Clean separation of concerns (Controllers → Routes → Middleware → Models)

📁 Folder Structure
healthcare-portal/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   └── providerController.js
│   │   ├── middleware/
│   │   │   └── authMiddleware.js
│   │   ├── models/
│   │   │   └── User.js
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   └── providerRoutes.js
│   │   ├── server.js
│   │   └── config/
│   │       └── db.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── App.js
│   │   ├── main.jsx
│   └── package.json
│
└── README.md

🛠 Installation Guide
1️⃣ Clone the repository
git clone https://github.com/your-username/healthcare-portal.git
cd healthcare-portal

2️⃣ Install backend dependencies
cd backend
npm install

3️⃣ Install frontend dependencies
cd ../frontend
npm install

4️⃣ Start backend server
cd backend
npm run dev

5️⃣ Start frontend
cd frontend
npm run dev

🔑 Environment Variables

Create a .env file inside backend/:

MONGO_URI=YOUR_MONGO_URL
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d
PORT=5000

📡 API Documentation
1. Register User

POST /api/auth/register

{
  "name": "John",
  "email": "john@gmail.com",
  "password": "123456",
  "role": "patient"
}

2. Login

POST /api/auth/login

{
  "email": "john@gmail.com",
  "password": "123456"
}


Returns:

{
  "token": "jwt_token_here",
  "user": {
    "id": "123456",
    "email": "john@gmail.com",
    "role": "patient"
  }
}

3. Provider – View Assigned Patients

GET /api/provider/assigned-patients
Allowed only for role = provider.

🔐 Authentication Flow

User registers (role = patient / provider)

Backend generates JWT

Token stored in frontend localStorage

On every request, frontend sends

Authorization: Bearer <token>


Backend verifies token in authMiddleware.js

If valid → route continues

If invalid → 401 Unauthorized

🛡 Role-Based Access Control (RBAC)
Middleware
exports.restrictTo("provider")

Example Route
router.get(
  "/assigned-patients",
  protect,
  restrictTo("provider"),
  getAssignedPatients
);


Patients cannot access provider APIs.

🖼 Screenshots

(Add your images here — Login page, Dashboard, Provider panel, etc.)

Example:

/screenshots/login.png
/screenshots/patient-dashboard.png
/screenshots/provider-dashboard.png

🚀 Future Improvements

Add Admin role

Add appointment booking system

Patient compliance graphs

Push notifications

AI health suggestions

Chat feature between provider & patient

Multi-provider group handling

📜 License

This project is MIT Licensed — free to use and modify.
