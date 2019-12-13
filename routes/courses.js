var express = require('express');

// controllers
const CourseController = require('../controllers/courses');

const Course = require('../models/Course');
const advancedResults = require('../middleware/advancedResults')

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
    .post(CourseController.createCourse);

/* GET and POST  all bootcamp listing. */
router.route('/:id').get(CourseController.getOneCourse).put(CourseController.updateCourse).delete(CourseController.deleteCourse);



module.exports = router;