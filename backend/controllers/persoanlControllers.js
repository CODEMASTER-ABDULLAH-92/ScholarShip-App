import personalModel from "../models/PersonalInfoModel.js";
import cloudinary from "cloudinary";


const addPersonalInfo = async (req, res) => {
  try {
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

const singlePersonInfo = async (req,res) =>{
  try {
    const data = await personalModel.findById(req.params.id);
    res.json({success:true, message:"Getting Data Successfully",data})
  } catch (error) {
    res.json({success:false, message:"Err in Getting Data"})
    console.error("Err in Getting Data",error)
  }
}


export { addPersonalInfo, getPersonalInfo, updatePersonalInfo,singlePersonInfo };
