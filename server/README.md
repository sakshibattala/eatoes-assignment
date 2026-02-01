# Eatoes - Restaurant Management System

Eatoes is a restaurant management system built with Node.js, Express.js, and MongoDB. It provides APIs for managing menu items and orders, including features like menu item creation, updating availability, order management, and more. This project is designed to streamline restaurant operations and provide a robust backend for restaurant applications.

---

## 1. Features

- **Menu Management**: Add, update, delete, and retrieve menu items.
- **Order Management**: Create, update, and retrieve orders with support for pagination and filtering.
- **Validation**: Input validation using `express-validator` to ensure data integrity.
- **Database Integration**: MongoDB for storing menu items and orders.
- **Seeding Scripts**: Preload the database with sample menu items and orders for testing.
- **Environment Configuration**: Secure and flexible configuration using `dotenv`.
- **Cross-Origin Resource Sharing**: Enabled using `cors` for seamless API integration with frontend applications.

---

## 2. Tech Stack

### **Node.js**

Node.js is a JavaScript runtime built on Chrome's V8 engine. It allows us to build scalable and high-performance server-side applications.

### **Express.js**

Express.js is a minimal and flexible Node.js web application framework that provides robust features for building APIs and web applications. It simplifies the process of handling HTTP requests, routing, and middleware integration.

### **MongoDB**

MongoDB is a NoSQL database that stores data in a flexible, JSON-like format. It is used in this project to store menu items and order details.

### **Mongoose**

Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js. It provides a schema-based solution to model application data and includes built-in data validation.

### **dotenv**

dotenv is a zero-dependency module that loads environment variables from a `.env` file into `process.env`. It is used to securely manage sensitive configuration data like database connection strings and server ports.

### **express-validator**

express-validator is a set of express.js middlewares that wraps validator.js, a library for validating and sanitizing strings. It is used to validate incoming request data for menu items and orders.

### **cors**

cors is a Node.js package for enabling Cross-Origin Resource Sharing (CORS) with various options. It allows the server to handle requests from different origins, making it easier to integrate with frontend applications.

---

## 3. Project Structure

```
server/
	.env
	package.json
	server.js
	controllers/
		menu.controller.js
		order.controller.js
	models/
		menuItem.model.js
		order.model.js
	routes/
		menu.routes.js
		order.routes.js
	scripts/
		seedMenu.js
		seedOrder.js
	utils/
		db.js
		env.js
	validators/
		menu.validators.js
		order.validator.js
```

