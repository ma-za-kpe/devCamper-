const express = require('express');

// controllers
const AuthController = require('../controllers/auth');
const Protection = require('../middleware/auth')

const router = express.Router();

// const {
//     protect
// } = require('../middleware/auth');

router.use('/register', AuthController.registerUser);

router.post('/login', AuthController.loginUser);
// router.get('/logout', logout);
router.get('/me', Protection.protect, AuthController.getMe);
// router.put('/updatedetails', protect, updateDetails);
// router.put('/updatepassword', protect, updatePassword);
// router.post('/forgotpassword', forgotPassword);
// router.put('/resetpassword/:resettoken', resetPassword);

module.exports = router;