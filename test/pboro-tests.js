const expect = require('chai').expect;
const rp = require('request-promise');
const https = require('https');
const cheerio = require('cheerio');
const handlers = require('../src/handlers');

let config = {
    uri: 'https://www.peterborough.gov.uk/residents/rubbish-and-recycling/bins/?postcode=PE7+8JS',
    agent: https.globalAgent,
    transform: (body) => {
        console.log(body);
        return cheerio.load(body)
    }
};

describe('the peterborough council request', function () {
    it('should get the collection day from the page', function (done) {
        rp(config)
            .then(($) => {
                console.log('received response from council');
                let collectionDay = $('.i3-bin-collection-day').text();
                if (collectionDay) {
                    done();
                } else {
                    done(new Error('Nothing returned'));
                }
            })
            .catch((err) => {
                console.error(err);
                done(err);
            });
    });

    it('should get the collection bin types', function (done) {
        rp(config)
            .then(($) => {
                console.log('received response from council');
                let calendar = $('.i3-bin-collection-calendar table tbody tr td');
                let calendarPairs = [];

                for(i = 0; i < calendar.length; i += 2){
                    calendarPairs.push({
                        date: calendar[i].children[0].data,
                        types: calendar[i + 1].children[0].data.replace(',', ' and')
                    });
                }

                let _ = calendarPairs[0].types;
                if(calendarPairs.length === 5) {
                    done();
                } else {
                    done(new Error('not enough collections.'))
                }
            })
            .catch((err) => {
                console.error(err);
                done(err);
            });
    });
});