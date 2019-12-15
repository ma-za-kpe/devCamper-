var express = require('express');

// controllers
const CourseController = require('../controllers/courses');

const Course = require('../models/Course');
const advancedResults = require('../middleware/advancedResults')
const protect = require('../middleware/auth');

//merging params
const router = express.Router({
    mergeParams: true
});

/* GET and POST  all bootcamp listing. */
router.route('/')
    .get(advancedResults(Course, {
        path: 'bootcamp',
        select: 'name description'
    }), CourseController.getAllCourses)
    .post(protect, CourseController.createCourse);

/* GET and POST  all bootcamp listing. */
router.route('/:id').get(CourseController.getOneCourse).put(protect, CourseController.updateCourse).delete(protect, CourseController.deleteCourse);



module.exports = router;