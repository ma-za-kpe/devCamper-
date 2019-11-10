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

    })
};