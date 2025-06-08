import express from 'express'
import { addScholarShipDetails, listScholarShipDetails, removeScholarShipDetails, singleScholarData, updateScholarShipDetails } from '../controllers/scholarShipData.controllers.js';
import verifyRecuriterToken from '../middleware/recuriterMiddleware.js';

const scholarshipRouter = express.Router();

scholarshipRouter.post("/add-scholarShipDetails",addScholarShipDetails);
scholarshipRouter.get("/get-single-scholar-info/:id",verifyRecuriterToken,singleScholarData);
scholarshipRouter.get("/list-scholarShipDetails",listScholarShipDetails);
scholarshipRouter.delete("/remove-scholarShipDetails/:id",removeScholarShipDetails);
scholarshipRouter.put("/update-scholarShipDetails/:id",updateScholarShipDetails);

export default scholarshipRouter;