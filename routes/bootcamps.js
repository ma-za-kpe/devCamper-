var express = require('express');
var router = express.Router();

// controllers
const BootcampController = require('../controllers/bootcamp.controller');

/* GET and POST  all bootcamp listing. */
router.route('/').get(BootcampController.getAllBootcamps).post(BootcampController.createBootcamps);

/* GET bootcamp listing, UPDATE bootcamp listing, DELETE bootcamp listing. */
router.route('/:id').get(BootcampController.getOneBootcamps).put(BootcampController.updateBootcamps).delete(BootcampController.deleteBootcamps);

module.exports = router;