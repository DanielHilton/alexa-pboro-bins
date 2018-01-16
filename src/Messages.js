'use strict';

const WELCOME = "Welcome to the Peterborough Bins Skill! ";
const WHAT_DO_YOU_WANT = "What do you want to ask?";
const NOTIFY_MISSING_PERMISSIONS = "Please enable Location permissions in the Amazon Alexa app.";
const NO_ADDRESS = "It looks like you don't have an address set. You can set your address from the companion app.";
const ADDRESS_AVAILABLE = "Here is your full address: ";
const ERROR = "Uh Oh. Looks like something went wrong.";
const ERROR_PBORO_REQUEST = "Uh Oh. Looks like something went wrong with the Peterborough Council Request.";
const LOCATION_FAILURE = "There was an error with the Device Address API. Please try again.";
const GOODBYE = "Bye! Thanks for using the Peterborough Bins Skill!";
const UNHANDLED = "This skill doesn't support that. Please ask something else.";
const HELP = "You can use this skill by asking something like: when do the bins need putting out? Or you can ask, what day are my bins collected? What would you like to ask?";
const HERES_YOUR_BIN_DAY = "Your bins are going to be collected on";
const HERES_YOUR_BIN_TYPES = "The types of bin being collected this week are ";
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
    "HERES_YOUR_BIN_DAY": HERES_YOUR_BIN_DAY,
    "HERES_YOUR_BIN_TYPES": HERES_YOUR_BIN_TYPES,
    "NO_INFORMATION_FOUND": NO_INFORMATION_FOUND
};