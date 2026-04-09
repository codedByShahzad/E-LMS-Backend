import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateJwtToken from "../utils/generateJwtToken.js";

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All feilds are required",
      });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User Already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const createUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    if (createUser) {
      return res.status(201).json({
        // 201 status is used when something is created
        success: true,
        message: "Account Created Successfully",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to Register",
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const user = await User.findOne({ email }); // ✅ fixed

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Incorrect email or password",
      });
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      return res.status(400).json({
        success: false,
        message: "Incorrect email or password",
      });
    }

    user.password = undefined; // 🔐 hide password

    return generateJwtToken(res, user, `Welcome back ${user.name}`); // ✅ return
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to Login", // ✅ fixed
    });
  }
};

const logout = async (req, res) =>{
  try {
    
    res.status(200).cookie("token", "", {maxAge:0}).json({
      success: true,
      message: "Logged out Successfully"
    })

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to Logout", // ✅ fixed
    });
  }
}


const getUserProfile = async (req, res) =>{
  try {
    const userId = req.id
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found"
      })
    }

    res.status(200).json({
      success: true,
      message: "User Found Successfully",
      user
    })

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to get User", // ✅ fixed
    });
  }

}


export  {login , register, logout}