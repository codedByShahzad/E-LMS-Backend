import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated"
      });
    }

    // ✅ Use verify, not decode
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Extract userId from the verified token
    req.id = decodedToken.userId;  // or decodedToken.id, depending on your token structure
    
    next();

  } catch (error) {
    console.log(error);
    return res.status(401).json({  // ✅ 401 for auth failures, not 500
      success: false,
      message: "Invalid or expired token"
    });
  }
};