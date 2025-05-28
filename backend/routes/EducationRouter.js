import express from 'express'
import {addEducation,getEducation,updateEducation} from "../controllers/EducationControllers.js";
const educationRouter = express.Router();

educationRouter.post("/add-education",addEducation);
educationRouter.get("/get-education",getEducation);
educationRouter.put("/update-education/:id",updateEducation);

export default educationRouter;