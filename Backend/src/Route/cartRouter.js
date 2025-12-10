import express from "express";
import { getCart, upsertCart, clearCart } from "../Controller/cartController.js";

const router = express.Router();

router.get("/:userId", getCart);
router.put("/:userId", upsertCart);
router.delete("/:userId", clearCart);

export default router;
