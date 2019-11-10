const errorResponse = require('../utils/errorResponse');
const geocoder = require('../utils/geocoder');
const asyncHandler = require('../middleware/aync');

const Bootcamp = require("../models/Bootcamp");

module.exports = {
    // @desc  Get all bootcamps
    // @route  GET /api/v1/bootcamps
    // @access  Public
    getAllBootcamps: asyncHandler(async (req, res) => {

        let query;

        //coppy req.query
        const reqQuery = {
            ...req.query
        };

        //fields to exclude
        const removeFields = ['select']

        //loop over removeFields and delete them from the req   q   uery
        removeFields.forEach(param => reqQuery[param]);

        console.log(reqQuery)

        //create query string
        let queryStr = JSON.stringify(reqQuery);

        //create operators
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

        //finding resource
        query = Bootcamp.find(JSON.parse(queryStr));

        // select fields
        if (req.query.select) {
            const fields = req.query.select.split(',').join(' ')
            query = query.select(fields)
        }

        //excecuting query
        const bootcamp = await query;
        res.status(201).json({
            success: true,
            msg: `Bootcamp created`,
            count: bootcamp.length,
            data: bootcamp
        });

    }),

    // @desc  Get single bootcamps
    // @route  GET /api/v1/bootcamps/id
    // @access  Public
    getOneBootcamps: asyncHandler(async (req, res, next) => {
        const bootcamp = await Bootcamp.findById(req.params.id);

        if (!bootcamp) {
            return next(new errorResponse(`Bootcamp not found with id of ${req.params.id}`, 400))
        }

        res.status(201).json({
            success: true,
            msg: `Bootcamp created`,
            data: bootcamp
        });

    }),

    // @desc  Create bootcamp
    // @route  POST /api/v1/bootcamps
    // @access  Private
    createBootcamps: asyncHandler(async (req, res) => {

        const bootcamp = await Bootcamp.create(req.body);

        res.status(201).json({
            success: true,
            msg: `Bootcamp created Successfully ...s`,
            data: bootcamp
        });

    }),

    // @desc  Update bootcamp
    // @route  PUT /api/v1/bootcamps/id
    // @access  Private
    updateBootcamps: asyncHandler(async (req, res, next) => {

        console.log("id is ........" + req.params.id)

        const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!bootcamp) {
            return next(new errorResponse(`Bootcamp not found with id of ${req.params.id}`, 400))
        }

        res.status(201).json({
            success: true,
            msg: `Bootcamp Updated`,
            data: bootcamp
        });

    }),

    // @desc  Delete bootcamp
    // @route  DELETE /api/v1/bootcamps/id
    // @access  Private
    deleteBootcamps: asyncHandler(async (req, res, next) => {

        console.log("id is ........" + req.params.id)

        const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id, req.body);

        if (!bootcamp) {
            return next(new errorResponse(`Bootcamp not found with id of ${req.params.id}`, 400))
        }

        res.status(201).json({
            success: true,
            msg: `Bootcamp Updates`,
            data: bootcamp
        });


    }),

    // @desc      Get bootcamps within a radius
    // @route     GET /api/v1/bootcamps/radius/:zipcode/:distance
    // @access    getBootcampsInRadius  Private
    getBootcampsInRadius: asyncHandler(async (req, res, next) => {
        const {
            zipcode,
            distance
        } = req.params;

        // Get lat/lng from geocoder
        const loc = await geocoder.geocode(zipcode);
        const lat = loc[0].latitude;
        const lng = loc[0].longitude;

        // Calc radius using radians
        // Divide dist by radius of Earth
        // Earth Radius = 3,963 mi / 6,378 km
        const radius = distance / 3963;

        const bootcamps = await Bootcamp.find({
            location: {
                $geoWithin: {
                    $centerSphere: [
                        [lng, lat], radius
                    ]
                }
            }
        });

        res.status(200).json({
            success: true,
            count: bootcamps.length,
            data: bootcamps
        });

    })
};