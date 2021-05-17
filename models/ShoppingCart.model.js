const mongoose          = require('mongoose')
const { Schema, model } = mongoose;

const shoppingCartSchema = new Schema ({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },

  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product'
  },
  
  quantity: {
    type: Number,
    required: true
  }
});

const ShoppingCart = mongoose.model('ShoppingCart', shoppingCartSchema);

module.exports = ShoppingCart;