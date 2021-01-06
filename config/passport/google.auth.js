const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

//
// Configure Strategy
//
// The Google authentication strategy authenticates users using a Google account
// and OAuth 2.0 tokens. The client ID and secret obtained when creating an
// application are supplied as options when creating the strategy. The strategy
// also requires a verify callback, which receives the access token and optional
// refresh token, as well as profile which contains the authenticated user's
// Google profile. The verify callback must call cb providing a user
// to complete authentication.

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/auth/google/callback',
    },
    function (accessToken, refreshToken, profile, cb) {
      // In this example, the user's Facebook profile is supplied as the user
      // record.  In a production-quality application, the Facebook profile should
      // be associated with a user record in the application's database, which
      // allows for account linking and authentication with other identity
      // providers.
      console.log(profile);
      return cb(null, profile);
    }
  )
);

//
// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  In a
// production-quality application, this would typically be as simple as
// supplying the user ID when serializing, and querying the user record by ID
// from the database when deserializing.  However, due to the fact that this
// example does not have a database, the complete Facebook profile is serialized
// and deserialized.
passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

module.exports = passport;
