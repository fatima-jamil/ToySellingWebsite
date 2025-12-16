const express = require('express');
const router = express.Router();
const Wishlist = require('../models/Wishlist');
const { protect } = require('../middleware/auth');


router.get('/', protect, async (req, res) => {
  try {
    let wishlist = await Wishlist.findOne({ user: req.user._id }).populate('items.product');
    
    if (!wishlist) {
      wishlist = await Wishlist.create({ user: req.user._id, items: [] });
    }

    res.json(wishlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/add', protect, async (req, res) => {
  try {
    const { productId } = req.body;

    let wishlist = await Wishlist.findOne({ user: req.user._id });

    if (!wishlist) {
      wishlist = await Wishlist.create({
        user: req.user._id,
        items: [{ product: productId }]
      });
    } else {
      const itemExists = wishlist.items.some(
        item => item.product.toString() === productId
      );

      if (!itemExists) {
        wishlist.items.push({ product: productId });
        await wishlist.save();
      }
    }

    wishlist = await Wishlist.findOne({ user: req.user._id }).populate('items.product');
    res.json(wishlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/remove/:productId', protect, async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user._id });

    if (!wishlist) {
      return res.status(404).json({ message: 'Wishlist not found' });
    }

    wishlist.items = wishlist.items.filter(
      item => item.product.toString() !== req.params.productId
    );

    await wishlist.save();

    const updatedWishlist = await Wishlist.findOne({ user: req.user._id }).populate('items.product');
    res.json(updatedWishlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;