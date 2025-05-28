import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    country:{type:String},
    province:{type:String},
    district:{type:String},
    city:{type:String},
    fullAddress:{type:String},
},{timestamps:true});

const addressModel = mongoose.models.address || mongoose.model("address", addressSchema);

export default addressModel;