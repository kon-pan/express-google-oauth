// Load .env variables.
require('dotenv').config();

// Third party module imports.
const express = require('express');

// Create Express application
const app = express();
const PORT = 3000;

// Configure view engine to render EJS templates.
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// Use application-level middleware for 
// parsing, and session handling.
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(
  require('express-session')({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
  })
);

// Import configured Google Passport strategy
const passport = require('./config/passport/google.auth');
// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

// Get user routes
const userRouter = require('./routes/user.router');

app.use(userRouter);

app.listen(PORT, () => {
  console.log(`App listening to port:${PORT}`);
});
