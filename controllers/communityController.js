const Community = require('../models/communityModel');

const getAllRecords = async (req, res) => {
    try {
        const results = await Community.getAllRecords();

        if (!results || results.length === 0) {
            return res.status(200).json({
                status: 'success',
                message: 'No communities found',
                data: [],
                error: null,
                pagination: null
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Communities retrieved successfully',
            data: results,
            error: null,
            pagination: {
                currentPage: 1,  // You can dynamically calculate this if you're implementing pagination
                totalPages: 1,   // You can calculate this as well
                totalItems: results.length
            }
        });
    } catch (err) {
        console.error('Error retrieving communities:', err);
        res.status(500).json({
            status: 'error',
            message: 'Failed to retrieve communities',
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
        const result = await Community.getRecordById(id);

        if (!result || result.length === 0) {
            return res.status(404).json({
                status: 'error',
                message: 'Community not found',
                data: null,
                error: {
                    code: 'NOT_FOUND',
                    message: `Community with ID ${id} does not exist`
                },
                pagination: null
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Community retrieved successfully',
            data: result[0],
            error: null,
            pagination: null
        });
    } catch (err) {
        console.error('Error retrieving community:', err);
        res.status(500).json({
            status: 'error',
            message: 'Failed to retrieve community',
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
        const result = await Community.createRecord(title, description);

        res.status(201).json({
            status: 'success',
            message: 'Community created successfully',
            data: {
                CommunityId: result.insertId
            },
            error: null,
            pagination: null
        });
    } catch (err) {
        console.error('Error creating community:', err);
        res.status(500).json({
            status: 'error',
            message: 'Failed to create community',
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
        const result = await Community.updateRecord(id, title, description, completed);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                status: 'error',
                message: 'Community not found to update',
                data: null,
                error: {
                    code: 'NOT_FOUND',
                    message: `Community with ID ${id} does not exist`
                },
                pagination: null
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Community updated successfully',
            data: null,
            error: null,
            pagination: null
        });
    } catch (err) {
        console.error('Error updating community:', err);
        res.status(500).json({
            status: 'error',
            message: 'Failed to update community',
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
        const result = await Community.deleteRecord(id);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                status: 'error',
                message: 'Community not found to delete',
                data: null,
                error: {
                    code: 'NOT_FOUND',
                    message: `Community with ID ${id} does not exist`
                },
                pagination: null
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Community deleted successfully',
            data: null,
            error: null,
            pagination: null
        });
    } catch (err) {
        console.error('Error deleting community:', err);
        res.status(500).json({
            status: 'error',
            message: 'Failed to delete community',
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
