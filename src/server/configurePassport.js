const PassportLocal = require('passport-local');
const PassportJWT = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
module.exports = function(passport){

  passport.use(new PassportLocal(
    function(username, password, done) {
      // database dummy - find user and verify password
      if(username === 'devils name' && password === '666'){
        done(null, {
          id: 666,
          firstname: 'devils',
          lastname: 'name',
          email: 'devil@he.ll',
          verified: true
        });
      }
      else {
        done(null, false);
      }
    }
  ));

  var opts = {}
  opts.jwtFromRequest = ExtractJWT.fromAuthHeader();
  opts.secretOrKey = require("./secrets");
  opts.issuer = "users.firststudio.org";
  opts.audience = "firststudio.org";
  passport.use(new PassportJWT(opts, (jwt_payload, done) => {
      // User.findOne({id: jwt_payload.sub}, function(err, user) {
      //     if (err) {
      //         return done(err, false);
      //     }
      //     if (user) {
      //         done(null, user);
      //     } else {
      //         done(null, false);
      //         // or you could create a new account
      //     }
      // }
      done(null,{
        id: 666,
        firstname: 'devils',
        lastname: 'name',
        email: 'devil@he.ll',
        verified: true
      })
    }));

  return passport;
}
