const mongoose          = require('mongoose')
const { Schema, model } = mongoose;

const shoppingCartSchema = new Schema ({
  pictureUrl: {
    type: String,
    required: true
  },

  name: {
    type: String,
    required: true
  },

  quantity: {
    type: Number,
    required: true
  },

  price: {
    type: Number,
    required: true
  }
});

const ShoppingCart = mongoose.model('ShoppingCart', shoppingCartSchema);

module.exports = ShoppingCart;