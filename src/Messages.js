'use strict';

const WELCOME = "Welcome to the Peterborough Bin Collection Skill!";
const WHAT_DO_YOU_WANT = "What do you want to ask?";
const NOTIFY_MISSING_PERMISSIONS = "Please enable Location permissions in the Amazon Alexa app.";
const NO_ADDRESS = "It looks like you don't have an address set. You can set your address from the companion app.";
const ADDRESS_AVAILABLE = "Here is your full address: ";
const ERROR = "Uh Oh. Looks like something went wrong.";
const ERROR_PBORO_REQUEST = "Uh Oh. Looks like something went wrong with the Peterborough Council Request.";
const LOCATION_FAILURE = "There was an error with the Device Address API. Please try again.";
const GOODBYE = "Bye! Thanks for using the Sample Device Address API Skill!";
const UNHANDLED = "This skill doesn't support that. Please ask something else.";
const HELP = "You can use this skill by asking something like: whats my address?";
const STOP = "There is nothing to stop. Did you mean to ask something else?";
const HERES_YOUR_BIN_DAY = "Your bins are going to be collected on";
const NO_INFORMATION_FOUND = "I'm sorry, but I couldn't find any information with Peterborough Council for the postcode ";

module.exports = {
    "WELCOME": WELCOME,
    "WHAT_DO_YOU_WANT": WHAT_DO_YOU_WANT,
    "NOTIFY_MISSING_PERMISSIONS": NOTIFY_MISSING_PERMISSIONS,
    "NO_ADDRESS": NO_ADDRESS,
    "ADDRESS_AVAILABLE": ADDRESS_AVAILABLE,
    "ERROR": ERROR,
    "ERROR_PBORO_REQUEST": ERROR_PBORO_REQUEST,
    "LOCATION_FAILURE": LOCATION_FAILURE,
    "GOODBYE": GOODBYE,
    "UNHANDLED": UNHANDLED,
    "HELP": HELP,
    "STOP": STOP,
    "HERES_YOUR_BIN_DAY": HERES_YOUR_BIN_DAY,
    "NO_INFORMATION_FOUND": NO_INFORMATION_FOUND
};