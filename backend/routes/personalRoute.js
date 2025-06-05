import express from 'express'
import { addPersonalInfo, getPersonalInfo, updatePersonalInfo,singlePersonInfo } from '../controllers/persoanlControllers.js';
import upload from '../config/multer.js';
import verifyToken from '../middleware/authMiddleware.js';

const personalRouter = express.Router();
personalRouter.post("/add-personal-info",upload.array("profileImage",10),verifyToken,addPersonalInfo);
personalRouter.get("/get-personal-info",getPersonalInfo);
personalRouter.get("/get-single-personal-info/:id",verifyToken,singlePersonInfo);
personalRouter.put("/update-personal-info/:id",upload.array("profileImage",10),updatePersonalInfo);

export default personalRouter;