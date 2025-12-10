import mongoose from "mongoose";

const cartSchema = mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  items: [
    {
      foodId: { type: mongoose.Schema.Types.ObjectId, ref: "Food" },
      name: String,
      price: Number,
      quantity: Number,
      image: String
    }
  ]
}, { timestamps: true });

export default mongoose.model("Cart", cartSchema);
