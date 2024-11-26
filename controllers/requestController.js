const Request = require('../models/requestModel');

const getAllRecords = async (req, res) => {
    try {
        const results = await Request.getAllRecords();

        if (!results || results.length === 0) {
            return res.status(200).json({
                status: 'success',
                message: 'No requests found',
                data: [],
                error: null,
                pagination: null
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Requests retrieved successfully',
            data: results,
            error: null,
            pagination: {
                currentPage: 1,  // You can dynamically calculate this if you're implementing pagination
                totalPages: 1,   // You can calculate this as well
                totalItems: results.length
            }
        });
    } catch (err) {
        console.error('Error retrieving requests:', err);
        res.status(500).json({
            status: 'error',
            message: 'Failed to retrieve requests',
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
        const result = await Request.getRecordById(id);

        if (!result || result.length === 0) {
            return res.status(404).json({
                status: 'error',
                message: 'Request not found',
                data: null,
                error: {
                    code: 'NOT_FOUND',
                    message: `Request with ID ${id} does not exist`
                },
                pagination: null
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Request retrieved successfully',
            data: result[0],
            error: null,
            pagination: null
        });
    } catch (err) {
        console.error('Error retrieving request:', err);
        res.status(500).json({
            status: 'error',
            message: 'Failed to retrieve request',
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
        const result = await Request.createRecord(title, description);

        res.status(201).json({
            status: 'success',
            message: 'Request created successfully',
            data: {
                RequestId: result.insertId
            },
            error: null,
            pagination: null
        });
    } catch (err) {
        console.error('Error creating request:', err);
        res.status(500).json({
            status: 'error',
            message: 'Failed to create request',
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
        const result = await Request.updateRecord(id, title, description, completed);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                status: 'error',
                message: 'Request not found to update',
                data: null,
                error: {
                    code: 'NOT_FOUND',
                    message: `Request with ID ${id} does not exist`
                },
                pagination: null
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Request updated successfully',
            data: null,
            error: null,
            pagination: null
        });
    } catch (err) {
        console.error('Error updating request:', err);
        res.status(500).json({
            status: 'error',
            message: 'Failed to update request',
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
        const result = await Request.deleteRecord(id);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                status: 'error',
                message: 'Request not found to delete',
                data: null,
                error: {
                    code: 'NOT_FOUND',
                    message: `Request with ID ${id} does not exist`
                },
                pagination: null
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Request deleted successfully',
            data: null,
            error: null,
            pagination: null
        });
    } catch (err) {
        console.error('Error deleting request:', err);
        res.status(500).json({
            status: 'error',
            message: 'Failed to delete request',
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
