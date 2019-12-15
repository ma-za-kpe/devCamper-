// const crypto = require("crypto");
// const ErrorResponse = require("../utils/errorResponse");
// const sendEmail = require("../utils/sendEmail");
const asyncHandler = require('../middleware/aync');

const User = require("../models/User");

module.exports = {
    // @desc      Register user
    // @route     POST /api/v1/auth/register
    // @access    Public
    registerUser: asyncHandler(async (req, res, next) => {
        const {
            name,
            email,
            password,
            role
        } = req.body;

        // Create user
        const user = await User.create({
            name,
            email,
            password,
            role
        });

        // create token
        const token = user.getSignedJwtToken();

        res.status(200).json({
            success: true,
            token: token
        });

        // sendTokenResponse(user, 200, res);
    }),
    // @desc      Login user
    // @route     POST /api/v1/auth/login
    // @access    Public
    loginUser: asyncHandler(async (req, res, next) => {

        const {
            email,
            password
        } = req.body;

        // Validate emil & password
        if (!email || !password) {
            return next(new ErrorResponse('Please provide an email and password', 400));
        }

        // Check for user
        const user = await User.findOne({
            email
        }).select('+password');

        if (!user) {
            return next(new ErrorResponse('Invalid credentials', 401));
        }

        // Check if password matches
        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            return next(new ErrorResponse('Invalid credentials', 401));
        }

        // create token
        const token = user.getSignedJwtToken();

        res.status(200).json({
            success: true,
            token: token
        });

        // sendTokenResponse(user, 200, res);

    })
};