import mongoose from "mongoose";
import OrderModel from "../models/order.model.js";
import { validationResult } from "express-validator";

export const getAllOrders = async (req, res) => {
  try {
    const { status, page = 1, limit = 6 } = req.query;
    const filter = {};

    if (status) filter.status = status;

    const skip = (page - 1) * limit; // pagination logic -> if page is 2 : (2-1) * 10 = 10 so the page starts from 10th order

    const allOrders = await OrderModel.find(filter)
      .populate("items.menuItem")
      .skip(skip)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    //  Get total count (for frontend pagination UI)
    const totalOrders = await OrderModel.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: allOrders,
      page: Number(page),
      limit: Number(limit),
      totalOrders,
      totalPages: Math.ceil(totalOrders / limit),
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        msg: "Invalid order ID",
      });
    }

    const order = await OrderModel.findById(id).populate("items.menuItem");

    if (!order) {
      return res.status(404).json({
        success: false,
        msg: "order not found",
      });
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const createOrder = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    console.log(req.body)

    const { items, totalAmount, status, customerName, tableNumber } = req.body;

    const orderNumber = "ORD-" + Math.floor(100000 + Math.random() * 900000);

    const newOrder = await OrderModel.create({
      orderNumber,
      items,
      totalAmount,
      status: status || "Pending",
      customerName,
      tableNumber,
    });

    console.log(newOrder);

    return res.status(201).json({
      success: true,
      data: newOrder,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        msg: "Invalid order ID",
      });
    }

    const { status } = req.body;

    const order = await OrderModel.findByIdAndUpdate(
      id,
      { status },
      { new: true },
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        msg: "order not found",
      });
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
