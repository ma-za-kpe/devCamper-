var express = require('express');
var router = express.Router();

// controllers
const CourseController = require('../controllers/courses');

//merging perams
const router = express.Router({
    mergeParams: true
});

/* GET and POST  all bootcamp listing. */
router.route('/').get(CourseController.getAllCourses);


module.exports = router;