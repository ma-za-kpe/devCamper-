var express = require('express');

var mongoose = require('mongoose')
var ObjectId = mongoose.Types.ObjectId;

const Bootcamp = require("../models/Bootcamp");


module.exports = {
    // @desc  Get all bootcamps
    // @route  GET /api/v1/bootcamps
    // @access  Public
    getAllBootcamps: async (req, res) => {

        try {
            const bootcamp = await Bootcamp.find(req.body);
            res.status(201).json({
                success: true,
                msg: `Bootcamp created`,
                data: bootcamp
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                error: JSON.stringify(error, undefined, 2).bold
            })

        }
        try {
            const bootcamp = await Bootcamp.find(req.body);
            res.status(201).json({
                success: true,
                msg: `Bootcamp created`,
                data: bootcamp
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                error: JSON.stringify(error, undefined, 2).bold
            })

        }

    },

    // @desc  Get single bootcamps
    // @route  GET /api/v1/bootcamps/id
    // @access  Public
    getOneBootcamps: async (req, res) => {
        try {
            const bootcamp = await Bootcamp.findById(req.params.id);

            if (!bootcamp) {
                return res.status(400).json({
                    success: false,
                    msg: `No bootcamp with this id in the db`,
                });
            }

            res.status(201).json({
                success: true,
                msg: `Bootcamp created`,
                data: bootcamp
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                error: JSON.stringify(error, undefined, 2).bold
            })

        }
    },

    // @desc  Create bootcamp
    // @route  POST /api/v1/bootcamps
    // @access  Private
    createBootcamps: async (req, res) => {

        try {
            const bootcamp = await Bootcamp.create(req.body);

            res.status(201).json({
                success: true,
                msg: `Bootcamp created Successfully ...s`,
                data: bootcamp
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                msg: `Bootcamp already created`
            })
        }

    },

    // @desc  Update bootcamp
    // @route  PUT /api/v1/bootcamps/id
    // @access  Private
    updateBootcamps: async (req, res) => {
        try {

            console.log("id is ........" + req.params.id)

            const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true
            });

            if (!bootcamp) {
                return res.status(400).json({
                    success: false,
                    msg: `No bootcamp with this id in the db`,
                });
            }

            res.status(201).json({
                success: true,
                msg: `Bootcamp Updates`,
                data: bootcamp
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                error: error
            })
        }

    },

    // @desc  Delete bootcamp
    // @route  DELETE /api/v1/bootcamps/id
    // @access  Private
    deleteBootcamps: async (req, res) => {
        const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id, req.body);

        if (!bootcamp) {
            return res.status(400).json({
                success: false,
                msg: `No bootcamp with this id in the db`,
            });
        }

        res.status(201).json({
            success: true,
            msg: `Bootcamp Deleted`,
            data: bootcamp
        });
    }
};