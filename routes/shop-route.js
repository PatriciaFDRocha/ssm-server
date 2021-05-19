const express     = require('express');
const router      = express.Router();
const Shop        = require('../models/Shop.model');

//Get all shops
router.get('/shop', async (req, res) => {
  try {
    const allShops = await Shop.find();
    res.status(200).json(allShops);

  } catch(e) {
    res.status(500).json(`Error occurred ${e}`)
  }
});

//Get 1 shop
router.get('/shop/:id', async (req, res) => {
  try {
    const shop = await Shop.findById(req.params.id).populate("user"); 
    res.status(200).json(shop);

  } catch(e) {
    res.status(500).json(`Error occurred ${e}`)
  }
});


//Create a shop
router.post('/shop/add', async (req, res) => {
  const { shopName, description, latitude, longitude } = req.body;

  try {
    const response = await Shop.create({
      shopName,
      description,
      // latitude,
      // longitude,
      user: req.user._id
    });
    
    res.status(200).json(response);

  } catch(e) {
    res.status(500).json(`Error occurred ${e}`);
  }
});


//Delete shop
router.delete('/shop/:id', async (req, res) => {
  try {

   await Shop.findByIdAndDelete(req.params.id)
    res.status(200).json('shop deleted');

  } catch(e) {
    res.status(500).json(`Error occurred ${e}`);
  }
});

module.exports = router;