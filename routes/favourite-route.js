const express = require('express');
const router = express.Router();
const Favourite = require('../models/Favourite.model');


router.get('/products/favourite', async (req, res)=> {

  try {
    const user = req.session.currentUser._id;
    const favourites = await Favourite.find({user: user}).populate('product');
    
    res.status(200).json(favourites);

  } catch(e) {
    res.status(500).json(`Error occurred ${e}`)
  }  
});


//Add favourite
router.post('/products/:id/favourite', async (req, res)=> {

  try {
    const response = await Favourite.create({
      product: req.params._id,
      user: req.user._id
    });

    res.status(200).json(response);

  } catch(e) {
    res.status(500).json(`Error occurred ${e}`);
  }
  });

  
//Remove favourite
router.post('/favourites/:id/delete', async (req, res) => {
  try {
    
    const response = await Product.findByIdAndDelete(req.params.id);
    res.status(200).json(response);

  } catch(e) {
    res.status(500).json(`Error occurred ${e}`);
  }
});

module.exports = router;