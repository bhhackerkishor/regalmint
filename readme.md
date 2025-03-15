# RegalMints: The Ultimate E-commerce Platform

RegalMints is a powerful, scalable **MERN Stack e-commerce platform**. It offers a smooth shopping experience, robust admin controls, and an intuitive UI built with **React, Redux Toolkit, and Material UI**.

![RegalMints Homepage](https://res.cloudinary.com/drmjevfh8/image/upload/v1741957652/Screenshot_8_ltiz8f.png)

## 🚀 Features

### **For Customers**
- **Easy Shopping Experience** – Browse and buy products with an intuitive UI.
- **Wishlist & Recently Viewed** – Save and revisit products effortlessly.
- **Order Management** – Track and manage orders easily.
- **Secure Payments** – Integrated with **Razorpay** for fast, secure transactions.

### **For Admins**
- **Product Management** – Add, update, or remove products easily.
- **Order Control** – Monitor and update order statuses.
- **Inventory Tracking** – Keep stock levels in check.

### **Security & Performance**
- **JWT Authentication** – Secure login and token-based access.
- **Optimized Performance** – Uses Redux Toolkit for smooth state management.
- **Scalable Infrastructure** – Ready for growth with MongoDB and Node.js.

---

## 🛠 Setup & Installation

### **Prerequisites**
- Node.js (v21.1.0 or later)
- MongoDB installed and running locally

### **Clone the Project**
```bash
  git clone https://github.com/bhhackerkishor/regalmint.git
  cd regalmint
```

### **Install Dependencies**
Install frontend and backend dependencies separately:

```bash
# Client
cd client
npm install -- force

# Backend
cd ../backend
npm install -- force
```

### **Environment Variables**
Create a `.env` file in both `backend` and `frontend` directories and add the following variables:

#### **Backend (`backend/.env`)**
```bash
MONGO_URI="mongodb://localhost:27017/regalmints"
ORIGIN="http://localhost:3000"
SECRET_KEY="your-secret-key"
RAZORPAY_KEY_ID="your-razorpay-key"
RAZORPAY_SECRET="your-razorpay-secret"
```

#### **Frontend (`frontend/.env`)**
```bash
REACT_APP_BASE_URL="http://localhost:8000"
```

### **Running the Servers**
Start both frontend and backend servers in separate terminals:

```bash
# Backend
cd backend
npm run dev

# Client
cd client
npm start
```

Access the application at **http://localhost:3000**

---

## 🔥 Demo Login Credentials
Try out the platform using demo credentials:
```bash
Email: demo@gmail.com
Password: helloWorld@123
```
**Note:** OTP verification and password reset features require a real email.

---

## 🎯 Want to Contribute?
We welcome contributions! Feel free to fork the repository, make changes, and submit a pull request.

---

## 📢 Connect with Me
- GitHub: [@bhhackerkishor](https://github.com/bhhackerkishor)
- LinkedIn: [kishorekumardev](https://linkedin.com/in/kishorekumardev)

**⭐ Star the repository if you find it helpful!**
Many hours of hard work have gone into this project. Your support will be very appreciated!
[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/kishordev)
