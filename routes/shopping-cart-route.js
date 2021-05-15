const express      = require('express');
const router       = express.Router();
const ShoppingCart = require('../models/ShoppingCart.model');
const fileUpload   = require('../configs/cloudinary');


//Add Product to Shopping Cart
router.post('/shopping-cart', async (req, res) => {
  const { pictureUrl, name, quantity, price } = req.body;

  try {
    const response = await ShoppingCart.create({
      pictureUrl,
      name,
      quantity,
      price
    });

    res.status(200).json(response);
    
  } catch(e) {
    res.status(500).json(`Error occurred ${e}`);
  }
});

//See shopping cart
router.get('/shopping-cart', async (req, res) => {
  try {
    const fullCart = await ShoppingCart.find();
    res.status(200).json(fullCart);

  } catch(e) {
    res.status(500).json(`Error occurred ${e}`)
  }
})


//Upload image to cloudinary
router.post('/upload', fileUpload.single('file'), (req, res) => {
  try {
    res.status(200).json({ fileUrl: req.file.path });

  } catch(e) {
    res.status(500).json(`Error occurred ${e}`);
  }
})

module.exports = router;