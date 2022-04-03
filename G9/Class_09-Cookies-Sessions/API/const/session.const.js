const session = require("express-session");

module.exports = session({
  secret: ["asdfghjkl"], // To update the secret add a new value, dont delete the previous.
  name: "cookie_id",
  cookie: {
    maxAge: 5 * 60 * 60 * 1000,
    httpOnly: true,
    secure: false,
  },
  saveUninitialized: true,
  resave: false
});

/*
[SESSION SECRET]
But because these cookies are stored by the web browser (the client), 
the web server doesn't actually know that the cookies it receives from the client are legitimate.

A session secret in connect is simply used to compute the hash. 
Without the string, access to the session would essentially be "denied".
The session secret is a key used for signing and/or encrypting cookies set by the application to maintain session state.


Let's assume that sessions are enabled globally (for all requests).
When a client makes an HTTP request, and that request doesn't contain a session cookie, 
a new session will be created by express-session.

If during the lifetime of the request the session object isn't modified then, 
at the end of the request and when saveUninitialized is false, the (still empty, because unmodified) session object 
will not be stored in the session store.

The reasoning behind this is that this will prevent a lot of empty session objects being stored in the session store. 
Since there's nothing useful to store, the session is "forgotten" at the end of the request.

When do you want to enable this? When you want to be able to identify recurring visitors, for example. 
You'd be able to recognize such a visitor because they send the session cookie containing the unique id.

About resave: this may have to be enabled for session stores that don't support the "touch" command. 
What this does is tell the session store that a particular session is still active, 
which is necessary because some stores will delete idle (unused) sessions after some time.

If a session store driver doesn't implement the touch command, 
then you should enable resave so that even when a session wasn't changed during a request, 
it is still updated in the store (thereby marking it active).

So it entirely depends on the session store that you're using if you need to enable this option or not.
*/

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