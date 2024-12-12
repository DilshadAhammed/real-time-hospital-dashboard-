const orMiddleware = (middleware1, middleware2) => async (req, res, next) => {
  try {
    let responseSent = false;

    // Try the first middleware
    await middleware1(req, res, (err) => {
      if (err || res.headersSent) {
        responseSent = true;
        return; // If response is sent, don't proceed with the next middleware
      }
      next();
    });

    // If first middleware did not send a response, try the second middleware
    if (!responseSent) {
      await middleware2(req, res, next);
    }
  } catch (error) {
    next(error);
  }
};


module.exports = orMiddleware;