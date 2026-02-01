import dotenv from "dotenv";
dotenv.config({ path: "../.env" });
import mongoose from "mongoose";
import MenuItemModel from "../models/menuItem.model.js";

const menuItemsData = [
  {
    name: "Garlic Bread",
    description: "Toasted bread topped with garlic and butter",
    category: "Appetizer",
    price: 120,
    ingredients: ["Bread", "Butter", "Garlic"],
    preparationTime: 10,
    imageUrl:
      "https://www.mygingergarlickitchen.com/wp-content/rich-markup-images/1x1/1x1-garlic-bread.jpg",
  },
  {
    name: "Chicken Tikka",
    description: "Grilled chicken marinated in spices",
    category: "Appetizer",
    price: 220,
    ingredients: ["Chicken", "Yogurt", "Spices"],
    preparationTime: 20,
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR04_PkJxRLzbKoHDGDBhla7-ZMIM6hNds3FQ&s",
  },
  {
    name: "Veg Manchurian",
    description: "Fried vegetable balls cooked in spicy sauce",
    category: "Appetizer",
    price: 150,
    ingredients: ["Cabbage", "Carrot", "Soy Sauce"],
    preparationTime: 15,
    imageUrl:
      "https://www.cookshideout.com/wp-content/uploads/2014/11/Veg-Manchurian-Low-Fat-FI.jpg",
  },

  {
    name: "Margherita Pizza",
    description: "Classic cheese and tomato pizza",
    category: "Main Course",
    price: 300,
    ingredients: ["Cheese", "Tomato", "Basil"],
    preparationTime: 25,
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX2w-6ljxAJtEImAJ4zBsRnou1CoSAVmgvQw&s",
  },
  {
    name: "Chicken Biryani",
    description: "Aromatic basmati rice cooked with chicken",
    category: "Main Course",
    price: 250,
    ingredients: ["Rice", "Chicken", "Spices"],
    preparationTime: 40,
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlPQXFO4B201Ry8o7_Soa7dwhJBrtcwJdE0w&s",
  },
  {
    name: "Paneer Butter Masala",
    description: "Creamy paneer curry",
    category: "Main Course",
    price: 220,
    ingredients: ["Paneer", "Butter", "Cream"],
    preparationTime: 20,
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSU2GVSX6yMjCLHtHBaQwyqjUw1rkC1sF9H8g&s",
  },
  {
    name: "Veg Fried Rice",
    description: "Rice stir-fried with veggies",
    category: "Main Course",
    price: 150,
    ingredients: ["Rice", "Carrot", "Beans", "Soy Sauce"],
    preparationTime: 15,
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdWiae9sJhDU3DY3afznjqbHryBup2EcRLPg&s",
  },

  {
    name: "Brownie with Ice Cream",
    description: "Warm chocolate brownie served with vanilla ice cream",
    category: "Dessert",
    price: 180,
    ingredients: ["Chocolate", "Sugar", "Ice Cream"],
    preparationTime: 10,
    imageUrl:
      "https://recipesblob.oetker.in/assets/0e7149831748458c9502e361e889f726/1272x764/brownie-with-vanilla-ice-cream.webp",
  },
  {
    name: "Gulab Jamun",
    description: "Soft sweet dumplings soaked in sugar syrup",
    category: "Dessert",
    price: 90,
    ingredients: ["Milk Solids", "Sugar"],
    preparationTime: 8,
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpP1XdhX34Dk60c0xMbGBJ_9Id0YiGeoqtZg&s",
  },
  {
    name: "Cheesecake",
    description: "Creamy and smooth baked cheesecake",
    category: "Dessert",
    price: 220,
    ingredients: ["Cream Cheese", "Sugar", "Butter"],
    preparationTime: 15,
    imageUrl:
      "https://www.kingarthurbaking.com/sites/default/files/2025-06/Easy-Cheesecake-6.jpg",
  },

  {
    name: "Cold Coffee",
    description: "Chilled coffee blended with milk",
    category: "Beverage",
    price: 120,
    ingredients: ["Coffee", "Milk", "Sugar"],
    preparationTime: 5,
    imageUrl:
      "https://deliciousmadeeasy.com/wp-content/uploads/2018/04/chocoholic-cold-brew-coffee-1-of-1-7-scaled.jpg",
  },
  {
    name: "Fresh Lime Soda",
    description: "Sweet or salted refreshing lime drink",
    category: "Beverage",
    price: 60,
    ingredients: ["Lime", "Soda", "Sugar"],
    preparationTime: 3,
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdeq_qps9RPo9qKXHRAXH5iQKSQtJO49c7qQ&s",
  },
  {
    name: "Masala Chai",
    description: "Spiced Indian tea",
    category: "Beverage",
    price: 40,
    ingredients: ["Tea", "Milk", "Spices"],
    preparationTime: 5,
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbXKuyWAIBkEDeyB61xQj-RIoidct_Au6rkA&s",
  },
  {
    name: "Oreo Milkshake",
    description: "Creamy milkshake with crushed Oreos",
    category: "Beverage",
    price: 150,
    ingredients: ["Milk", "Oreo", "Ice Cream"],
    preparationTime: 7,
    imageUrl:
      "https://www.whiskaffair.com/wp-content/uploads/2020/07/Oreo-Milkshake-2-3.jpg",
  },
];

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB Connected");

    await MenuItemModel.deleteMany(); //clears old menu
    console.log("old menu items removed");

    await MenuItemModel.insertMany(menuItemsData);
    console.log("15 Menu Items Inserted!");

    process.exit(0);
  } catch (error) {
    console.error("seed error", error.message);
    process.exit(1);
  }
};

start();
