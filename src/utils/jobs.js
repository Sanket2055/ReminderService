const cron = require('node-cron');
const emailService = require('../services/email-service');
const sender = require('../config/emailConfig');
/*
    we will check are there any jobs in the database pending which were expected to be sent by now 
*/

const setupJobs = () => {
    cron.schedule('*/1 * * * *', async () => {
        const response = await emailService.fetchPendingEmails();
        response.forEach((email) => {
            sender.sendMail({
                to: email.recepientEmail,
                subject: email.subject,
                text: email.content
            },async (err , data)=>{
                if(err){
                    console.log(err)
                }else{
                    console.log("Email sent" ,data);
                    await emailService.updateTicket(email.id , {status:"SUCCESS"})
                }
            })
        })
        console.log(response);
        console.log("cron job running")
    });
}

module.exports = {
    setupJobs
}
