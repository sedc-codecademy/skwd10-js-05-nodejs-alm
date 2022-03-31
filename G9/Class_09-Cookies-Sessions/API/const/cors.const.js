module.exports = (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Accept, APPKEY, withCredentials"
  );

  if (req.method === "OPTIONS") {
    res.status(200).json({});
  } else {
    next();
  }
};

/*
The Access-Control-Allow-Origin response header indicates whether the response can be shared with requesting code from the given origin.

By default, CORS does not include cookies on cross-origin requests.
In order to reduce the chance of vulnerabilities in CORS, CORS requires both the server and the client to acknowledge that it is ok to include cookies on requests.
In this regard, the client code must set the withCredentials property on the XMLHttpRequest to true in order to give permission. (Done on the front end)
However, this header alone is not enough. The server must respond with the Access-Control-Allow-Credentials header. (Line 3)
Responding with this header to true means that the server allows cookies (or other user credentials) to be included on cross-origin requests.

Access-Control-Allow-Methods lets us decide which HTTP Methods are allowed.

The OPTIONS method is a preflight request. A preflight request is a small request that is sent by the browser before the actual request. 
It contains information like which HTTP method is used, as well as if any custom HTTP headers are present. 
The preflight gives the server a chance to examine what the actual request will look like before it's made.
*/