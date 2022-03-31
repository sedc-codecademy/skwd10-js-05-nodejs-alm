const validateCookie = (req, res, next) => {
  if (
    process.env.session_id &&
    req.cookies.session_id === process.env.session_id
  ) {
    next();
  } else {
    res.status(401).json({
      message: "Error! You are not authorized!",
    });
  }
};

module.exports = validateCookie;

/*
Cookies are sent with almost every request. Can't go around this. 
In some cases they aren't, but thats advanced security stuff.
*/