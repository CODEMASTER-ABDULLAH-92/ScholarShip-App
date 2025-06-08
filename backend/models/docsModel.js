import mongoose from 'mongoose';

const docsSchema = new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId, ref:"user"},
    cnicFront: {
        type: String, // Stores file path or URL
        required: true
    },
    cnicBack: {
        type: String,
        required: true
    },
    affidavit: {
        type: String, // Not required if it's optional
        required: true
    
    },
    domicle: { // Note: Consider renaming to "domicile" for correct spelling
        type: String,
        required: true

    },
    undergrateTranscript: { // Note: Consider renaming to "undergraduateTranscript"
        type: String,
        required: true
    }
}, { timestamps: true });

// Improved model export with better practice
const DocsModel = mongoose.models.Docs || mongoose.model('Docs', docsSchema);

export default DocsModel;