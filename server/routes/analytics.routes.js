import express from "express";
import { getTopSellers } from "../controllers/analytics.controller.js";

const router = express.Router();

router.get("/top-sellers", getTopSellers);

export default router;
