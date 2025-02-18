# User Authentication and CRUD API

This is a Node.js-based API built with Express and MongoDB, implementing user authentication with JWT and CRUD operations for user management.

## Features
- User Registration (Signup)
- User Login with JWT Authentication
- Protected Routes for User Management (CRUD)
- Middleware to verify JWT tokens

---

## Tech Stack
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Authentication**: JWT (JSON Web Token)
- **Password Hashing**: bcrypt

---

## Setup Instructions

### 1. Clone the Repository
```sh
git clone https://github.com/Laxmi01345/Simple-User-Management-API.git
cd https://github.com/Laxmi01345/Simple-User-Management-API.git
```

### 2. Install Dependencies
```sh
npm install
```

### 3. Set Up Environment Variables
Create a `.env` file in the root directory and add the following:
```env
MONGO_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/
JWT_SECRET=your-secret-key
PORT=3000
```

### 4. Start the Server
```sh
npm start
```
Server will run on `http://localhost:3000`

---

## API Endpoints

### **Authentication APIs (Public Routes)**
#### **User Signup**
- **Endpoint:** `POST /api/auth/signup`
- **Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securepassword"
  }
  ```

#### **User Login**
- **Endpoint:** `POST /api/auth/login`
- **Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "securepassword"
  }
  ```
- **Response:**
  ```json
  {
    "status": "success",
    "token": "your-jwt-token"
  }
  ```

---

### **User CRUD APIs (Protected Routes - Require JWT Token)**
#### **Create User**
- **Endpoint:** `POST /api/users`
- **Headers:** `{ Authorization: Bearer <token> }`
- **Body:**
  ```json
  {
    "name": "Jane Doe",
    "email": "jane@example.com",
    "role": "admin"
  }
  ```

#### **Get All Users**
- **Endpoint:** `GET /api/users`
- **Headers:** `{ Authorization: Bearer <token> }`

#### **Get Single User**
- **Endpoint:** `GET /api/users/:id`
- **Headers:** `{ Authorization: Bearer <token> }`

#### **Update User**
- **Endpoint:** `PUT /api/users/:id`
- **Headers:** `{ Authorization: Bearer <token> }`
- **Body:**
  ```json
  {
    "name": "Updated Name",
    "role": "editor"
  }
  ```

#### **Delete User**
- **Endpoint:** `DELETE /api/users/:id`
- **Headers:** `{ Authorization: Bearer <token> }`

---

## Folder Structure
```
user-auth-crud-api/
│── Controller/
│   ├── User.js
│── Middleware/
│   ├── Auth.js
│── Models/
│   ├── User.js
│── Routes/
│   ├── User.js
│── index.js
│── package.json
│── .env
│── README.md
```

---



