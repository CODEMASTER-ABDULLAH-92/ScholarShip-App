import jwt from 'jsonwebtoken';
import recruiterModel from '../models/recruiterModel.js';

const verifyRecruiterToken = async (req, res, next) => {
  try {
    const recruiterToken = req.cookies?.tokenR;

    if (!recruiterToken) {
      return res.status(401).json({ message: 'Unauthorized: Token missing' });
    }

    const decoded = jwt.verify(recruiterToken, process.env.JWT_SECRET);

    if (!decoded || !decoded._id) {
      return res.status(400).json({ message: 'Invalid token payload' });
    }

    const recruiter = await recruiterModel.findById(decoded._id);
    if (!recruiter) {
      return res.status(404).json({ message: 'Recruiter not found' });
    }

    req.recruiter = recruiter;
    console.log("Verified recruiter:", recruiter._id); // ✅ Debug log
    next();
  } catch (error) {
    console.error("JWT Auth Error:", error.message);
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};

export default verifyRecruiterToken;
