import express from 'express'
import { addScholarShipDetails, listScholarShipDetails, removeScholarShipDetails, updateScholarShipDetails } from '../controllers/scholarShipData.controllers.js';

const scholarshipRouter = express.Router();

scholarshipRouter.post("/add-scholarShipDetails",addScholarShipDetails);
scholarshipRouter.get("/list-scholarShipDetails",listScholarShipDetails);
scholarshipRouter.delete("/remove-scholarShipDetails/:id",removeScholarShipDetails);
scholarshipRouter.put("/update-scholarShipDetails/:id",updateScholarShipDetails);

export default scholarshipRouter;