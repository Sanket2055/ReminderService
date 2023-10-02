const express = require('express');
const bodyParser = require('body-parser');

const { PORT } = require('./config/serverConfig.js');
const { createChannel, subscribeMessage, publishMessage } = require('./utils/messageQueue.js');

const { sendBasicEmail } = require('./services/email-service.js');
const setupJobs = require('./utils/jobs.js');

const TicketController = require('./controller/ticket-controller.js');
const setupAndStartServer = async () => {
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    // const channel = await createChannel();

    app.post("/api/v1/tickets", TicketController.create);

    app.listen(PORT, () => {
        console.log(`Server started at port ${PORT}`);
        // sendBasicEmail(
        //     "support@admin.com",
        //     "sanketdiwate95@gmail.com",
        //     "Test Email",
        //     "Hello World"
        // )
        // setupJobs.setupJobs();
    });
}

setupAndStartServer();

/*
service 1 [100qps] --------> service 2 [20qps]
if we have service 1 which is sending 100 requests per second to service 2 which can handle only 20 requests per second
then surely service 2 will be overloaded and will crash
so we need to handle this situation
to handle this situation we will use a queue
we will push all the requests from service 1 to the queue
and service 2 will take requests from the queue and process them
this will ensure that service 2 will not get overloaded

after using queue
service1 [100qps] publisher ----> queue [m1,m2,m3...]----> service2 [20qps] subscriber
service2 [Publisher] ---> queue [m1,m2,m3...] ---> service1 subscriber

*/

