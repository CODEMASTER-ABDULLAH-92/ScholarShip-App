import recruiterModel from "../models/recruiterModel.js"
import validator from "validator"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
const registerRecruiter = async (req,res) => {
    try {
        const {name, company, email, password} = req.body;
        const isSpecial = /[!@#$%^&*()+_":?><]/.test(password);
        const isDigit =  /\d/.test(password);
        const isSmall = /[a-z]/.test(password);
        const isCapital = /[A-Z]/.test(password);

        const isRecruiterExist = await recruiterModel.findOne({ email });
        if (isRecruiterExist) {
            return res.json({success:false, message: "Recruiter already exist"});
        }
        if (!name || !company) {
            return res.json({ success: false, message: "Name and company are required" });
          }
                  
        if (!validator.isEmail(email)) {
            return res.json({success:false, message: "Email Format is Wrong"});
        }
        if (!password) {
            return res.json({success:false, message: "Password is required"})   
        }
        if(password.length < 8){
            return res.json({success:false, message: "Password length must be of 8 chars"})   
        }
        if (!isSpecial) {
            return res.json({ success: false, message: "Password must contain at least one special character" });
          }
        if (!isDigit) {
          return res.json({ success: false, message: "Password must contain at least one digit" });
        }
        if (!isSmall) {
          return res.json({ success: false, message: "Password must contain at least one lowercase letter" });
        }
        if (!isCapital) {
          return res.json({ success: false, message: "Password must contain at least one uppercase letter" });
        }
          
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const recruiter = await recruiterModel.create({
            name,
            email,
            company,
            password:hashedPassword
        })
        const tokenR = jwt.sign({_id: recruiter._id}, process.env.JWT_SECRET, {expiresIn:"7d"});

        const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            // path: "/",
            // domain: process.env.NODE_ENV === "production" ? ".yourdomain.com" : undefined
          };
        res.cookie("tokenR", tokenR, cookieOptions)
        res.json({success:true, message: "Recuiter Registered Successfully", recruiter, tokenR})
    } catch (error) {
        console.error("Err in recruiter register", error);
        res.json({success:false, message: "Recuiter Registered Err"
        })
    }
}

const loginRecruiter = async (req,res) => {
    try {
        const {email, password} = req.body;
        const isRecruiterExist = await recruiterModel.findOne({ email })
        if (!isRecruiterExist) {
            return res.json({success:false, message: "recruiter doesn't exist with this email "})
        }
        const isMatchPassword = await bcrypt.compare(password, isRecruiterExist.password);
        if (!isMatchPassword) {
            return res.json({success:false, message: "Invalid Email or Password"})
        }
        const tokenR = jwt.sign({_id: isRecruiterExist._id}, process.env.JWT_SECRET, {expiresIn:"7d"});
        res.cookie("tokenR", tokenR, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            // path: "/",
            // domain: process.env.NODE_ENV === "production" ? ".yourdomain.com" : undefined
        })
        res.json({success:true, message:"Recruiter Logged In!", isRecruiterExist, tokenR})

    } catch (error) {
        console.error("Err in the Recuiter Logged In");
        res.json({success:false, message:"Err in Logged In "});
    }
}


const logoutRecruiter = async (req, res) => {
    try {
      res.clearCookie("tokenR", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        path: "/",
        domain: process.env.NODE_ENV === "production" ? ".yourdomain.com" : undefined
      });
      res.json({ success: true, message: "Logged Out Successfully" });
    } catch (error) {
      console.error("Err in Logged Out", error);
      res.json({ success: false, message: "Err in Logged Out" });
    }
  };
  

export {registerRecruiter, loginRecruiter, logoutRecruiter};