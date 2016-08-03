/**
 * Created by JT on 8/1/16.
 */

var comb = require('comb');
var logger = comb.logger("api.models.reminder");

// site object
var Reminder = comb.define({
    instance : {

        // properties
        _title : null,
        _description : null,
        _datetime : null,
        _email : null,

        // constructor
        constructor : function (options) {
            options = options || {};
            var title = options.title,
                description = options.description,
                datetime = options.datetime,
                email = options.email;
            title && ( this._title = title );
            description && ( this._description = description );
            datetime && ( this._datetime = datetime );
            email && ( this._email = email );
        },

        // getters
        getters : {
            title : function () {
                return this._title;
            },

            description : function () {
                return this._description;
            },

            datetime : function () {
                return this._datetime;
            },

            email : function () {
                return this._email;
            }
        },

        // setters
        setters : {
            title : function (title) {
                if (comb.isString(title)) {
                    this._title = title;
                } else {
                    throw TypeError("Title must be a string");
                }
            },

            description : function (description) {
                if (comb.isString(description)) {
                    this._description = description;
                } else {
                    throw TypeError("Description must be a string");
                }
            },

            datetime : function (datetime) {
                if (comb.isDate(datetime)) {
                    this._datetime = datetime;
                } else {
                    throw TypeError("Datetime must be a date");
                }
            },

            email : function (email) {
                if (comb.isString(email)) {
                    this._email = email;
                } else {
                    throw TypeError("Emial must be a string");
                }
            }
        }

        // functions

    }
});

module.exports = Reminder;