import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import validator from 'validator'
// const registerUser = async (req,res) => {
//     try {
//     const {name,email,password} = req.body;
//     if(!name || !email || !password){
//         return res.json({ success: false, message: "Missing Details" });
//     }
//     const isUserExist = await userModel.findOne({email});
//     if (isUserExist) {
//         return res.json({ success: false, message: "User already Exist" });
//     }
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password,salt);
//     const userData = await userModel.create({name,email,password:hashedPassword});
//     const token = jwt.sign({id:userData._id},process.env.JWT_SECRET,{expiresIn:"7d"});

//     res.cookie('token',token,{
//         httpOnly: true,
//         secure: process.env.NODE_ENV === "production",
//         sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
//         maxAge: 7 * 24 * 60 * 60 * 1000,
//     })
//     return res.json({ success: true, token, userData: { email: userData.email, name: userData.name } });
//     } catch (error) {
//         res.json({ success: false, message: error.message });
//         console.error("Err", error.message);
//     }
// }



const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check for missing fields
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "Missing details" });
    }

    // Validate email format
    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Invalid email format" });
    }

    // Validate password strength
    if (password.length < 8 || !/\d/.test(password) || !/[!@#$%^&*]/.test(password)) {
      return res.status(400).json({ success: false, message: "Password must be at least 8 characters long and include a number and a special character" });
    }

    // Check for existing user
    const isUserExist = await userModel.findOne({ email });
    if (isUserExist) {
      return res.status(409).json({ success: false, message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save user
    const userData = await userModel.create({ name, email, password: hashedPassword });

    // Ensure JWT_SECRET is defined
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET not set in environment variables.");
    }

    // Create token
    const token = jwt.sign({ id: userData._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    // Set cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Return response
    return res.status(201).json({
      success: true,
      token,
      userData: {
        name: userData.name,
        email: userData.email,
      },
    });

  } catch (error) {
    console.error("Register Error:", error);
    return res.status(500).json({ success: false, message: error.message });
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


    const token = jwt.sign({is:isUserExist._id},process.env.JWT_SECRET, {expiresIn:"7d"});

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Return response
    return res.status(201).json({
      success: true,
      token,
      isUserExist: {
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
      secure: true, // optional: set to true if using HTTPS
      sameSite: "None", // adjust according to your frontend/backend setup
    });

    return res.status(200).json({ success: true, message: "Logged out successfully." });
  } catch (error) {
    console.error("Logout Error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export {registerUser,LoginUser,Logout};