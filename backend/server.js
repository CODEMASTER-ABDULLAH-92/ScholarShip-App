import express from "express";
import "dotenv/config";  // No need for dotenv.config() since it's handled here
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import connectDb from "./db/db.js";
import userRouter from "./routes/userRoutes.js";
import scholarshipRouter from "./routes/scholarshipData.route.js";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(cors({origin: "http://localhost:5173",credentials:true}));
app.use(morgan("dev"));


connectDb();

// API Routing
app.get("/", (req, res) => {
    res.send("API Working");
})


app.use("/api/user",userRouter);
app.use("/api/scholarship",scholarshipRouter);



const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} (${process.env.PORT || "default 8000"})`));