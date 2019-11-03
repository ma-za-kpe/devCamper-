var express = require('express');

var mongoose = require('mongoose')
var ObjectId = mongoose.Types.ObjectId;

const Bootcamp = require("../models/Bootcamp");
const errorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/aync');

module.exports = {
    // @desc  Get all bootcamps
    // @route  GET /api/v1/bootcamps
    // @access  Public
    getAllBootcamps: asyncHandler(async (req, res) => {

        const bootcamp = await Bootcamp.find(req.body);
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
    createBootcamps: asyncHandler(async (req, res, next) => {

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
            msg: `Bootcamp Updates`,
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
};