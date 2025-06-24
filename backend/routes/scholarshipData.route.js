import express from 'express'
import { addScholarShipDetails, listScholarShipDetails, removeScholarShipDetails, singleScholarData, updateScholarShipDetails } from '../controllers/scholarShipData.controllers.js';

import verifyRecruiterToken from "../middleware/recuriterMiddleware.js"

const scholarshipRouter = express.Router();

scholarshipRouter.post("/add-scholarShipDetails",verifyRecruiterToken,addScholarShipDetails);
scholarshipRouter.get("/get-single-scholar-info/:id",verifyRecruiterToken,singleScholarData);
scholarshipRouter.get("/list-scholarShipDetails",listScholarShipDetails);
scholarshipRouter.delete("/remove-scholarShipDetails/:id",removeScholarShipDetails);
scholarshipRouter.put("/update-scholarShipDetails/:id",updateScholarShipDetails);

export default scholarshipRouter;