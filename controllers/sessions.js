var passport = require('passport');

const SessionsController = {
  Login: (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) {
        throw err;
      }
      if (!user) res.status(400).send("No such user exists");
      else {
        req.logIn(user, (err) => {
          if (err) {
            throw err;
          }
          res.send(user);
        });
      }
    })(req, res, next);
  },

  Logout: (req, res) => {
    res.clearCookie("connect.sid");
    res.send("Logged out");
  }
}

module.exports = SessionsController;
