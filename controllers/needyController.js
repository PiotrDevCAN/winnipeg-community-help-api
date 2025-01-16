const Needy = require('../models/needyModel');
const Offer = require('../models/offerModel');
const RequestList = require('../models/requestListModel');
const baseController = require('./baseController');

const controller = baseController(Needy);

controller.getNeedyPeopleInCommunity = async (req, res) => {
    const { community_id } = req.params;

    try {
        const result = await Needy.getNeedyPeopleInCommunity(community_id);

        if (!result || result.length === 0) {
            return res.status(404).json({
                status: 'error',
                message: 'Record not found',
                data: null,
                error: {
                    code: 'NOT_FOUND',
                    message: `Record with FIREBASE_ID ${community_id} does not exist`,
                },
                pagination: null,
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Record retrieved successfully',
            data: result[0],
            error: null,
            pagination: null,
        });
    } catch (err) {
        console.error('Error retrieving record:', err);
        res.status(500).json({
            status: 'error',
            message: 'Failed to retrieve record',
            data: null,
            error: { code: 'SERVER_ERROR', message: err.message },
            pagination: null,
        });
    }
}

controller.getNeedyRequests = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await RequestList.getUserRequests(id);

        if (!result || result.length === 0) {
            return res.status(404).json({
                status: 'error',
                message: 'Record not found',
                data: null,
                error: {
                    code: 'NOT_FOUND',
                    message: `Record with ID ${id} does not exist`,
                },
                pagination: null,
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Record retrieved successfully',
            data: result[0],
            error: null,
            pagination: null,
        });
    } catch (err) {
        console.error('Error retrieving record:', err);
        res.status(500).json({
            status: 'error',
            message: 'Failed to retrieve record',
            data: null,
            error: { code: 'SERVER_ERROR', message: err.message },
            pagination: null,
        });
    }
}

controller.getNeedyOffers = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await Offer.getUserOffers(id);

        if (!result || result.length === 0) {
            return res.status(404).json({
                status: 'error',
                message: 'Record not found',
                data: null,
                error: {
                    code: 'NOT_FOUND',
                    message: `Record with ID ${id} does not exist`,
                },
                pagination: null,
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Record retrieved successfully',
            data: result[0],
            error: null,
            pagination: null,
        });
    } catch (err) {
        console.error('Error retrieving record:', err);
        res.status(500).json({
            status: 'error',
            message: 'Failed to retrieve record',
            data: null,
            error: { code: 'SERVER_ERROR', message: err.message },
            pagination: null,
        });
    }
}

module.exports = controller;