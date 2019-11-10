const errorResponse = require('../utils/errorResponse');
const geocoder = require('../utils/geocoder');
const asyncHandler = require('../middleware/aync');

const Course = require("../models/Course");

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
    // @route  GET /api/v1/course/id
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
    // @route  POST /api/v1//:bootcampId/courses
    // @access  Private
    createCourse: asyncHandler(async (req, res, next) => {

        req.body.bootcamp = req.params.bootcampId;

        const bootcamp = await Course.findById(req.params.bootcampId);

        if (!bootcamp) {
            return next(new errorResponse(`course not found with id of ${req.params.id}`, 400))
        }

        const course = await Course.create(req.body);

        res.status(201).json({
            success: true,
            msg: `Course created Successfully ...`,
            data: course
        });

    }),

};