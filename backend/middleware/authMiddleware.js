import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
  const token = req.cookies?.token; // Read to/
  // ken from cookies
  console.log(token);
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: Token missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
    req.user = decoded; // Attach user to request
    console.log(req.user);
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

export default verifyToken;
