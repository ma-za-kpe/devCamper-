const errorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/aync');

const Course = require("../models/Course");
const Bootcamp = require("../models/Bootcamp");

module.exports = {
    // @desc  Get all courses
    // @route  GET /api/v1/bootcamps
    // @route  GET /api/v1/bootcamps/:bootcampsId/courses
    // @access  Public
    getAllCourses: asyncHandler(async (req, res, next) => {

        if (req.params.bootcampId) {
            const courses = await Course.find({
                bootcamp: req.params.bootcampId
            });

            return res.status(200).json({
                success: true,
                count: courses.length,
                data: courses
            });
        } else {
            res.status(200).json(res.advancedResults);
        }

    }),

    // @desc  Get single course
    // @route  GET /api/v1/courses/id
    // @access  Public
    getOneCourse: asyncHandler(async (req, res, next) => {
        const course = await Course.findById(req.params.id).populate({
            path: 'bootcamp',
            select: 'name description'
        });

        if (!course) {
            return next(new errorResponse(`course not found with id of ${req.params.id}`, 400))
        }

        res.status(201).json({
            success: true,
            data: course
        });

    }),
    // @desc  Create Course
    // @route  POST /api/v1/bootcamps/:bootcampId/courses
    // @access  Private
    createCourse: asyncHandler(async (req, res, next) => {

        req.body.bootcamp = req.params.bootcampId;
        req.body.user = req.user.id;

        const bootcamp = await Bootcamp.findById(req.params.bootcampId);

        if (!bootcamp) {
            return next(
                new ErrorResponse(
                    `No bootcamp with the id of ${req.params.bootcampId}`,
                    404
                )
            );
        }

        // Make sure user is bootcamp owner
        if (bootcamp.user.toString() !== req.user.id && req.user.role !== 'admin') {
            return next(
                new errorResponse(
                    `User ${req.user.id} is not authorized to add a course to bootcamp ${bootcamp._id}`,
                    401
                )
            );
        }
        const course = await Course.create(req.body);

        res.status(201).json({
            success: true,
            msg: `Course created Successfully ...`,
            data: course
        });

    }),

    // @desc  Update course
    // @route  PUT /api/v1/courses/id
    // @access  Private
    updateCourse: asyncHandler(async (req, res, next) => {

        console.log("id is ........" + req.params.id)
        let course = await Course.findById(req.params.id);

        if (!course) {
            return next(
                new errorResponse(`No course with the id of ${req.params.id}`, 404)
            );
        }

        // Make sure user is course owner
        if (course.user.toString() !== req.user.id && req.user.role !== 'admin') {
            return next(
                new errorResponse(
                    `User ${req.user.id} is not authorized to update course ${course._id}`,
                    401
                )
            );
        }

        course = await Course.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!course) {
            return next(new errorResponse(`course not found with id of ${req.params.id}`, 400))
        }

        res.status(201).json({
            success: true,
            msg: `course Updated`,
            data: course
        });

    }),

    // @desc  Delete course
    // @route  DELETE /api/v1/courses/id
    // @access  Private
    deleteCourse: asyncHandler(async (req, res, next) => {

        console.log("id is ........" + req.params.id)
        const course = await Course.findById(req.params.id);

        if (!course) {
            return next(
                new errorResponse(`No course with the id of ${req.params.id}`, 404)
            );
        }

        // Make sure user is course owner
        if (course.user.toString() !== req.user.id && req.user.role !== 'admin') {
            return next(
                new errorResponse(
                    `User ${req.user.id} is not authorized to delete course ${course._id}`,
                    401
                )
            );
        }

        await course.remove();

        res.status(201).json({
            success: true,
            msg: `course Deleted`,
            data: {}
        });


    })

};