const mongoose          = require('mongoose');
const { Schema, model } = mongoose;

const shopSchema = new Schema ({
  
  shopName: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product'
  },
  
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },

  latitude: {
    type: Number
  },

  longitude: {
    type: Number
  }
});

const Shop = mongoose.model('Shop', shopSchema);

module.exports = Shop;