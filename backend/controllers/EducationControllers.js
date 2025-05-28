import eductionModel from "../models/EducationModel.js";

const addEducation = async (req,res) => {
    try {
        const {degreeLevel,schoolName,degreeDiscipline,obtainedMarks,totalMarks,percentage,collegedegreeLevel,collegesName,collegeDegreeDiscipline,collegeOntainedMarks,collegeTotalMarks,collegePercentage,universityDegreeLevel,universityName,universityCurrentSemeter,universityDegreeDiscipline,universityOntainedCGPA,universityTotalCGPA,universityPercentage} = req.body;
        const education = new eductionModel({
            degreeLevel,
            schoolName,
            degreeDiscipline,
            obtainedMarks,
            totalMarks,
            percentage,

            
            collegedegreeLevel,
            collegesName,
            collegeDegreeDiscipline,
            collegeOntainedMarks,
            collegeTotalMarks,
            collegePercentage,


            universityDegreeLevel,
            universityCurrentSemeter,
            universityDegreeDiscipline,
            universityOntainedCGPA,
            universityTotalCGPA,
            universityPercentage,
            universityDegreeDiscipline,
            universityName,
        })
        await education.save();
        res.json({success:true, message:"Education added successfully",education});

    } catch (error) {
     console.log("Err in adding education", error);
    res.json({success:false, message:"Err in adding education"})        
    }
}


const getEducation = async (req,res) =>{
    try {
        const data = await eductionModel.find({});
        res.json({success:true, message:"Education fetched successfully",data});
    } catch (error) {
        res.json({success:false, message:"Err in fetching education"});
    }
}


const updateEducation = async (req,res) => {
    try {
        const {degreeLevel,schoolName,degreeDiscipline,obtainedMarks,totalMarks,percentage,collegedegreeLevel,collegesName,collegeDegreeDiscipline,collegeOntainedMarks,collegeTotalMarks,collegePercentage,universityDegreeLevel,universityName,universityCurrentSemeter,universityDegreeDiscipline,universityOntainedCGPA,universityTotalCGPA,universityPercentage} = req.body;

        const education = await eductionModel.findByIdAndUpdate(req.params.id,{degreeLevel,schoolName,degreeDiscipline,obtainedMarks,totalMarks,percentage,collegedegreeLevel,collegesName,collegeDegreeDiscipline,collegeOntainedMarks,collegeTotalMarks,collegePercentage,universityDegreeLevel,universityName,universityCurrentSemeter,universityDegreeDiscipline,universityOntainedCGPA,universityTotalCGPA,universityPercentage},{new:true});

        res.json({success:true, message:"Education update successfully",education});
    } catch (error) {
        console.error("Err in updating education",error);
        res.json({success:false, message:"Err in updating education"});
    }
}

const singleEducation = async (req,res) =>{
    try {
        const data = await eductionModel.findById(req.params.id);
        res.json({success:true, message:"Education fetched successfully",data});
    } catch (error) {
        res.json({success:false, message:"Err in fetching education"});
    }
}

export {addEducation,getEducation,updateEducation,singleEducation};