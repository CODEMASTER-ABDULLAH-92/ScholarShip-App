import jwt from 'jsonwebtoken';

const verifyRecuriterToken = async (req, res, next) => {
    const recruiterToken = req.cookies?.tokenR;
    if (!recruiterToken) {
        return res.status(401).json({ message: "Unauthorized: Token missing" });
    }
    try {
        const decoded = jwt.verify(recruiterToken, process.env.JWT_SECRET);
        req.recruiter = decoded;
        next();   
    } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token" });    
    }
}
export default verifyRecuriterToken;