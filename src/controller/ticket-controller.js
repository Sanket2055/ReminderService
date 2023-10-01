const TicketService = require('../services/email-service');

const create = async (req, res) => {
    try {
        const response = await TicketService.createNotification(req.body);
        res.status(201).json({
            success: true,
            data: response,
            err: {},
            message: 'Successfully registered',

        })
    } catch (error) {
        res.status(500).json({
            success: false,
            data: {},
            err: error,
            message: 'Error in registering',
        });
    }
}

const getAll = async (req, res) => {
    try {
        const response = await TicketService.getAll();
        res.status(200).json({
            success: true,
            data: response,
            err: {},
            message: 'Successfully fetched',

        })
    } catch (error) {
        res.status(500).json({
            success: false,
            data: {},
            err: error,
            message: 'Error in fetching',
        });
    }
}

module.exports = {
    create,
    getAll
}
