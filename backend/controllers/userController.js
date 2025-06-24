import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import validator from 'validator'


const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const validationErrors = [];
    
    if (!name?.trim()) {
      validationErrors.push("Name is required");
    }
    
    if (!email?.trim()) {
      validationErrors.push("Email is required");
    } else if (!validator.isEmail(email)) {
      validationErrors.push("Invalid email format");
    }
    
    if (!password) {
      validationErrors.push("Password is required");
    } else {
      if (password.length < 8) {
        validationErrors.push("Password must be at least 8 characters long");
      }
      if (!/\d/.test(password)) {
        validationErrors.push("Password must contain at least one number");
      }
      if (!/[!@#$%^&*]/.test(password)) {
        validationErrors.push("Password must contain at least one special character");
      }
    }

    if (validationErrors.length > 0) {
      return res.status(400).json({ 
        success: false, 
        message: "Validation failed",
        errors: validationErrors 
      });
    }

    // Check for existing user
    const existingUser = await userModel.findOne({ email: email.toLowerCase().trim() });
    if (existingUser) {
      return res.status(409).json({ 
        success: false, 
        message: "User already exists with this email" 
      });
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new user
    const newUser = await userModel.create({ 
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword 
    });

    // Verify JWT_SECRET is configured
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not configured in environment variables");
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        _id: newUser._id,
        email: newUser.email
      }, 
      process.env.JWT_SECRET, 
      { 
        expiresIn: "7d",
        issuer: "your-app-name",
        audience: "your-app-client"
      }
    );

    // Set secure HTTP-only cookie
    const cookieOptions = {
      httpOnly: true,
      secure: false,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      path: "/",
      domain: process.env.NODE_ENV === "production" ? ".yourdomain.com" : undefined
    };

    res.cookie('token', token, cookieOptions);

    // Return success response
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          createdAt: newUser.createdAt
        },
        token
      }
    });

  } catch (error) {
    console.error("[AUTH ERROR] Register User:", error);
    
    // Handle specific errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        success: false, 
        message: "Validation failed",
        errors: Object.values(error.errors).map(err => err.message) 
      });
    }
    
    if (error.code === 11000) {
      return res.status(409).json({ 
        success: false, 
        message: "User already exists with this email" 
      });
    }

    // Generic error response
    return res.status(500).json({ 
      success: false, 
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined
    });
  }
};


const LoginUser = async (req,res) => {
  try {
    const {password,email} = req.body;
    
    if ( !email || !password) {
      return res.status(400).json({ success: false, message: "Missing details" });
    }

    const isUserExist = await userModel.findOne({email});
    if (!isUserExist) {
      return res.json({ success: false, message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password,isUserExist.password);

    if (!isMatch) {
      return res.json({ success: false, message: "Invalid email or password" });
    }
    const token = jwt.sign({_id:isUserExist._id},process.env.JWT_SECRET, {expiresIn:"7d"});

    res.cookie('token', token, {
      httpOnly: true,
      secure: false,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Return response
    return res.status(201).json({
      success: true,
      message:res.message,
      token,
      isUserExist: {
        id:isUserExist._id,
        name: isUserExist.name,
        email: isUserExist.email,
      },
    });
  } catch (error) {
    console.error("Logged IN Error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
}


const Logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: false, // optional: set to true if using HTTPS
      sameSite: "None", // adjust according to your frontend/backend setup
    });

    return res.status(200).json({ success: true, message: "Logged out successfully." });
  } catch (error) {
    console.error("Logout Error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export {registerUser,LoginUser,Logout};