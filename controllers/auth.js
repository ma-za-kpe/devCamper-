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

        res.status(200).json({
            success: true
        });

        // sendTokenResponse(user, 200, res);
    })
};