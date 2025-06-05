import express from 'express'
import {addDocs,getDocs,updateDocs,getSingleDocs} from "../controllers/DocsControllers.js";
const docsRouter = express.Router();
import upload from "../config/multer.js";
import verifyToken from '../middleware/authMiddleware.js';

// Keep your router as is, since it matches the corrected frontend:
docsRouter.post("/add-docs", upload.fields([
  { name: "cnicFront", maxCount: 1 },
  { name: "cnicBack", maxCount: 1 },
  { name: "affidavit", maxCount: 1 },
  { name: "domicle", maxCount: 1 },
  { name: "undergrateTranscript", maxCount: 1 }
]), verifyToken, addDocs);
docsRouter.get("/get-docs",getDocs);
docsRouter.get("/get-single-docs/:id",verifyToken,getSingleDocs);
docsRouter.put("/update-docs",updateDocs);

export default docsRouter;