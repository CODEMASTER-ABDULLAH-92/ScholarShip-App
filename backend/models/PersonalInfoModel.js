import mongoose from 'mongoose'

const personalSchema = new mongoose.Schema({
    firstName:{type:String},
    lastName:{type:String},
    religion:{type:String},
    contactNumber:{type:String},
    // About current education
    // currentInStitute
    currentInstituteLevel:{type:String},
    dateOfAddmission:{type:String},
    programFaculty:{type:String},
    universityName:{type:String},
    profileImage:{type:Array},
    dateOfBirth:{type:String},
    domicle:{type:String},
    familyIncome:{type:String},
    passportNumber:{type:String},
},{timestamps:true})

const personalModel = mongoose.models.personalInfo || mongoose.model("personalInfo",personalSchema);

export default personalModel;