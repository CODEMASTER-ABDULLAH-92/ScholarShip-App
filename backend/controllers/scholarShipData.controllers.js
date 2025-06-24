import recruiterModel from "../models/recruiterModel.js";
import ScholarshipModel from "../models/ScholarModel.js";

const addScholarShipDetails = async (req, res) => {
  try {
    const {
      title,
      description,
      university,
      location,
      academicLevel,
      gpaRequirement,
      fieldsOfStudy,
      otherRequirements,
      benefitAmount,
      benefitRenewable,
      additionalBenefits,
      deadline,
    } = req.body;

    // ✅ Fix: Use req.recruiter instead of req.recruiterModel
    const data = new ScholarshipModel({
      title,
      recruiterId: req.recruiter._id,
      description,
      university,
      location,
      academicLevel,
      gpaRequirement,
      fieldsOfStudy,
      otherRequirements,
      benefitAmount,
      benefitRenewable,
      additionalBenefits,
      deadline,
    });

    await data.save();
    return res.json({ success: true, message: "Data Added", data });
  } catch (error) {
    console.error("Err in adding data", error);
    return res.json({ success: false, message: error.message });
  }
};


const updateScholarShipDetails = async (req, res) => {
  try {
    let {
      title,
      description,
      university,
      location,
      academicLevel,
      gpaRequirement,
      fieldsOfStudy,
      otherRequirements,
      benefitAmount,
      benefitRenewable,
      additionalBenefits,
      deadline,
    } = req.body;
    let data = await ScholarshipModel.findByIdAndUpdate(
      { _id: req.params.id },
      {
        title,
        description,
        university,
        location,
        academicLevel,
        gpaRequirement,
        fieldsOfStudy,
        otherRequirements,
        benefitAmount,
        benefitRenewable,
        additionalBenefits,
        deadline,
      },
      { new: true }
    );
    return res.json({ success: true, message: "Update the Date", data });
  } catch (error) {
    console.error("Err in updating  data", error);
    return res.json({ success: false, message: error.message });
  }
};

const listScholarShipDetails = async (req, res) => {
  try {
    const data = await ScholarshipModel.find({});
    return res.json({ success: true, message: "Listing all the data", data});
  } catch (error) {
    console.error("Err in Listing data", error);
    return res.json({ success: false, message: error.message });
  }
};

const removeScholarShipDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await ScholarshipModel.findByIdAndDelete(id);
    return res.json({ success: true, message: "Remove the data", data });
  } catch (error) {
    console.error("Err in removing data", error);
    return res.json({ success: false, message: error.message });
  }
};

const singleScholarData = async (req, res) => {
  try {
    if (!req.recruiter) {
      return res.status(401).json({ success: false, message: "Unauthorized: Recruiter not found" });
    }

    const recruiterId = req.recruiter._id;
    console.log("Recruiter ID:", recruiterId);

    const data = await ScholarshipModel.find({ recruiterId });
    console.log("Scholarship found:", data);

    res.json({ success: true, message: "Fetched", data });
  } catch (error) {
    console.error("Error in fetching scholarship:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


export {
  addScholarShipDetails,
  removeScholarShipDetails,
  listScholarShipDetails,
  updateScholarShipDetails,
  singleScholarData
};

// app.get('/delete/:id', async (req,res)=>{
//     let user = await userModel.findOneAndDelete({_id:req.params.id});
//     res.redirect('/read');
// })
// app.get('/edit/:id', async (req,res)=>{
//     let user = await userModel.findOne({_id: req.params.id})
//     res.render('edit',{user});
// })

// app.post('/update/:id',async (req,res)=>{
//     let {name,email,image} = req.body;
//     let user = await  userModel.findOneAndUpdate({_id: req.params.id},{name,email,image},{new:true})
//     //Here this user come to frontent in value field
//     res.redirect('/read')
// });
// app.get('/read',async (req,res)=>{
//     let user = await userModel.find();
//     res.render('read',{user})
// })

// app.listen(3000);
