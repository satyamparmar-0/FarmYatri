const mongoose = require('mongoose');

const farmerKycSchema = new mongoose.Schema({
    farmerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },
    aadharNumber: {
        type: String,
        required: false
    },
    panNumber: {
        type: String,
        required: false
    },
    bankName : {
        type:String,
        required: false
    },
    bankAccountNumber: {
        type: String,
        required: false
    },
    ifscCode: {
        type: String,
        required: false
    },
    kycStatus: {
        type: Number,
        enum: [0, 1, 2], // 0 for pending, 1 for approved, 2 for rejected
        default: 0
    }
}, { timestamps: true });

const FarmerKyc = mongoose.model('FarmerKyc', farmerKycSchema);

module.exports = FarmerKyc;