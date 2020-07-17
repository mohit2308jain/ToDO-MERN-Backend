const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user.model');
const bcrypt = require('bcrypt');

function initialize(passport) {
    const authenticateUser = async (email, password, done) => {
        User.findOne({ email: email }, (err, user) => {
            if (err) {
                return done(null, false, { message: 'Server Error !' });
            } else if (user === null) {
                return done(null, false, { message: 'No user with that Email !' });
            }
            else if (!bcrypt.compareSync(password, user.password)) {
                return done(null, false, { message: 'Password Incorrect !' });
            } else {
                return done(null, user);
            }
        });
    };

    passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser));
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });
    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });
}

module.exports = initialize;