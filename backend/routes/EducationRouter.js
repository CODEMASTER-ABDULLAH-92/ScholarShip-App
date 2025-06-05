import express from 'express'
import {addEducation,getEducation,updateEducation,singleEducation} from "../controllers/EducationControllers.js";
import multer from 'multer';
import verifyToken from '../middleware/authMiddleware.js';
const educationRouter = express.Router();
const upload = multer();
educationRouter.post("/add-education",verifyToken,upload.none(),addEducation);
educationRouter.get("/get-education",getEducation);
educationRouter.get("/single-education/:id",verifyToken,singleEducation);
educationRouter.put("/update-education/:id",updateEducation);

export default educationRouter;