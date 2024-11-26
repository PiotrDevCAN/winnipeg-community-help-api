const Request = require('../models/requestModel');

const getAllRequests = (req, res) => {
    Request.getAllRequests((err, results) => {
        if (err) {
            res.status(500).json({ error: 'Failed to retrieve Requests' });
        } else {
            res.status(200).json(results);
        }
    });
};

const getRequestById = (req, res) => {
    const { id } = req.params;
    Request.getRequestById(id, (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Failed to retrieve Request' });
        } else if (result.length === 0) {
            res.status(404).json({ error: 'Request not found' });
        } else {
            res.status(200).json(result[0]);
        }
    });
};

const createRequest = (req, res) => {
    const { title, description } = req.body;
    Request.createRequest(title, description, (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Failed to create Request' });
        } else {
            res.status(201).json({ message: 'Request created successfully', RequestId: result.insertId });
        }
    });
};

const updateRequest = (req, res) => {
    const { id } = req.params;
    const { title, description, completed } = req.body;
    Request.updateRequest(id, title, description, completed, (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Failed to update Request' });
        } else {
            res.status(200).json({ message: 'Request updated successfully' });
        }
    });
};

const deleteRequest = (req, res) => {
    const { id } = req.params;
    Request.deleteRequest(id, (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Failed to delete Request' });
        } else {
            res.status(200).json({ message: 'Request deleted successfully' });
        }
    });
};

module.exports = {
    getAllRequests,
    getRequestById,
    createRequest,
    updateRequest,
    deleteRequest,
};
