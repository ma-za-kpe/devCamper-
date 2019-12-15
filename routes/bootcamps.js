var express = require('express');

//other reaource routers
const courseRouter = require('./courses');

const Bootcamp = require('../models/Bootcamp');
const advancedResults = require('../middleware/advancedResults');
const ProtectionController = require('../middleware/auth');

var router = express.Router();

//re-route into other resources routers
router.use('/:bootcampId/courses', courseRouter);

// controllers
const BootcampController = require('../controllers/bootcamp.controller');

/*get bootcamps in a certain raduis */
router.route('/radius/:zipcode/:distance').get(BootcampController.getBootcampsInRadius);

/* GET and POST  all bootcamp listing. */
router.route('/').get(advancedResults(Bootcamp, 'courses'), BootcampController.getAllBootcamps).post(ProtectionController.protect, ProtectionController.authorize("publisher", "admin"), BootcampController.createBootcamps);

/* GET bootcamp listing, UPDATE bootcamp listing, DELETE bootcamp listing. */
router.route('/:id').get(BootcampController.getOneBootcamps).put(ProtectionController.protect, ProtectionController.authorize("publisher", "admin"), BootcampController.updateBootcamps).delete(ProtectionController.protect, ProtectionController.authorize("publisher", "admin"), BootcampController.deleteBootcamps);

/* upload photo */
router.route('/:id/photo').put(ProtectionController.protect, ProtectionController.authorize("publisher", "admin"), BootcampController.bootcampPhotoUpload);
module.exports = router;