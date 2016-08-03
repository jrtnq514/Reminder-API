/**
 * Created by JT on 8/2/16.
 */

var comb = require('comb');
var CronJob = require('cron').CronJob;
var cronConfig = require('../config/cron_config');
var reminderDao = require('../dao/reminder_dao');

// logger
var logger = comb.logger('api.helpers.cronHelper');

/* clean up old notifications */
function cleanup() {
    try {
        new CronJob(cronConfig.cleanup.pattern, function() {
            logger.info("Valid Cron pattern");
        })
    } catch(ex) {
        logger.error("Invalid Cron pattern (cleanup)");
        return;
    }

    var cronJob = new CronJob({
        cronTime: cronConfig.cleanup.pattern,
        onTick: function() {
            logger.info("cleanup");
            reminderDao.cleanup();
        },
        onComplete: function () {

        },
        runOnInit: function () {
            reminderDao.cleanup();
        },
        start: false,
        timeZone: cronConfig.timezone
    });
    cronJob.start();
    logger.info("Started cleanup cron job");
}

/* Send out notifications */
function remind() {
    try {
        new CronJob(cronConfig.remind.pattern, function() {
            logger.info("Valid Cron pattern");
        })
    } catch(ex) {
        logger.error("Invalid Cron pattern (notify)");
        return;
    }

    var cronJob = new CronJob({
        cronTime: cronConfig.remind.pattern,
        onTick: function() {
            logger.info("notify");
            reminderDao.remind();
        },
        onComplete: function () {

        },
        runOnInit: function () {
            reminderDao.notify();
        },
        start: false,
        timeZone: cronConfig.timezone
    });
    cronJob.start();
    logger.info("Started notify cron job");

}

module.exports = {
    remind: remind,
    cleanup: cleanup
};