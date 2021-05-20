const express = require('express');
const router = express.Router();
const Favourite = require('../models/Favourite.model');
const Product = require('../models/Product.model');


//Remove favourite
router.post('/favourites/:id', async (req, res) => {
  try {
    
    const response = await Product.findByIdAndDelete(req.params.id);
    res.status(200).json(response);

  } catch(e) {
    res.status(500).json(`Error occurred ${e}`);
  }
});

router.get('/favourites', async (req, res)=> {

  try {
    const favourites = await Favourite.findOne({user: req.user}).populate('product');

    res.status(200).json(favourites);

  } catch(e) {
    res.status(500).json(`Error occurred ${e}`)
  }  
});


//Add favourite
router.post('/products/:id/favourites', async (req, res)=> {
  const productId  = req.params.id;
  const user = req.user;

  try {
    const product = await Product.findById(productId);
    const foundWishList = await Favourite.findOne({user: user});

    let response;

    if(!foundWishList) {
      response = await Favourite.create({
        product: product,
        user: user._id
      });
    }
    else {
      response = await Favourite.findByIdAndUpdate(foundWishList._id, {
        $push: {
          product: product,
        }
      })
    }

    res.status(200).json(response);

  } catch(e) {
    res.status(500).json(`Error occurred ${e}`);
  }
  });

  
module.exports = router;