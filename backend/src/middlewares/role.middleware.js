const roleMiddleware = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      if (!req.user || !req.user.role) {
        return res.status(401).json({
          message: "Unauthorized: role missing"
        });
      }

      const userRole = req.user.role.toLowerCase();
      const roles = allowedRoles.map(r => r.toLowerCase());

      if (!roles.includes(userRole)) {
        return res.status(403).json({
          message: "Access denied"
        });
      }

      next();
    } catch (err) {
      return res.status(500).json({
        message: "Role middleware error"
      });
    }
  };
};

module.exports = roleMiddleware;
