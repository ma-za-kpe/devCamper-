const express = require('express');

const Review = require('../models/Reviews');

const router = express.Router({
    mergeParams: true
});

//other reaource routers
const courseRouter = require('./courses');

const advancedResults = require('../middleware/advancedResults');
const ProtectionController = require('../middleware/auth');

//controllers
const ReviewController = require('../controllers/reviews');

router
    .route('/')
    .get(
        advancedResults(Review, {
            path: 'bootcamp',
            select: 'name description'
        }),
        ReviewController.getReviews
    )
//     .post(ProtectionController.protect, ProtectionController.authorize('user', 'admin'), addReview);

// router
//     .route('/:id')
//     .get(getReview)
//     .put(ProtectionController.protect, ProtectionController.authorize('user', 'admin'), updateReview)
//     .delete(ProtectionController.protect, ProtectionController.authorize('user', 'admin'), deleteReview);

module.exports = router;