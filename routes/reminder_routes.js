/**
 * Created by JT on 8/1/16.
 */

var express = require('express');
var reminderRouter = express.Router();
var comb = require('comb');
var moment = require('moment');
var emailValidator = require('email-validator');
var Reminder = require('../models/reminder_object');
var reminderDao = require('../dao/reminder_dao');

// Logger
var logger = comb.logger('api.routes.reminder');

reminderRouter.route('/reminder')

    /* Get reminder */
    .get(function (req, res, next) {
        logger.info("In GET /reminder");
        res.send("GET");
    })

    /* Add new reminder */
    .post(function (req, res, next) {
        logger.info("In POST /reminder");

        var title = req.body.title,
            description = req.body.description || 'N/A',
            datetime = null,
            email = null;

        // check date is valid
        var now = moment();
        datetime = moment(req.body.datetime, 'YYYY-MM-DD HH:mm:ss');
        if (!datetime.isValid() || datetime <= now) {
            // throw new Error("Invalid datetime");
            return res.status(400).json({ 'error': 'Invalid datetime' });
        }

        // check email is valid
        if (emailValidator.validate(req.body.email)) {
            email = req.body.email;
        } else {
            return res.status(400).json({ 'error': 'Invalid email' });
        }

        // Check params, this should be pulled out to a helper
        if (!(title && datetime && email)) {
            logger.error("Invalid parameters\n\ttitle -> " + title +
                                            "\n\tdescription -> " + description +
                                            "\n\tdatetime -> " + datetime +
                                            "\n\temail -> " + email);
            // throw new Error("Invalid parameters");
            return res.status(400).json({ 'error': 'Invalid Parameters' });
            // var err = new Error("Invalid parameters");
            // return next(err);
        }


        var newReminder = new Reminder({ title : title,
                                    description : description,
                                    datetime : datetime.format('YYYY-MM-DD HH:mm:ss'),
                                    email : email });

        reminderDao.addNewReminder(newReminder);

        res.json({ 'message': "POST Complete" });
    })

    /* Replace a reminder */
    .put(function (req, res, next) {
        logger.info("In PUT /reminder");
        res.send("PUT");
    })

    /* Update a reminder */
    .patch(function (req, res, next) {
        logger.info("In PATCH /reminder");
        res.send("PATCH");
    })

    /* Delete a reminder */
    .delete(function (req, res, next) {
        logger.info("In DELETE /reminder");
        res.send("DELETE");
    });



module.exports = reminderRouter;