import ScholarshipModel from "../models/ScholarModel.js";
const addScholarShipDetails = async (req, res) => {
    try {

        const {title,description,university,location,academicLevel,gpaRequirement,fieldsOfStudy,otherRequirements,benefitAmount,benefitRenewable,additionalBenefits,deadline} = req.body;
    } catch (error) {
    }
};

const updateScholarShipDetails = async (req,res) => {
    try {
        
    } catch (error) {
        
    }
}
const listScholarShipDetails = async (req,res) => {
    try {
        
    } catch (error) {
        
    }
}

const removeScholarShipDetails = async (req,res) => {
    try {
        
    } catch (error) {
        
    }
}

export {addScholarShipDetails,removeScholarShipDetails,listScholarShipDetails,updateScholarShipDetails};