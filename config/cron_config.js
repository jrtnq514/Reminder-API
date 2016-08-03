/**
 * Created by JT on 8/2/16.
 */
var cronConfig = {
    remind: {},
    cleanup: {}
};

// notification job
cronConfig.remind.pattern = '0 */1 * * * *'; // every min

// clean-up job
cronConfig.cleanup.pattern = '0 0 */1 * * *'; // every hour

// general
cronConfig.timezone = 'America/Chicago';


module.exports = cronConfig;