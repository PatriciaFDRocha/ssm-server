const mongoose          = require('mongoose')
const { Schema, model } = mongoose;

const productSchema = new Schema ({
  pictureUrl: {
    type: String,
    required: true
  },

  name: {
    type: String,
    required: true
  },

  price: {
    type: Number,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  brand: {
    type: String
  },

  shopName: {
    type: String,
    required: true
  },

  reviews: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      },
      comment: String,
      rating: String,
    }
  ],
  
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;