'use strict';

// Internal imports
const postcodeClient = require('./AlexaPostcodeClient');
const Intents = require('./Intents');
const Events = require('./Events');
const Messages = require('./Messages');

const rp = require('request-promise');
const cheerio = require('cheerio');
const https = require('https');

const COUNTRY_AND_POSTCODE_PERMISSION = "read::alexa:device:all:address:country_and_postal_code";
const PERMISSIONS = [COUNTRY_AND_POSTCODE_PERMISSION];

const newSessionRequestHandler = function() {
    console.info("Starting newSessionRequestHandler()");

    if(this.event.request.type === Events.LAUNCH_REQUEST) {
        this.emit(Events.LAUNCH_REQUEST);
    } else if (this.event.request.type === "IntentRequest") {
        this.emit(this.event.request.intent.name);
    }

    console.info("Ending newSessionRequestHandler()");
};

/**
 * This is the handler for the LaunchRequest event. Refer to
 * the Events.js file for more documentation.
 */
const launchRequestHandler = function () {
    console.info("Starting launchRequestHandler()");
    this.emit(":ask", Messages.WELCOME + Messages.WHAT_DO_YOU_WANT, Messages.WHAT_DO_YOU_WANT);
    console.info("Ending launchRequestHandler()");
};

/**
 * This is the handler for the SessionEnded event. Refer to
 * the Events.js file for more documentation.
 */
const sessionEndedRequestHandler = function () {
    console.info("Starting sessionEndedRequestHandler()");
    this.emit(":tell", Messages.GOODBYE);
    console.info("Ending sessionEndedRequestHandler()");
};

/**
 * This is the handler for the Unhandled event. Refer to
 * the Events.js file for more documentation.
 */
const unhandledRequestHandler = function () {
    console.info("Starting unhandledRequestHandler()");
    this.emit(":ask", Messages.UNHANDLED, Messages.UNHANDLED);
    console.info("Ending unhandledRequestHandler()");
};

/**
 * This is the handler for the Amazon help built in intent.
 * Refer to the Intents.js file for documentation.
 */
const amazonHelpHandler = function () {
    console.info("Starting amazonHelpHandler()");
    this.emit(":ask", Messages.HELP, Messages.HELP);
    console.info("Ending amazonHelpHandler()");
};

/**
 * This is the handler for the Amazon cancel built in intent.
 * Refer to the Intents.js file for documentation.
 */
const amazonCancelHandler = function () {
    console.info("Starting amazonCancelHandler()");
    this.emit(":tell", Messages.GOODBYE);
    console.info("Ending amazonCancelHandler()");
};

/**
 * This is the handler for the Amazon stop built in intent.
 * Refer to the Intents.js file for documentation.
 */
const amazonStopHandler = function () {
    console.info("Starting amazonStopHandler()");
    this.emit(":ask", Messages.STOP, Messages.STOP);
    console.info("Ending amazonStopHandler()");
};

const getBinDay = function () {
    const consentToken = this.event.context.System.user.permissions.consentToken;

    // If we have not been provided with a consent token, this means that the user has not
    // authorized your skill to access this information. In this case, you should prompt them
    // that you don't have permissions to retrieve their address.
    if (!consentToken) {
        this.emit(":tellWithPermissionCard", Messages.NOTIFY_MISSING_PERMISSIONS, PERMISSIONS);
        console.log("User did not give us permissions to access their address.");
        console.info("Ending getAddressHandler()");
        return;
    }

    const deviceId = this.event.context.System.device.deviceId;
    const apiEndpoint = this.event.context.System.apiEndpoint;

    __getPostcode(consentToken, deviceId, apiEndpoint)
        .then((addressResponse) => {
            switch (addressResponse.statusCode) {
                case 200:
                    const postcode = addressResponse.address['postalCode'].replace(' ', '+'); // formatting for the request to Pboro Council
                    console.log("Postcode successfully retrieved, now responding to user." + postcode);

                    rp({
                        uri: 'https://www.peterborough.gov.uk/residents/rubbish-and-recycling/bins/?postcode=' + postcode,
                        agent: https.globalAgent,
                        transform: (body) => {
                            console.log(body);
                            return cheerio.load(body)
                        }
                    })
                        .then(($) => {
                            console.log('received response from council');
                            let collectionDay = $('.i3-bin-collection-day').text();
                            if(collectionDay) {
                                console.log(collectionDay);
                                this.emit(':tellWithCard', Messages.HERES_YOUR_BIN_DAY + collectionDay, 'Bin Collection Day');
                            } else {
                                this.emit(':tell', `${Messages.NO_INFORMATION_FOUND} <say-as interpret-as="spell-out">${addressResponse.address['postalCode']}</say-as>`);
                            }
                        })
                        .catch((err) => {
                            this.emit(':tell', Messages.ERROR_PBORO_REQUEST);
                            console.error(err);
                        });
                    break;
                case 204:
                    // This likely means that the user didn't have their address set via the companion app.
                    console.log("Successfully requested from the device address API, but no address was returned.");
                    this.emit(":tell", Messages.NO_ADDRESS);
                    break;
                case 403:
                    console.log("The consent token we had wasn't authorized to access the user's address.");
                    this.emit(":tellWithPermissionCard", Messages.NOTIFY_MISSING_PERMISSIONS, PERMISSIONS);
                    break;
                default:
                    this.emit(":tellWithPermissionCard", Messages.NOTIFY_MISSING_PERMISSIONS, PERMISSIONS);
            }
        })
        .catch((error) => {
            this.emit(":tell", Messages.ERROR);
            console.error(error);
            console.info("Ending getAddressHandler()");
        });
};

/**
 * This is the handler for our custom GetAddress intent.
 * Refer to the Intents.js file for documentation.
 */
const __getPostcode = function (consentToken, deviceId, apiEndpoint) {
    console.info("Starting getAddressHandler()");

    const alexaDeviceAddressClient = new postcodeClient(apiEndpoint, deviceId, consentToken);
    // let deviceAddressRequest =
    return alexaDeviceAddressClient.getCountryAndPostalCode();
};

const handlers = {};
// Add event handlers
handlers[Events.NEW_SESSION] = newSessionRequestHandler;
handlers[Events.LAUNCH_REQUEST] = launchRequestHandler;
handlers[Events.SESSION_ENDED] = sessionEndedRequestHandler;
handlers[Events.UNHANDLED] = unhandledRequestHandler;

// Add intent handlers
handlers[Intents.GET_BIN_DAY] = getBinDay;
handlers[Intents.AMAZON_CANCEL] = amazonCancelHandler;
handlers[Intents.AMAZON_STOP] = amazonStopHandler;
handlers[Intents.AMAZON_HELP] = amazonHelpHandler;

module.exports = handlers;