import mongoose from "mongoose";

const scholarshipSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  university: { type: String, required: true },
  location: { type: String, required: true },
  academicLevel: { type: Array, required: true },
  gpaRequirement: { type: Number, required: true },
  fieldsOfStudy: { type: Array, required: true },
  otherRequirements: { type: String, required: true },
  benefitAmount: { type: Number, required: true },
  benefitRenewable: { type: Boolean, required: true },
  additionalBenefits: { type: String, required: true },
  deadline: { type: Date, required: true },
  termsAndConditions: { type: String, required: true }
}, { timestamps: true });
const ScholarshipModel = mongoose.model("Scholarship", scholarshipSchema);

export default ScholarshipModel;
