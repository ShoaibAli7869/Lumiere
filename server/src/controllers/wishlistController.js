import User from "../models/User.js";

export const getWishlist = async (req, res) => {
  const user = await User.findById(req.user._id).populate(
    "wishlist",
    "name price images comparePrice",
  );
  res.json({ success: true, wishlist: user.wishlist });
};

export const toggleWishlist = async (req, res) => {
  const { productId } = req.params;
  const user = await User.findById(req.user._id);
  const idx = user.wishlist.indexOf(productId);

  if (idx > -1) {
    user.wishlist.splice(idx, 1);
  } else {
    user.wishlist.push(productId);
  }

  await user.save();
  res.json({ success: true, wishlist: user.wishlist, added: idx === -1 });
};
