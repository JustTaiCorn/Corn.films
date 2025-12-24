import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const tokenFromHeader = authHeader?.split(" ")[1];

  if (!tokenFromHeader) {
    return res.status(401).json({
      success: false,
      message: "Lỗi xác thực người dùng",
    });
  }

  try {
    const decoded = jwt.verify(
      tokenFromHeader,
      process.env.ACCESS_TOKEN_SECRET
    );
    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: "Lỗi xác thực người dùng",
      });
    }

    req.user = { id: decoded.userId };
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Lỗi hệ thống",
    });
  }
};
