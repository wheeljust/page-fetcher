const request = require('request');
const fs = require('fs');

const link = process.argv[2];
const fileName = process.argv[3];

request(link, (error, response, body) => {
  fs.writeFile(fileName, body, err => {
    if (err) {
      console.error(err)
      return
    }
  })

  console.log(`Downloaded and saved ${body.length} bytes to ${fileName}`);
});

