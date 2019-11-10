var express = require('express');
var router = express.Router();


// controllers
const CourseController = require('../controllers/courses');


/* GET and POST  all bootcamp listing. */
router.route('/').get(CourseController.getAllCourses);


module.exports = router;