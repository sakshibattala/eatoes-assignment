# Eatoes Client - Restaurant Management System

The client-side of the **Eatoes** Restaurant Management System is built using **React** and **Vite**. It provides a user-friendly interface for managing menu items and orders, allowing restaurant staff to efficiently handle operations.

---

## 1. Features

- **Menu Management**: 
  - View, search, filter, add, edit, delete, and toggle the availability of menu items.
  - View detailed information about each menu item.
- **Order Management**: 
  - View, filter, and paginate orders.
  - Create new orders, update order statuses, and view detailed order information.
- **Top Sellers**: Display the top 5 best-selling menu items.
- **Responsive Design**: Fully responsive UI for both desktop and mobile devices.
- **Real-Time Feedback**: Toast notifications for success and error messages.
- **Reusable Components**: Modular and reusable React components for better maintainability.

---

## 2. Tech Stack

### **React**
React is used for building the user interface with reusable components and state management.

### **Vite**
Vite is used as the build tool for fast development and optimized production builds.

### **Tailwind CSS**
Tailwind CSS is used for styling the application, providing a utility-first approach to design.

### **Axios**
Axios is used for making HTTP requests to the backend API.

### **React Router**
React Router is used for client-side routing, enabling navigation between the Menu and Orders pages.

### **React Hot Toast**
React Hot Toast is used for displaying toast notifications for user feedback.

### **React Loader Spinner**
React Loader Spinner is used to display loading indicators while data is being fetched.

---

## 3. Project Structure

```
client/
	.env
	.gitignore
	eslint.config.js
	index.html
	package.json
	README.md
	vite.config.js
	public/
	src/
		App.jsx
		index.css
		main.jsx
		components/
			CreateOrderModel.jsx
			MenuItemCard.jsx
			MenuItemDetailsModal.jsx
			MenuItemModal.jsx
			Navbar.jsx
			OrderCard.jsx
			OrderDetailsModal.jsx
			TopSellers.jsx
		hooks/
			useDebounce.js
			useFetch.js
		pages/
			MenuPage.jsx
			OrdersPage.jsx
		services/
			api.js
			menuApi.js
			ordersApi.js
```

### Key Files and Folders

- **`App.jsx`**: The main application component that sets up routing and includes the navigation bar.
- **`index.css`**: Global styles for the application, including Tailwind CSS integration.
- **`main.jsx`**: Entry point for the React application.
- **`components/`**: Contains reusable UI components such as modals, cards, and the navigation bar.
- **`hooks/`**: Custom React hooks for functionalities like fetching data and debouncing.
- **`pages/`**: Contains the main pages of the application, including the Menu and Orders pages.
- **`services/`**: Contains API service files for interacting with the backend.

---

## 4. Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- A running instance of the Eatoes backend server

### Steps to Set Up the Project

1. **Navigate to the Client Directory**:
   ```bash
   cd eatoes/client
   ```

2. **Install Dependencies**:
   Install the required dependencies using npm:
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:
   Create a `.env` file in the `client/` directory and add the following variable:
   ```
   VITE_API_URL=http://localhost:3000/api
   ```
   Replace `http://localhost:3000/api` with the base URL of your backend server if it's running on a different host or port.

4. **Start the Development Server**:
   Run the following command to start the development server:
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`.

5. **Build for Production**:
   To create a production build, run:
   ```bash
   npm run build
   ```
   The production-ready files will be available in the `dist/` folder.

6. **Preview the Production Build**:
   To preview the production build locally, run:
   ```bash
   npm run preview
   ```

---

## 5. Pages and Features

### **Menu Page**

- **URL**: `/`
- **Features**:
  - View all menu items in a grid layout.
  - Search menu items by name, description, or ingredients.
  - Filter menu items by category, availability, and price range.
  - Add new menu items using a modal form.
  - Edit or delete existing menu items.
  - Toggle the availability status of menu items.
  - View detailed information about a menu item in a modal.

### **Orders Page**

- **URL**: `/orders`
- **Features**:
  - View all orders in a grid layout with pagination.
  - Filter orders by status (e.g., Pending, Preparing, Delivered).
  - Create new orders using a modal form.
  - Update the status of existing orders.
  - View detailed information about an order in a modal.

---

## 6. Components

### **Navbar**
- Provides navigation between the Menu and Orders pages.
- Responsive design with a hamburger menu for mobile devices.

### **MenuItemCard**
- Displays individual menu items in a card format.
- Includes options to edit, delete, view details, and toggle availability.

### **MenuItemModal**
- Modal for adding or editing menu items.
- Includes form validation for required fields.

### **MenuItemDetailsModal**
- Modal for viewing detailed information about a menu item.

### **OrderCard**
- Displays individual orders in a card format.
- Includes a dropdown to update the order status.

### **OrderDetailsModal**
- Modal for viewing detailed information about an order.

### **CreateOrderModal**
- Modal for creating a new order.
- Allows selecting menu items, specifying quantities, and entering customer details.

### **TopSellers**
- Displays the top 5 best-selling menu items in a horizontal scrollable list.

---

## 7. Hooks

### **useFetch**
A custom hook for fetching data from an API. It handles loading, error states, and provides a `refetch` function.

### **useDebounce**
A custom hook for debouncing input values, useful for search functionality.

---

## 8. Services

### **api.js**
Configures the base URL for API requests using Axios.

### **menuApi.js**
Contains functions for interacting with the menu-related API endpoints:
- `getMenuItems`
- `searchMenuItems`
- `getMenuItemById`
- `createMenuItem`
- `updateMenuItem`
- `deleteMenuItem`
- `toggleAvailabilityStatus`
- `getTopSellers`

### **ordersApi.js**
Contains functions for interacting with the order-related API endpoints:
- `getAllOrders`
- `getOrderById`
- `createOrder`
- `updateOrderStatus`

---

## 9. Styling

The application uses **Tailwind CSS** for styling. The global styles are defined in `index.css`, and the components use utility classes for consistent and responsive design.

---

## 10. Future Enhancements

- Add user authentication for secure access.
- Implement role-based access control for different user types (e.g., admin, staff).
- Add support for real-time updates using WebSockets.
- Improve test coverage with unit and integration tests.
- Add support for internationalization (i18n) for multi-language support.

---

## 11. License

This project is licensed under the MIT License.
