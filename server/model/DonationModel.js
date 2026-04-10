import mongoose from 'mongoose';

const DonationSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    donortype: { type: String, required: true },
    organ: { type: String },
    image: { type: String },
    description: { type: String },
    upiid: { type: String },
}, { timestamps: true });

const DonationModel = mongoose.model("Donation", DonationSchema);

export default DonationModel;
