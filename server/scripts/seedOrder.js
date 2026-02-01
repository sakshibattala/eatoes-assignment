import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });
import MenuItemModel from "../models/menuItem.model.js";
import OrderModel from "../models/order.model.js";

const STATUSES = ["Pending", "Preparing", "Ready", "Delivered", "Cancelled"];

const generateRandomOrder = (menuItems) => {
  // Select 2–4 random menu items
  const itemCount = Math.floor(Math.random() * 3) + 2;
  const selectedItems = [];

  //for each selected menu item it's gonna generate the quantity and price
  for (let i = 0; i < itemCount; i++) {
    const randomItem = menuItems[Math.floor(Math.random() * menuItems.length)];

    const quantity = Math.floor(Math.random() * 3) + 1; // 1–3 quantity
    const price = randomItem.price * quantity;

    selectedItems.push({
      menuItem: randomItem._id,
      quantity,
      price,
    });
  }

  // Calculate total amount
  const totalAmount = selectedItems.reduce((sum, item) => sum + item.price, 0);

//   returns 1 order 
  return {
    orderNumber: "ORD-" + Math.floor(100000 + Math.random() * 900000),
    items: selectedItems,
    totalAmount,
    status: STATUSES[Math.floor(Math.random() * STATUSES.length)],
    customerName: "Customer " + Math.floor(Math.random() * 90 + 10),
    tableNumber: Math.floor(Math.random() * 15) + 1,
  };
};

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB Connected");

    // step: get menu items
    const menuItems = await MenuItemModel.find();
    if (menuItems.length === 0) {
      console.log("No menu items found. Run seedMenu.js first!");
      process.exit(1);
    }

    // clear old orders
    await OrderModel.deleteMany();
    console.log("Old orders cleared");

    // generate 10 orders
    const orders = [];
    for (let i = 0; i < 10; i++) {
      orders.push(generateRandomOrder(menuItems));
    }

    // insert orders
    await OrderModel.insertMany(orders);
    console.log("10 Sample Orders Inserted!");

    process.exit(0);
  } catch (error) {
    console.error("Order Seed Error:", error.message);
    process.exit(1);
  }
};

start();
