const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false,
        minlength: 2,
        maxlength: 50
    },
    email : {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    role:{
        type: Number,
        default: 1, 
        enum: [1,2,3] // Only allow 1 (admin), 2 (user farmers), or 3 (Buyers)
    }
}, { timestamps: true })

const User = mongoose.model('User', userSchema);

module.exports = User;
