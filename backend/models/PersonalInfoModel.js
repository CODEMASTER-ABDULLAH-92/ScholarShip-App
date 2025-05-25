import mongoose from 'mongoose'

const personalSchema = new mongoose.Schema({
    firstName:{type:String},
    lastName:{type:String},
    religion:{type:String},
    contactNumber:{type:String},
    // About current education
    currentIN
},{timestamps:true})

const personalModel = mongoose.models.personalInfo || mongoose.model("personalInfo",personalSchema);

export default personalModel;