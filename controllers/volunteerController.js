const Volunteer = require('../models/volunteerModel');

const getAllRecords = async (req, res) => {
    try {
        const results = await Volunteer.getAllRecords();

        if (!results || results.length === 0) {
            return res.status(200).json({
                status: 'success',
                message: 'No volunteers found',
                data: [],
                error: null,
                pagination: null
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Volunteers retrieved successfully',
            data: results,
            error: null,
            pagination: {
                currentPage: 1,  // You can dynamically calculate this if you're implementing pagination
                totalPages: 1,   // You can calculate this as well
                totalItems: results.length
            }
        });
    } catch (err) {
        console.error('Error retrieving volunteers:', err);
        res.status(500).json({
            status: 'error',
            message: 'Failed to retrieve volunteers',
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
        const result = await Volunteer.getRecordById(id);

        if (!result || result.length === 0) {
            return res.status(404).json({
                status: 'error',
                message: 'Volunteer not found',
                data: null,
                error: {
                    code: 'NOT_FOUND',
                    message: `Volunteer with ID ${id} does not exist`
                },
                pagination: null
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Volunteer retrieved successfully',
            data: result[0],
            error: null,
            pagination: null
        });
    } catch (err) {
        console.error('Error retrieving volunteer:', err);
        res.status(500).json({
            status: 'error',
            message: 'Failed to retrieve volunteer',
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
        const result = await Volunteer.createRecord(title, description);

        res.status(201).json({
            status: 'success',
            message: 'Volunteer created successfully',
            data: {
                VolunteerId: result.insertId
            },
            error: null,
            pagination: null
        });
    } catch (err) {
        console.error('Error creating volunteer:', err);
        res.status(500).json({
            status: 'error',
            message: 'Failed to create volunteer',
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
        const result = await Volunteer.updateRecord(id, title, description, completed);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                status: 'error',
                message: 'Volunteer not found to update',
                data: null,
                error: {
                    code: 'NOT_FOUND',
                    message: `Volunteer with ID ${id} does not exist`
                },
                pagination: null
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Volunteer updated successfully',
            data: null,
            error: null,
            pagination: null
        });
    } catch (err) {
        console.error('Error updating volunteer:', err);
        res.status(500).json({
            status: 'error',
            message: 'Failed to update volunteer',
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
        const result = await Volunteer.deleteRecord(id);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                status: 'error',
                message: 'Volunteer not found to delete',
                data: null,
                error: {
                    code: 'NOT_FOUND',
                    message: `Volunteer with ID ${id} does not exist`
                },
                pagination: null
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Volunteer deleted successfully',
            data: null,
            error: null,
            pagination: null
        });
    } catch (err) {
        console.error('Error deleting volunteer:', err);
        res.status(500).json({
            status: 'error',
            message: 'Failed to delete volunteer',
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