- **server.js**: Entry point of the application. Configures middleware, routes, and starts the server.
- **controllers/**: Contains the business logic for handling requests related to menu items and orders.
- **models/**: Defines the MongoDB schemas for menu items and orders using Mongoose.
- **routes/**: Defines the API endpoints for menu and order management.
- **scripts/**: Contains database seeding scripts for populating sample data.
- **utils/**: Utility files for database connection and environment variable configuration.
- **validators/**: Contains validation logic for menu and order-related API requests.

---

## 4. Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud-based, e.g., MongoDB Atlas)

### Steps to Set Up the Project

1. **Clone the Repository**:

   ```bash
   git clone <repository-url>
   cd eatoes/server
   ```

2. **Install Dependencies**:
   Install the required dependencies using npm:

   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:
   Create a `.env` file in the `server/` directory and add the following variables:

   ```
   PORT=3000
   MONGODB_URI=<your_mongodb_connection_string>
   ```

   Replace `<your_mongodb_connection_string>` with your MongoDB connection URI.

4. **Run Database Seeding Scripts**:
   To populate the database with sample data, run the following commands:

   ```bash
   node scripts/seedMenu.js
   node scripts/seedOrder.js
   ```

5. **Start the Server**:
   Start the development server using:

   ```bash
   npm run dev
   ```

   The server will start on the port specified in the `.env` file (default: `3000`).

---

## 5. API Documentation: Menu Items Endpoints

### **Base URL**

`http://localhost:3000/api/menu`

### **Endpoints**

#### 1. **Get All Menu Items**

- **URL**: `/`
- **Method**: `GET`
- **Description**: Retrieve all menu items with optional filters.
- **Query Parameters**:
  - `category` (optional): Filter by category (e.g., `Appetizer`, `Main Course`, `Dessert`, `Beverage`).
  - `isAvailable` (optional): Filter by availability (`true` or `false`).
  - `minPrice` (optional): Minimum price filter.
  - `maxPrice` (optional): Maximum price filter.
- **Response**:
  ```json
  {
    "success": true,
    "data": [
      {
        "_id": "menuItemId",
        "name": "Item Name",
        "description": "Item Description",
        "category": "Appetizer",
        "price": 10.99,
        "ingredients": ["Ingredient1", "Ingredient2"],
        "isAvailable": true,
        "preparationTime": 15,
        "imageUrl": "http://example.com/image.jpg",
        "createdAt": "2026-01-01T00:00:00.000Z",
        "updatedAt": "2026-01-01T00:00:00.000Z"
      }
    ],
    "count": 1
  }
  ```

#### 2. **Search Menu Items**

- **URL**: `/search`
- **Method**: `GET`
- **Description**: Search menu items by name, description, or ingredients.
- **Query Parameters**:
  - `q` (required): Search query string.
- **Response**:
  ```json
  {
    "success": true,
    "data": [
      {
        "_id": "menuItemId",
        "name": "Item Name",
        "description": "Item Description",
        "category": "Appetizer",
        "price": 10.99,
        "ingredients": ["Ingredient1", "Ingredient2"],
        "isAvailable": true,
        "preparationTime": 15,
        "imageUrl": "http://example.com/image.jpg",
        "createdAt": "2026-01-01T00:00:00.000Z",
        "updatedAt": "2026-01-01T00:00:00.000Z"
      }
    ],
    "count": 1
  }
  ```

#### 3. **Get Menu Item by ID**

- **URL**: `/:id`
- **Method**: `GET`
- **Description**: Retrieve a specific menu item by its ID.
- **Path Parameters**:
  - `id` (required): The ID of the menu item.
- **Response**:
  ```json
  {
    "success": true,
    "data": {
      "_id": "menuItemId",
      "name": "Item Name",
      "description": "Item Description",
      "category": "Appetizer",
      "price": 10.99,
      "ingredients": ["Ingredient1", "Ingredient2"],
      "isAvailable": true,
      "preparationTime": 15,
      "imageUrl": "http://example.com/image.jpg",
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    }
  }
  ```

#### 4. **Create a Menu Item**

- **URL**: `/`
- **Method**: `POST`
- **Description**: Create a new menu item.
- **Request Body**:
  ```json
  {
    "name": "Item Name",
    "description": "Item Description",
    "category": "Appetizer",
    "price": 10.99,
    "ingredients": ["Ingredient1", "Ingredient2"],
    "isAvailable": true,
    "preparationTime": 15,
    "imageUrl": "http://example.com/image.jpg"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "data": {
      "_id": "menuItemId",
      "name": "Item Name",
      "description": "Item Description",
      "category": "Appetizer",
      "price": 10.99,
      "ingredients": ["Ingredient1", "Ingredient2"],
      "isAvailable": true,
      "preparationTime": 15,
      "imageUrl": "http://example.com/image.jpg",
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    }
  }
  ```

#### 5. **Update a Menu Item**

- **URL**: `/:id`
- **Method**: `PUT`
- **Description**: Update an existing menu item by its ID.
- **Path Parameters**:
  - `id` (required): The ID of the menu item.
- **Request Body**:
  ```json
  {
    "name": "Updated Item Name",
    "price": 12.99
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "data": {
      "_id": "menuItemId",
      "name": "Updated Item Name",
      "description": "Item Description",
      "category": "Appetizer",
      "price": 12.99,
      "ingredients": ["Ingredient1", "Ingredient2"],
      "isAvailable": true,
      "preparationTime": 15,
      "imageUrl": "http://example.com/image.jpg",
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "msg": "menu item updated"
  }
  ```

#### 6. **Delete a Menu Item**

- **URL**: `/:id`
- **Method**: `DELETE`
- **Description**: Delete a menu item by its ID.
- **Path Parameters**:
  - `id` (required): The ID of the menu item.
- **Response**:
  ```json
  {
    "success": true,
    "data": {
      "_id": "menuItemId",
      "name": "Item Name",
      "description": "Item Description",
      "category": "Appetizer",
      "price": 10.99,
      "ingredients": ["Ingredient1", "Ingredient2"],
      "isAvailable": true,
      "preparationTime": 15,
      "imageUrl": "http://example.com/image.jpg",
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "msg": "item deleted"
  }
  ```

#### 7. **Toggle Availability Status**

- **URL**: `/:id/availability`
- **Method**: `PATCH`
- **Description**: Update the availability status of a menu item.
- **Path Parameters**:
  - `id` (required): The ID of the menu item.
- **Request Body**:
  ```json
  {
    "isAvailable": true
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "msg": "Menu availability status updated",
    "data": {
      "_id": "menuItemId",
      "name": "Item Name",
      "description": "Item Description",
      "category": "Appetizer",
      "price": 10.99,
      "ingredients": ["Ingredient1", "Ingredient2"],
      "isAvailable": true,
      "preparationTime": 15,
      "imageUrl": "http://example.com/image.jpg",
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    }
  }
  ```

---

## 6. API Documentation: Order Endpoints

### **Base URL**

`http://localhost:3000/api/orders`

### **Endpoints**

#### 1. **Get All Orders**

- **URL**: `/`
- **Method**: `GET`
- **Description**: Retrieve all orders with optional filters and pagination.
- **Query Parameters**:
  - `status` (optional): Filter by order status (e.g., `Pending`, `Preparing`, `Ready`, `Delivered`, `Cancelled`).
  - `page` (optional): Page number for pagination (default: `1`).
  - `limit` (optional): Number of orders per page (default: `5`).
- **Response**:
  ```json
  {
    "success": true,
    "data": [
      {
        "_id": "orderId",
        "orderNumber": "ORD-123456",
        "items": [
          {
            "menuItem": {
              "_id": "menuItemId",
              "name": "Item Name",
              "price": 10.99
            },
            "quantity": 2,
            "price": 21.98
          }
        ],
        "totalAmount": 21.98,
        "status": "Pending",
        "customerName": "John Doe",
        "tableNumber": 5,
        "createdAt": "2026-01-01T00:00:00.000Z",
        "updatedAt": "2026-01-01T00:00:00.000Z"
      }
    ],
    "page": 1,
    "limit": 5,
    "totalOrders": 10,
    "totalPages": 2
  }
  ```

#### 2. **Get Order by ID**

- **URL**: `/:id`
- **Method**: `GET`
- **Description**: Retrieve a specific order by its ID.
- **Path Parameters**:
  - `id` (required): The ID of the order.
- **Response**:
  ```json
  {
    "success": true,
    "data": {
      "_id": "orderId",
      "orderNumber": "ORD-123456",
      "items": [
        {
          "menuItem": {
            "_id": "menuItemId",
            "name": "Item Name",
            "price": 10.99
          },
          "quantity": 2,
          "price": 21.98
        }
      ],
      "totalAmount": 21.98,
      "status": "Pending",
      "customerName": "John Doe",
      "tableNumber": 5,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    }
  }
  ```

#### 3. **Create an Order**

- **URL**: `/`
- **Method**: `POST`
- **Description**: Create a new order.
- **Request Body**:
  ```json
  {
    "items": [
      {
        "menuItem": "menuItemId",
        "quantity": 2,
        "price": 10.99
      }
    ],
    "totalAmount": 21.98,
    "status": "Pending",
    "customerName": "John Doe",
    "tableNumber": 5
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "data": {
      "_id": "orderId",
      "orderNumber": "ORD-123456",
      "items": [
        {
          "menuItem": "menuItemId",
          "quantity": 2,
          "price": 10.99
        }
      ],
      "totalAmount": 21.98,
      "status": "Pending",
      "customerName": "John Doe",
      "tableNumber": 5,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    }
  }
  ```

#### 4. **Update Order Status**

- **URL**: `/:id/status`
- **Method**: `PATCH`
- **Description**: Update the status of an existing order.
- **Path Parameters**:
  - `id` (required): The ID of the order.
- **Request Body**:
  ```json
  {
    "status": "Delivered"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "data": {
      "_id": "orderId",
      "orderNumber": "ORD-123456",
      "items": [
        {
          "menuItem": "menuItemId",
          "quantity": 2,
          "price": 10.99
        }
      ],
      "totalAmount": 21.98,
      "status": "Delivered",
      "customerName": "John Doe",
      "tableNumber": 5,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    }
  }
  ```
