const Volunteer = require('../models/volunteerModel');

const getAllVolunteers = (req, res) => {
    Volunteer.getAllVolunteers((err, results) => {
        if (err) {
            res.status(500).json({ error: 'Failed to retrieve Volunteers' });
        } else {
            res.status(200).json(results);
        }
    });
};

const getVolunteerById = (req, res) => {
    const { id } = req.params;
    Volunteer.getVolunteerById(id, (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Failed to retrieve Volunteer' });
        } else if (result.length === 0) {
            res.status(404).json({ error: 'Volunteer not found' });
        } else {
            res.status(200).json(result[0]);
        }
    });
};

const createVolunteer = (req, res) => {
    const { title, description } = req.body;
    Volunteer.createVolunteer(title, description, (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Failed to create Volunteer' });
        } else {
            res.status(201).json({ message: 'Volunteer created successfully', VolunteerId: result.insertId });
        }
    });
};

const updateVolunteer = (req, res) => {
    const { id } = req.params;
    const { title, description, completed } = req.body;
    Volunteer.updateVolunteer(id, title, description, completed, (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Failed to update Volunteer' });
        } else {
            res.status(200).json({ message: 'Volunteer updated successfully' });
        }
    });
};

const deleteVolunteer = (req, res) => {
    const { id } = req.params;
    Volunteer.deleteVolunteer(id, (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Failed to delete Volunteer' });
        } else {
            res.status(200).json({ message: 'Volunteer deleted successfully' });
        }
    });
};

module.exports = {
    getAllVolunteers,
    getVolunteerById,
    createVolunteer,
    updateVolunteer,
    deleteVolunteer,
};
