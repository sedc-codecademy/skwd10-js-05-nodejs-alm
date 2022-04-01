const validateSession = (req, res, next) => {
  // req.session.loggedIn === true
  if (req.session.loggedIn) {
    console.log(req.session.loggedIn);
    next();
  } else {
    res.redirect("/");
  }
};

module.exports = validateSession;
