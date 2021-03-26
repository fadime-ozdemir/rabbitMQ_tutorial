const amqp = require('amqplib/callback_api');
const createAndSaveMessage = require("./database.js").createAndSaveMessage;

amqp.connect('amqp://localhost:5672', function (error0, connection) {
        if (error0) {
            throw error0;
        }
        connection.createChannel(function (error1, channel) {
            if (error1) {
                throw error1;
            }
            const exchange = 'message1';

            channel.assertExchange(exchange, 'direct', {
                durable: false
            });

            channel.assertQueue('', {
                exclusive: true
            }, function (error2, q) {
                if (error2) {
                    throw error2;
                };

                console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q.queue);
                channel.bindQueue(q.queue, exchange, 'orange');

                channel.consume(q.queue, function (msg) {
                    if (msg.content) {
                        console.log(" [x] %s", msg.content.toString());
                        createAndSaveMessage(msg.content.toString());
                    }
                }, {
                    noAck: true
                });
            });
        });
    });
