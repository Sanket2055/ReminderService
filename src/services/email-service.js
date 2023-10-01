const sender = require('../config/emailConfig');
const TicketRepository = require('../repository/ticket-repository');
const sendBasicEmail = (from, to, subject, body) => {
    sender.sendMail({
        from,
        to,
        subject,
        text: body
    })
}

const fetchPendingEmails = async (timeStamp) => {
    try {
        const repo = new TicketRepository();
        const tickets = await repo.get({status:"PENDING"});
        console.log('tickets', tickets);
        
        return tickets;
    } catch (error) {
        console.log('error in fetching pending emails', error);

    }
}
const updateTicket = async (id, data) => {
    try {
        const repo = new TicketRepository();
        const response = await repo.update(id, data);
        return response;

    } catch (error) {
        console.log('error in updating ticket', error);
    }
}
const createNotification = async (data) => {
    try {
        const repo = new TicketRepository();
        const response = await repo.create(data);
        return response;

    } catch (error) {
        console.log('error in creating notification', error);
    }
}

module.exports = {
    sendBasicEmail,
    fetchPendingEmails,
    createNotification,
    updateTicket
}
