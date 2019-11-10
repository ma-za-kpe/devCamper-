var express = require('express');

// controllers
const CourseController = require('../controllers/courses');

//merging perams
const router = express.Router({
    mergeParams: true
});

/* GET and POST  all bootcamp listing. */
router.route('/').get(CourseController.getAllCourses);

/* GET and POST  all bootcamp listing. */
router.route('/').get(CourseController.getOneCourse).post(CourseController);



module.exports = router;