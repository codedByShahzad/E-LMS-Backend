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
      sameSite: "strict",
      maxAge: ms("1d")
    }).json({
        success: true,
        message,
        user
    });
};

export default generateJwtToken
