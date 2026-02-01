import express from "express";
import {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
} from "../controllers/order.controller.js";
import {
  createOrderValidator,
  getAllOrdersValidator,
  updateStatusValidator,
} from "../validators/order.validator.js";

const router = express.Router();

router.get("/", getAllOrdersValidator, getAllOrders);

router.get("/:id", getOrderById);

router.post("/", createOrderValidator, createOrder);

router.patch("/:id/status", updateStatusValidator, updateOrderStatus);

export default router;
