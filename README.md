# ShopSphere 🛍️

A full-stack e-commerce platform built with **MERN** (MongoDB, Express, React, Node.js) stack.

## Features ✨

- **User Authentication**: Registration, Login, OTP Verification
- **Product Management**: Browse, Search, Filter products by category
- **Shopping Cart**: Add/Remove items, manage quantities
- **Checkout & Payment**: Razorpay integration for payments
- **Order Management**: Track orders, view order history
- **Admin Dashboard**: 
  - Product management (Add, Edit, Delete)
  - Analytics with charts and graphs
  - Order management
  - Revenue tracking
- **Admin Analytics**: 
  - Total orders and revenue
  - Order status tracking
  - Top selling products
  - Monthly revenue analysis
- **Wishlist**: Save favorite products
- **User Profile**: Manage user information

## Tech Stack 🛠️

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Nodemailer** - Email service
- **Razorpay** - Payment gateway
- **Cloudinary** - Image storage

### Frontend
- **React 19** - UI library
- **Vite** - Build tool
- **Redux Toolkit** - State management
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **Chart.js** - Data visualization
- **React Router** - Navigation

## Project Structure 📁

```
ShopSphere/
├── backend/
│   ├── config/          # Configuration files
│   ├── controllers/      # Route controllers
│   ├── middleware/       # Custom middleware
│   ├── models/           # MongoDB schemas
│   ├── routes/           # API routes
│   ├── utils/            # Utility functions
│   ├── server.js         # Main server file
│   ├── data.js           # Sample products data
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/   # React components
    │   ├── pages/        # Page components
    │   ├── redux/        # Redux slices & store
    │   ├── services/     # API services
    │   ├── utils/        # Utility functions
    │   ├── App.jsx
    │   └── main.jsx
    ├── package.json
    └── vite.config.js
```

## Installation & Setup 🚀

### Prerequisites
- Node.js v16+
- MongoDB
- npm or yarn

### Backend Setup

```bash
cd backend
npm install
```

Create `.env` file in backend directory:
```env
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
PORT=5000
```

Run the server:
```bash
npm start
```

### Frontend Setup

```bash
cd frontend
npm install
```

Create `.env.local` file in frontend directory:
```env
VITE_API_URL=http://localhost:5000
```

Run development server:
```bash
npm run dev
```

### Import Sample Products

```bash
cd backend
node importProducts.js
```

### Create Admin User

```bash
cd backend
node createAdmin.js
```

## Default Credentials

- **Admin Email**: `admin@shopsphere.com`
- **Admin Password**: `admin123`

## API Endpoints 📍

### Authentication
- `POST /api/users/register` - Register user
- `POST /api/users/login` - Login user
- `POST /api/otp/send` - Send OTP
- `POST /api/otp/verify` - Verify OTP

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Add product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Orders
- `GET /api/orders/:email` - Get user orders
- `POST /api/orders` - Create order
- `GET /api/orders/admin/all` - Get all orders (Admin)

### Wishlist
- `GET /api/wishlist/:email` - Get wishlist
- `POST /api/wishlist` - Add to wishlist
- `DELETE /api/wishlist/:id` - Remove from wishlist

### Payment
- `POST /api/payment/create-order` - Create payment order

## Running the Application 🎯

1. Start MongoDB service
2. Start Backend: `npm start` (from backend directory)
3. Start Frontend: `npm run dev` (from frontend directory)
4. Open http://localhost:5174 in browser

## Features Overview

### For Users
- Browse and search products
- Add to cart and checkout
- Make payments via Razorpay
- Track orders
- Save wishlist items
- View profile and order history

### For Admins
- Dashboard with analytics
- Add/Edit/Delete products
- Manage orders
- View revenue and sales data
- See top selling products

## Contributing 🤝

Feel free to fork and submit pull requests!

## License 📄

MIT License - feel free to use this project for personal or commercial purposes.

## Author 👨‍💻

Ajay Bonamukkala

## Support 💬

For issues and questions, please open an issue in the repository.

---

**Happy Shopping! 🛒**
