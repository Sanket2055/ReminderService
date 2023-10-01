const sender = require('../config/emailConfig');

const sendBasicEmail = (from, to, subject, body) => {
    sender.sendMail({
        from,
        to,
        subject,
        text: body
    })
}

module.exports = {
    sendBasicEmail
}
