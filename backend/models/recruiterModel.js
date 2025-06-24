import mongoose from "mongoose"

const recruiterSchema = new mongoose.Schema({
    name:{type:String, require:true},
    company:{type:String, require:true},
    email:{type:String, require:true},
    password:{type:String, require:true},
},{timestamps:true})

const recruiterModel = mongoose.models.recruiter || mongoose.model("recruiter", recruiterSchema);
export default recruiterModel;