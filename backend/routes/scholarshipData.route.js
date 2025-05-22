import express from 'express'
import { addScholarShipDetails, listScholarShipDetails, removeScholarShipDetails, updateScholarShipDetails } from '../controllers/scholarShipData.controllers.js';

const scholarshipRouter = express.Router();

scholarshipRouter.post("/add-scholarShipDetails",addScholarShipDetails);
scholarshipRouter.post("/remove-scholarShipDetails",removeScholarShipDetails);
scholarshipRouter.get("/list-scholarShipDetails",listScholarShipDetails);
scholarshipRouter.put("/update-scholarShipDetails",updateScholarShipDetails);

export default scholarshipRouter;