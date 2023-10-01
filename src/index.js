const express = require('express');
const bodyParser = require('body-parser');

const { PORT } = require('./config/serverConfig.js');

const { sendBasicEmail } = require('./services/email-service.js');

const setupAndStartServer = async () => {
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));


    app.listen(PORT, () => {
        console.log(`Server started at port ${PORT}`);
        sendBasicEmail(
            "support@admin.com",
            "sanketdiwate95@gmail.com",
            "Test Email",
            "Hello World"
        )
    });
}

setupAndStartServer();
