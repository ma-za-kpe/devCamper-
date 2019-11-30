const errorResponse = require('../utils/errorResponse');
const geocoder = require('../utils/geocoder');
const asyncHandler = require('../middleware/aync');
const path = require('path');


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
        const removeFields = ['select', 'sort', 'limit', 'page']

        //loop over removeFields and delete them from the req   q   uery
        removeFields.forEach(param => delete reqQuery[param]);

        console.log(reqQuery)

        //create query string
        let queryStr = JSON.stringify(reqQuery);

        //create operators
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

        //finding resource
        query = Bootcamp.find(JSON.parse(queryStr)).populate({
            path: 'courses',
            select: 'name description'
        });

        // select fields
        if (req.query.select) {
            const fields = req.query.select.split(',').join(' ')
            query = query.select(fields)
        }

        // sort fields
        if (req.query.sort) {
            const sortFields = req.query.sort.split(',').join(' ')
            query = query.sort(sortFields)
        }

        //paginationg
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 1;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const totalDocs = await Bootcamp.countDocuments();

        query = query.skip(startIndex).limit(limit);

        //excecuting query
        const bootcamp = await query;

        //pagination query
        const pagination = {};

        if (endIndex < totalDocs) {
            pagination.next = {
                page: page + 1,
                limit
            }
        }

        if (startIndex > 0) {
            pagination.prev = {
                page: page - 1,
                limit
            }
        }

        res.status(201).json({
            success: true,
            msg: `All Bootcamps`,
            count: bootcamp.length,
            pagination,
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

        const bootcamp = await Bootcamp.findById(req.params.id, req.body);

        if (!bootcamp) {
            return next(new errorResponse(`Bootcamp not found with id of ${req.params.id}`, 400))
        }

        bootcamp.remove();

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

    }),

    // @desc      Upload photo for bootcamp
    // @route     PUT /api/v1/bootcamps/:id/photo
    // @access    Private
    bootcampPhotoUpload: asyncHandler(async (req, res, next) => {
        const bootcamp = await Bootcamp.findById(req.params.id);

        if (!bootcamp) {
            return next(
                new errorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
            );
        }

        // // Make sure user is bootcamp owner
        // if (bootcamp.user.toString() !== req.user.id && req.user.role !== 'admin') {
        //     return next(
        //         new ErrorResponse(
        //             `User ${req.params.id} is not authorized to update this bootcamp`,
        //             401
        //         )
        //     );
        // }

        if (!req.files) {
            return next(new errorResponse(`Please upload a file`, 400));
        }

        const file = req.files.file;

        // Make sure the image is a photo
        if (!file.mimetype.startsWith('image')) {
            return next(new errorResponse(`Please upload an image file`, 400));
        }

        // Check filesize
        if (file.size > process.env.MAX_FILE_UPLOAD) {
            return next(
                new errorResponse(
                    `Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
                    400
                )
            );
        }

        // Create custom filename
        file.name = `photo_${bootcamp._id}${path.parse(file.name).ext}`;

        console.log(file.name)

        file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {
            if (err) {
                console.error(err);
                return next(new errorResponse(`Problem with file upload`, 500));
            }

            await Bootcamp.findByIdAndUpdate(req.params.id, {
                photo: file.name
            });

            res.status(200).json({
                success: true,
                data: file.name
            });
        });
    })
}