import express from "express";
import {
  getAllMenuItems,
  searchMenuItems,
  getMenuItemById,
  createMenuItem,
  deleteMenuItem,
  toggleAvailabilityStatus,
  updateMenuItem,
} from "../controllers/menu.controller.js";

import {
  createMenuItemValidator,
  updateAvailabilityStatus,
  updateMenuItemValidator,
} from "../validators/menu.validators.js";

const router = express.Router();

router.get("/", getAllMenuItems);

router.get("/search", searchMenuItems);

router.get("/:id", getMenuItemById);

router.post("/", createMenuItemValidator, createMenuItem);

router.put("/:id", updateMenuItemValidator, updateMenuItem);

router.delete("/:id", deleteMenuItem);

router.patch(
  "/:id/availability",
  updateAvailabilityStatus,
  toggleAvailabilityStatus,
);

export default router;
