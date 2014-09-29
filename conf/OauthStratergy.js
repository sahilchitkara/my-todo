var passport = require('passport');
var LocalStrategy=require('passport-local').Strategy

passport.use(new LocalStrategy(
    function (username, password, done) {
        User.findOne({ email: username, password: password }, function (err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false);
            }
            return done(null, user);
        });
    }
))

