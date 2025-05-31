import eductionModel from "../models/EducationModel.js";

const addEducation = async (req, res) => {
    try {
        const {
            degreeLevel,
            schoolName,
            degreeDiscipline,
            obtainedMarks, // Note: Frontend uses "ontainedMarks" - needs consistency
            totalMarks,
            percentage,
            collegedegreeLevel,
            collegesName,
            collegeDegreeDiscipline,
            collegeObtainedMarks, // Note: Frontend uses "collegeOntainedMarks"
            collegeTotalMarks,
            collegePercentage,
            universityDegreeLevel,
            universityName,
            universityCurrentSemeter,
            universityDegreeDiscipline,
            universityObtainedCGPA, // Note: Frontend uses "universityOntainedCGPA"
            universityTotalCGPA,
            universityPercentage
        } = req.body;

        const education = new eductionModel({
            // School Education
            degreeLevel,
            schoolName,
            degreeDiscipline,
            obtainedMarks,
            totalMarks,
            percentage,

            // College Education
            collegedegreeLevel,
            collegesName,
            collegeDegreeDiscipline,
            collegeObtainedMarks,
            collegeTotalMarks,
            collegePercentage,

            // University Education
            universityDegreeLevel,
            universityName,
            universityCurrentSemeter,
            universityDegreeDiscipline,
            universityObtainedCGPA,
            universityTotalCGPA,
            universityPercentage
        });

        await education.save();
        
        res.status(201).json({
            success: true,
            message: "Education added successfully",
            education
        });

    } catch (error) {
        console.error("Error in adding education:", error);
        res.status(500).json({
            success: false,
            message: "Error in adding education",
            error: error.message // Include error message in response for debugging
        });
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