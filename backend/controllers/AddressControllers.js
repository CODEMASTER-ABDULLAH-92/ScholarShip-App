import addressModel from "../models/AddressModel.js";
const addAddress = async (req,res) => {
    try {
        const userId = req.user._id;
        console.log(userId);
        
        const {country,province,district,city,fullAddress} = req.body;
        const address = new addressModel({
            userId,
            country,
            province,
            district,
            city,
            fullAddress
        })
        await address.save();
        res.json({success:true, message:"Address added successfully",address})
    } catch (error) {
        res.json({success:false, message:"Err in adding address"});
        console.log("Err in adding address",error);
    }
}

const getAddress = async (req,res) => {
    try {
        const data = await addressModel.find({});
        res.json({success:true, message:"Address fetched successfully",data});
    } catch (error) {
        res.json({success:false, message:"Err in fetching address"});
        console.log("Err in fetching address",error);
    }
}


const updateAddress = async (req,res) => {
    try {
        const {country , province , district ,city , fullAddress} = req.body;
        const address = await addressModel.findByIdAndUpdate(req.params.id,{country,province,district,city,fullAddress})
        res.json({success:true, message:"Address updated successfully", address});
    } catch (error) {
        res.json({success:false, message:"Err in updating File"});
    }
}


const singleAddress = async (req,res) =>{
    try {
        const userId = req.user._id;
        const data = await addressModel.findOne({userId});
        const isCompleted = data.country && data.city && data.province && data.fullAddress && data.district;
        let status = isCompleted ? "Completed" : "Pending";
        res.json({success:true, message:"Address fetched successfully",data, status});
    } catch (error) {
        res.json({success:false,message:"Err in fetching address"});
    }
}
export {addAddress,getAddress,updateAddress,singleAddress};
