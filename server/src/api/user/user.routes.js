const express = require("express");
const router = express.Router();
const { registerUser, loginUser, userProfile } = require("./user.controllers");
const {authenticateUser} = require('../../../helper/middlewares/user.auth');
const {registerUserValidation, loginUserValidation} = require("../../../helper/validations/validations");

// Import validation middleware

router.post('/register', registerUserValidation, registerUser);
router.post('/login', loginUserValidation, loginUser);
router.post('/user-profile',authenticateUser, userProfile);
module.exports = router;
