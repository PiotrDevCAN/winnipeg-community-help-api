const Community = require('../models/communityModel');
const baseController = require('./baseController');

const controller = baseController(Community);

controller.getCommunityRequests = async (req, res) => {
    const { id } = req.params;

    res.status(200).json({
        status: 'success',
        message: 'Record retrieved successfully',
        data: 'TEST 1',
        error: null,
        pagination: null,
    });
}

controller.getCommunityOffers = async (req, res) => {
    const { id } = req.params;

    res.status(200).json({
        status: 'success',
        message: 'Record retrieved successfully',
        data: 'TEST 2',
        error: null,
        pagination: null,
    });
}

module.exports = controller;