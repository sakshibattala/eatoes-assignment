import { query, body } from "express-validator";
import mongoose from "mongoose";

export const getAllOrdersValidator = [
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("page must be a positive interger"),

  query("limit")
    .optional()
    .isInt({ min: 1 })
    .withMessage("limit must be a positive interger"),

  query("status")
    .optional()
    .isIn(["Pending", "Preparing", "Ready", "Delivered", "Cancelled"])
    .withMessage("invalid order status"),
];

export const createOrderValidator = [
  body("items")
    .isArray({ min: 1 })
    .withMessage("Items must be an array and cannot be empty"),

  body("items.*.menuItem")
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage("Invalid menuItem ID"),

  body("items.*.quantity")
    .isInt({ min: 1 })
    .withMessage("Quantity must be at least 1"),

  body("items.*.price").isNumeric().withMessage("Price must be a number"),

  body("customerName").notEmpty().withMessage("Customer name is required"),

  body("tableNumber")
    .isInt({ min: 1 })
    .withMessage("Table number must be a positive number"),

  body("status")
    .optional()
    .isIn(["Pending", "Preparing", "Ready", "Delivered", "Cancelled"])
    .withMessage("Invalid order status"),

  body("totalAmount").isNumeric().withMessage("Total amount must be a number"),
];

export const updateStatusValidator = [
  body("status")
    .notEmpty()
    .withMessage("Status is required")
    .isIn(["Pending", "Preparing", "Ready", "Delivered", "Cancelled"])
    .withMessage("Invalid order status"),
];
