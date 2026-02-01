import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      index: true,
      unique: true,
    },
    description: {
      type: String,
    },
    category: {
      required: true,
      type: String,
      enum: ["Appetizer", "Main Course", "Dessert", "Beverage"],
    },
    price: {
      type: Number,
      required: true,
    },
    ingredients: {
      type: [String],
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    preparationTime: {
      type: Number,
    },
    imageUrl: {
      type: String,
    },
  },
  { timestamps: true },
);

menuItemSchema.index({
  name: "text",
  ingredients: "text",
  description: "text",
});

const MenuItemModel = mongoose.model("MenuItem", menuItemSchema);

export default MenuItemModel;
