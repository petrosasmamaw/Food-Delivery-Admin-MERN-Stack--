import Cart from "../Model/Cart.js";

export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    if (!cart) return res.json({ items: [] });
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const upsertCart = async (req, res) => {
  try {
    const { items } = req.body;
    const userId = req.params.userId;
    const updated = await Cart.findOneAndUpdate(
      { userId },
      { userId, items },
      { upsert: true, new: true }
    );
    res.json(updated);
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
