import mongoose from "mongoose";

const scholarshipSchema = new mongoose.Schema({
  title: { type: String },
  description: { type: String },
  university: { type: String },
  location: { type: String },
  academicLevel: { type: Array },
  gpaRequirement: { type: Number },
  fieldsOfStudy: { type: Array },
  otherRequirements: { type: String },
  benefitAmount: { type: Number },
  benefitRenewable: { type: Boolean },
  additionalBenefits: { type: String },
  deadline: { type: Date },
  termsAndConditions: { type: String }
}, { timestamps: true });
const ScholarshipModel = mongoose.model("Scholarship", scholarshipSchema);

export default ScholarshipModel;
