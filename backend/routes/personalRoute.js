import express from 'express'
import { addPersonalInfo, getPersonalInfo, updatePersonalInfo } from '../controllers/persoanlControllers.js';
import upload from '../config/multer.js';

const personalRouter = express.Router();
personalRouter.post("/add-personal-info",upload.array("profileImage",10),addPersonalInfo);
personalRouter.get("/get-personal-info",getPersonalInfo);
personalRouter.put("/update-personal-info/:id",upload.array("profileImage",10),updatePersonalInfo);

export default personalRouter;