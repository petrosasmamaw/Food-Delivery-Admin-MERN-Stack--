import 'dotenv/config';
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import foodRoutes from "./Route/foodrouter.js";
import orderRoutes from "./Route/orderRouter.js";
import cartRoutes from "./Route/cartRouter.js";
const app = express();

// Fix paths because we are inside /src
app.use(cors());
app.use(express.json());

app.use("/api/foods", foodRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoutes);

// Generic error handler to surface stack traces in development logs
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err && err.stack ? err.stack : err);
  res.status(500).json({ message: "Internal Server Error" });
});

// Connect DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
