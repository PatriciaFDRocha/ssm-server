const express      = require('express');
const router       = express.Router();
const Product      = require('../models/Product.model');
const ShoppingCart = require('../models/ShoppingCart.model');


//See shopping cart
router.get('/shopping-cart', async (req, res) => {
  try {
    const fullCart = await ShoppingCart.find();
    res.status(200).json(fullCart);

  } catch(e) {
    res.status(500).json(`Error occurred ${e}`)
  }
})


//Add Product to Shopping Cart
router.post('/shopping-cart', async (req, res) => {
  const { quantity, productId } = req.body;
  const user = req.user;

  const product = await Product.findById(productId)

  try {
    const response = await ShoppingCart.create({
      user,
      quantity,
      product
    });

    res.status(200).json(response);
    
  } catch(e) {
    res.status(500).json(`Error occurred ${e}`);
  }
});



module.exports = router;