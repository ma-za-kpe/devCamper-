var express = require('express');

//other reaource routers
const courseRouter = require('./courses');

var router = express.Router();

//re-route into other resources routers
router.use('/:bootcampId/courses', courseRouter);

// controllers
const BootcampController = require('../controllers/bootcamp.controller');

/*get bootcamps in a certain raduis */
router.route('/radius/:zipcode/:distance').get(BootcampController.getBootcampsInRadius);

/* GET and POST  all bootcamp listing. */
router.route('/').get(BootcampController.getAllBootcamps).post(BootcampController.createBootcamps);

/* GET bootcamp listing, UPDATE bootcamp listing, DELETE bootcamp listing. */
router.route('/:id').get(BootcampController.getOneBootcamps).put(BootcampController.updateBootcamps).delete(BootcampController.deleteBootcamps);

module.exports = router;