var express = require('express');
var bodyParser = require('body-parser');
var comb = require('comb');
var emailHelper = require('./helpers/email_helper');
var cronHelper = require('./helpers/cron_helper');

// comb logger
// TODO configure log output and levels
comb.logger.configure();
var logger = comb.logger('api');

var reminderRoutes = require('./routes/reminder_routes.js');

var api = express();

var port = normalizePort(process.env.PORT || '3002');
api.set('port', port);


api.use(bodyParser.json());
api.use(bodyParser.urlencoded({ extended: false }));

// route paths
api.use('/', reminderRoutes);

// setup emailhelper
emailHelper.init();

// start cron job
cronHelper.init();

// catch 404 and forward to error handler
// api.use(function(req, res, next) {
//     var err = new Error('Not Found');
//     err.status = 404;
//     next(err);
// });
//
// // error handlers
//
// // development error handler
// // will print stacktrace
// if (api.get('env') === 'development') {
//     api.use(function(err, req, res, next) {
//         res.status(err.status || 500)
//         .send('error', {
//             message: err.message,
//             error: err
//         });
//     });
// }
//
// // production error handler
// // no stacktraces leaked to user
// api.use(function(err, req, res, next) {
//     res.status(err.status || 500)
//     .send('error', {
//         message: err.message,
//         error: {}
//     });
// });

logger.info("Starting API on port: " + port);
api.listen(port);

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}
