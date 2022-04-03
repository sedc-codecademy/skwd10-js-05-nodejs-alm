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
Cookie Properties:
Cookies are sent with almost every request. Can't go around this. 

Scope of the cookies can be domain, or path. 
For example, if you go to example.com, that cookie goes to only to the example.com domain bucket.
Optionally you can set paths for the cookie. I want these cookies to /login, others to some other path.

Expires, max age
Cookies have a Lifetime. Even if you close the browser.

Cookie Types:

Session cookie is a cookie that doesn't have a max age or expiration

Permanent cookies aren't exactly permanent. It just means they have a max age or expiration

Httponly cannot be set from document.cookie. Can only be set from the server. The browser reads them, but the FE JS can't.

Secure cookie
If we implement SSL, ideally all the requests must be transmitted as https. 
But sometimes due to several reasons, 
even if SSL is enabled some websites allow to be rendered via http. 
In that case, the cookie will also be transmitted as clear text. 
But we can tell the browser explicitly to send the cookies only 
if an https channel is found.
Once the Secure flag is set as True, 
browser will send the cookies only if an https channel is found. 
In all other cases, it will fail the request and saving the cookie.

--------------------------------------------------------------------------------------------------------------
A session stores the variables and their values within a file in a temporary directory on the server. 
Cookies are stored on the user's computer as a text file. 
The session ends when the user logout from the application or closes his web browser. 
Cookies end on the lifetime set by the user.

*/