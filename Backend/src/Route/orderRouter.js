import express from "express";
import {
  getOrders,
  getOrdersByUser,   // ← added
  createOrder,
  updateOrder,
  deleteOrder
} from "../Controller/orderController.js";

const router = express.Router();

// admin: get all
router.get("/", getOrders);

// user: get only his orders
router.get("/user/:userId", getOrdersByUser);

router.post("/", createOrder);
router.put("/:id", updateOrder);
router.delete("/:id", deleteOrder);

export default router;
