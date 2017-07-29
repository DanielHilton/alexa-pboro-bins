'use strict';

// External imports
const Alexa = require('alexa-sdk');

// Local imports
const Handlers = require('./Handlers');

// Constants
const APP_ID = 'amzn1.ask.skill.fee46fbf-5cde-4712-a697-78043479290d';

exports.handler = function (event, context, callback) {
    let alexa = Alexa.handler(event, context);

    alexa.appId = APP_ID;
    alexa.registerHandlers(Handlers);

    console.log(`Beginning execution for skill with APP_ID=${alexa.appId}`);
    alexa.execute();
    console.log(`Ending execution  for skill with APP_ID=${alexa.appId}`);
};