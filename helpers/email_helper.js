/**
 * Created by JT on 8/2/16.
 */
var comb = require('comb');
var nodemailer = require('nodemailer');
var emailConfig = require('../config/email_conf');


// Logger
var logger = comb.logger('api.helpers.emailHelper');

var transporter = null;

function init() {
    var poolConfig = {
        pool: true,
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // use SSL
        auth: {
            user: emailConfig.user,
            pass: emailConfig.pass
        }
    };

    // create transporter
    transporter = nodemailer.createTransport(poolConfig);

    // verify connection configuration
    transporter.verify(function(error, success) {
        if (error) {
            logger.error(error);
        } else {
            logger.info('Server is ready to take our messages');
        }
    });
}

function sendEmail(reminder) {
    if (!transporter) {
        logger.error("Transporter not created")
        return;
    }

    var email = {
        from: emailConfig.from, // sender address 
        to: reminder.email, // list of receivers 
        subject: reminder.title, // Subject line 
        text: reminder.description, // plaintext body 
        // html: '' // html body 
    };
    
    transporter.sendMail(email, function (error, info) {
        if (error) {
            logger.error("Email failed to send. Trying again in 60 sec");
            setTimeout(function () {
                sendEmail(reminder);
            }, 60000);
        }
        
        logger.info("Email successfully sent");
        
    });
}

module.exports = {
    init: init,
    sendEmail: sendEmail
};