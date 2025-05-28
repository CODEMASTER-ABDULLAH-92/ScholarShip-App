import express from 'express'
import {addDocs,getDocs,updateDocs} from "../controllers/DocsControllers.js";
const docsRouter = express.Router();
import upload from "../config/multer.js";

docsRouter.post("/add-docs",upload.fields([
    { name: "cnicFront", maxCount: 1 },
    { name: "cnicBack", maxCount: 1 },
    { name: "affidavit", maxCount: 1 },
    { name: "domicle", maxCount: 1 },
    { name: "undergrateTranscript", maxCount: 1 }
  ])
  ,addDocs);
docsRouter.get("/get-docs",getDocs);
docsRouter.put("/update-docs",updateDocs);

export default docsRouter;
