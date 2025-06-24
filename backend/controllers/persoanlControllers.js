import personalModel from "../models/PersonalInfoModel.js";
import cloudinary from "cloudinary";


const addPersonalInfo = async (req, res) => {
  try {
    const userId = req.user._id;
    const {
      firstName,
      lastName,
      religion,
      contactNumber,
      currentInstituteLevel,
      dateOfAddmission,
      programFaculty,
      universityName,
      dateOfBirth,
      domicle,
      familyIncome,
      passportNumber,
    } = req.body;

    const files = req.files || [];

    if (files.length === 0) {
      return res.json({ success: false, message: "Profile Image is Required" });
    }
    
    console.log("Uploaded files:", files);
    const imagesUrl = await Promise.all(
      files.map(async (item) => {
        const result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    const personalInfo = new personalModel({
      userId,
      firstName,
      lastName,
      religion,
      contactNumber,
      currentInstituteLevel,
      dateOfAddmission,
      programFaculty,
      universityName,
      profileImage: imagesUrl, // first image only
      dateOfBirth,
      domicle,
      familyIncome,
      passportNumber,
    });

    await personalInfo.save();

    res.json({
      success: true,
      message: "Personal info added successfully",
      personalInfo,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPersonalInfo = async (req, res) => {
  try {
    const data = await personalModel.find({});
    res.json({ success: true, message: "Getting Data Successfully", data });
  } catch (error) {
    res.json({ success: false, message: "Err in Getting Data" });
    console.error("Err in Getting Info", error);
  }
};

const updatePersonalInfo = async (req, res) => {
    console.log("REQ.BODY:", req.body);
  try {
    const {
      firstName,lastName,religion,contactNumber,currentInstituteLevel,dateOfAddmission,programFaculty,universityName,dateOfBirth,domicle,familyIncome,passportNumber,profileImage} = req.body;

    let data = await personalModel.findByIdAndUpdate(
      { _id: req.params.id },
      {
        firstName,
        lastName,
        religion,
        contactNumber,
        currentInstituteLevel,
        dateOfAddmission,
        programFaculty,
        universityName,
        dateOfBirth,
        domicle,
        familyIncome,
        passportNumber,
        profileImage,
      },
      { new: true }
    );
    return res.json({ success: true, message: "Update the Date", data });
  } catch (error) {
    console.error("Err in Updating Info", error);
    return res.json({ success: false, message: "Err in Updating Info" });
  }
};

const singlePersonInfo = async (req, res) => {
  let status = "Pending"; // Default

  try {
    const userId = req.user._id;
    const data = await personalModel.findOne({ userId });

    const isComplete = 
      data?.firstName &&
      data?.lastName &&
      data?.religion &&
      data?.contactNumber &&
      data?.currentInstituteLevel &&
      data?.dateOfAddmission &&
      data?.programFaculty &&
      data?.universityName &&
      data?.dateOfBirth &&
      data?.domicle &&
      data?.familyIncome &&
      data?.passportNumber;

    status = isComplete ? "Completed" : "Pending";
    res.json({ success: true, message: "Getting Data Successfully!", data, status });
  } catch (error) {
    console.error("Error in Getting Data", error);
    res.json({ success: false, message: "Error in Getting Data", data: null, status });
  }
};




export { addPersonalInfo, getPersonalInfo, updatePersonalInfo,singlePersonInfo };
