import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
  try {

    const token = req.cookies.token

    if(!token){
        return res.status(401).json({
            success: false,
            message: "User not Authenticated"
        })
    }

    const decodeToken = jwt.decode(token, process.env.JWT_SECRET)

    if(!decodeToken){
        return res.status(401).json({
            success: false,
            message: "Token not found"
        })
    }

    req.id = userId
    next()

  } catch (error) {

    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to Authenticate", // ✅ fixed
    });

  }
};
