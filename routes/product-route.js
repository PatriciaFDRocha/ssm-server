const express = require('express');
const router = express.Router();
const Product = require('../models/Product.model');
const fileUpload  = require('../configs/cloudinary');

//Get all products
router.get('/products', async (req, res) => {
  try {
    const allProducts = await Product.find(); 
    res.status(200).json(allProducts);

  } catch(e) {
    res.status(500).json(`Error occurred ${e}`)
  }
});

//Create a Product
router.post('/products', async (req, res) => {
  const { pictureUrl, name, price, description, shopName, brand } = req.body;
  
  if( !pictureUrl || !name || !price || !description || !shopName ) {
    res.status(400).json('missing fields');
    return;
  }

  try {
    const response = await Product.create({
      pictureUrl, 
      name, 
      price,
      description,
      brand,
      shopName
    });
    
    res.status(200).json(response);

  } catch(e) {
    res.status(500).json(`Error occurred ${e}`);
  }
});


//Delete Project
router.delete('/products/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json(`project with id ${req.params.id} deleted`)

  } catch(e) {
    res.status(500).json(`Error occurred ${e}`);
  }
});

//Get by Id
router.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);

  } catch(e) {
    res.status(500).json(`Error occurred ${e}`);
  }
});

//Update project
router.put('/products/:id', async (req, res) => {
  try {
    const { pictureUrl, name, price, description, shopName, brand } = req.body;

    await Product.findByIdAndUpdate(req.params.id, {
      pictureUrl, 
      name, 
      price,
      description,
      brand,
      shopName
    });

    res.status(200).json(`project with id ${req.params.id} was updated`);

  }catch(e) {
    res.status(500).json(`Error occurred ${e}`);
  }
});


//Upload image to cloudinary
router.post('/upload', fileUpload.single('file'), (req, res) => {
  try {
    res.status(200).json({ fileUrl: req.file.path });

  } catch(e) {
    res.status(500).json(`Error occurred ${e}`);
  }
})

module.exports = router;