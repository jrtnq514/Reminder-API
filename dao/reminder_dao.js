/**
 * Created by JT on 8/1/16.
 */

var comb = require('comb');
var patio = require('patio');
var moment = require('moment');
var emailHelper = require('../helpers/email_helper');

var logger = comb.logger('api.dao.reminder');

// patio logging
patio.configureLogging();
patio.LOGGER.level = "DEBUG";

//disconnect and error callback helpers
var disconnect = patio.disconnect.bind(patio);
var disconnectError = function(err) {
    patio.logError(err);
    patio.disconnect();
};

patio.camelize = true;


/* Init db connection */
function init() {
    patio.camelize = true;
    patio.connect("pg://JT@127.0.0.1:5432/JT");
}

/* Add new Reminder */
function addNewReminder(newReminder) {
    init();
    var ReminderDAO = patio.addModel('reminder');

    ReminderDAO.sync().chain(function(Reminder){
        var reminder = new Reminder({
            title : newReminder.title,
            description : newReminder.description,
            datetime : newReminder.datetime,
            email : newReminder.email
        });
        return reminder.save().chain(function(){
            logger.info("Successfully added reminder");
        });
    }).chain(disconnect, disconnectError);

}






function cronReminder() {
    init();
    // get reminders for the next n time
    var Reminder = patio.addModel('reminder');

    var nowPlus1 = moment().add(1, 'minutes').format('YYYY-MM-DD HH:mm:00');

    // get all the reminders for the next minute
    Reminder.sync().chain(function () {
        Reminder.filter({datetime : nowPlus1}).forEach(function (reminder) {
            emailHelper.sendEmail(reminder);
        });
    }).chain(function (err) {
        logger.error(err.message);
    });
}

module.exports = {
    addNewReminder: addNewReminder,
    cronReminder: cronReminder
}