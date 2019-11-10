var express = require('express');

// controllers
const CourseController = require('../controllers/courses');

//merging params
const router = express.Router({
    mergeParams: true
});

/* GET and POST  all bootcamp listing. */
router.route('/').get(CourseController.getAllCourses).post(CourseController.createCourse);

/* GET and POST  all bootcamp listing. */
router.route('/:id').get(CourseController.getOneCourse).put(CourseController.updateCourse).delete(CourseController.deleteCourse);



module.exports = router;