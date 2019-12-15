const express = require('express');

// controllers
const AuthController = require('../controllers/auth');

const router = express.Router();

const {
    protect
} = require('../middleware/auth');

router.use('/register', AuthController.registerUser);

// router.post('/login', login);
// router.get('/logout', logout);
// router.get('/me', protect, getMe);
// router.put('/updatedetails', protect, updateDetails);
// router.put('/updatepassword', protect, updatePassword);
// router.post('/forgotpassword', forgotPassword);
// router.put('/resetpassword/:resettoken', resetPassword);

module.exports = router;