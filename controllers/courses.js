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

        let query;

        if (req.params.bootcampId) {
            query = Course.find({
                bootcamp: req.params.bootcampId
            });
        } else {
            query = Course.find().populate({
                path: 'bootcamp',
                select: 'name description'
            });
        }

        const courses = await query;

        res.status(201).json({
            success: true,
            msg: `all courses`,
            count: courses.length,
            data: courses
        });

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

        const bootcamp = await Bootcamp.findById(req.params.bootcampId);

        if (!bootcamp) {
            return next(new errorResponse(`bootcamp not found with id of ${req.params.bootcampId}`, 400))
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

        const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
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

        const course = await Course.findById(req.params.id, req.body);

        if (!course) {
            return next(new errorResponse(`course not found with id of ${req.params.id}`, 400))
        }

        course.remove();

        res.status(201).json({
            success: true,
            msg: `course Deleted`,
            data: {}
        });


    })

};