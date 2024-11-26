const Offer = require('../models/offerModel');

const getAllRecords = async (req, res) => {
    try {
        const results = await Offer.getAllRecords();

        if (!results || results.length === 0) {
            return res.status(200).json({
                status: 'success',
                message: 'No offers found',
                data: [],
                error: null,
                pagination: null
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Offers retrieved successfully',
            data: results,
            error: null,
            pagination: {
                currentPage: 1,  // You can dynamically calculate this if you're implementing pagination
                totalPages: 1,   // You can calculate this as well
                totalItems: results.length
            }
        });
    } catch (err) {
        console.error('Error retrieving offers:', err);
        res.status(500).json({
            status: 'error',
            message: 'Failed to retrieve offers',
            data: null,
            error: {
                code: 'SERVER_ERROR',
                message: err.message
            },
            pagination: null
        });
    }
};

const getRecordById = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await Offer.getRecordById(id);

        if (!result || result.length === 0) {
            return res.status(404).json({
                status: 'error',
                message: 'Offer not found',
                data: null,
                error: {
                    code: 'NOT_FOUND',
                    message: `Offer with ID ${id} does not exist`
                },
                pagination: null
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Offer retrieved successfully',
            data: result[0],
            error: null,
            pagination: null
        });
    } catch (err) {
        console.error('Error retrieving offer:', err);
        res.status(500).json({
            status: 'error',
            message: 'Failed to retrieve offer',
            data: null,
            error: {
                code: 'SERVER_ERROR',
                message: err.message
            },
            pagination: null
        });
    }
};

const createRecord = async (req, res) => {
    const { title, description } = req.body;

    try {
        const result = await Offer.createRecord(title, description);

        res.status(201).json({
            status: 'success',
            message: 'Offer created successfully',
            data: {
                OfferId: result.insertId
            },
            error: null,
            pagination: null
        });
    } catch (err) {
        console.error('Error creating offer:', err);
        res.status(500).json({
            status: 'error',
            message: 'Failed to create offer',
            data: null,
            error: {
                code: 'SERVER_ERROR',
                message: err.message
            },
            pagination: null
        });
    }
};

const updateRecord = async (req, res) => {
    const { id } = req.params;
    const { title, description, completed } = req.body;

    try {
        const result = await Offer.updateRecord(id, title, description, completed);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                status: 'error',
                message: 'Offer not found to update',
                data: null,
                error: {
                    code: 'NOT_FOUND',
                    message: `Offer with ID ${id} does not exist`
                },
                pagination: null
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Offer updated successfully',
            data: null,
            error: null,
            pagination: null
        });
    } catch (err) {
        console.error('Error updating offer:', err);
        res.status(500).json({
            status: 'error',
            message: 'Failed to update offer',
            data: null,
            error: {
                code: 'SERVER_ERROR',
                message: err.message
            },
            pagination: null
        });
    }
};

const deleteRecord = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await Offer.deleteRecord(id);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                status: 'error',
                message: 'Offer not found to delete',
                data: null,
                error: {
                    code: 'NOT_FOUND',
                    message: `Offer with ID ${id} does not exist`
                },
                pagination: null
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Offer deleted successfully',
            data: null,
            error: null,
            pagination: null
        });
    } catch (err) {
        console.error('Error deleting offer:', err);
        res.status(500).json({
            status: 'error',
            message: 'Failed to delete offer',
            data: null,
            error: {
                code: 'SERVER_ERROR',
                message: err.message
            },
            pagination: null
        });
    }
};

module.exports = {
    getAllRecords,
    getRecordById,
    createRecord,
    updateRecord,
    deleteRecord,
};
