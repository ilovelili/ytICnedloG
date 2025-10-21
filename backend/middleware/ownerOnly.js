module.exports = function ownerOnly(req, res, next) {
  const expectedSecret = process.env.OWNER_SECRET;

  if (!expectedSecret) {
    return res.status(500).json({
      success: false,
      message: "OWNER_SECRET is not configured on the server.",
    });
  }

  const providedSecret = req.headers["x-owner-secret"];

  if (!providedSecret || providedSecret !== expectedSecret) {
    return res.status(403).json({
      success: false,
      message: "Forbidden: invalid owner credentials.",
    });
  }

  next();
};
