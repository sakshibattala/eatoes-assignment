import mongoose from "mongoose";
import MenuItemModel from "../models/menuItem.model.js";
import { validationResult } from "express-validator";

export const getAllMenuItems = async (req, res) => {
  try {
    const { category, isAvailable, minPrice, maxPrice } = req.query;

    const filter = {};

    if (category) filter.category = category;

    if (isAvailable !== undefined && isAvailable !== "") {
      filter.isAvailable = isAvailable === "true";
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const menuItems = await MenuItemModel.find(filter);

    res.status(200).json({
      success: true,
      data: menuItems,
      count: menuItems.length,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.msg });
  }
};

export const searchMenuItems = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q || q.trim() === "") {
      return res.status(400).json({
        success: false,
        msg: "Please enter a search query",
      });
    }

    //  Text Search first
    let results = await MenuItemModel.find(
      { $text: { $search: q } },
      { score: { $meta: "textScore" } },
    ).sort({ score: { $meta: "textScore" } });

    //  If no results, fallback to regex (partial search)
    if (results.length === 0) {
      results = await MenuItemModel.find({
        $or: [
          { name: { $regex: q, $options: "i" } },
          { ingredients: { $regex: q, $options: "i" } },
        ],
      });
    }

    res.status(200).json({
      success: true,
      count: results.length,
      data: results,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getMenuItemById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        msg: "Invalid menu id",
      });
    }

    const menuItem = await MenuItemModel.findById(id);

    if (!menuItem) {
      return res.status(404).json({
        success: false,
        msg: "menu item not found",
      });
    }

    res.status(200).json({
      success: true,
      data: menuItem,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const createMenuItem = async (req, res) => {
  try {
    //checking validation errors
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({ success: false, error: errors.array() });
    }

    const menuItem = await MenuItemModel.create(req.body);
    res.status(200).json({ success: true, data: menuItem });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const updateMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        msg: "Invalid menu id",
      });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ success: false, error: errors.array() });
    }

    const updatedMenuItem = await MenuItemModel.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
      },
    );

    if (!updatedMenuItem) {
      return res.status(404).json({
        success: false,
        msg: "menu item not found",
      });
    }

    res.status(200).json({
      success: true,
      data: updatedMenuItem,
      msg: "menu item updated",
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const deleteMenuItem = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        msg: "Invalid menu id",
      });
    }

    const menuItem = await MenuItemModel.findByIdAndDelete(id);

    if (!menuItem) {
      return res.status(404).json({
        success: false,
        msg: "menu item not found",
      });
    }

    res.status(200).json({
      success: true,
      data: menuItem,
      msg: "item deleted",
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const toggleAvailabilityStatus = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        msg: "Invalid menu id",
      });
    }

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({ success: false, error: errors.array() });
    }

    const { isAvailable } = req.body;

    const menuItem = await MenuItemModel.findByIdAndUpdate(
      id,
      { isAvailable },
      { new: true }, //returns updated doc
    );

    if (!menuItem) {
      return res.status(404).json({
        success: false,
        msg: "menu item not found",
      });
    }

    return res.status(200).json({
      success: true,
      msg: "Menu availability status updated",
      data: menuItem,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
