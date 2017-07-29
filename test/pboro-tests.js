const expect = require('chai').expect;
const rp = require('request-promise');
const https = require('https');
const cheerio = require('cheerio');

describe('the peterborough council call', function() {
   it('should get the data from the page', function(done) {
       rp({
           uri: 'https://www.peterborough.gov.uk/residents/rubbish-and-recycling/bins/?postcode=PE7+8JS',
           agent: https.globalAgent,
           transform: (body) => {
               console.log(body);
               return cheerio.load(body)
           }
       })
           .then(($) => {
               console.log('received response from council');
               let collectionDay = $('.i3-in-collection-day').text();
               done();
           })
           .catch((err) => {
               console.error(err);
               done();
           });
   })
});