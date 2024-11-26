const Community = require('../models/communityModel');

const getAllCommunities = async (req, res) => {
    Community.getAllCommunities((err, results) => {
        if (err) {
            res.status(500).json({ error: 'Failed to retrieve Communities' });
        } else {
            res.status(200).json(results);
        }
    });
    // try {
    //     const results = await Community.getAllCommunities(); // Assume `getAllCommunities` is a promise-based method
    //     console.log(results);
    //     if (!results || results.length === 0) {
    //         return res.status(200).json({ message: 'No communities found' });
    //     }
    //     res.status(200).json({
    //         message: 'Communities retrieved successfully',
    //         data: results,
    //     });
    // } catch (err) {
    //     console.error('Error retrieving communities:', err);
    //     res.status(500).json({
    //         error: 'Failed to retrieve communities',
    //         details: err.message, // Optional: to provide additional context
    //     });
    // }
};

const getCommunityById = (req, res) => {
    const { id } = req.params;
    Community.getCommunityById(id, (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Failed to retrieve Community' });
        } else if (result.length === 0) {
            res.status(404).json({ error: 'Community not found' });
        } else {
            res.status(200).json(result[0]);
        }
    });
};

const createCommunity = (req, res) => {
    const { title, description } = req.body;
    Community.createCommunity(title, description, (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Failed to create Community' });
        } else {
            res.status(201).json({ message: 'Community created successfully', CommunityId: result.insertId });
        }
    });
};

const updateCommunity = (req, res) => {
    const { id } = req.params;
    const { title, description, completed } = req.body;
    Community.updateCommunity(id, title, description, completed, (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Failed to update Community' });
        } else {
            res.status(200).json({ message: 'Community updated successfully' });
        }
    });
};

const deleteCommunity = (req, res) => {
    const { id } = req.params;
    Community.deleteCommunity(id, (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Failed to delete Community' });
        } else {
            res.status(200).json({ message: 'Community deleted successfully' });
        }
    });
};

module.exports = {
    getAllCommunities,
    getCommunityById,
    createCommunity,
    updateCommunity,
    deleteCommunity,
};
