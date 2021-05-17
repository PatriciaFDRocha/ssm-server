const express      = require('express');
const router       = express.Router();
const stripe       = require('stripe')(process.env.STRIPE_SECRET_KEY);


router.post('/create-checkout-session', async (req, res) => {
  const { price, name } = req.body;
  
  const session = await stripe.checkout.sessions.create({
    
    mode: 'payment',
    success_url: 'http://localhost:5000/sucess?id={CHECKOUT_SESSION_ID}',
    cancel_url: 'http://localhost:5000/shopping-cart',

    payment_method_types: [ "card" ],

    line_items: [
      {
        price: price,
        adjustable_quantity: true,
        name: name,
        allow_promotion_codes:true,

      },
    ],
  });

  res.json({ id: session.id });
});


module.exports = router;