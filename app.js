require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');
const session      = require('express-session');
const passport     = require('passport');
const cors         = require('cors');

//Include passport config
require('./configs/passport');

mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//allows heroku to received connections from other websites
app.set('trust proxy', 1);


//Session setup
app.use(session({
  secret: process.env.SESSION_SECRET,
  saveUninitialized: true,
  resave: false,
  cookie: {
    sameSite: true,//the client is on the same domain as the server
    secure: false,
    httpOnly: true,
    maxAge: 600000 //expiration time 1 hour
  },
  rolling: true
}))


app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));


//Initialize and connect passport to the session
app.use(passport.initialize());
app.use(passport.session());

app.use(cors({
  credentials: true,
  origin:[process.env.CLIENT_HOSTNAME],
}))

// default value for title local
app.locals.title = 'SSM - Made With Love';


const index = require('./routes/index');
app.use('/', index);

const auth = require('./routes/auth-route');
app.use('/api', auth);

const products = require('./routes/product-route');
app.use('/api', products);

const favourites = require('./routes/favourite-route');
app.use('/api', favourites);

const shops = require('./routes/shop-route');
app.use('/api', shops);

const shoppingcart = require('./routes/shopping-cart-route');
app.use('/api', shoppingcart);

module.exports = app;
