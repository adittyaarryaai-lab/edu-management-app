const permissions = require("../config/permissions");

module.exports = (requiredPermission) => {
  return (req, res, next) => {
    const role = req.user.role;

    if (!permissions[role]?.includes(requiredPermission)) {
      return res.status(403).json({
        message: "Access denied"
      });
    }

    next();
  };
};
