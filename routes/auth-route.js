const express      = require('express');
const router       = express.Router();
const User         = require('../models/User.model');
const bcrypt       = require('bcryptjs');
const passport     = require('passport');


router.post("/signup", async (req, res) => {
  
  const { name, username, password } = req.body;
  
  if (username === "" || password === "") {
    res.status(500).json("Indicate username and password");
    return;
  }

  //Check for password strength - Regular Expression
  const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (passwordRegex.test(password) === false) {
    res.status(500).json("Password is too weak");
    return;
  }

  //Check if the user already exists
  let user = await User.findOne({ username: username });
  console.log("user", user);
  if (user !== null) {
    res.status(500).json("username already exists");
    return;
  }
  user = await User.findOne({ username: username });
  console.log("user", user);
  if (user !== null) {
    res.status(500).json("email already exists");
    return;
  }

  //Create the user in the database
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hashedPassword = bcrypt.hashSync(password, salt);
  
  try {
   user = await User.create({
      name,
      username,
      password: hashedPassword,
    });
    res.json(user)
  } catch (e) {
    res.status(500).json(`error occurred ${e}`);
    return;
  }
});


//Login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, theUser, failureDetails) => {
      if (err) {
          res.status(500).json({ message: 'Something went wrong authenticating user' });
          return;
      }

      if (!theUser) {
          
          res.status(401).json(failureDetails);
          return;
      }

      // save user in session
      req.login(theUser, (err) => {
          if (err) {
              res.status(500).json({ message: 'Session save went bad.' });
              return;
          }
          // We are now logged in (that's why we can also send req.user)
          res.status(200).json(theUser);
      });
  })(req, res, next);
});



//Logout
router.post('/logout', (req, res) => {
  req.logout();
  res.status(200).json('Logout success');
});

//isLoggedIn
router.get('/loggedIn', (req, res) => {
  if(req.isAuthenticated()) {
    res.status(200).json(req.user);
    return;
  }
  res.status(200).json({});
});


module.exports = router;