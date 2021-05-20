const mongoose          = require('mongoose');
const { Schema, model } = mongoose;

const favouriteSchema = new Schema({
  product: [{
    type: Schema.Types.ObjectId,
    ref: 'Product'
  }],
  
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});


const Favourite = model('Favourite', favouriteSchema);
module.exports = Favourite;