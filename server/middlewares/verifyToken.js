import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token)
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized - no token provided" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded)
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized - invalid token" });

    // Change this to match what the controller expects
    req.user = { id: decoded.userId };
    console.log("User ID set in request:", req.user.id);
    next();
  } catch (error) {
    console.log("Error in verifyToken:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
