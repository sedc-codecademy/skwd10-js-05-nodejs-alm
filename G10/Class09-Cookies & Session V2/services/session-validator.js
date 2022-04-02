const validateSession = (req, res, next) => {
  // req.session.loggedIn === true
  console.log("here 1");
  if (req.session.loggedIn) {
    console.log(2);

    console.log(req.session.loggedIn);
    next();
  } else {
    console.log("here 3");

    console.log("REDIRECTED");
    res.redirect("/");
  }
};

module.exports = validateSession;
