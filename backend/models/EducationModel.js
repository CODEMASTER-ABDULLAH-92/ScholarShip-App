import mongoose from "mongoose";
const educationSchema = new mongoose.Schema({
    // Mataric
    userId:{type:mongoose.Schema.Types.ObjectId, ref:"user"},
    degreeLevel:{type:String, required:true},
    schoolName:{type:String, required:true},
    degreeDiscipline:{type:String, required:true},
    obtainedMarks:{type:String, required:true},
    totalMarks:{type:String, required:true},
    percentage:{type:String, required:true},
    
    
    // college
    
    collegedegreeLevel:{type:String, required:true},
    collegesName:{type:String, required:true},
    collegeDegreeDiscipline:{type:String, required:true},
    collegeObtainedMarks:{type:String, required:true},
    collegeTotalMarks:{type:String, required:true},
    collegePercentage:{type:String, required:true},
    
    
    // university

    universityDegreeLevel:{type:String, required:true},
    universityName:{type:String, required:true},
    universityCurrentSemeter:{type:String, required:true},
    universityDegreeDiscipline:{type:String, required:true},
    universityObtainedCGPA:{type:String, required:true},
    universityTotalCGPA:{type:String, required:true},
    universityPercentage:{type:String, required:true},

},{timestamps:true});

const eductionModel = mongoose.models.eduction || mongoose.model("education",educationSchema);
export default eductionModel;