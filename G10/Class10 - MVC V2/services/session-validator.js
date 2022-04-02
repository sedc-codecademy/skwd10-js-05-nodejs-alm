const validateUser = (req, res, next) => {
  if (req.session.authenticated) {
    next();
  } else {
    res.status(401).json({ msg: "You are not authenticated" });
  }
};

const validateAdminUser = (req, res, next) => {
  if (req.session.authenticated && req.session.isAdmin) {
    next();
  } else {
    res.status(401).json({ msg: "You are not authenticated" });
  }
};

module.exports = { validateUser, validateAdminUser };
