//authentication middleware for user
exports.isAuth = (req, res, next) => {
    let user = req.profile && req.auth && req.profile._id == req.auth._id;
    if (!user) {
      return res.status(403).json({
        error: "user Access Denied",
      });
    }
    next();
  };