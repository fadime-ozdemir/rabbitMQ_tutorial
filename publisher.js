const amqp = require('amqplib/callback_api');
const publisher = (msgFromClient)=> 

    
    amqp.connect('amqp://localhost:5672', function(error0, connection) {
        if (error0) {
            throw error0;
        }
        connection.createChannel(function(error1, channel) {
            if (error1) {
                throw error1;
            }
            const exchange = 'message1';
            const msg = msgFromClient;
            
          channel.assertExchange(exchange, 'direct', {
              durable: false
          });
          //   channel.publish(queue_name, exchange, 'orange', Buffer.from(msg));
          channel.publish(exchange, 'orange', Buffer.from(msg));
          console.log(" [x] Sent %s", msg);
          
        });
        
        setTimeout(function() {
            connection.close();
            // process.exit(0);
        }, 500);
    })


module.exports = publisher;
