const passport = require("passport");
const User = require("../models/User");
const validator = require("validator");

module.exports.postLogin = (req, res, next) => {
  console.log(`API POST LOGIN*********************************************`);
  console.log(req.body);

  if (!req.body.password) {
    console.log(`no password`);
    return res.status(400).json({ login: "fail", message: "1" });
  }

  passport.authenticate("local", (err, user, info) => {
    // console.log(`post login user :`,user)
    // console.log(`post login info :`, info)
    if (err) {
      return next(err);
    }
    if (!user) {
      console.log(`user not found`);
      return res.json({ login: "fail", message: "2" });
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      console.log(`login user is `, user);
      return res.json({
        login: "success",
        user: {
          username: user.username,
          role: user.role,
          groups: user.groups,
        },
      });
    });
  })(req, res, next);
};

module.exports.logout = (req, res) => {
  console.log(`logout**************************************`);

  try {
    req.logout(() => {
      req.session.destroy((err) => {
        if (err)
          console.log(`error: failed to destroy session during logout.`, err);

        req.user = null;
        return res.json({ logout: "success" });
      });
    });
  } catch (error) {
    console.log(error);
    return res.json({ logout: "failed" });
  }
};

/// POST signup
exports.postSignup = (req, res, next) => {
  //checking to see if password ect match

  console.log(`signup body`, req.body);
  const validationErrors = [];
  if (!validator.isEmail(req.body.email))
    validationErrors.push({ msg: "Please enter a valid email address." });
  if (!validator.isLength(req.body.password, { min: 8 }))
    validationErrors.push({
      msg: "Password must be at least 8 characters long",
    });
  if (req.body.password !== req.body.confirmPassword)
    validationErrors.push({ msg: "Passwords do not match" });

  if (validationErrors.length) {
    // req.flash('errors', validationErrors)
    return res.redirect("../signup");
  }
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });

  const user = new User({
    //new User is our user model, we grab username,email, password from request body of the form to create a new user
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });

  User.findOne(
    { $or: [{ email: req.body.email }, { username: req.body.username }] },
    (err, existingUser) => {
      if (err) {
        return next(err);
      }
      if (existingUser) {
        // req.flash('errors', { msg: 'Account with that email address or username already exists.' })
        return res.redirect("../signup");
      }

      user.save((err) => {
        //save the new user model to create a new user in our users collection
        if (err) {
          return next(err);
        }
        req.logIn(user, (err) => {
          if (err) {
            return next(err);
          }
          res.redirect("/inventory"); //last thing it does is redirect us to the dashboard
        });
      });
    }
  );
};
