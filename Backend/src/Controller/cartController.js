import Cart from "../Model/Cart.js";

export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    if (!cart) return res.json({ items: [] });

    // Map stored cart items to frontend-friendly shape: include `_id` as the food id
    const items = (cart.items || []).map((it) => ({
      _id: it.foodId ? String(it.foodId) : undefined,
      name: it.name,
      price: it.price,
      quantity: it.quantity,
      image: it.image,
    }));

    return res.json({ items });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const upsertCart = async (req, res) => {
  try {
    const { items } = req.body;
    const userId = req.params.userId;

    // Normalize incoming items: frontend sends `_id` for the food id — store as `foodId`
    const normalized = (items || []).map((it) => ({
      foodId: it._id || it.foodId || null,
      name: it.name,
      price: it.price,
      quantity: it.quantity,
      image: it.image,
    }));

    const updated = await Cart.findOneAndUpdate(
      { userId },
      { userId, items: normalized },
      { upsert: true, new: true }
    );

    // Return items in the frontend-friendly shape
    const responseItems = (updated.items || []).map((it) => ({
      _id: it.foodId ? String(it.foodId) : undefined,
      name: it.name,
      price: it.price,
      quantity: it.quantity,
      image: it.image,
    }));

    return res.json({ items: responseItems });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const clearCart = async (req, res) => {
  try {
    const userId = req.params.userId;
    await Cart.findOneAndDelete({ userId });
    res.json({ message: "Cart cleared" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
