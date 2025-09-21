const User = require("../../../models/userModel");
const { userRole } = require("../../../helper/constant");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const logger = require("../../../logger");
const UserResponse = require("../../../responses/userResponse");
const UserProfile = require("../../../models/userProfileModel");

// Register a new user

module.exports.registerUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }

    const { name, email, password, role } = req.body;

    // Check if user already exists than update the user
    let user = await User.findOne({ email });
    if (user) {
      logger.info("***registerUser*** - User already exists", { email: user.email });
      const matchPassword = await bcrypt.compare(password, user.password);
      if(matchPassword){
        user.name = user.name || name;
        user.password = user.password || bcrypt.hashSync(password, 10);
        user.role = user.role || role;
        await user.save();
        return res.status(200).json({ message: "User updated successfully" });
      }
      else {
        return res.status(200).json({ message: "User Already exist" });
      }
    }

    // Create new user
    user = new User({
      name,
      email,
      password: bcrypt.hashSync(password, 10), // Hash the password
      role: role || userRole.USER, // Default to USER if no role is provided,
    });

    userProfileSave = new UserProfile({
      user_id: user._id,
      gender: null,
      address: {},
      farmDetails: {},
      buyerPreferences: {}
    });

    await userProfileSave.save();
    await user.save();

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    const userResponse = new UserResponse(user, token);
    logger.info("User registered successfully", userResponse);
    res.status(201).json({ message: "User registered successfully", user: userResponse });
  } catch (err) {
    logger.error(
      "******##### Error in registerUser controller #####******",
      err
    );
    res.status(500).json({ message: "Internal Server error" });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      logger.info("User not found", { email });
      return res.status(404).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      logger.info("Invalid Password", { email });
      return res.status(400).json({ message: "Invalid Password" });
    }
    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    const userResponse = new UserResponse(user, token);

    logger.info("User logged in successfully", { username: user.name });
    res
      .status(200)
      .json({
        message: "User logged in successfully",
        token,
        user: userResponse,
      });
  } catch (err) {
    console.log(err);
    logger.error("******##### Error in loginUser controller #####******", err);
    res.status(500).json({ message: "Internal Server error" });
  }
};

exports.userProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    const userProfile = await UserProfile.findOne({ user_id: userId });
    if (!user) {
      return res.status(200).json({
        status: false,
        message: "User not Found",
      });
    }
    const fullProfile = {
      ...user.toObject(),
      ...(userProfile ? userProfile.toObject() : {}),
    };
    logger.info("---***userProfile Successfull***---");
    res.status(200).json({
      status: true,
      data: new UserResponse(fullProfile),
    });
    // console.log(userProfile);
    // const data = new UserResponse(fullProfile);
    // console.log(data);
  } catch (err) {
    logger.error("---***Error while userProfile Controller---***", err);
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
};

exports.editProfileUser = async (req, res) => {
  try{
    const userId = req.user._id;
    const { name, email, password, gender, address, farmDetails, phone } = req.body;

    // Find user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(200).json({ status: false, message: "User not found" });
    }

    // Update user fields
    user.name = name || user.name;
    user.email = email || user.email;

    if (password) {
      user.password = bcrypt.hashSync(password, 10);
    }

    await user.save();

    const userProfile = await UserProfile.findOne({ user_id: userId });
    // console.log(userProfile);
    // Update user profile fields
    if(!userProfile){
      const newUserProfile = new UserProfile({
        user_id: userId,
        gender,
        address,
        farmDetails,
        phone
      });
      await newUserProfile.save();
      logger.info("User profile created successfully", { userId });
      return res.status(200).json({ status: true, message: "User profile created successfully", data: new UserResponse(user) });
    }
    
    userProfile.gender = gender || userProfile.gender;
    userProfile.address = address || userProfile.address;
    userProfile.farmDetails = farmDetails || userProfile.farmDetails;
    userProfile.phone = phone || userProfile.phone;
    await userProfile.save();
    // console.log(userProfile);
    logger.info("User profile updated successfully", { userId });
    res.status(200).json({ status: true, message: "User profile updated successfully", data: new UserResponse(user) });
  }
  catch(err){
    logger.info("*** Error in editProfileUser controller***", err);
    res.status(500).json({status:false, message: "Internal Server Error" });
  }
};
