const baseController = (Model) => ({
    getAllRecords: async (req, res) => {
        try {
            const { page = 1, limit = 1000 } = req.query;
            const offset = (page - 1) * limit;

            const results = await Model.getAllRecords();

            if (!results || results.length === 0) {
                return res.status(200).json({
                    status: 'success',
                    message: 'No records found',
                    data: [],
                    error: null,
                    pagination: {
                        currentPage: page,
                        totalPages: 0,
                        totalItems: 0,
                    },
                });
            }

            const paginatedData = results.slice(offset, offset + Number(limit));

            res.status(200).json({
                status: 'success',
                message: 'Records retrieved successfully',
                data: paginatedData,
                error: null,
                pagination: {
                    currentPage: Number(page),
                    totalPages: Math.ceil(results.length / limit),
                    totalItems: results.length,
                },
            });
        } catch (err) {
            console.error('Error retrieving records:', err);
            res.status(500).json({
                status: 'error',
                message: 'Failed to retrieve records',
                data: null,
                error: { code: 'SERVER_ERROR', message: err.message },
                pagination: null,
            });
        }
    },

    getRecordById: async (req, res) => {
        const { id } = req.params;

        try {
            const result = await Model.getRecordById(id);

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
    },

    createRecord: async (req, res) => {
        try {
            const result = await Model.createRecord(req.body);

            res.status(201).json({
                status: 'success',
                message: 'Record created successfully',
                data: { id: result.insertId },
                error: null,
                pagination: null,
            });
        } catch (err) {
            console.error('Error creating record:', err);
            res.status(500).json({
                status: 'error',
                message: 'Failed to create record',
                data: null,
                error: { code: 'SERVER_ERROR', message: err.message },
                pagination: null,
            });
        }
    },

    updateRecord: async (req, res) => {
        const { id } = req.params;

        try {
            const result = await Model.updateRecord(id, req.body);

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Record not found to update',
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
                message: 'Record updated successfully',
                data: null,
                error: null,
                pagination: null,
            });
        } catch (err) {
            console.error('Error updating record:', err);
            res.status(500).json({
                status: 'error',
                message: 'Failed to update record',
                data: null,
                error: { code: 'SERVER_ERROR', message: err.message },
                pagination: null,
            });
        }
    },

    deleteRecord: async (req, res) => {
        const { id } = req.params;

        try {
            const result = await Model.deleteRecord(id);

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Record not found to delete',
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
                message: 'Record deleted successfully',
                data: null,
                error: null,
                pagination: null,
            });
        } catch (err) {
            console.error('Error deleting record:', err);
            res.status(500).json({
                status: 'error',
                message: 'Failed to delete record',
                data: null,
                error: { code: 'SERVER_ERROR', message: err.message },
                pagination: null,
            });
        }
    },
});

module.exports = baseController;
