# Eatoes - Restaurant Management System

Eatoes is a full-stack restaurant management system designed to streamline restaurant operations. It provides a user-friendly interface for managing menu items and orders, along with robust backend APIs for data management and analytics.

---

## 🚀 Features

### 🍽 Menu Management

- Add / Edit / Delete menu items
- Search with debouncing
- Filter by category, availability & price
- Toggle availability
- View full item details
- Top 5 best-selling items (analytics)

### 🧾 Orders Dashboard

- Create orders with menu selection
- Update order status
- Filter orders by status
- Pagination
- View full order details
- Analytics: Top-selling items

---

## 🛠 Tech Stack

### **Frontend:**

- React + Vite
- TailwindCSS
- React Router
- Axios
- React Hot Toast

### **Backend:**

- Node.js
- Express.js
- MongoDB + Mongoose
- MongoDB Aggregation
- Express Validator

### **Deployment:**

- Backend → Render
- Frontend → Netlify

---

## ⚙️ Environment Variables

### Backend `.env`

```env
PORT=10000
MONGODB_URI=your_mongodb_atlas_uri
```

### Frontend `.env`

```env
VITE_API_URL=https://your-backend-url.onrender.com/api
```

---

## 🧠 Analytics: Top Sellers API

### **Endpoint:**

```http
GET /api/analytics/top-sellers
```

### **Description:**

Returns the top 5 selling menu items using MongoDB aggregation pipeline:

- `$unwind`: Flattens the `items` array in orders.
- `$group`: Groups by `menuItem` and calculates the total quantity sold.
- `$lookup`: Joins menu item details.
- `$sort`: Sorts by total quantity sold in descending order.
- `$limit`: Limits the result to the top 5 items.

---

## ▶️ How to Run Locally

### Backend:

1. Navigate to the `server` directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

### Frontend:

1. Navigate to the `client` directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

---

## 📦 Deployment Links

- **Frontend (Netlify):** [https://eatoes-app.netlify.app/](https://eatoes-app.netlify.app/)
- **Backend (Render):** [https://eatoes-0muf.onrender.com/](https://eatoes-0muf.onrender.com/)

---

## 👩‍💻 Author

**Sakshi Battala**
