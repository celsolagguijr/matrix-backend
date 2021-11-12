const { verifyAccessToken } = require("../utils/jwt");

const validateToken = async (req, res, next) => {
  const bearerHeader = req.headers["authorization"];

  console.log(bearerHeader);

  if (typeof bearerHeader !== "undefined") {
    const accessToken = bearerHeader.split(" ")[1];

    try {
      const token = await verifyAccessToken(accessToken);
      req.token = token.payload;
      next();
    } catch (error) {
      return res.status(403).json({
        message: "Unauthorized",
        error,
      });
    }

    return;
  }

  return res.status(403).json({ message: "Access token required" });
};

module.exports = { validateToken };
