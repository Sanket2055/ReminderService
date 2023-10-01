const { NotificationTicket } = require('../models/index');
const { Op } = require('sequelize');
class TicketRepository {
    async getAll() {
        try {
            const tickets = await NotificationTicket.findAll();
            return tickets;
        } catch (error) {
            throw error;

        }
    }

    async create(data) {
        try {
            const tickets = await NotificationTicket.create(data);
            return tickets;
        } catch (error) {
            throw error;

        }
    }

    async get(filter) {
        try {
            const tickets = NotificationTicket.findAll({
                where: {
                    status: filter.status,
                    notificationTime: {
                        [Op.lte]: new Date()
                    }
                }
            })
            return tickets;
        } catch (error) {
            throw error;
        }
    }

    async update(id, data) {
        try {
            const ticket = await NotificationTicket.findByPk(id);
            if (!ticket) {
                throw new Error('No ticket found');
            }
            if (data.status)
                ticket.status = data.status;
            await ticket.save();
            return ticket;
        } catch (error) {
            throw error;
        }
    }


}

module.exports = TicketRepository;
