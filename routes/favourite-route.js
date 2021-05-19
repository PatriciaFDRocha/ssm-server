const express = require('express');
const router = express.Router();
const Favourite = require('../models/Favourite.model');
const Product = require('../models/Product.model');


router.get('/products/favourites', async (req, res)=> {

  try {

    const favourites = await Favourite.findOne({user: req.user._id}).populate('products.product');
    
    res.status(200).json(favourites);

  } catch(e) {
    res.status(500).json(`Error occurred ${e}`)
  }  
});


//Add favourite
router.post('/products/:id/favourites', async (req, res)=> {
  const { productId } = req.body;
  const user = req.user;

  try {
    await Product.findById(productId);
    const foundWishList = await Favourite.findOne({user: user});

    let response;

    if(!foundWishList) {
      response = await Favourite.create({
        product: productId,
        user: user._id
      });
    }

    else {
      response = await Favourite.findByIdAndUpdate(foundWishList._id, {
        $push: {
          product: productId,
        }
      })
    }
    res.status(200).json(response);

  } catch(e) {
    res.status(500).json(`Error occurred ${e}`);
  }
  });

  
//Remove favourite
router.post('/favourites/:id', async (req, res) => {
  try {
    
    const response = await Product.findByIdAndDelete(req.params.id);
    res.status(200).json(response);

  } catch(e) {
    res.status(500).json(`Error occurred ${e}`);
  }
});

module.exports = router;