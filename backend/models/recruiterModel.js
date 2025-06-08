import mongoose from "mongoose"

const recruiterSchema = new mongoose.Schema({
    name:{type:String},
    company:{type:String},
    email:{type:String},
    password:{type:String},
},{timestamps:true})

const recruiterModel = mongoose.models.recruiter || mongoose.model("recruiter", recruiterSchema);
export default recruiterModel;