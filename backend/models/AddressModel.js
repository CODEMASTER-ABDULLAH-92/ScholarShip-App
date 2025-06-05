import mongoose, { Types } from "mongoose";

const addressSchema = new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId, ref:"user"},
    country:{type:String,required:true},
    province:{type:String,required:true},
    district:{type:String,required:true},
    city:{type:String,required:true},
    fullAddress:{type:String,required:true},
},{timestamps:true});

const addressModel = mongoose.models.address || mongoose.model("address", addressSchema);

export default addressModel;