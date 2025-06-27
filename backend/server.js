import express from "express";
import "dotenv/config";  // No need for dotenv.config() since it's handled here
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import connectDb from "./db/db.js";
import userRouter from "./routes/userRoutes.js";
import scholarshipRouter from "./routes/scholarshipData.route.js";
import personalRouter from "./routes/personalRoute.js";
import educationRouter from "./routes/EducationRouter.js";
import docsRouter from "./routes/docsRouter.js";
import addressRouter from "./routes/addressRouter.js";
import connectCloudinary from "./config/cloudinary.config.js"
import recruiterRouter from "./routes/recruiter.route.js";
const app = express();
app.use(cookieParser());
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true, limit: '5mb' }));
app.use(helmet());
app.use(cors({origin: "https://scholar-ship-app-frontend.vercel.app",credentials:true}));
app.use(morgan("dev"));

connectCloudinary();
connectDb();

// API Routing
app.get("/", (req, res) => {
    res.send("API Working");
})


app.use("/api/user",userRouter);
app.use("/api/scholarship",scholarshipRouter);
app.use("/api/personal",personalRouter);
app.use("/api/education", educationRouter);
app.use("/api/docs", docsRouter);
app.use("/api/address",addressRouter);
app.use("/api/recruiter", recruiterRouter);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} (${process.env.PORT || "default 8000"})`));