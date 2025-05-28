import mongoose from 'mongoose'

const docsSchema = new mongoose.Schema({
    cnicFront:{type:Array},
    cnicBack:{type:Array},
    affidavit:{type:Array},
    domicle:{type:Array},
    undergrateTranscript:{type:Array},
},{timestamps:true});

const docsModel = mongoose.models.docs || mongoose.model("docs", docsSchema);

export default docsModel;