import mongoose from 'mongoose'

const personalSchema = new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId, ref:"user"},
    firstName:{type:String,required:true},
    lastName:{type:String,required:true},
    religion:{type:String,required:true},
    contactNumber:{type:String,required:true},
    // About current education
    // currentInStitute
    currentInstituteLevel:{type:String,required:true},
    dateOfAddmission:{type:String,required:true},
    programFaculty:{type:String,required:true},
    universityName:{type:String,required:true},
    profileImage:{type:Array,required:true},
    dateOfBirth:{type:String,required:true},
    domicle:{type:String,required:true},
    familyIncome:{type:String,required:true},
    passportNumber:{type:String,required:true},
},{timestamps:true})

const personalModel = mongoose.models.personalInfo || mongoose.model("personalInfo",personalSchema);

export default personalModel;