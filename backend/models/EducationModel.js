import mongoose from "mongoose";
const educationSchema = new mongoose.Schema({
    // Mataric
    userId:{type:mongoose.Schema.Types.ObjectId, ref:"user"},
    degreeLevel:{type:String},
    schoolName:{type:String},
    degreeDiscipline:{type:String},
    ontainedMarks:{type:String},
    totalMarks:{type:String},
    percentage:{type:String},
    
    
    // college
    
    collegedegreeLevel:{type:String},
    collegesName:{type:String},
    collegeDegreeDiscipline:{type:String},
    collegeOntainedMarks:{type:String},
    collegeTotalMarks:{type:String},
    collegePercentage:{type:String},
    
    
    // university

    universityDegreeLevel:{type:String},
    universityName:{type:String},
    universityCurrentSemeter:{type:String},
    universityDegreeDiscipline:{type:String},
    universityOntainedCGPA:{type:String},
    universityTotalCGPA:{type:String},
    universityPercentage:{type:String},

},{timestamps:true});

const eductionModel = mongoose.models.eduction || mongoose.model("education",educationSchema);
export default eductionModel;