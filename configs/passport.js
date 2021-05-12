const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('../models/User.model');
const bcrypt = require('bcryptjs');


//Passport - Set the in the session
passport.serializeUser((loggedInUser, cb) => {
  cb(null, loggedInUser._id);
});

//Passport - Get the user from the session 
passport.deserializeUser((userIdFromSession, cb) => {
  User.findById(userIdFromSession, (err, userDocument) => {
    if (err) {
      cb(err);
      return;
    }
    cb(null, userDocument);
  });
});

//Passport - Authentication
passport.use(new LocalStrategy((username, password, next) => {
  User.findOne({ username }, (err, foundUser) => {
    if (err) {
      next(err);
      return;
    }
    if (!foundUser) {
      next(null, false, { message: 'Invalid login' });
      return;
    }
    if (!bcrypt.compareSync(password, foundUser.password)) {
      next(null, false, { message: 'Invalid login' });
      return;
    }
    next(null, foundUser);
  });
}));