import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  // Kiểm tra token từ cả cookie và header Authorization
  const tokenFromCookie = req.cookies.token;
  const tokenFromHeader = req.headers.authorization?.split(" ")[1];
  const token = tokenFromHeader || tokenFromCookie;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized - no token provided",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - invalid token",
      });
    }

    req.user = { id: decoded.userId };
    next();
  } catch (error) {
    console.error("Error in verifyToken:", error);
    return res.status(401).json({
      success: false,
      message: "Unauthorized - invalid token",
    });
  }
};
