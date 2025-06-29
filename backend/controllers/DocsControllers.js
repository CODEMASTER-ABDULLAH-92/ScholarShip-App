import docsModel from "../models/docsModel.js";
import cloudinary from 'cloudinary'

const addDocs = async (req, res) => {

    const { cnicFront, cnicBack, affidavit, domicle, undergrateTranscript } = req.files;

console.log("Uploaded files:", { cnicFront, cnicBack, affidavit, domicle, undergrateTranscript });

try {
    // Upload each file to Cloudinary separately
    const [cnicFrontUrl, cnicBackUrl, affidavitUrl, domicleUrl, undergrateTranscriptUrl] = await Promise.all([
        cloudinary.uploader.upload(cnicFront[0].path, { resource_type: "image" }),
        cloudinary.uploader.upload(cnicBack[0].path, { resource_type: "image" }),
        cloudinary.uploader.upload(affidavit[0].path, { resource_type: "image" }),
        cloudinary.uploader.upload(domicle[0].path, { resource_type: "image" }),
        cloudinary.uploader.upload(undergrateTranscript[0].path, { resource_type: "image" })
    ]);

    const docs = new docsModel({
        cnicFront: cnicFrontUrl.secure_url,
        cnicBack: cnicBackUrl.secure_url,
        affidavit: affidavitUrl.secure_url,
        domicle: domicleUrl.secure_url,
        undergrateTranscript: undergrateTranscriptUrl.secure_url
    });

    const newDoc = await docs.save();
    res.status(201).json({ success: true, data: newDoc });
} catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ success: false, message: "Upload failed", error });
}
};


const getDocs = async (req,res) =>{
    try {
        const getDocs = await docsModel.find({});
        res.json({success:true, message:"Docs Fetched Successfully", getDocs})
    } catch (error) {
        console.error("Errr in fetching Data");
        res.json({success:false, message:"Err in fetching Data"})
    }
}



const getSingleDocs = async (req, res) => {
    try {
      const userId = req.user?._id;
  
      if (!userId) {
        return res.status(401).json({ success: false, message: "Unauthorized: User ID not found" });
      }
  
      const data = await docsModel.findOne({ userId });
  
      if (!data) {
        return res.status(404).json({ success: false, message: "No document found" });
      }
  
      res.status(200).json({ success: true, message: "Docs fetched successfully", data });
    } catch (error) {
      console.error("Error fetching documents:", error);
      res.status(500).json({ success: false, message: "Error fetching data", error: error.message });
    }
  };
  

const updateDocs = async (req,res) =>{
    try {
        
    } catch (error) {
        
    }
}

export {addDocs,getDocs,updateDocs,getSingleDocs};