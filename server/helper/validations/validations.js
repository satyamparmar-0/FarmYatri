// validations/userValidation.js
const { body } = require("express-validator");

exports.registerUserValidation = [
  body("email")
    .isEmail().withMessage("Please provide a valid email"),

  body("password")
    .isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),

  body("role")
    .optional()
    .isIn([1, 2, 3]).withMessage("Invalid role. Allowed values: 1 (Admin), 2 (Farmer), 3 (Buyer)"),
];

exports.loginUserValidation = [
  body("email")
    .isEmail().withMessage("Please provide a valid email"),

  body("password")
    .notEmpty().withMessage("Password is required"),
];

exports.createUserProfileValidation = [
  body("user_id")
    .notEmpty().withMessage("User ID is required"),

  body("name")
    .notEmpty().withMessage("Name is required")
    .isLength({ min: 3, max: 50 }).withMessage("Name must be between 3 and 50 characters"),

  body("phone")
    .notEmpty().withMessage("Phone is required")
    .matches(/^[0-9]{10}$/).withMessage("Phone must be a valid 10-digit number"),

  body("address.pincode")
    .optional()
    .matches(/^[0-9]{6}$/).withMessage("Pincode must be a valid 6-digit number"),

  // Farmer-specific
  body("farmDetails.farmSize")
    .optional()
    .isNumeric().withMessage("Farm size must be a number"),

  body("farmDetails.cropTypes")
    .optional()
    .isArray().withMessage("Crop types must be an array"),

  // Buyer-specific
  body("buyerPreferences.preferredCrops")
    .optional()
    .isArray().withMessage("Preferred crops must be an array"),

  body("buyerPreferences.bulkPurchase")
    .optional()
    .isBoolean().withMessage("Bulk purchase must be true or false"),
];