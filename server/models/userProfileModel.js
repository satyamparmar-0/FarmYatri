const mongoose = require("mongoose");

const userProfileSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  phone: {
    type: String,
    required: true,
    match: [/^[0-9]{10}$/, "Phone must be a valid 10-digit number"],
  },
  address: {
    street: { type: String },
    city: { type: String },
    state: { type: String },
    pincode: {
      type: String,
      match: [/^[0-9]{6}$/, "Pincode must be a valid 6-digit number"],
    },
  },

  // Farmer-specific details
  farmDetails: {
    farmName: { type: String },
    farmSize: { type: Number }, // acres/hectares
    cropTypes: [{ type: String }],
  },

  // Buyer-specific details
  buyerPreferences: {
    preferredCrops: [{ type: String }],
    bulkPurchase: { type: Boolean, default: false },
  },
}, { timestamps: true });

const UserProfile = mongoose.model("UserProfile", userProfileSchema);

module.exports = UserProfile;
