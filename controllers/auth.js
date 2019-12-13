const crypto = require('crypto');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const sendEmail = require('../utils/sendEmail');
const User = require('../models/User');

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

        sendTokenResponse(user, 200, res);
    }),
}