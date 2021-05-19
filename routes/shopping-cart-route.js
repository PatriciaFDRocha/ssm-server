const express      = require('express');
const router       = express.Router();
const Product      = require('../models/Product.model');
const ShoppingCart = require('../models/ShoppingCart.model');


//See shopping cart
router.get('/shopping-cart', async (req, res) => {
  try {
    const fullCart = await ShoppingCart.findOne({user: req.user._id}).populate('products.product');

    res.status(200).json(fullCart);

  } catch(e) {
    res.status(500).json(`Error occurred ${e}`)
  }
})


//Add Product to Shopping Cart
router.post('/shopping-cart', async (req, res) => {
  const { quantity, productId } = req.body;
  const user = req.user;

  try {
    const product = await Product.findById(productId);

    const foundCart = await ShoppingCart.findOne({user: user});
    let response;


  if(!foundCart) {
    response = await ShoppingCart.create({
      user: user._id,
      products: [{
        product: product._id,
        quantity: 1
      }]
    });


  } else {
    let productsIdsArr = foundCart.products.map(product => product.product);

    if(productsIdsArr.includes(productId)) {
   
      let productsUpdated = [...foundCart.products];

      productsUpdated.forEach(prod => {

        if(prod.product.toString() === productId.toString()) {
          prod.quantity++
          console.log(`error in prod.quantity++`, prod.quantity);
        }
      });

      response = await ShoppingCart.findByIdAndUpdate(foundCart._id, {
        products: productsUpdated
      }, {new: true})

      console.log(`error in response`, response);

    } else {
      response = await ShoppingCart.findByIdAndUpdate(foundCart._id, {
        $push: {
          products: {
            product, quantity
          }
        }
      }, {new: true})
    }
  }
  res.status(200).json(response);
    
  } catch(e) {
    res.status(500).json(`Error occurred ${e}`);
  }
});


module.exports = router;