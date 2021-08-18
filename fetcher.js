const request = require('request');

const link = process.argv[2];
const fileName = process.argv[3];

request(link, (error, response, body) => {
  console.log(`Downloaded and saved ${body.length} bytes to ${fileName}`);
});

