import express from 'express'
import {addAddress,getAddress,updateAddress} from "../controllers/AddressControllers.js"
const addressRouter = express.Router();

addressRouter.post("/add-address",addAddress);
addressRouter.get("/get-address",getAddress);
addressRouter.put("/update-address/:id",updateAddress);

export default addressRouter;