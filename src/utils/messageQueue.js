const amqp = require('amqplib');
const { MESSAGE_BROKER_URL, EXCHANGE_NAME, } = require('../config/serverConfig');
const createChannel = async () => {
    try {
        const connection = await amqp.connect(MESSAGE_BROKER_URL);
        const channel = await connection.createChannel();
        await channel.assertExchange(EXCHANGE_NAME, 'direct', false);
        return channel;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
const subscribeMessage = async (channel, service, binding_key) => {

    try {
        const applicationQueue = await channel.assertQueue("REMINDER_QUEUE");
        channel.bindQueue(applicationQueue.queue, EXCHANGE_NAME, binding_key);

        channel.consume(applicationQueue.queue, (message) => {
            console.log(`Received message from service`);
            console.log(message.content.toString());
            const payload = JSON.parse(message.content.toString()); 
            service(payload) 
            channel.ack(message);
        });
    } catch (error) {
        throw error;
    }

}
const publishMessage = async (channel, binding_key, message) => {
    try {
        await channel.assertQueue("REMINDER_QUEUE");
        await channel.publish(EXCHANGE_NAME, binding_key, Buffer.from(message));
        console.log(`Message published to service`);
    } catch (error) {
        throw error;
    }

}

module.exports = {
    createChannel,
    subscribeMessage,
    publishMessage
}
