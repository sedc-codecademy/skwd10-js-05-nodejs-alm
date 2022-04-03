const validateSession = (req, res, next) => {
  if (req.session.authenticated) {
    next();
  } else {
    res.status(404).json({
      message: "Error! You cannot access this resource!",
    });
  }
};

module.exports = validateSession;