import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import ms from "ms";

const generateJwtToken = async (res, user, message) => {
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  return res
  .status(200)
  .cookie("token", token, {
    httpOnly: true,
    secure: false,        // ✅ ADD THIS - must be false for HTTP localhost
    sameSite: "lax",      // ✅ CHANGE from "strict" to "lax"
    maxAge: ms("1d")
  }).json({
        success: true,
        message,
        user
    });
};

export default generateJwtToken
