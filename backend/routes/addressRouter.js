import express from 'express'
import multer from "multer";
import {addAddress,getAddress,singleAddress,updateAddress} from "../controllers/AddressControllers.js"
import verifyToken from '../middleware/authMiddleware.js';
const upload = multer(); // for parsing `multipart/form-data` without file uploads
const addressRouter = express.Router();


addressRouter.post("/add-address", verifyToken, upload.none(), addAddress);
addressRouter.get("/get-address",getAddress);
addressRouter.put("/update-address/:id",updateAddress);
addressRouter.get("/single-address/:id",verifyToken,singleAddress);
export default addressRouter;



