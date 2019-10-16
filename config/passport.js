const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/User');
const keys = require('../config/keys');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secret;

module.exports = (passport) => {

  // Configure passpoer
  passport.use(

    // Instantiate JwtStrategy
    new JwtStrategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then(user => {
          if (user) {
            // User provided correct credentials
            return done(null, user);
          }

          // User provided incorrect credentials
          return done(null, false);
        })

        // User credentials could not be checked (becuase db connection failed)
        .catch(err => done(null, null));

    })
  );
};