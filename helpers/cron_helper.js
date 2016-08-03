/**
 * Created by JT on 8/2/16.
 */

var comb = require('comb');
var CronJob = require('cron').CronJob;
var cronConfig = require('../config/cron_config');
var reminderDao = require('../dao/reminder_dao');

// logger
var logger = comb.logger('api.helpers.cronHelper');

function init() {
    try {
        new CronJob(cronConfig.pattern, function() {
            logger.info("Valid Cron pattern");
        })
    } catch(ex) {
        logger.error("Invalid Cron pattern");
        return;
    }

    var cronJob = new CronJob({
        cronTime: cronConfig.pattern,
        onTick: function() {
            /*
             * Runs every weekday (Monday through Friday)
             * at 11:30:00 AM. It does not run on Saturday
             * or Sunday.
             */
            logger.info("Cron tick");
            reminderDao.cronReminder();
        },
        onComplete: function () {

        },
        runOnInit: function () {
            reminderDao.cronReminder();
        },
        start: false,
        timeZone: cronConfig.timezone
    });
    cronJob.start();
    logger.info("Started cron job");

}

module.exports = {
    init: init
};