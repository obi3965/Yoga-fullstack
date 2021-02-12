//a middleware, only for admin access
exports.isAdmin = (req, res, next) => {
    if (req.profile.role === 0) {
      return res.status(403).json({
        error: "Admin Access Denied",
      });
    }
    next();
  };