import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      unique: true,
    },
    items: {
      type: [
        {
          menuItem: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "MenuItem",
          },
          quantity: {
            type: Number,
            required: true,
          },
          price: {
            type: Number,
            required: true,
          },
        },
      ],
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Preparing", "Ready", "Delivered", "Cancelled"],
      default: "Pending",
    },
    customerName: {
      type: String,
      required: true,
    },
    tableNumber: {
      type: Number,
    },
  },
  { timestamps: true },
);

const OrderModel = mongoose.model("Order", orderSchema);

export default OrderModel;
